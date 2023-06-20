import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layouts/home/home.component';
import { ListComponent } from './pages/list/list.component';
import { ViewFileComponent } from './components/view-file/view-file.component';
import { DetailComponent } from './pages/detail/detail.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [
      {
        path: "",
        component: ListComponent
      },
      {
        path: "show/:id",
        component: DetailComponent
      }
    ]
  },
  {
    path: "view-file",
    component: ViewFileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
