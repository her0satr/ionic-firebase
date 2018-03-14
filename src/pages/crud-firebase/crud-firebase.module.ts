import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CrudFirebasePage } from './crud-firebase';

@NgModule({
  declarations: [
    CrudFirebasePage,
  ],
  imports: [
    IonicPageModule.forChild(CrudFirebasePage),
  ],
})
export class CrudFirebasePageModule {}
