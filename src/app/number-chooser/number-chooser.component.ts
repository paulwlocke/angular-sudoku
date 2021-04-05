import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { CellAssignment } from '../model/cell-assignment';
import { SudokuCell } from '../model/sudoku-cell';
import { SudokuHelperService } from '../sudoku-helper.service';

@Component({
  selector: 'app-number-chooser',
  templateUrl: './number-chooser.component.html',
  styleUrls: ['./number-chooser.component.css']
})
export class NumberChooserComponent implements OnInit {
  @Input("cell")
  cell: SudokuCell;

  @Input("choose-from")
  chooseFrom: number[];

  @Input("dimension")
  dimension: number;

  @Output('assign-to-cell') cellAssignmentEvent = new EventEmitter<CellAssignment>();

  chosenNumber: number;

  selectionType: string = "SURE";

  constructor(private sudokuHelperService : SudokuHelperService) {}

  ngOnInit() {}

  generateArray(): number[] {
    let result: number[] = [];
    for (let i = 1; i <= this.dimension; i++) {
      result.push(i);
    }
    return result;
  }

  getSymbolForNumber(n : number) : string {
    return this.sudokuHelperService.getSymbolForNumber(n, this.dimension);
  }

  chooseNumber(x : number): void {
    this.chosenNumber = x;
    console.log(
      `Selected number ${this.chosenNumber}, selection type: ${
        this.selectionType
      }`
    );
    let cell : SudokuCell = { outer : this.cell.outer, inner : this.cell.inner };
    let cellValue : number = this.chosenNumber;
    let cellAssignment = new CellAssignment(cell, cellValue);
    this.cellAssignmentEvent.emit(cellAssignment);
  }


}
