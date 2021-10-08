import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'formatDate'
})

export class FormatDatePipe implements PipeTransform {
    transform(date) {
        return date.toDate().toLocaleString('en-US');
    }
}