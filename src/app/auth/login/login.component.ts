import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Store } from '@ngrx/store';
import { AuthService } from '../auth.service';
import * as fromTemplate from "../../store/template.reducer"
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromRoot from "../../store/app.reducer";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]],
  })

  error = null;
  isLoading$: Observable<boolean>;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, 
              private snackbar: MatSnackBar, private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.error = null;
  }

  async onFormSubmit(formData: any, formDirective: FormGroupDirective) {
    this.isLoading$ = this.store.select(fromRoot.getTemplateState).pipe(map(data => data.isLoading));
    this.store.dispatch({type: fromTemplate.START_LOADING});
    const userData = {...this.loginForm.value};
    formDirective.resetForm();
    this.loginForm.reset();
    const errorResponse = await this.authService.login({ email: userData.email, password: userData.password });
    this.store.dispatch({type: fromTemplate.STOP_LOADING});
    if(errorResponse) {
      this.error = errorResponse.message;
      this.snackbar.open(this.error, null, {
        duration: 3000
      });
    }
  }
}
