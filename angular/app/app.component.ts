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
     console.log(this.candidate);
   }


   setEndInMinutes(minutes){
     console.log(this.counter);
     let now = moment();
     this.counter = now.add(minutes, 'minutes').toDate();
     this.counterIsUpdated = true;
     console.log(this.counter);
   }

   updateCountdown(status){
     console.log("Will update coundown")
     console.log(status);
     if(status == 'started'){
       this.counter = this.setEndInMinutes(20)
     }else{
       this.counter = false
     }
   }

   refreshCandidate(candidate){
     console.log("refreshing candidate");
     this.candidate = candidate;
     localStorage.setItem('candidate', this.candidate.uuid)
     console.log(candidate);
   }

   logout(){
     console.log("LOGOUT FROM App COMPONENENT ! ! remove local storage")
     localStorage.removeItem('candidate');
     localStorage.removeItem('examStatus');
     this.candidate  = false;
   }

}
