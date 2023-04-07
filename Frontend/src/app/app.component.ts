import { Component } from '@angular/core';
import { AuthenticateService } from './_services/authenticate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'service-desk';
  constructor(private authService: AuthenticateService) { }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
