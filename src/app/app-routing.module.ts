import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListPageComponent} from './components/list/list-page/list-page.component';
import {AddSectionComponent} from './components/add-section/add-section.component';
import {AddPositionComponent} from './components/add-position/add-position.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';


const routes: Routes = [
  { path: 'list', component: ListPageComponent },
  { path: 'add-section', component: AddSectionComponent },
  { path: 'add-position', component: AddPositionComponent },
  { path: '',   redirectTo: '/list', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
