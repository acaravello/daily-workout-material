import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Store } from '@ngrx/store';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromTemplate from "../../store/template.reducer"
import * as fromRoot from "../../store/app.reducer";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]],
    birthdate: [null, [Validators.required]],
    acceptTerms: [false, [Validators.required, Validators.requiredTrue]]
  })

  error = null;
  isLoading$:Observable<boolean>;

  constructor( private formBuilder: FormBuilder, private authService: AuthService, 
              private snackbar: MatSnackBar, private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.error = null;
  }

 async onFormSubmit(formData: any, formDirective: FormGroupDirective) {
   this.isLoading$ = this.store.select(fromRoot.getTemplateState).pipe(map(data => data.isLoading));
    this.store.dispatch({ type: fromTemplate.START_LOADING })
    const userData = {...this.signupForm.value};
    formDirective.resetForm();
    this.signupForm.reset();
    const errorResponse = await this.authService.registerUser({ email: userData.email, password: userData.password });
    this.store.dispatch({ type: fromTemplate.STOP_LOADING});
    if(errorResponse) {
      this.error = errorResponse.message;
      this.snackbar.open(this.error, null, {
        duration: 3000
      })
    }
  }

}
