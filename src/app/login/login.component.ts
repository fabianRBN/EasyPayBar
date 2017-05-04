import { Component, OnInit  } from '@angular/core';
import {AngularFire, AuthProviders, AuthMethods, FirebaseListObservable} from 'angularfire2';
import { Router } from '@angular/router';
import { ClienteService } from '../service/cliente.service';
import { Cliente } from '../typeScript/cliente';
import { AdminService } from './adm.service';
import {Admin} from "../typeScript/admin";
import auth = firebase.auth;
import {Subject} from 'rxjs/Subject';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[ AdminService,ClienteService]
})
export class LoginComponent implements OnInit {
  userFb = {};
  error: any;
  admins :  FirebaseListObservable<Admin[]>;
  cliente: Cliente = new Cliente();
  contador: number = 0;

  constructor(public af: AngularFire,private router: Router, private adminService: AdminService ,private clienteService: ClienteService) {

    this.af.auth.subscribe(auth => {

      if(auth) {
        this.filterAdmin(af,auth);

      }
    });
  }

  filterAdmin(af , auth){
    const subject = new Subject();
    const queryObservable = af.database.list('/cliente', {
      query: {
        orderByChild: 'codigoQR',
        equalTo: auth.uid
      }
    });

// subscribe to changes
    queryObservable.subscribe(queriedItems => {
      console.log(queriedItems.length);
      if(queriedItems.length > 0){

        if(queriedItems[0].admin || queriedItems[0].proveedor){
          this.router.navigateByUrl('/menu-admin');
        }
        else{
            this.router.navigateByUrl('/menu');
        }
      }
      else{
        this.registrarCliente(auth);
        this.router.navigateByUrl('/menu');
      }

    });


  }

  registrarCliente(auth): void{
    console.log("registrar");
    this.clienteService.createCliente( auth.facebook.displayName , auth.uid);
    this.clienteService.addCliente();
  }
  getAdmins(): void{
   this.admins = this.adminService.getAdmins();
  }

  getClientes(auth) : boolean {

    this.af.database.list('/cliente', { preserveSnapshot: true}).subscribe(snapshots=>{
      console.log(auth.uid)
        snapshots.forEach(snapshot => {if(snapshot.val().codigoQR == auth.uid){
            return true;
          }


        });
      });


      return false;
  }

  loginFb() {

    this.af.auth.login({
      provider: AuthProviders.Facebook,
      method: AuthMethods.Popup,
    }).then(
      (success) => {
        this.af.auth.subscribe(user => {
          if(user) {
            // user logged in
              this.userFb = user;


          }
          else {
            // user not logged in
            this.userFb = {};
          }

        });

      }

      ).catch(
      (err) => {
        this.error = err;
      })
  }


  ngOnInit() {
    this.getAdmins();

  }


}
