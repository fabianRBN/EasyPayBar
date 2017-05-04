import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Categoria } from './../typeScript/categoria';

@Injectable()
export class CategoriaService {

  constructor(private db: AngularFireDatabase) { }

  getCategorias(id: string): FirebaseListObservable<Categoria[]> {
  	return this.db.list('/proveedor/' + id + '/categoria');
  }

  addCategoria(idPro: string, nuevaCategoria: Categoria) {
  	this.db.list('/proveedor/' + idPro + '/categoria').push(nuevaCategoria);
  }

  deleteCategoria(idPro: string, idCat: string) {
  	this.db.object('/proveedor/' + idPro + '/categoria/' + idCat).remove();
  }

  updateCategoria(idPro: string, id: string, categoria: Categoria) {
  	this.db.object('/proveedor/' + idPro + '/categoria/' + id).update(categoria);
  }

}
