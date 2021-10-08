import { Component, Inject, OnInit,  } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";
import { TrainingService } from "../../training.service";

@Component({
    selector: 'deletetraining-dialog',
    templateUrl: './delete-training.dialog.html',
    styleUrls: ['./delete-training.dialog.css']
})
export class DeleteTrainingDialog implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private data: any, private trainingService: TrainingService) {}

  ngOnInit(): void {
  }
}
