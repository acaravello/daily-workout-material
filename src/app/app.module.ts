import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';
import { MainMenuComponent } from './navigation/main-menu/main-menu.component';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { TrainingService } from './training/training.service';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule} from "@angular/fire/firestore";
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/spinner/shared.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/app.reducer';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    SidenavComponent,
    MainMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AuthModule,
    SharedModule,
    StoreModule.forRoot(reducers),
  ],
  exports: [],
  providers: [AuthService, AuthGuard, TrainingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
