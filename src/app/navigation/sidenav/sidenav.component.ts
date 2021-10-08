import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import * as fromRoot from "../../store/app.reducer";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

 @Output() mobileMenuToggle = new EventEmitter<void>();
 userIsLogged$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>, private authService: AuthService) { }

  ngOnInit() {
    this.userIsLogged$ = this.store.select(fromRoot.getAuthState).pipe(map(data => data.isAuthenticated));
  }

  onToggle() {
    this.mobileMenuToggle.emit();
  }

  onLogout() {
    this.authService.logout();
  }

}
