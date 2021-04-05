import { Component, Input, OnInit } from '@angular/core';
import { CellAssignment } from '../model/cell-assignment';
import { PuzzleMode } from '../model/puzzle-mode';
import { SudokuCell } from '../model/sudoku-cell';
import { SudokuHelperService } from '../sudoku-helper.service';

@Component({
  selector: 'app-sudoku-grid',
  templateUrl: './sudoku-grid.component2.html',
  styleUrls: ['./sudoku-grid.component.css']
})
export class SudokuGridComponent implements OnInit { 

  @Input('dimension') gridDimension : number;

  private mode: PuzzleMode;

  private currentlySelected : SudokuCell;// = { outer : 9, inner : 5 };

  private cellMap = new Map();

  private assignmentHistory : CellAssignment[] = [];

  constructor(private sudokuHelperService : SudokuHelperService) { 
    // When we start we are in SETUP mode
    this.mode = PuzzleMode.SETUP;
    /*
    Some initialisations for testing purposes. Remove eventually
    this.cellMap.set('5_5', 7);
    this.cellMap.set('9_4', 2);
    this.cellMap.set('9_1', 6);
    */
  }

  ngOnInit() {
  }

  generateArray() : number[] {
    let result : number[] = [];
    for( let x = 1; x <= this.gridDimension; x++ ) {
      result.push(x);
    }
    return result;
  }

  generateArray2() : number[] {
    let result : number[] = [];
    for( let x = 1; x <= this.gridDimension * this.gridDimension; x++ ) {
      result.push(x);
    }
    return result;
  }

  cellAssignment(e) : void {
    console.log( e );
    let selectedCell = e.cell;
    this.currentlySelected = e.cell;
    console.log( selectedCell );
    let siblings : SudokuCell[] = this.sudokuHelperService.getSiblings( selectedCell, this.gridDimension );
    console.log('Siblings: ' + JSON.stringify(siblings));
    console.log(`Number of siblings ${siblings.length}`);
  }

  foo(e) : void {
    console.log(e);
    if ( this.mode == PuzzleMode.SETUP ) {
      this.mode = PuzzleMode.SOLVE;
    } else {
      this.mode = PuzzleMode.SETUP;
    }
  }

  isCellSelected( outer : number, inner : number ) : boolean {
    if ( this.currentlySelected ) {
      return outer == this.currentlySelected.outer && inner == this.currentlySelected.inner;
    } else {
      return false;
    }    
  }

  selectCell( outer : number, inner : number ) : void {
    console.log(`Selecting: (${outer}, ${inner})`);
    if ( this.currentlySelected == undefined ) {
      this.currentlySelected = new SudokuCell();
    }
    this.currentlySelected.outer = outer;
    this.currentlySelected.inner = inner;
    let siblings : SudokuCell[] = this.sudokuHelperService.getSiblings( this.currentlySelected, this.gridDimension );
    console.log('Siblings: ' + JSON.stringify(siblings));
  }

  getCellValue(outer : number, inner : number) : number {
    return this.cellMap.get(`${outer}_${inner}`);    
  }

  getCellSymbol(outer : number, inner : number ) : string {
    return this.sudokuHelperService.getSymbolForNumber(this.cellMap.get(`${outer}_${inner}`), this.gridDimension);
  }

  isCellAssigned(outer : number, inner : number) : boolean {
    return this.cellMap.has(`${outer}_${inner}`)
  }

  getCellCandidates( outer : number, inner : number ) : number[] {
    let cell = new SudokuCell();
    cell.outer = outer;
    cell.inner = inner;
    let siblings : SudokuCell[] = this.sudokuHelperService.getSiblings( cell, this.gridDimension );
    let numbers = this.generateArray2();
    let taken : number[] = [];
    siblings.forEach( sib => { 
      if (this.cellMap.has(`${sib.outer}_${sib.inner}`)) {
        taken.push(this.cellMap.get(`${sib.outer}_${sib.inner}`)) };
      } );
    return numbers.filter( x => !taken.includes(x));
  }

  assignValue( e ) {
    console.log('Received event ' + JSON.stringify(e));
    this.cellMap.set(`${e.cell.outer}_${e.cell.inner}`, e.value);
    let cell = e.cell;
    this.assignmentHistory.push( new CellAssignment(cell, e.value) );
  }

  undoLastAssignment() : void {
    let a = this.assignmentHistory[this.assignmentHistory.length-1];
    this.assignmentHistory.pop();
    this.cellMap.delete(`${a.cell.outer}_${a.cell.inner}`);
  }

}
