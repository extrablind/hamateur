import { Component, OnInit, Input } from '@angular/core';
import Candidate from '../candidate/candidate.component';

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
  public part:number = 1;
  // real or free
  public mode:string = 'real';

  constructor() {

  }
  async ngOnInit(){
    var status = localStorage.getItem("examStatus");
    if(status){
      this.status = status
    }
  }

  start(mode){
    this.mode = mode;
    this.status = 'started'
    localStorage.setItem('examStatus', this.status);
  }

  changeMode(){

  }

  getQuestions(){

  }

  getAllStatus(){
    return this.status;
  }
  getAllPart(){
    return this.part;
  }





}
