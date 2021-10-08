import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as fromTraining from "../../store/training.reducer";
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  @Output() newTrainingStarted = new EventEmitter<string>();
  optionSelected: boolean = false;
  optionSelectedValue = "";
  exercises: any[] = [];
  availableExercises$: Observable<Exercise[]>

  constructor(private store: Store<fromTraining.State>, private trainingService: TrainingService ) { }

  ngOnInit() {
    this.trainingService.getExercises()
    this.availableExercises$ = this.store.select('training').pipe(map(data => data.availableExercises));
  }

  startNewTraining() {
    this.store.dispatch({type: fromTraining.SET_ACTIVE_TRAINING, payload: this.optionSelectedValue})
    this.newTrainingStarted.emit(this.optionSelectedValue);
  }

  onSelectionChange(event) {
    this.optionSelected = true;
    this.optionSelectedValue = event.value;
  }

}
