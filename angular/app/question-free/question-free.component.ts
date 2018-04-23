import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { TimerService } from '../services/timer.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-question-free',
  templateUrl: './question-free.component.html',
  styleUrls: ['./question-free.component.css']
})
export default class QuestionFreeComponent {

    public datas
    public question
    public next:boolean= true
    public isLoading = false
    public answered={}
    public selected=0
    public countAnsweredQuestions=0
    private timer
    public restartSub
    public isCorrected = false
    public correction
    public stats = {
      counter               : 0,
      nbBadAnswers          : 0,
      nbGoodAnswers         : 0,
      nbAnswered            : 0,
      nbNotAnswered         : 0,
      percentageGoodAnswers : 0 ,
      percentageAnswered    : 0

    }


    @Output() onExamIsEnded     = new EventEmitter()
    @Output() onExamIsStarted   = new EventEmitter()
    @Output() onChangeStep      = new EventEmitter()

    constructor(datas:DataService , private timerSrv:TimerService) {
      this.datas = datas
    //  this.restartSub = this.timerSrv.getRestartEvent().subscribe(message => { console.log(message) });
    }
    async ngOnInit(){
        await this.loadNextQuestion()
    }

    end(){
      console.log("end");
    }

  async nextQuestion(event) {
    if(!this.isCorrected){
      return
    }
    this.stats.counter++
    await  this.loadNextQuestion()
    this.isCorrected = false;
    }

  async  loadNextQuestion(){
      this.isLoading = true
      var  q  = await this.datas.getQuestion(1);
      this.question = q
      this.isLoading = false;
      this.updateStats();
    }


    updateStats(){
      (this.correction.isGoodAnswer) ? this.stats.nbGoodAnswers++ : this.stats.nbBadAnswers++;
      (this.correction.isAnswered) ? this.stats.nbAnswered++ : this.stats.nbNotAnswered++;

      let answered = (this.stats.nbAnswered / this.stats.counter) *100;
      let good = (this.stats.nbGoodAnswers / this.stats.counter) *100;

      this.stats.percentageGoodAnswers  = Math.ceil(good)
      this.stats.percentageAnswered     = Math.ceil(answered)
    }

    async correct(){
      if(this.isCorrected){
        return;
      }
      this.isLoading = true;
      this.correction = await this.datas.correctQuestion(this.question);
      this.isCorrected = true;
      this.isLoading = false;
    }



      isAnswered(question){
        for (let i = 0; i < question.choices.length ; i++) {
          if(question.choices[i].selected){
            return true;
          }
        }
        return false;
      }

      reInitCurrentChoice(){
        this.question.choices.map(function(obj){
            obj.selected = false;
        })
      }

     answer(event, index){
       var previousChoice = this.question.choices[index].selected ;
       var wasAnswered = this.isAnswered(this.question);
       this.reInitCurrentChoice();
       this.question.choices[index].selected = !previousChoice;
       if(!previousChoice && !wasAnswered){
         this.question.answered = true
       }else if(wasAnswered && !this.question.choices[index].selected){
          this.question.answered = false
        }
    }



    changeQuestion(event, index){
          this.selected = index;
    }

}

