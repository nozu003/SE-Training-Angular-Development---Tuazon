import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './filter/filter.pipe';
import { NumberPipe } from './filter/number.pipe';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FilterPipe, NumberPipe, PageNotFoundComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ],
  exports: [
    FilterPipe,
    NumberPipe,
    PageNotFoundComponent,
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ],
})
export class SharedModule {}
