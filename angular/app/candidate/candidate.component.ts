import { Component, OnInit, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
})

export default class CandidateComponent {
  public candidate:any = false;
  public name:any;
  public isRegistered:boolean =false;
  public uuid:any;
  public dataService;
  public newCandidateForm;
  public retrieveCandidateForm;
  public formGroup:FormGroup;
  public isLoading:boolean = true;

  onKey(event: any) {
    this.name = event.target.value;
  }

  constructor(private fb : FormBuilder, private datas:DataService, private router: Router) {
    this.dataService = datas;
    this.newCandidateForm = fb.group({
        'name' : [null, Validators.compose ([
          Validators.required,
          Validators.minLength(4)
        ])
      ],
    })
    this.retrieveCandidateForm  = fb.group({
      'uuid' : [null, Validators.compose ([
        Validators.required,
        Validators.minLength(36),
        Validators.pattern('[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}'),
      ]) ]
    })
  }

    async ngOnInit(){
      var uuid = localStorage.getItem("candidate");
      if(uuid){
        this.candidate = await this.dataService.getCandidate(uuid);
        this.isRegistered = (null !== this.candidate);
      }
      this.isLoading = false;
    }

    async newCandidate(name){
        var candidate = await this.dataService.createCandidate(name);
        localStorage.setItem('candidate', candidate.uuid);
        this.isRegistered = true;

      }

    async retrieveCandidate(candidate){
      this.candidate = await this.dataService.getCandidate(candidate);
      this.isRegistered = (null !== this.candidate);

      if(this.isRegistered === null){
        alert("No candidate found, try again");
      }
    }


}
