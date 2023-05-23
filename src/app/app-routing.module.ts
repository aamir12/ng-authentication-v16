import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guard/auth.guard';
import { alreadyLoggedInGuard } from './core/guard/already-logged-in.guard';

const routes: Routes = [
  {
    path: '',
    canActivate:[alreadyLoggedInGuard],
    loadComponent: () => import(`./pages/login/login.component`).then(mod => mod.LoginComponent)
  },
  {
    path: 'register',
    canActivate:[alreadyLoggedInGuard],
    loadComponent: () => import(`./pages/register/register.component`).then(mod => mod.RegisterComponent)
  },
  {
    path: 'dashboard',
    data:[],
    loadComponent: () => import(`./pages/dashboard/dashboard.component`).then(mod => mod.DashboardComponent),
    canActivate:[authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
