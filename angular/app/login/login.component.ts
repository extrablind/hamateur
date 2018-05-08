import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    error = '';

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService) { }

    ngOnInit() {
        // Reset
        this.authenticationService.logout();
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.email, this.model.password)
            .subscribe(result => {
                console.log("auth service sub returns")
                console.log(result);
                this.loading = false;
                if (!result) {
                    this.error = 'Email ou mot de passe incorrect';
                    return
                }
                this.router.navigate(['/exam']);
                return
            });
    }
}
