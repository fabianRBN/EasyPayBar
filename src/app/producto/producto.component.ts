import { Component, OnInit, ViewChild } from '@angular/core';
import { Producto } from './../typeScript/producto';
import { ProductoService } from '../service/producto.service';
import { AngularFire, FirebaseListObservable} from 'angularfire2';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
// tslint:disable-next-line:import-blacklist
import { Observable, Subject} from 'rxjs';
import * as firebase from 'firebase';

interface Image {
  path: string;
  filename: string;
  downloadURL?: string;
  $key?: string;
}

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
  providers: [ProductoService]
})

export class ProductoComponent implements OnInit {

  // Variables de la interfaz
  @ViewChild('modalProductoVerDetalle')
  modalProductoVerDetalle: ModalComponent;

  @ViewChild('modalProductoEliminar')
  modalEliminar: ModalComponent;

  @ViewChild('modalProductoModificar')
  modalModificar: ModalComponent;

  @ViewChild('modalProductoCrear')
  modalCrear: ModalComponent;

  titulo = 'Productos';
  resultado = '';

  // Variables para manejar las imagenes
  file: File;

  // Variables para gestionar productos
  key;
  private idPro;
  private idCat;
  private sub: any;

  pista = '';
  producto: Producto = new Producto();
  productos: FirebaseListObservable<Producto[]>;

  constructor(private productoServicio: ProductoService, public af: AngularFire, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.idPro = params['id'];
       this.idCat = params['idC'];
    });
    this.getProductos();
  }

  getProductos(): void {
    this.productos = this.productoServicio.getProductos(this.idPro, this.idCat);
  }

  buscarProducto() {
    const subject = new Subject();
    const queryObservable = this.af.database.list('/proveedor/' + this.idPro + '/categoria/' + this.idCat + '/producto', {
      query: {
        orderByChild: 'nombre',
        startAt: this.pista,
      }
    });

    this.productos = queryObservable;
    subject.next(this.pista);

    queryObservable.subscribe(queriedItems => {
      if (queriedItems.length > 0) {
        this.resultado = '';
      } else {
        this.resultado = 'No se encotraron Resultados con el Nombre: \'' + this.pista + '\'';
      }
    });
  }

  seleccionarImagen(event: EventTarget) {
    const eventObj: MSInputMethodContext = <MSInputMethodContext> event;
    const target: HTMLInputElement = <HTMLInputElement> eventObj.target;
    this.file = target.files[0];
  }

  subirImagen(imageFile: File) {
    const storageRef = firebase.storage().ref();
    const imageRef = storageRef.child('productos/' + imageFile.name);
    const uploadTask = imageRef.put(imageFile);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      function(snapshot){
        // Para evaluar progreso
      }, function(error){
        console.log('Uh-oh, an error occurred!');
      }, function(){
        console.log('Imagen subida con exito');
    });
  }

  borrarImagen(imagenPath: string) {
    const storageRef = firebase.storage().ref();
    const imageRef = storageRef.child(imagenPath);

    imageRef.delete().then(function() {
      console.log('File deleted successfully');
    }).catch(function(error) {
      console.log('Uh-oh, an error occurred!');
    });
  }

  agregarProducto() {
    // Subir imagen
    const storageRef = firebase.storage().ref();
    const imageRef = storageRef.child('productos/' + this.file.name);
    const pathRef = firebase.storage().ref('productos/' + this.file.name);
    const uploadTask = imageRef.put(this.file);

    uploadTask.then((snapshot) => {
      pathRef.getDownloadURL().then(url => this.productoServicio.agregarProducto(this.idPro, this.idCat, this.file, url, this.producto)
      );
    });
  }

  actualizarProducto() {
    // Borrar imagen actual
    this.borrarImagen(this.producto.imagen);

    // Subir la nueva imagen
    const storageRef = firebase.storage().ref();
    const imageRef = storageRef.child('productos/' + this.file.name);
    const pathRef = firebase.storage().ref('productos/' + this.file.name);
    const uploadTask = imageRef.put(this.file);

    uploadTask.then((snapshot) => {
      pathRef.getDownloadURL().then(url =>
        this.productoServicio.actualizarProducto(this.idPro, this.idCat, this.key, this.producto, this.file, url)
      );
    });
  }

  eliminarProducto() {
    this.borrarImagen(this.producto.imagen);
    this.productoServicio.eliminarProducto(this.idPro, this.idCat, this.key);
    this.producto = new Producto();
  }

  /* Modals */
  openModalProductoCrear() {
    this.modalCrear.open();
    this.producto = new Producto();
  }

  openModalProductoEliminar(id, nombre: string, precio: number, veces: number, imagen: string) {
    this.key = id;
    this.producto.nombre = nombre;
    this.producto.precio = precio;
    this.producto.veces = veces;
    this.producto.imagen = imagen;
    this.modalEliminar.open();
  }

  openModalProductoEditar(id, nombre: string, precio: number, veces: number, imagen: string, imagenURL: string) {
    this.key = id;
    this.producto.nombre = nombre;
    this.producto.precio = precio;
    this.producto.veces = veces;
    this.producto.imagen = imagen;
    this.producto.imagenURL = imagenURL;
    this.modalModificar.open();
  }

  openModalProductoVerDetalle(id, nombre: string, precio: number, veces: number, imagenURL: string) {
    this.key = id;
    this.producto.nombre = nombre;
    this.producto.precio = precio;
    this.producto.veces = veces;
    this.producto.imagenURL = imagenURL;
    this.modalProductoVerDetalle.open();
  }
}
