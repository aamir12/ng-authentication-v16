import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guard/auth.guard';
import { alreadyLoggedInGuard } from './core/guard/already-logged-in.guard';
import { Role } from './core/constant';

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
    data:{roles:[]},
    loadComponent: () => import(`./pages/dashboard/dashboard.component`).then(mod => mod.DashboardComponent),
    canActivate:[authGuard]
  },
  {
    path: 'publisher',
    data:{roles:[Role.PUBLISHER,Role.ADMIN]},
    loadComponent: () => import(`./pages/publisher/publisher.component`).then(mod => mod.PublisherComponent),
    canActivate:[authGuard]
  },
  {
    path: 'admin',
    data:{roles:[Role.ADMIN]},
    loadComponent: () => import(`./pages/admin/admin.component`).then(mod => mod.AdminComponent),
    canActivate:[authGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
