import { Component, OnInit, Input, EventEmitter} from '@angular/core';
import Candidate from '../candidate/candidate.component';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})

export default class ExamComponent   {
  @Input() candidate:Candidate;

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

  async save(questions){
    console.log("Exam ended, save answers")
    var exam    = await this.api.saveExam({questions: questions, candidate : this.candidate});
    //var correct = await this.dataService.getScore(exam);
    console.log("CORRECT");
    console.log(exam);
  }

  start(mode){
    this.mode = mode;
    this.status = 'started'
    localStorage.setItem('examStatus', this.status);
  }

  updateStatus(status){
    this.status = status
    localStorage.setItem('examStatus', this.status);
  }

}
