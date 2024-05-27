import { Component } from '@angular/core';
import { GoogleLoginComponent } from '../login/google-login.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [GoogleLoginComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [GoogleLoginComponent],
})
export class HomeComponent {

}
