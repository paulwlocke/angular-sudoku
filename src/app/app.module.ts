import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SudokuGridComponent } from './sudoku-grid/sudoku-grid.component';
import { NumberChooserComponent } from './number-chooser/number-chooser.component';

@NgModule({
  declarations: [
    AppComponent,
    SudokuGridComponent,
    NumberChooserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
