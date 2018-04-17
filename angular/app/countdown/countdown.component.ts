import { Component,  ElementRef, OnInit, OnDestroy, Input} from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import * as moment from 'moment';

@Component({
    selector: 'app-countdown',
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
    private futureString: string;
    private diff: number;
    private $counter: Observable<number>;
    private subscription: Subscription;
    private message: string;
    private noMoreTime = false;
    @Input() inputDate;

    constructor(elm: ElementRef) {
      // inputDate="January 1, 2019 12:00:00"
      this.futureString = this.inputDate
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


    ngOnInit() {
        this.future = new Date(this.futureString);
        this.$counter = Observable.interval(200).map((x) => {
            this.diff = Math.floor((this.future.getTime() - new Date().getTime()) / 1000);
            return x;
        });
        this.subscription = this.$counter.subscribe((x) => this.message = this.dhms(this.diff));
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}