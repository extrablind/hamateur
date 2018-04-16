import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
// components
import { AppComponent } from './app.component';
import  ExamComponent  from './exam/exam.component';
import  CandidateComponent  from './candidate/candidate.component';
import  QuestionComponent  from './question/question.component';
import  CountdownComponent  from './countdown/countdown.component';
import  RegisteredComponent  from './registered/registered.component';
// services
import { DataService } from './services/data.service';

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
    CandidateComponent,
    CountdownComponent,
    RegisteredComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(   appRoutes,   { enableTracing: false } ),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [
      DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
