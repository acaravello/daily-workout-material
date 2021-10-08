import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../material.module";
import { SharedModule } from "../shared/spinner/shared.module";
import { CurrentTrainingComponent } from "./current-training/current-training.component";
import { TrainingDialog } from "./current-training/training-dialog/training.dialog";
import { NewTrainingComponent } from "./new-training/new-training.component";
import { DeleteTrainingDialog } from "./past-trainings/delete-training-dialog/delete-training.dialog";
import { PastTrainingsComponent } from "./past-trainings/past-trainings.component";
import { TrainingComponent } from "./training.component";
import { TrainingRoutingModule } from "./traning-routing.module";
import { StoreModule } from "@ngrx/store";
import { trainingReducer } from "../store/training.reducer";

@NgModule({
    declarations: [
        TrainingComponent,
        CurrentTrainingComponent,
        NewTrainingComponent,
        PastTrainingsComponent,
        TrainingDialog,
        DeleteTrainingDialog
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        SharedModule,
        TrainingRoutingModule,
        StoreModule.forFeature('training', trainingReducer)
    ],
    exports: [
        TrainingComponent,
        CurrentTrainingComponent,
        NewTrainingComponent,
        PastTrainingsComponent,
        TrainingDialog,
        DeleteTrainingDialog
    ],
    entryComponents: [TrainingDialog, DeleteTrainingDialog ],
})

export class TrainingModule {}