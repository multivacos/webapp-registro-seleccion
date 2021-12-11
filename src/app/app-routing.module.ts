import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostulanteComponent } from './components/postulante/postulante.component';

const routes: Routes = [
  {path: '', redirectTo: 'postulantes', pathMatch: 'full'},
  {path: 'postulantes', component: PostulanteComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
