import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Sudoku Solver';
  dimension : number;
  description = 'This is where you will develop the sudoku helper tool.';
}
