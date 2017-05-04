import { Component, OnInit, ViewChild } from '@angular/core';
import { Producto } from './../typeScript/producto';
import { ProductoService } from '../service/producto.service';
import { AngularFire, FirebaseListObservable} from 'angularfire2';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
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
  providers: [ProductoService]
})

export class ProductoComponent implements OnInit {
	
  fileList : FirebaseListObservable<Image[]>;
  imageList : Observable<Image[]>;
  storageref;
  storage;
  key;
  private idPro;
  private idCat;
  private sub: any;

  @ViewChild('modalProductoVerDetalle')
  modalProductoVerDetalle: ModalComponent;

  @ViewChild('modalProductoEliminar')
  modalEliminar: ModalComponent;

  @ViewChild('modalProductoModificar')
  modalModificar: ModalComponent;

  @ViewChild('modalProductoCrear')
  modalCrear: ModalComponent;

  titulo= "Productos";
  pista : string="";
  producto : Producto = new Producto();
  productos : FirebaseListObservable<Producto[]>;
  resultado: string = "";
  

  constructor(private productoServicio: ProductoService, public af: AngularFire, private route: ActivatedRoute) { 
    this.storage = firebase.storage().ref();
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
      if(queriedItems.length > 0) {
        this.resultado = "";
      } else {
        this.resultado = "No se encotraron Resultados con el Nombre: '" + this.pista + "'";
      }
    });
  }

  addProducto() {
    // Create a root reference
    let storageRef = firebase.storage().ref();
    let storage = firebase.storage();
    // This currently only grabs item 0, TODO refactor it to grab them all
    for (let selectedFile of [(<HTMLInputElement>document.getElementById('file')).files[0]]) {
      // Make local copies of services because "this" will be clobbered
      let path = `productos/${selectedFile.name}`;
      var iRef = storageRef.child(path);
      var pathReference = storage.ref(path);
      iRef.put(selectedFile).then((snapshot) => {
        pathReference.getDownloadURL().then(url => this.productoServicio.
          addProducto(this.idPro, this.idCat, url, this.producto));
      });
    }
  }

  delete(image: Image) {
    let storagePath = image.path;
    let referencePath = `productos/images/` + image.$key;
    // Do these as two separate steps so you can still try delete ref if file no longer exists
    // Delete from Storage
    firebase.storage().ref().child(storagePath).delete()
    .then(() => {}, (error) => console.error("Error deleting stored file", storagePath));
    // Delete references
    this.af.database.object(referencePath).remove();
    //this.productoServicio.deleteProducto(id);  
  }

  updateProducto() {    
    this.productoServicio.updateProducto(this.idPro, this.idCat, this.key, this.producto);
    this.producto = new Producto();
  }

  deleteProducto() {
    this.productoServicio.deleteProducto(this.idPro, this.idCat, this.key);
    this.producto = new Producto();
  }

  /* Modals */ 

  openModalProductoCrear(){
    this.producto = new Producto();
    this.modalCrear.open();
  }

  openModalProductoEliminar(id, nombre : string, precio: number, veces: number) {
    this.key = id;
    this.producto.nombre = nombre;
    this.producto.precio = precio;
    this.producto.veces = veces;
    this.producto.imagen = null; 
    this.modalEliminar.open();
  }

  openModalProductoEditar(id, nombre : string, precio: number, veces: number, imagen: string) {
    this.key = id;
    this.producto.nombre = nombre;
    this.producto.precio = precio;
    this.producto.veces = veces;
    this.producto.imagen = imagen;
    this.modalModificar.open();
  }

  openModalProductoVerDetalle(id, nombre : string, precio: number, veces: number, imagen: string) {
    this.key = id;
    this.producto.nombre = nombre;
    this.producto.precio = precio;
    this.producto.veces = veces;
    this.producto.imagen = imagen;
    this.modalProductoVerDetalle.open();
  }
}
