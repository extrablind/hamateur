import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
})

export default class CandidateComponent {
  public name:any;
  public isRegistered:boolean =false;
  public uuid:any;
  public dataService;
  public newCandidateForm;
  public retrieveCandidateForm;
  public formGroup:FormGroup;
  public isLoading:boolean = true;
  public errors = {
    noCandidateFound :false,
    candidateNotFound :false
  };

  @Output() onCandidateChange = new EventEmitter();
  @Input() candidate;

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

  retrieveFormIsInvalid(){
    return (!this.retrieveCandidateForm.controls['uuid'].valid  || this.errors.noCandidateFound) && this.retrieveCandidateForm.controls['uuid'].touched;
  }


    async newCandidate(name){
        var candidate = await this.dataService.createCandidate(name);
        localStorage.setItem('candidate', candidate.uuid);
        if(!candidate){
          return;
        }
        this.candidate = candidate;
        this.candidate.isRegistered = true;
        this.candidate.created = true;
        console.log("emittedCandidateCreationEvent" )
        this.onCandidateChange.emit(candidate)
      }

    async submitRetrieveCandidate(candidate){
      var c = await this.dataService.getCandidate(candidate.uuid);
      console.log(c)
      if(null === c){
        this.errors.noCandidateFound = true;
        return;
      }
      this.candidate = c;
      this.candidate.isRegistered = true;
      this.candidate.new = false;
      this.onCandidateChange.emit(this.candidate)

    }


}
