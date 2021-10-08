import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { TrainingService } from "../training/training.service";
import { AuthData } from "./auth-data.model";
import * as fromRoot from "../store/app.reducer";
import { Store } from "@ngrx/store";
import { SET_AUTHENTICATED, SET_UNAUTHENTICATED } from "../store/auth.reducer";

export class AuthService {

    private userAuthenticated: boolean;

    constructor(private router: Router, private fireAuth: AngularFireAuth, 
        private trainingService: TrainingService, private store: Store<fromRoot.State>) {}

    async registerUser(authData: AuthData) {
        const response = await this.fireAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
        .then(result => {
            this.store.dispatch({ type: SET_AUTHENTICATED });
            this.userAuthenticated = true;
            this.router.navigate(['']);
            return null;
        }).catch(err => {
            console.log("error in registering the user");
            console.log(err);
            return err;
        });
        return response;
    }

    async login(authData: AuthData) {
            const response = await this.fireAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
            .then(response => {
                this.userAuthenticated = true;
                this.store.dispatch({ type: SET_AUTHENTICATED });
                this.router.navigate(['']);
                return null;
            }).catch(err => {
                console.log("error in singing-in");
                console.log(err);
                return err;
            });
            return response;
    }

    logout() {
        this.userAuthenticated = false;
        this.trainingService.clearOnLogout();
        this.fireAuth.auth.signOut();
        this.store.dispatch({ type: SET_UNAUTHENTICATED });
        this.router.navigate(['/login'])
    }

    isAuth() {
        return this.userAuthenticated;
    }
}