import {NgModule} from '@angular/core';
import {MatButtonModule, MatDialogModule, MatIconModule, MatInputModule, MatTableModule, MatToolbarModule} from '@angular/material';

@NgModule(
  {
    imports: [MatToolbarModule, MatButtonModule, MatDialogModule, MatInputModule, MatTableModule, MatIconModule],
    exports: [MatToolbarModule, MatButtonModule, MatDialogModule, MatInputModule, MatTableModule, MatIconModule]
  })
export class AngularMaterialModule {

}
