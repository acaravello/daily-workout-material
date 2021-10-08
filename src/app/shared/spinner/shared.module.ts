import { NgModule } from "@angular/core";
import { FormatDatePipe } from "src/app/pipes/formatDate.pipe";
import { SpinnerComponent } from "./spinner.component";

@NgModule({
    declarations: [
        SpinnerComponent, 
        FormatDatePipe
    ],
    exports: [
        SpinnerComponent,
        FormatDatePipe
    ]
})
export class SharedModule {

}