import { Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import Candidate from '../candidate/candidate.component';
import Countdown from '../countdown/countdown.component';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})

export default class ExamComponent   {
  @Input() candidate:Candidate;
  @Input() countdown:Countdown;
  @Output() onExamBegin = new EventEmitter();
  @Output() onExamEnd = new EventEmitter();
  @Output() onChangeStep = new EventEmitter();
  @Output() onExamStatusChanged = new EventEmitter();
  // All mode for current exam
  public time:any = new Date();
  public status:string = "pending";
  // real or free
  public mode:string = 'real';
  private api;
  public timer;

  async ngOnInit(){
    /*
    var status = localStorage.getItem("examStatus");
    if(status){
      this.status = status
    }
    */
  }

    constructor( private data:DataService) {
      this.api = data;
    }

    changeStep(step){
      console.log("Changing state from exam")
      this.onChangeStep.emit(step);
    }

  async save(parts){
    console.log("Exam ended, save answers")
    this.setStatus('ended')
    var exam    = await this.api.saveExam({parts: parts, candidate : this.candidate});
  }

  setStatus(status){
    this.status = status
    console.log("Exam changed status to : " + this.status)
    localStorage.setItem('examStatus', this.status);
    switch (status){
      case 'started' :
        this.onExamBegin.emit();
        break;
      case 'ended' :
      console.log("will emit stop event");
        this.onExamEnd.emit();
        break;
      }
  }

  start(){
    this.setStatus('started')
  }

}
