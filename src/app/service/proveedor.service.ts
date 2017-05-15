import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Proveedor } from './../typeScript/proveedor';
import { Categoria } from './../typeScript/categoria';
import { Afiliado } from './../typeScript/afiliado';

@Injectable()
export class ProveedorService {

  proveedores : FirebaseListObservable<Proveedor[]>;
  proveedor: Proveedor = new Proveedor();

  constructor(private db: AngularFireDatabase) {
    this.proveedores = db.list('/proveedor');
  }

  crear(nom: string, codQR: string) : void {
    this.proveedor.codigoQR = codQR;
    this.proveedor.nombre = nom;
  }

  getProveedores(): FirebaseListObservable<Proveedor[]> {
    return this.db.list('/proveedor');
  }

  agregar() {
    if (!this.proveedor.nombre) { }
    this.proveedores.push(this.proveedor);
  }

  remover(id: number) {
    this.db.object('/proveedor/' + id).remove();
  }

}