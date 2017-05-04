import { Component, OnInit , ViewChild } from '@angular/core';
import {AngularFire,  FirebaseListObservable} from 'angularfire2';
import { ClienteService } from '../service/cliente.service';
import { Cliente } from '../typeScript/cliente';
import {Subject} from 'rxjs/Subject';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cargar-menu',
  templateUrl: './cargar-menu.component.html',
  styleUrls: ['./cargar-menu.component.css']
})

export class CargarMenuComponent implements OnInit {

  titulo= "Cargar menu";

  constructor() {
  }

  ngOnInit() {
  }

}
