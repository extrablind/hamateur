import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import {HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { MatDialogModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// Services
import { DataService } from './services/data.service';
import { TimerService } from './services/timer.service';
// Components
import { AppComponent } from './app.component';
import  ExamComponent  from './exam/exam.component';
import  RegisterComponent  from './register/register.component';
import  QuestionComponent  from './question/question.component';
import  QuestionFreeComponent  from './question-free/question-free.component';
import  RegisteredComponent  from './registered/registered.component';
import { routing }        from './app.routing';
import { AuthGuard } from './_guards/index';
import { AuthenticationService, UserService } from './_services/index';
import { LoginComponent } from './login/index';

@NgModule({
  declarations: [
    AppComponent,
    ExamComponent,
    QuestionComponent,
    QuestionFreeComponent,
    RegisterComponent,
    RegisteredComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
  ],
  providers: [
      DataService,
      TimerService,
      AuthGuard,
      AuthenticationService,
      UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
