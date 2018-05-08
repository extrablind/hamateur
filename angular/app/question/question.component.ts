import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { TimerService } from '../services/timer.service';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export default class QuestionComponent {

  public questions = []
  public next: boolean = true
  public previous: boolean = true
  public step: string = 'legal'
  public score = 0
  public passing = false
  public isLoading = false
  public answered = {}
  public selected = 0
  public countAnsweredQuestions = {
    'legal': 0,
    'technical': 0
  }
  public originalQuestionsData
  public datas
  public timer
  public restartSub
  public timeoutSub
  @Output() onExamIsEnded = new EventEmitter()
  @Output() onExamIsStarted = new EventEmitter()
  @Output() onChangeStep = new EventEmitter()

  constructor(
      datas: DataService, 
      private timerSrv: TimerService,         
      private router: Router  
    ) {
    this.datas = datas
    this.restartSub = this.timerSrv.getRestartEvent().subscribe(minutes => {});
    this.timeoutSub = this.timerSrv.getTimeOutEvent().subscribe(date => {
      if (this.step === 'legal') {
        this.restart(20);
        this.changeStep('technical', false);
        return;
      }
      this.end();
    });

  }

  restart(minutes) {
    this.timerSrv.restart(minutes);
  }

  async ngOnInit() {
    this.isLoading = true      ;
    var questions = await this.datas.getQuestions()
    this.questions = questions[this.step];
    this.originalQuestionsData = questions
    this.refreshNavigationStatus()
    this.restart(20);
    this.onExamIsStarted.emit(this.step);
    this.isLoading = false;
  }

  reInitCurrentChoice() {
    this.questions[this.selected].choices.map(function(obj) {
      obj.selected = false;
    })
  }

  end() {
    this.timerSrv.kill();
    this.onExamIsEnded.emit(this.answered);
    this.router.navigate(['/exam']);
    localStorage.setItem('exam.status', 'ended');
  }

  changeStep(toStep, doConfirm) {
    if (doConfirm) {
      if (!confirm("Passer à l'épreuve technique tout de suite ?\nVous ne pourrez pas revenir en arrière.")) {
        return
      }
    }
    this.answered[this.step] = this.questions;
    this.onChangeStep.emit(toStep);

    // Already done, reload old
    if (typeof this.answered[toStep] !== 'undefined') {
      this.questions = this.answered[toStep];
    } else {
      this.questions = this.originalQuestionsData[toStep];
    }
    this.previous = false
    this.next = true
    this.step = toStep
    this.selected = 0
    this.score = 0

  }
  isAnswered(question) {
    for (let i = 0; i < question.choices.length; i++) {
      if (question.choices[i].selected) {
        return true;
      }
    }
    return false;
  }

  answer(event, index) {
    var previousChoice = this.questions[this.selected].choices[index].selected;
    var wasAnswered = this.isAnswered(this.questions[this.selected]);
    this.reInitCurrentChoice();
    this.questions[this.selected].choices[index].selected = !previousChoice;
    if (!previousChoice && !wasAnswered) {
      this.questions[this.selected].answered = true
      this.countAnsweredQuestions[this.step]++
    } else if (wasAnswered && !this.questions[this.selected].choices[index].selected) {
      this.countAnsweredQuestions[this.step]--
      this.questions[this.selected].answered = false
    }

  }

  refreshNavigationStatus() {
    this.next = true;
    this.previous = true;

    if (this.questions.length - 1 === this.selected) {
      this.next = false;
    } else if (this.selected === 0) {
      this.previous = false;
    }
  }

  nextQuestion(event) {
    if (this.selected < this.questions.length - 1) {
      this.selected++;
    }
    this.refreshNavigationStatus()
  }


  previousQuestion(event) {
    if (this.selected > 0) {
      this.selected--;
    }
    this.refreshNavigationStatus()
  }

  changeQuestion(event, index) {
    if (index <= this.questions.length && index >= 0) {
      this.selected = index;
    }
    this.refreshNavigationStatus()
  }

  ngOnDestroy() {
    this.restartSub.unsubscribe();
    this.timeoutSub.unsubscribe();
  }

}

