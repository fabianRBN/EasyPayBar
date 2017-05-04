import { Component, OnInit , ViewChild } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { ClienteService } from '../service/cliente.service';
import { Cliente } from '../typeScript/cliente';
import { Subject } from 'rxjs/Subject';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-recarga',
  templateUrl: './recarga.component.html',
  styleUrls: ['./recarga.component.css'],
  providers:[ ClienteService ]
})

export class RecargaComponent implements OnInit {

  @ViewChild('modalVerificar')
  modalVerificar: ModalComponent;
  @ViewChild('modalRecargaExitosa')
  modalRecargaExitosa: ModalComponent;


  cliente: Cliente = new Cliente();
  clientes: FirebaseListObservable<any[]>;

  titulo= "Registro de Crédito";
  nombre: string = "";
  saldo: number;
  radioValue: string= "";
  listado: string = "";
  resultado: string = "";

  private id;
  private sub: any;

  constructor(public af: AngularFire, public clienteService: ClienteService, private route: ActivatedRoute) {


  }

  buscarCliente() {
    const subject = new Subject();
    const queryObservable = this.af.database.list('/cliente', {
      query: {
        orderByChild: 'nombre',
        startAt: this.nombre,
        limitToFirst: 4
      }
    });

    this.clientes = queryObservable;
    this.listado = "Listado de Clientes Encontrados:";
    subject.next(this.nombre);

    queryObservable.subscribe(queriedItems => {
      if(queriedItems.length > 0) {
        this.resultado = "";
      } else {
        this.resultado = "No se encotraron Resultados con el Nombre: '" + this.nombre + "'";
      }
    });
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    if(this.id != null){
     // this.buscarAfiliados();
    }
  }



  setCliente(cliente) {
    this.cliente.nombre = cliente.nombre;
    this.cliente.saldo = cliente.saldo;
    this.cliente.codigoQR = cliente.codigoQR;
    this.cliente.estado = cliente.estado;
    this.cliente.key = cliente.$key;
  }

  recargar() {
   this.saldo = parseInt(this.radioValue) + parseInt(this.cliente.saldo + "");
   this.clienteService.recargarSaldo(this.cliente.key, this.saldo);
   this.modalVerificar.close();
   this.modalRecargaExitosa.open();
  }

}
