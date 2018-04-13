import { Component, OnInit, Input, Output } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Hamateur';
  isRegistered:boolean = false;
  services:any = {};

   constructor( private api:DataService) {
     this.services.api = api;
   }

  async  ngOnInit(){
    }


}
