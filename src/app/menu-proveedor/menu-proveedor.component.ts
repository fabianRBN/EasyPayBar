import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
@Component({
  selector: 'app-menu-proveedor',
  templateUrl: './menu-proveedor.component.html',
  styleUrls: ['./menu-proveedor.component.css']
})
export class MenuProveedorComponent implements OnInit {

  public isCollapsed: boolean = true;

  user : any
  pictureUrl : any;
  isLogin : boolean = false;
  id: string;

  constructor(public af: AngularFire,private router: Router) {
    if(router.url == '/login') {
      this.isLogin = true;

    }



    this.af.auth.subscribe(auth => {
      if(auth) {
        this.user = auth;
        this.pictureUrl = auth.facebook.photoURL;
        this.af.auth.subscribe(auth => {
          if(auth) {
            this.user = auth;
            this.pictureUrl = auth.facebook.photoURL;

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
    });
  }

  ngOnInit() {

  }

}
