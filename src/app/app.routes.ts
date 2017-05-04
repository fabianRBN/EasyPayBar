/**
 * Created by Fabian on 24/01/2017.
 */
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';

import { AuthGuard } from './auth.service';
import { SignupComponent } from './signup/signup.component';
import { EmailComponent } from './email/email.component';
import { MenuComponent } from './menu/menu.component';
import { CargarMenuComponent } from './cargar-menu/cargar-menu.component';
import { ComprasComponent} from './compras/compras.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { RecargaComponent } from './recarga/recarga.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { MenuAdminComponent } from './menu-admin/menu-admin.component';
import { ClienteComponent } from './cliente/cliente.component';
import { ProductoComponent} from './producto/producto.component';
import {MenuProveedorComponent} from './menu-proveedor/menu-proveedor.component';
import { AfiliadoComponent } from './afiliado/afiliado.component';

export const router: Routes = [
  { path: '', redirectTo: 'menu-admin', pathMatch: 'full' },
  { path: 'menu', component: MenuComponent , canActivate: [AuthGuard]  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login-email', component: EmailComponent },
  { path: 'cargar', component: CargarMenuComponent },

  { path:'compras', component: ComprasComponent},
  { path: 'proveedor', component: ProveedorComponent},
  { path: 'recarga/:id', component: RecargaComponent},
  { path: 'menu-admin', component: MenuAdminComponent , canActivate: [AuthGuard]  },
  { path:'compras', component: ComprasComponent },
  { path: 'proveedor', component: ProveedorComponent },
  { path: 'recarga', component: RecargaComponent },
  { path: 'cliente', component: ClienteComponent},
  { path: 'proveedor/:id/categoria', component: CategoriaComponent},
  { path: 'producto', component: ProductoComponent},
  { path: 'proveedor/:id/categoria/:idC/producto', component: ProductoComponent},
  { path: 'menu-proveedor', component: MenuProveedorComponent},
  { path: 'afiliado/:id', component: AfiliadoComponent ,canActivate: [AuthGuard] }

]

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
