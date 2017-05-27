import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2';
import { AfiliadoService } from '../service/afiliado.service';
import { Afiliado } from '../typeScript/afiliado';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { RecargaService } from '../service/recarga.service';
import { Recarga } from "../typeScript/recarga";
import { DatePipe } from "@angular/common";
import { Cliente } from './../typeScript/cliente';
import { ClienteService } from '../service/cliente.service';

@Component({
  selector: 'app-afiliado',
  templateUrl: './afiliado.component.html',
  providers: [AfiliadoService, RecargaService, ClienteService]
})
export class AfiliadoComponent implements OnInit {
  @ViewChild('modalAfiliado')
  modal: ModalComponent;

  @ViewChild('modalCrearAfiliado')
  modalCrearAfiliado: ModalComponent;

  @ViewChild('modalVerificar')
  modalVerificar: ModalComponent;

  @ViewChild('modalRecargaExitosa')
  modalRecargaExitosa: ModalComponent;

  @ViewChild('modalVerificarAfiliado')
  modalVerificarAfiliado: ModalComponent;

  titulo = 'Afiliados';
  afiliados: FirebaseListObservable<Afiliado[]>;
  afiliado: Afiliado = new Afiliado();
  nuevoAfiliado: Afiliado = new Afiliado();
  clientes: FirebaseListObservable<Cliente[]>;
  cliente: Cliente = new Cliente();
  recarga: Recarga = new Recarga();
  isLogin: boolean = false;
  radioValue: string= "";
  date: DatePipe = new DatePipe("en-US");
  nombre: string = "";
  key;

  private id;
  private sub: any;
  constructor(private route: ActivatedRoute, private afiliadoService: AfiliadoService, 
    private recargaService: RecargaService, private clienteServicio: ClienteService, 
    private db: AngularFireDatabase) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.afiliados = this.afiliadoService.getAfiliados(this.id);
  }

  openModalAfiliadoCrear() {
    this.modalCrearAfiliado.open();
    this.nombre = "";
    this.clientes = this.clienteServicio.getCliente("");
  }

  openModalAfiliado(id: number, nom: string, saldo: string) {
    this.key = id;
    this.afiliado.nombre = nom;
    this.afiliado.saldo = parseInt(saldo);
    this.modal.open();
  }

  recargar() {
    this.modalVerificar.close();
    this.modal.close();
    this.recarga.valor = parseInt(this.radioValue);
    var saldo = this.afiliado.saldo + parseInt(this.radioValue);
    this.afiliadoService.ActualizarSaldo(this.id, saldo + '', this.key);
    this.recarga.fecha_Recarga =  this.date.transform(new Date(), 'dd/MM/yyyy');
    this.recargaService.agregarRecarga( this.recarga, this.id, this.key);
    this.modalRecargaExitosa.open();
  }

  getClientes() : void {
    this.clientes = this.clienteServicio.getCliente(this.nombre);
  }

  registrarAfiliados(id: string, nombre: string, codQR: string) {
    const queryObservable = this.db.list('/proveedor/' + this.id + '/afiliados', {
      query: {
        orderByChild: 'codigoQR',
        equalTo: codQR
      }
    }).first();

    queryObservable.subscribe(queriedItems => {
      if(queriedItems.length == 0) {
        this.nuevoAfiliado.nombre = nombre;
        this.nuevoAfiliado.codigoQR = codQR;
        this.nuevoAfiliado.fechaAfiliacion = this.date.transform(new Date(), 'dd/MM/yyyy');
        this.nuevoAfiliado.saldo = 0;
        this.afiliadoService.agregarAfiliado(this.nuevoAfiliado, this.id);
        this.modalCrearAfiliado.close();
      } else {
        this.modalVerificarAfiliado.open();
      }
    }); 
  }
}
