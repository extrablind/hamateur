import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export default class QuestionComponent {

    public datas
    public questions
    public next:boolean= true
    public previous:boolean= true
    public selected=0
    public countAnsweredQuestions={
      'legal' : 0 ,
      'technical' : 0
    }
    public step:string='legal'
    public score=0
    public passing=false
    public isLoading = false;
    public answered={}
    private originalQuestionsData;

    @Output() onExamIsEnded     = new EventEmitter();
    @Output() onChangeStep  = new EventEmitter();
    
    constructor(datas:DataService) {
      this.datas = datas
    }

    public endExamEmitter(){
      console.log("Exam is ended. Starting emitter ")
    }

    async ngOnInit(){
        this.isLoading = true
        var questions;
        if(typeof this.answered[this.step] !== 'undefined'){
          questions = this.answered[this.step];
        }else{
          var questions = await this.datas.getQuestions();
          this.questions = questions[this.step]
          this.originalQuestionsData = questions
        }
        this.refreshNavigationStatus()
        this.isLoading = false;
    }

    async correct(){
      this.isLoading = true;
      var data =   await this.datas.correct(this.questions);
      this.score = data.score
      this.passing = data.passing
      this.isLoading = false;
    }

    reInitCurrentChoice(){
      this.questions[this.selected].choices.map(function(obj){
          obj.selected = false;
      })
    }

    changeStep(toStep){
      this.answered[this.step] = this.questions;
      if(toStep === 'end'){
        this.onExamIsEnded.emit(this.answered);
        localStorage.setItem('examStatus', 'ended');
        return;
      }
      // Already done, reload old
      if(typeof this.answered[toStep] !== 'undefined'){
        this.questions = this.answered[toStep];
      }else{
        this.questions = this.originalQuestionsData[toStep];
      }
      this.previous = false
      this.next = true
      this.step = toStep
      this.selected = 0
      this.score = 0

    }
      isAnswered(question){
        for (let i = 0; i < question.choices.length ; i++) {
          if(question.choices[i].selected){
            return true;
          }
        }
        return false;
      }

     answer(event, index){
       var previousChoice = this.questions[this.selected].choices[index].selected ;
       var wasAnswered = this.isAnswered(this.questions[this.selected]);
       this.reInitCurrentChoice();
       this.questions[this.selected].choices[index].selected = !previousChoice;
       if(!previousChoice && !wasAnswered){
         this.questions[this.selected].answered = true
         this.countAnsweredQuestions[this.step]++
       }else if(wasAnswered && !this.questions[this.selected].choices[index].selected){
          this.countAnsweredQuestions[this.step]--
          this.questions[this.selected].answered = false
        }

    }

   refreshNavigationStatus(){
     this.next = true;
     this.previous = true;

     if(this.questions.length -1 === this.selected){
       this.next = false;
     }else if(this.selected === 0){
       this.previous = false;
     }
   }

   nextQuestion(event) {
      if(this.selected < this.questions.length-1){
          this.selected++;
      }
      this.refreshNavigationStatus()
   }


   previousQuestion(event) {
       if(this.selected > 0){
         this.selected--;
       }
       this.refreshNavigationStatus()
    }

    changeQuestion(event, index){
        if(index <= this.questions.length && index >= 0){
          this.selected = index;
        }
        this.refreshNavigationStatus()
    }

}
