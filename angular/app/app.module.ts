import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { MatDialogModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// services
import { DataService } from './services/data.service';
import { TimerService } from './services/timer.service';
// components
import { AppComponent } from './app.component';
import  ExamComponent  from './exam/exam.component';
import  CandidateComponent  from './candidate/candidate.component';
import  QuestionComponent  from './question/question.component';
import  QuestionFreeComponent  from './question-free/question-free.component';
import  RegisteredComponent  from './registered/registered.component';

// Routes
const appRoutes: Routes = [
  { path: '',
     redirectTo: '/candidate',
     pathMatch: 'full',
     data: { title: 'Heroes List' }
   },
  { path: 'exam', component: ExamComponent },
  { path: 'questions', component: QuestionComponent },
  { path: 'candidate', component: CandidateComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ExamComponent,
    QuestionComponent,
    QuestionFreeComponent,
    CandidateComponent,
    RegisteredComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(   appRoutes,   { enableTracing: false } ),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
  ],
  providers: [
      DataService,
      TimerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
