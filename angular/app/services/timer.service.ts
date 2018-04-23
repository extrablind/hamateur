import { Injectable, AfterViewInit } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subscription, BehaviorSubject, Subject } from 'rxjs/Rx';
import * as moment from 'moment';

@Injectable()
export class TimerService   {

  private future;
  private diff: number;
  private subscription: Subscription;
  private message: string;
  private noMoreTime = false;
  private started = false;

  intervalId = 0;
  DEFAULT:string = "--:--";
  restartClickStream
  countdownStream;

  public timer$:any ; //this.timer.asObservable()
  private restartSub = new Subject<any>();

  constructor(){
    let now = moment();
    this.future =  now.add(20, 'minutes').toDate();
    this.timer$ = Observable.interval(100).map((x) => {
        if(this.started && this.future){
          this.diff = Math.floor((this.future.getTime() - new Date().getTime()) / 1000);
          return  this.dhms(this.diff);
        }
        return this.DEFAULT
      });
      }
      getRestartEvent(): Observable<any> {
              return this.restartSub.asObservable();
          }




  ngAfterViewInit(){
  }

    start() {
        this.started = true;
    }
    stop()  {
        this.started = false;
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
            this.restartSub.next({ text: minutes });
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
