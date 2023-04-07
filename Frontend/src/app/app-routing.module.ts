import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { AuthenticateService } from './_services/authenticate.service';
import { ShowTicketsComponent } from './tickets/show-tickets/show-tickets.component';
import { CreateTicketsComponent } from './tickets/create-tickets/create-tickets.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'show-tickets',
        component: ShowTicketsComponent,
        canActivate: [() => inject(AuthenticateService).isLoggedIn()]
      },
      {
        path: 'create-tickets',
        component: CreateTicketsComponent,
        canActivate: [() => inject(AuthenticateService).isLoggedIn()]
      },
      {
        path: '**',
        redirectTo: 'login'
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
