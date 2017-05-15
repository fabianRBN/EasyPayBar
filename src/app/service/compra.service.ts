import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Compra } from './../typeScript/compra';

@Injectable()
export class CompraService {

compra : FirebaseListObservable<Compra[]>;

  constructor(private db: AngularFireDatabase) {
  	this.compra = db.list('/typeScript/compra');
  }

  getCompras(): FirebaseListObservable<Compra[]>{
  	return this.db.list('/typeScript/compra');
  }

  agregarCompra(nuevaCompra: Compra){
  	this.compra.push(nuevaCompra);
  }

}