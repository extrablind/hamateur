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

      clearTimer() { clearInterval(this.intervalId); }

      private countDown() {
        this.clearTimer();
        this.$counter = Observable.interval(200).map((x) => {
            this.diff = Math.floor((this.future.getTime() - new Date().getTime()) / 1000);
            return this.diff;
        });
        this.subscription = this.$counter.subscribe((x) => {
          this.message = this.dhms(this.diff)
        });
      }

      dhms(t) {
          var days = Math.floor(t / 86400);
          var hours = Math.floor(t / 3600) % 24;
          var minutes = Math.floor(t / 60) % 60;
          var seconds = t % 60;
          var string = ""
          t -= days * 86400;
          t -= hours * 3600;
          t -= minutes * 60;

          if(minutes <= 5){
            this.noMoreTime = true;
          }
          if(minutes <= 9){
            string+="0"
          }
          string+=minutes + ':'
          if(seconds <= 9){
            string+="0"
          }
          string+=  seconds

          return string;
      }

      restart(minutes){
        this.kill()
        let now = moment();
        this.future =  now.add(minutes, 'minutes').toDate();
        this.start()
      }

      kill(){
        if(  this.subscription){
          this.subscription.unsubscribe();
        }
        this.stop();
        this.message = '--:--'
      }

          ngOnDestroy(): void {
              this.subscription.unsubscribe();
          }

}




