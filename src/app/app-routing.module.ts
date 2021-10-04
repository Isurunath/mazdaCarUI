import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarListComponent } from './car-list/car-list.component';
import { CarAddComponent } from './car-add/car-add.component';
import { CarUpdateComponent } from './car-update/car-update.component';

const routes: Routes = [
  { path: '', redirectTo: 'carlist', pathMatch: 'full' },
  { path: 'carlist', component: CarListComponent },
  { path: 'caradd', component: CarAddComponent },
  { path: 'carupdate/:id', component: CarUpdateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
