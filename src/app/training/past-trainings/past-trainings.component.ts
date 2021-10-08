import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { MatSort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { DeleteTrainingDialog } from './delete-training-dialog/delete-training.dialog';
import * as fromTraining from "../../store/training.reducer";
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit{

  pastExercises: Exercise[];
  displayedColumns = ['name', 'duration', 'calories', 'date', 'state', 'delete'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private trainingService: TrainingService, private dialog: MatDialog, private store: Store<fromTraining.State>) { }

  ngOnInit() {
    this.trainingService.getExercisesHistory();
    this.store.select(fromTraining.getTrainingState).pipe(map(data => data.pastExercises)).subscribe(data => {
      this.pastExercises = data;
      this.dataSource.data = this.pastExercises;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  filterData(event) {
    const filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onOpeningDeleteDialog(training) {
    const dialogRef = this.dialog.open(DeleteTrainingDialog, {
      width: '500px',
      data: { training: training }
    });

    dialogRef.afterClosed().subscribe(response => {
      if(response) {
        this.trainingService.deleteExercise(training.id);
      }
    });
  }

} 