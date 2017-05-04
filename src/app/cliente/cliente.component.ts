import { Component, OnInit, ViewChild } from '@angular/core';
import { ClienteService } from '../service/cliente.service';
import { FirebaseListObservable } from 'angularfire2';
import { Cliente } from './../typeScript/cliente';
import { ProveedorService } from '../service/proveedor.service';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  providers: [ClienteService, ProveedorService]
})
export class ClienteComponent implements OnInit {

  @ViewChild('modalCliente')
  modal: ModalComponent;

  @ViewChild('modalMensaje')
  modalMensaje: ModalComponent;

  titulo = 'Registro de Clientes';
  clientes : FirebaseListObservable<Cliente[]>;
  cliente: Cliente = new Cliente();
  mensaje = 'Este cliente ya ha sido promovido a Proveedor';

  constructor(private clienteServicio: ClienteService, private proveedorServicio: ProveedorService) { }

  getClientes() : void {
    this.clientes = this.clienteServicio.getClientes();
  }

  ngOnInit() {
    this.getClientes();
  }

  updateToProveedor(): void {
    this.clienteServicio.promoteProveedor(this.cliente.key);
    this.proveedorServicio.createProveedor(this.cliente.nombre, this.cliente.codigoQR);
    this.proveedorServicio.addProveedor();
  }

  openModalCliente(id: number, nom: string, codQR: string) {
    this.cliente.key = id;
    this.cliente.nombre = nom;
    this.cliente.codigoQR = codQR;
    this.modal.open();
  }

}
