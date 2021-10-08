import { Component, Inject, OnInit,  } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";
import { Store } from "@ngrx/store";
import { map } from "rxjs/operators";
import  * as fromTraining from "../../../store/training.reducer"


@Component({
    selector: 'training-dialog',
    templateUrl: './training.dialog.html',
    styleUrls: ['./training.dialog.css']
})
export class TrainingDialog implements OnInit {

  exercise = "";
  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private store:Store<fromTraining.State>) {}

  ngOnInit(): void {
    this.store.select(fromTraining.getTrainingState).pipe(map(data => data.activeTraining)).subscribe(exercise => this.exercise = exercise.name)
  }
}
