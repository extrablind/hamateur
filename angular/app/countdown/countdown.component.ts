import { Component,  ElementRef, OnInit, OnDestroy, Input, Output, EventEmitter} from '@angular/core';
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
    @Output() onTimeIsUp = new EventEmitter();


      intervalId = 0;
      seconds = 30;

      clearTimer() { clearInterval(this.intervalId); }

      ngOnInit()    {
        this.message = `--:--`;
      }

      start() {
        console.log("Countdown starts");
        this.countDown(); }
      stop()  {
        console.log("Countdown stopped");
        this.clearTimer();
      }
      reset()  {
        console.log("reset");
        this.clearTimer();
      }

      private countDown() {
        this.clearTimer();
        this.$counter = Observable.interval(200).map((x) => {
            this.diff = Math.floor((this.future.getTime() - new Date().getTime()) / 1000);
            return x;
        });
        this.subscription = this.$counter.subscribe((x) => this.message = this.dhms(this.diff));
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

      restart(minutes){
        let now = moment();
        this.future =  now.add(minutes, 'minutes').toDate();
        this.start()
      }

      default(){
        this.stop();
        this.subscription.unsubscribe();
        this.message = '--:--'
      }

          ngOnDestroy(): void {
              this.subscription.unsubscribe();
          }

}




