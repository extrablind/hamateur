import { Component,  ElementRef, OnInit, OnDestroy, Input} from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import * as moment from 'moment';

@Component({
    selector: 'app-countdown-timer',
    template: `
  <div>
  <button class="btn btn-success btn-lg disabled" [ngClass]="{ 'btn-danger':noMoreTime } ">
    {{message}}
    </button>
  </div>
`
})
export default class CountdownComponent {

  private future;
  private diff: number;
    private $counter: Observable<number>;
    private subscription: Subscription;
    private message: string;
    private noMoreTime = false;
    private started = false;
    @Input() futureString;
    @Input() update = false;


      intervalId = 0;
      seconds = 30;

      clearTimer() { clearInterval(this.intervalId); }

      ngOnInit()    { this.start(); }
      ngOnDestroy() { this.clearTimer(); }

      start() {
        console.log("started because changed exam status ?");
        this.countDown(); }
      stop()  {
        console.log("Stopped");
        this.clearTimer();
        this.message = `Holding at T-${this.seconds} seconds`;
      }

      private countDown() {
        this.clearTimer();
        this.intervalId = window.setInterval(() => {
          this.seconds -= 1;
          if (this.seconds === 0) {
            this.message = 'Blast off!';
          } else {
            if (this.seconds < 0) { this.seconds = 10; } // reset
            this.message = `T-${this.seconds} seconds and counting`;
          }
        }, 1000);
      }













      /*




    constructor(elm: ElementRef) {
      console.log("CONSTRUCTOR");
      console.log(this.futureString);
      // inputDate="January 1, 2019 12:00:00"
      if(this.futureString){
        this.started = true;
      }

      if(this.update){
        this.refresh(this.futureString);
      }

    }
    stop(){
      this.started = false;
    }

    start(){
      this.started = true;
    }

    dhms(t) {
        var days, hours, minutes, seconds;
        days = Math.floor(t / 86400);
        t -= days * 86400;
        hours = Math.floor(t / 3600) % 24;
        t -= hours * 3600;
        minutes = Math.floor(t / 60) % 60;
        t -= minutes * 60;
        seconds = t % 60;

        if(minutes <= 5){
          this.noMoreTime = true;
        }

        if(isNaN(minutes)){
          minutes = '--';
        }
        if(isNaN(seconds)){
          seconds = '--';
        }

        return [
            //days + 'd',
            //hours + 'h',
            minutes ,
            seconds
        ].join(':');
    }


    refresh(date){
      this.future = date;
      this.$counter = Observable.interval(200).map((x) => {
          this.diff = Math.floor((this.future.getTime() - new Date().getTime()) / 1000);
          return x;
      });
      this.subscription = this.$counter.subscribe((x) => this.message = this.dhms(this.diff));
      this.update = false;
    }

    ngOnInit() {
        this.refresh(this.future);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
    */
}