import { Component, OnInit, Input, Output } from '@angular/core';
import { DataService } from './services/data.service';
import * as moment from 'moment';

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

  constructor( private data:DataService) {
    this.api = data;
  }
  react(status){
    if(status === "ended"){
      return;
    }
    this.restart(20)
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

   startCountdown(){
     console.log("Event emitted and received : countdown starts")
   }

   setCounterFutureDate(minutes){
     let now = moment();
     this.counter = now.add(minutes, 'minutes').toDate();
     console.log(this.counter);
   }

   updateCounter(status){
     if(status == 'started'){
       counterDate = setCounterFutureDate(20)
     }else{
       counterDate = false
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
