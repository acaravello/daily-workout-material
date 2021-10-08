import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  trainingActive: boolean = false;
  trainingValue = "";

  constructor() { }

  ngOnInit() {
  }

  onNewTrainingStarted(training) {
    this.trainingValue = training;
    this.trainingActive = true;
  }

  onTrainingStopped() {
    this.trainingActive = false;
  }

}
