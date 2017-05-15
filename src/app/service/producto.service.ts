import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Producto } from './../typeScript/producto';

@Injectable()
export class ProductoService {

  constructor(private db: AngularFireDatabase) { }

  getProductos(idPro: string, idCat: string): FirebaseListObservable<Producto[]> {
  	return this.db.list('/proveedor/' + idPro + '/categoria/' + idCat + '/producto');
  }

  agregarProducto(idPro: string, idCat: string, url : string, nuevoProducto: Producto) {
    nuevoProducto.imagen = url;
  	this.db.list('/proveedor/' + idPro + '/categoria/' + idCat + '/producto').push(nuevoProducto);
  }

  eliminarProducto(idPro: string, idCat: string, idProd) {
  	this.db.object('/proveedor/' + idPro + '/categoria/' + idCat + '/producto/' + idProd).remove();
  }

  actualizarProducto(idPro: string, idCat: string, idProd: string, producto: Producto) {
  	this.db.object('/proveedor/' + idPro + '/categoria/' + idCat + '/producto/' + idProd).update(producto);
  }
}