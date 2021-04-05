import { Injectable } from '@angular/core';
import { element } from '@angular/core/src/render3';
import { SudokuCell } from './model/sudoku-cell';

@Injectable({
  providedIn: 'root'
})
export class SudokuHelperService {

  private static DIMENSION_3_SYMBOLS : string = "_123456789";
  private static DIMENSION_4_SYMBOLS : string = "_0123456789ABCDEF";

  private cellAssignmentMap = new Map();

  private currentlySelecting : SudokuCell;

  constructor() { }

  public getCurrentlySelecting() : SudokuCell {
    return this.currentlySelecting;
  }

  public setCurrentlySelecting( cell : SudokuCell ) {
    this.currentlySelecting = cell;
  }

  public setCellToValue( cell : SudokuCell, value : number ) : void {
    this.cellAssignmentMap.set( `${cell.outer}_${cell.inner}`, value );
  }

  public getCellValue( cell : SudokuCell ) : number {
    return this.cellAssignmentMap.get( `${cell.outer}_${cell.inner}` );
  }

  public getCandidatesForCell( cell : SudokuCell, dimension : number ) : number[] {
    let total : number[];
    for( let i = 1; i <= dimension; i++ ) {
      for( let j = 1; j <= dimension; i++ ) {
        total.push( (i-1)*dimension + j );
      }
    }
    let siblings : SudokuCell[] = this.getSiblings( cell, dimension );
    let alreadytaken = new Set();
    siblings.forEach( (elt) => {
      if ( this.cellAssignmentMap.has(`${elt.outer}_${elt.inner}`) ) {
        alreadytaken.add(this.cellAssignmentMap.get(`${elt.outer}_${elt.inner}`) );
      }
    } );
    let permissible : number[] = total.filter( (x) => !alreadytaken.has(x) );
    return permissible;
  }

  public getSiblings(cell : SudokuCell, dimension : number) : SudokuCell[] {
    console.log(`Cell: ${cell}`)
    let siblings : SudokuCell[] = [];
    // vertical
    //console.log('Vertical axis')
    let outerSiblingsV : number[] = [];
    for (let i = 1; i <= dimension * dimension; i++) {
      if (cell.outer != i && cell.outer % dimension == i % dimension) {
        outerSiblingsV.push(i);
      }
    }
    let innerSiblingsV : number[] = [];
    for (let i = 1; i <= dimension * dimension; i++) {
      if (cell.inner % dimension == i % dimension) {
        innerSiblingsV.push(i);
      }
    }
    for (let i = 0; i < outerSiblingsV.length; i++) {
      for (let j = 0; j < innerSiblingsV.length; j++) {
        siblings.push({ outer: outerSiblingsV[i], inner: innerSiblingsV[j] });
      }
    }
    // horizontal
    //console.log('Horizontal axis')
    var outerSiblingsH : number[] = [];
    for (let i = 1; i <= dimension * dimension; i++) {
      if (
        cell.outer != i &&
        Math.floor((cell.outer - 1) / dimension) ==
          Math.floor((i - 1) / dimension)
      ) {
        outerSiblingsH.push(i);
      }
    }
    var innerSiblingsH : number[] = [];
    for (let i = 1; i <= dimension * dimension; i++) {
      if (
        Math.floor((cell.inner - 1) / dimension) ==
        Math.floor((i - 1) / dimension)
      ) {
        innerSiblingsH.push(i);
      }
    }
    for (let i = 0; i < outerSiblingsH.length; i++) {
      for (let j = 0; j < innerSiblingsH.length; j++) {
        siblings.push({ outer: outerSiblingsH[i], inner: innerSiblingsH[j] });
      }
    }
    // major cell siblings
    //console.log('Major cell axis')
    for (let i = 1; i <= dimension * dimension; i++) {
      if (i != cell.inner) {
        siblings.push({ outer: cell.outer, inner: i });
      }
    }
    return siblings;
  }

  getSymbolForNumber( n : number, dimension : number ) : string {
    if ( n == null ) {
      return "&nbsp;"
    } else {
      switch ( dimension ) {
        case 3 :
          //console.log("Dimension 3");
          return SudokuHelperService.DIMENSION_3_SYMBOLS.charAt(n);
        case 4 :
          //console.log("Dimension 4 " + SudokuHelperService.DIMENSION_4_SYMBOLS.charAt(n));
          return SudokuHelperService.DIMENSION_4_SYMBOLS.charAt(n);
      }
      return `${n}`;
    }
  }
}
