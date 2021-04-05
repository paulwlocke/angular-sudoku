import { SudokuCell } from "./sudoku-cell";

export class CellAssignment {
    cell : SudokuCell;
    value : number;

    constructor( cell : SudokuCell, value : number ) {
        this.cell = cell;
        this.value = value;
    }
}