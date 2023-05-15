import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { AddUserComponent} from "./users/add-user/add-user.component";
import {UsersListComponent} from "./users/users-list/users-list.component";



const routes: Routes = [
  { path: '', redirectTo: 'list-users', pathMatch: 'full' },
  { path: 'edit-user/:id', component: EditUserComponent },
  { path: 'adduser', component: AddUserComponent },
  { path: 'list-users', component: UsersListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
