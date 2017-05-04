import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Recarga } from './../typeScript/recarga';

@Injectable()
export class RecargaService {
recarga: Recarga = new Recarga();
recargas : FirebaseListObservable<Recarga[]>;

  constructor(private db: AngularFireDatabase) {
  	this.recargas = db.list('/proveedor//recarga');
  }

  getRecargas( idProveedor: string , idAfiliado: number): FirebaseListObservable<Recarga[]>{
    return this.db.list('/proveedor/'+idProveedor+'/afiliados/'+idAfiliado+'/recarga');
  }
  addRecarga(nuevaRecarga: Recarga, idProveedor: string , idAfiliado: number){
  	this.db.list('/proveedor/'+idProveedor+'/afiliados/'+idAfiliado+'/recarga').push(nuevaRecarga);
  }

}
