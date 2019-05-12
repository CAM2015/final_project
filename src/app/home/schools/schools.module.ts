import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SchoolsPage } from './schools.page';
// import { FavoriteStore } from 'src/app/shared/school-favorite.store';

const routes: Routes = [
  {
    path: '',
    component: SchoolsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SchoolsPage]
})
export class SchoolsPageModule {}
