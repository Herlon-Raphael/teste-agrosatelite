import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component'
import { FarmComponent } from './farm/farm.component'
import { DashboardComponent} from './dashboard/dashboard.component'
import { registerFarm } from './registerFarm/registerFarm.component';
import { DetailsComponent } from './details/details.component';
import { editFarmComponent } from './editFarm/editFarm.componente';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'farm', component: FarmComponent },
  { path: 'register', component: registerFarm },
  { path: 'register/:id/edit', component: editFarmComponent },
  { path: 'details/:id', component: DetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
