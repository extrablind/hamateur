import { Component,  ElementRef, OnInit, OnDestroy, Output, EventEmitter, Input} from '@angular/core';

@Component({
    selector: 'app-registered',
templateUrl: './registered.component.html'
})
export default class RegisteredComponent {
  @Input() candidate;
  @Output() onCandidateLogout = new EventEmitter();

    refresh(candidate) {
      this.candidate = candidate
    }

    logout(){
      this.onCandidateLogout.emit(this.candidate)
    }

}