import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Ng2PaginationModule } from 'ng2-pagination';
import { CollapseDirective } from 'ng2-bootstrap';
import { DropdownModule } from 'ng2-bootstrap';
import { Angular2FontAwesomeModule } from 'angular2-font-awesome/angular2-font-awesome';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { MenuComponent } from './menu/menu.component';
import { AngularFireModule } from 'angularfire2';
import { firebaseConfig } from '../environments/firebase.config';
import { LoginComponent } from './login/login.component';
import { EmailComponent } from './email/email.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './auth.service';
import { routes } from './app.routes';
import { CargarMenuComponent } from './cargar-menu/cargar-menu.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { RecargaComponent } from './recarga/recarga.component';
import { ComprasComponent } from './compras/compras.component';
import { MenuAdminComponent } from './menu-admin/menu-admin.component';
import { ClienteComponent } from './cliente/cliente.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { ProductoComponent } from './producto/producto.component';
import { NavProveedorComponent } from './nav-proveedor/nav-proveedor.component';
import { MenuProveedorComponent } from './menu-proveedor/menu-proveedor.component';
import { NavConsumidorComponent } from './nav-consumidor/nav-consumidor.component';
import { AfiliadoComponent } from './afiliado/afiliado.component';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    MenuComponent,

    LoginComponent,
    EmailComponent,
    SignupComponent,
    CargarMenuComponent,
    ProveedorComponent,
    RecargaComponent,
    ComprasComponent,
    MenuAdminComponent,
    ClienteComponent,
    CategoriaComponent,
    ProductoComponent,

    CollapseDirective,

    NavProveedorComponent,

    MenuProveedorComponent,

    NavConsumidorComponent,

    AfiliadoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2Bs3ModalModule,
    Ng2PaginationModule,
    NgbModule.forRoot(),
    routes,
    AngularFireModule.initializeApp(firebaseConfig),
    DropdownModule.forRoot(),
    Angular2FontAwesomeModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
