import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
})
export default class QuestionComponent {

    public datas;
    public questions;
    public next:boolean= true;
    public previous:boolean= true;
    public selected=0
    public countAnsweredQuestions=0

    @Output() nextQuestionClick = new EventEmitter();
    @Output() previousQuestionClick = new EventEmitter();

    constructor(datas:DataService) {
      this.datas = datas
    }

    async ngOnInit(){
        this.questions = await this.datas.getQuestions();
        this.refreshNavigationStatus()
    }

    reInitCurrentChoice(){
      this.questions[this.selected].choices.map(function(obj){
          obj.selected = false;
      })
    }

      isAnswered(question){
        console.log('------------------------------');
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
         this.countAnsweredQuestions++
       }else if(wasAnswered && !this.questions[this.selected].choices[index].selected){
          this.countAnsweredQuestions--
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
