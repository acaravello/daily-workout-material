import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'first';
  @ViewChild('sidenav', {static: false}) sidenav;

  onToggle() {
    this.sidenav.toggle();
  }
}
