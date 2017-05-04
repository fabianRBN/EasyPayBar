import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Categoria } from './../typeScript/categoria';
import { CategoriaService } from '../service/categoria.service';
import { AngularFire, FirebaseListObservable} from 'angularfire2';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  providers: [CategoriaService]
})
export class CategoriaComponent implements OnInit, OnDestroy {

  @ViewChild('modalCategoriaEliminar')
  modalEliminar: ModalComponent;

  @ViewChild('modalCategoriaModificar')
  modalModificar: ModalComponent;

  @ViewChild('modalCategoriaCrear')
  modalCrear: ModalComponent;

  titulo= "Registro de Categorias del Proveedor";
  key;
  private id;
  private sub: any;
  categoria : Categoria = new Categoria();
  categorias : FirebaseListObservable<Categoria[]>;

  constructor(private categoriaServicio: CategoriaService, private route: ActivatedRoute, public af: AngularFire) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = params['id'];
    });
    this.getCategorias();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getCategorias(): void {
    this.categorias = this.categoriaServicio.getCategorias(this.id);
  }

  addCategoria() {
    this.categoriaServicio.addCategoria(this.id, this.categoria);
  }

  deleteCategoria() {
    this.categoriaServicio.deleteCategoria(this.id, this.key);
  }

  updateCategoria() {
    this.categoriaServicio.updateCategoria(this.id, this.key, this.categoria);
  }

  openModalCategoriaEliminar(id: string, descripcion: string, nombre : string) {
    this.key = id;
    this.categoria.descripcion = descripcion;
    this.categoria.nombre = nombre;
    this.modalEliminar.open();
  }

  openModalCategoriaEditar(id: string, descripcion: string, nombre : string) {
    this.key = id;
    this.categoria.descripcion = descripcion;
    this.categoria.nombre = nombre;
    this.modalModificar.open();
  }
}
