import { Component, OnInit, Input, Output } from "@angular/core";
import { DataService } from "./services/data.service";
import { TimerService } from "./services/timer.service";
import * as moment from "moment";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  public title: string = "Hamateur";
  public view: string = "default";
  public candidate = null;
  public exam;
  public counter;
  public api;
  public timer;
  public counterIsUpdated;
  //
  public countdownSub;
  public apiGetUserSub;
  public percent;

  constructor(private data: DataService, private timerSrv: TimerService) {
    this.api = data;
    this.countdownSub = this.timerSrv.timer$.subscribe(timer => {
      this.timer = timer;
    });
    this.apiGetUserSub = this.api.getUser().subscribe(result => {
      this.candidate = result;
    });
  }

  ngOnDestroy() {
    this.apiGetUserSub.unsubscribe();
    this.countdownSub.unsubscribe();
  }

  async ngOnInit() {
    var token = localStorage.getItem("user.token");
    if (token) {
      this.candidate = await this.api.getUser();
      this.candidate.isRegistered = null !== this.candidate;
      return;
    }
  }

  refreshCandidate(candidate) {
    this.candidate = candidate;
    localStorage.setItem("candidate", this.candidate.username);
  }

  logout() {
    localStorage.removeItem("candidate");
    localStorage.removeItem("examStatus");
    localStorage.removeItem("user");
    this.candidate = false;
  }
}
