import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationDirective } from './_directives/notification.directive';
import { HttpClientModule } from '@angular/common/http';
import { NavigationComponent } from './navigation/navigation.component';
import { ShowTicketsComponent } from './tickets/show-tickets/show-tickets.component';
import { CreateTicketsComponent } from './tickets/create-tickets/create-tickets.component';
import { PendingComponent } from './pending/pending.component';
import { DetailTicketComponent } from './tickets/detail-ticket/detail-ticket.component';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotificationDirective,
    NavigationComponent,
    ShowTicketsComponent,
    CreateTicketsComponent,
    PendingComponent,
    DetailTicketComponent,
    ImageViewerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
