import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListPageComponent} from './components/list/list-page/list-page.component';
import {AddSectionComponent} from './components/add-section/add-section.component';
import {AddItemComponent} from './components/add-item/add-item.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {ItemsResolverService} from './services/items-resolver.service';


const routes: Routes = [
  {
    path: 'list',
    component: ListPageComponent,
    resolve: {
      items: ItemsResolverService
    }
  },
  { path: 'add-section', component: AddSectionComponent },
  { path: 'add-item', component: AddItemComponent },
  { path: '',   redirectTo: '/list', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
