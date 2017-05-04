import { Component, OnInit } from '@angular/core';
import { Router , RouterLink} from '@angular/router';
import { AngularFire} from 'angularfire2';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css']
})
export class MenuAdminComponent implements OnInit {

  administrador: boolean = false;
  proveedor: boolean = false;
  user : any
  id: string;
  constructor(public af: AngularFire,private router: Router) {



    this.af.auth.subscribe(auth => {
      if(auth) {

        this.filter(af,auth);

      }
    });
  }

  ngOnInit() {
  }
  filter(af , auth){

    const queryObservable = af.database.list('/cliente', {
      query: {
        orderByChild: 'codigoQR',
        equalTo: auth.uid
      }
    });

// subscribe to changes
    queryObservable.subscribe(queriedItems => {
      console.log(queriedItems.length);
      this.administrador =  queriedItems[0].admin;
      this.proveedor = queriedItems[0].proveedor;
    });

    const queryObservableProveedor = af.database.list('/proveedor', {
      query: {
        orderByChild: 'codigoQR',
        equalTo: auth.uid
      }
    });

    queryObservableProveedor.subscribe(queriedItems => {
      if(queriedItems.length > 0) {
        this.id = queriedItems[0].$key;
      }
    });

  }


}
