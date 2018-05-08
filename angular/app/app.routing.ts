import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/index';
import { AuthGuard } from './_guards/index';

// components
import  ExamComponent  from './exam/exam.component';
import  RegisterComponent  from './register/register.component';
import  QuestionComponent  from './question/question.component';
import  QuestionFreeComponent  from './question-free/question-free.component';
import  RegisteredComponent  from './registered/registered.component';

// Routes
const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  // 
  { path: 'exam', component: ExamComponent , canActivate: [AuthGuard]},
  { path: 'question', component: QuestionComponent, canActivate: [AuthGuard] },
  { path: 'question-free', component: QuestionFreeComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'exam' }
];

export const routing = RouterModule.forRoot(appRoutes);
