import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.css'],
  standalone: true,
  imports: [CommonModule],
  providers: [],
})
export class GoogleLoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    //on mount 
  }

}
