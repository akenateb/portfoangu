import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { AddUserComponent} from "./users/add-user/add-user.component";
import {UsersListComponent} from "./users/users-list/users-list.component";
import {RegisterComponent} from "./auth/register/register.component";
import {LoginComponent} from "./auth/login/login.component";
import {LogoutComponent} from "./auth/logout/logout.component";
import { AuthGuard } from './auth.guard';



const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'edit-user/:id', component: EditUserComponent, canActivate: [AuthGuard] },
  { path: 'adduser', component: AddUserComponent, canActivate: [AuthGuard]},
  { path: 'list-users', component: UsersListComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
