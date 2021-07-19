import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetalleProductoComponent } from './pages/detalle-producto/detalle-producto.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'items/:id', component: DetalleProductoComponent },
  { path: '**', redirectTo: 'home' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
