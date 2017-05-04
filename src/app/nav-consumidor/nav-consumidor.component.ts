import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

@Component({
  selector: 'app-nav-consumidor',
  templateUrl: './nav-consumidor.component.html',
  styleUrls: ['./nav-consumidor.component.css']
})
export class NavConsumidorComponent implements OnInit {

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

      }
    });



  }

  ngOnInit() {
  }

}
