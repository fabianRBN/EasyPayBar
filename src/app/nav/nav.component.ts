import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})

export class NavComponent implements OnInit {

  public isCollapsed: boolean = true;

  user : any
  pictureUrl : any;
  isLogin : boolean = false;
  id: string;
  administrador: boolean = false;
  proveedor: boolean = false;

  constructor(public af: AngularFire,private router: Router) {



  if(router.url == '/login') {
    this.isLogin = true;
  }

  this.af.auth.subscribe(auth => {
    if(auth) {
      this.user = auth;
      this.pictureUrl = auth.facebook.photoURL;
      this.filter(af,auth);
      const queryObservable = af.database.list('/proveedor', {
        query: {
          orderByChild: 'codigoQR',
          equalTo: auth.uid
        }
      });

      queryObservable.subscribe(queriedItems => {
        if(queriedItems.length > 0) {
          this.id = queriedItems[0].$key;
        }
      });
    }
  });
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



  }


  a_logout() {
    this.af.auth.logout();
  }

  ngOnInit() { }
}
