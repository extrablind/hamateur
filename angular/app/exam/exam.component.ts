import { Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import Candidate from '../candidate/candidate.component';
import { DataService } from '../services/data.service';
import { TimerService } from '../services/timer.service';
import { Observable, Subscription, BehaviorSubject } from 'rxjs/Rx';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})

export default class ExamComponent {
  public status: string = "pending";
  private timer
  private restarted
  public restartSub
  public countdownSub
  public mode

  @Input() candidate: Candidate;
  @Output() onExamIsStarted = new EventEmitter();
  @Output() onExamIsEnded = new EventEmitter();
  @Output() onChangeStep = new EventEmitter();
  @Output() onExamStatusChanged = new EventEmitter();

  constructor(private api: DataService, private timerSrv: TimerService) {
    this.restartSub = this.timerSrv.getRestartEvent().subscribe(message => { console.log(message) });
    this.countdownSub = this.timerSrv.timer$.subscribe(timer => { this.timer = timer });
  }

  restart(minutes) {
    this.timerSrv.restart(minutes);
  }
  ngOnDestroy() {
    this.restartSub.unsubscribe();
    this.countdownSub.unsubscribe()
  }

  changeStep(step) {
    this.onChangeStep.emit(step);
  }

  async save(parts) {
    this.end()
    var exam = await this.api.saveExam({ parts: parts, candidate: this.candidate });
  }

  setStatus(status) {
    this.status = status
    localStorage.setItem('exam.status', this.status);
  }

  end() {
    this.setStatus('ended')
    this.onExamIsEnded.emit();
  }

  start(mode) {
    this.mode = mode
    this.setStatus('started')
  }

}
