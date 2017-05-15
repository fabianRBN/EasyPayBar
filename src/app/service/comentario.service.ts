import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Comentario } from './../typeScript/comentario';

@Injectable()
export class ComentarioService {

comentario : FirebaseListObservable<Comentario[]>;

  constructor(private db: AngularFireDatabase) {
  	this.comentario = db.list('/typeScript/comentario');
  }

  getComentarios(): FirebaseListObservable<Comentario[]>{
  	return this.db.list('/typeScript/comentario');
  }

  agregarComentario(nuevoComentario: Comentario){
  	this.comentario.push(nuevoComentario);
  }

}