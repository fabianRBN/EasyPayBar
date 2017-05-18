import { Component, OnInit, ViewChild } from '@angular/core';
import { ClienteService } from '../service/cliente.service';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2';
import { Cliente } from './../typeScript/cliente';
import { ProveedorService } from '../service/proveedor.service';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import 'rxjs/Rx';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  providers: [ClienteService, ProveedorService]
})
export class ClienteComponent implements OnInit {

  //  Variables de la interfaz
  titulo = 'Registro de Clientes';
  mensajeError: string;

  @ViewChild('modalToProveedor')
  modalToProveedor: ModalComponent;

  @ViewChild('modalToCliente')
  modalToCliente: ModalComponent;

  @ViewChild('modalMensaje')
  modalMensaje: ModalComponent;

  // Variables para guardar nuevo Proveedor
  bar: string;

  // Variables para gestionar clientes
  clientes: FirebaseListObservable<Cliente[]>;
  cliente: Cliente = new Cliente();

  constructor(private clienteServicio: ClienteService, private proveedorServicio: ProveedorService, 
    private db: AngularFireDatabase) { }

  getClientes(): void {
    this.clientes = this.clienteServicio.getClientes();
  }

  ngOnInit() {
    this.getClientes();
  }

  promoverProveedor(): void {
    const queryObservable = this.db.list('/proveedor', {
      query: {
        orderByChild: 'codigoQR',
        equalTo: this.cliente.codigoQR
      }
    }).first();

    queryObservable.subscribe(queriedItems => {
      if (queriedItems.length === 0 && this.bar !== undefined) {
        this.clienteServicio.promoverProveedor(this.cliente.key);
        this.proveedorServicio.crear(this.cliente.nombre, this.cliente.codigoQR, this.bar );
      } else {
        if (this.bar === undefined){
          this.mensajeError = 'Se debe agregar un nombre al Bar';
        }else {
          this.mensajeError = 'Este usuario ya esta promovido como Proveedor.';
        }
        this.modalMensaje.open();
      }
      this.bar = undefined;
    });
  }

  promoverCliente() {
    const queryObservable = this.db.list('/proveedor', {
      query: {
        orderByChild: 'codigoQR',
        equalTo: this.cliente.codigoQR
      }
    }).first();

    queryObservable.subscribe(queriedItems => {
      if (queriedItems.length > 0) {
        this.clienteServicio.promoverCliente(this.cliente.key);
        this.proveedorServicio.remover(queriedItems[0].$key);
      }
    });
  }

  modalProveedor(id: number, nom: string, codQR: string) {
    this.cliente.key = id;
    this.cliente.nombre = nom;
    this.cliente.codigoQR = codQR;
    this.modalToProveedor.open();
  }

  modalCliente(id: number, nom: string, codQR: string) {
    this.cliente.key = id;
    this.cliente.nombre = nom;
    this.cliente.codigoQR = codQR;
    this.modalToCliente.open();
  }

}
