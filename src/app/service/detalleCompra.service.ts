import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { DetalleCompra } from './../typeScript/detalleCompra';

@Injectable()
export class DetalleCompraService {

detalleCompra : FirebaseListObservable<DetalleCompra[]>;

  constructor(private db: AngularFireDatabase) {
  	this.detalleCompra = db.list('/typeScript/detalleCompra');
  }

  getDetalleCompras(): FirebaseListObservable<DetalleCompra[]>{
  	return this.db.list('/typeScript/detalleCompra');
  }

  agregarDetalleCompra(nuevoDetalleCompra: DetalleCompra){
  	this.detalleCompra.push(nuevoDetalleCompra);
  }

}