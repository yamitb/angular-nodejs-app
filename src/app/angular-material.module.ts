import { NgModule } from "../../node_modules/@angular/core";
import { MatFormFieldModule } from '@angular/material/form-field';

import { 
  MatProgressSpinnerModule,
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatDialogModule,
  MatPaginatorModule,
} from '@angular/material';

@NgModule({
 exports: [
  MatFormFieldModule,
  MatProgressSpinnerModule,
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatDialogModule,
  MatPaginatorModule,
 ]
})

export class AngularMaterialModule{}