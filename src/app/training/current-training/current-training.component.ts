import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { TrainingDialog } from './training-dialog/training.dialog';
import * as fromTraining from "../../store/training.reducer";
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  @Output() trainingStopped = new EventEmitter<void>();
  @Input() training;
  
  trainingProgress = 0;
  timer;
  jobDone: boolean = false;
  trainingExecuted = "";
  currentExercise: Exercise = null;
  interval: number;

  constructor(private dialog: MatDialog, private trainingService: TrainingService, private store: Store<fromTraining.State>) { }

  ngOnInit() {
   this.trainingExecuted = this.training;
   this.store.select(fromTraining.getTrainingState).pipe(map(data => data.activeTraining)).subscribe(current => {
    if(!this.currentExercise) {
      this.currentExercise = current;
      this.interval = this.currentExercise.duration * 1000 / 100;
      this.startTraining();
    } 
   })
  }

  startTraining() {
    this.timer = setInterval(() => {
      if(this.trainingProgress < 100) {
         this.trainingProgress+= 1;
        //tmp
        // this.trainingProgress+= 20;
       
      } else {
        clearInterval(this.timer);
        this.jobDone = true;
        this.trainingService.storeExercise(this.currentExercise );
      }
    }, this.interval);
  }

  stopTraining() {
    clearInterval(this.timer);
    this.openDialog();
  }

  returnFromTraining() {
    this.jobDone = false;
    this.trainingStopped.emit();
  }

  cancelTraining() {
    console.log("cancelling training")
    this.jobDone = false;
    this.trainingService.storeCancelledExercise(this.currentExercise, this.trainingProgress );
    this.trainingStopped.emit();
  }

  openDialog() {
    const dialogRef = this.dialog.open(TrainingDialog, {
      width: '500px',
      data: { training: this.trainingExecuted }
    });

    dialogRef.afterClosed().subscribe(response => {
      if(response) {
        this.cancelTraining();
      } else {
        this.startTraining();
      }
    });
  }
}
