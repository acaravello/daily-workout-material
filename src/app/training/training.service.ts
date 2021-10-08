
import { AngularFirestore } from "@angular/fire/firestore";
import { Exercise } from "./exercise.model";
import { map } from "rxjs/operators"
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromTraining from "../store/training.reducer"
import { Subscription } from "rxjs";
@Injectable()
export class TrainingService {

    private availabeExercises: Exercise[] = [];
    private activeExercise: Exercise;
    private pastExercises: Exercise[] = [];
    private allSubscriptions: Subscription[] = [];

    constructor(private firestore: AngularFirestore, private store: Store<fromTraining.State>) {}

    async getExercises() {
        const exerciseSubscription = await this.firestore.collection('availableExercises')
        .snapshotChanges().pipe(map(docArray=> {
          return docArray.map(doc => {
            return {
              id: doc.payload.doc.id,
              name: doc.payload.doc.data()['name'],
              duration: doc.payload.doc.data()['duration'],
              calories: doc.payload.doc.data()['calories']
            }
          })
        })).subscribe((payload: Exercise[]) => {
            this.store.dispatch({type: fromTraining.SET_AVAILABLE_TRAININGS, payload: payload });
            this.availabeExercises = payload;
            this
        }, error => {
            console.log("get exercise error");
            console.log(error);
        });
        this.allSubscriptions.push(exerciseSubscription);
    }

    setActiveExercise(exerciseId: string) {
        this.activeExercise = this.availabeExercises.find(el => el.id === exerciseId);
    }

    getActiveExercise() {
        return this.activeExercise;
    }

    storeExercise(exercise: Exercise) {
        this.addDataToDb({...exercise, date: new Date(), state: 'completed'});
    }

    storeCancelledExercise(exercise: Exercise, timeCancelled ) {
        this.addDataToDb({...exercise, date: new Date(), state: 'cancelled', duration: exercise.duration * (timeCancelled / 100), calories: exercise.calories * (timeCancelled / 100) });
    }

    async getExercisesHistory() {
        const historySubscription = await this.firestore.collection('exercisesHistory').snapshotChanges().pipe(map(docArray => {
            return docArray.map(doc => {
                return {
                    id: doc.payload.doc.id,
                    name: doc.payload.doc.data()['name'],
                    duration: doc.payload.doc.data()['duration'],
                    calories: doc.payload.doc.data()['calories'],
                    state: doc.payload.doc.data()['state'],
                    date: doc.payload.doc.data()['date'],
                }
            })
        })).subscribe((payload: Exercise[]) => {
            this.pastExercises = payload;
            this.store.dispatch({ type: fromTraining.SET_PAST_TRAININGS, payload: this.pastExercises });
        }, error => {
            console.log("exercise history error");
            console.log(error);
        })
        this.allSubscriptions.push(historySubscription);
    }

    deleteExercise(exerciseId) {
        this.firestore.doc(`exercisesHistory/${exerciseId}`).delete();
    }

    clearOnLogout() {
        this.store.dispatch({ type: fromTraining.SET_AVAILABLE_TRAININGS, payload: [] });
        this.store.dispatch({ type: fromTraining.SET_PAST_TRAININGS,  payload: [] });
        this.allSubscriptions.forEach(sub => sub.unsubscribe());
    }

    private addDataToDb(exercise: Exercise) {
        this.firestore.collection('exercisesHistory').add(exercise);
    }


}