import {
  Component,
  ElementRef,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  Input
} from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-registered",
  templateUrl: "./registered.component.html"
})
export default class RegisteredComponent {
  @Input() candidate;
  @Output() onCandidateLogout = new EventEmitter();

  constructor(private router: Router) {}

  refresh(candidate) {
    this.candidate = candidate;
  }
  //  private restartSub = new Subject<any>();
  logout() {
    this.candidate = false;
    localStorage.removeItem("user");
    this.router.navigate(["/login"]);
  }
}
