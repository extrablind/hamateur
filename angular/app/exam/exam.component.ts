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
  @Output() onExamStarts = new EventEmitter();
  @Output() onExamChangeStatus = new EventEmitter();

  // All mode for current exam
  public time:any = new Date();
  public status:string = "pending";
  // real or free
  public mode:string = 'real';
  private api;

  async ngOnInit(){
    var status = localStorage.getItem("examStatus");
    if(status){
      this.status = status
    }
  }

    constructor( private data:DataService) {
      this.api = data;
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
    this.onExamChangeStatus.emit(this.status)
  }

  start(){
    this.setStatus('started')
  }

}
