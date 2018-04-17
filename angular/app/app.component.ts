import { Component, OnInit, Input, Output } from '@angular/core';
import { DataService } from './services/data.service';
import * as moment from 'moment';
import  CountdownComponent  from './countdown/countdown.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public title:string = 'Hamateur';
  public view:string = 'default';
  public candidate = null;
  public exam;
  public counter;
  public api;
  public counterIsUpdated;

  constructor( private data:DataService) {
    this.api = data;
  }

   async ngOnInit(){
     var uuid = localStorage.getItem("candidate");
     if(uuid){
       this.candidate = await this.api.getCandidate(uuid);
       this.candidate.isRegistered = (null !== this.candidate);
       return;
     }
   }


   refreshCandidate(candidate){
     this.candidate = candidate;
     localStorage.setItem('candidate', this.candidate.uuid)
   }

   logout(){
     localStorage.removeItem('candidate');
     localStorage.removeItem('examStatus');
     this.candidate  = false;
   }

}
