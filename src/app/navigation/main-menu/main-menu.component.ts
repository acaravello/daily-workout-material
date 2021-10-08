import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromRoot from "../../store/app.reducer";
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  @Output() sidenavToggle = new EventEmitter<void>();

  userIsLogged$:Observable<boolean>;

  constructor(private store: Store<fromRoot.State>, private authService: AuthService) { }

  ngOnInit() {
    this.userIsLogged$ =  this.store.select(fromRoot.getAuthState).pipe(map(data => data.isAuthenticated));
  }

  onToggle() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.logout();
  }
}
