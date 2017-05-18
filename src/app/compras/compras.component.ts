import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {

  titulo: string;
  cliente: string;

  constructor() { }

  ngOnInit() {
    this.titulo = ' Registro compra';
    this.cliente = ' Nombre Apellido';
  }

}
