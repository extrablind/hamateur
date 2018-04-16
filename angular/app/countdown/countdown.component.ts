import { Component,  ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';

@Component({
    selector: 'app-countdown',
    template: `
  <div>
  <span class="badge badge-danger">
    {{message}}
    </span>
  </div>
`
})
export default class CountdownComponent {

    private future: Date;
    private futureString: string;
    private diff: number;
    private $counter: Observable<number>;
    private subscription: Subscription;
    private message: string;

    constructor(elm: ElementRef) {
        this.futureString = elm.nativeElement.getAttribute('inputDate');
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

        return [
            days + 'd',
            hours + 'h',
            minutes + 'm',
            seconds + 's'
        ].join(' ');
    }


    ngOnInit() {
        this.future = new Date(this.futureString);
        this.$counter = Observable.interval(1000).map((x) => {
            this.diff = Math.floor((this.future.getTime() - new Date().getTime()) / 1000);
            return x;
        });

        this.subscription = this.$counter.subscribe((x) => this.message = this.dhms(this.diff));
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}