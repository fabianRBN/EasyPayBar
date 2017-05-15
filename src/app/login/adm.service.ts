/**
 * Created by Fabian on 02/02/2017.
 */
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Admin } from './../typeScript/admin';

@Injectable()
export class AdminService {

  administrador : FirebaseListObservable<Admin[]>;

  constructor(private db: AngularFireDatabase) {
    this.administrador = db.list('admin/uid');
  }

  getAdmins(): FirebaseListObservable<Admin []>{
    return this.db.list('admin');
  }

  agregarCliente(nuevoCliente: Admin){
    this.administrador.push(nuevoCliente);
  }

}
