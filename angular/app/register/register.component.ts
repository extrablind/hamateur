import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})

export default class RegisterComponent {
  public name: any;
  public isRegistered: boolean = false;
  public dataService;
  public loginForm;
  public registerForm;
  public formGroup: FormGroup;
  public isLoading: boolean = true;
  public errors = {
    noCandidateFound: false,
    candidateNotFound: false
  };

  @Output() onCandidateChange = new EventEmitter();
  @Input() candidate;

  onKey(event: any) {
    this.name = event.target.value;
  }

  constructor(private fb: FormBuilder, private datas: DataService, private router: Router) {
    this.dataService = datas;
    this.registerForm = fb.group({
      'username': [null, Validators.compose([
        Validators.required,
        Validators.minLength(4)
      ])],
      'email': [null, Validators.compose([
        Validators.required,
        Validators.email
      ])
      ],
      'password': [null, Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])
      ],
      'password-retype': [null, Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])
      ],
    })
    this.loginForm = fb.group({
      'email': [null, Validators.compose([
        Validators.required,
        Validators.email,
      ])],
      'password': [null, Validators.compose([
        Validators.required,
      ])],

    })
  }

  isValid(name){
    return this.registerForm.controls[name].valid 
  }

  isTouched(name){
    return this.registerForm.controls[name].touched
  }

  loginFormIsValid() {
    return this.loginForm.controls['email'].valid && this.loginForm.controls['email'].touched;
  }

  registerFormIsValid() {
    return this.registerForm.controls['username'].valid && this.registerForm.controls['email'].valid && this.registerForm.controls['password'].valid && this.registerForm.controls['password-retype'].valid;
  }


  async submitRegisterForm(form) {
    var user = await this.dataService.createUser(form);
    if (!user) {
      return;
    }
    localStorage.setItem('user.token', user.token);
    this.candidate = user;
    this.candidate.isRegistered = true;
    this.candidate.created = true;
    this.onCandidateChange.emit(user)
  }

  async submitLoginForm(form) {
    var login = await this.dataService.login(form);
    if (null === login) {
      this.errors.noCandidateFound = true;
      return;
    }    
    localStorage.setItem('user.token', login.infos.token);
    localStorage.setItem('user.logged', 'true');
    var user = await this.dataService.getUser();
    this.candidate = user;
    this.candidate.isRegistered = true;
    this.candidate.new = false;
    this.onCandidateChange.emit(this.candidate)
  }


}
