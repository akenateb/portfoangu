import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { AddUserComponent} from "./users/add-user/add-user.component";
import {UsersListComponent} from "./users/users-list/users-list.component";
import {RegisterComponent} from "./auth/register/register.component";
import {LoginComponent} from "./auth/login/login.component";
import {LogoutComponent} from "./auth/logout/logout.component";
import { AuthGuard } from './auth.guard';
import { ArticleListComponent } from './articles/article-list/article-list.component';
import { ArticleCreateComponent } from './articles/article-create/article-create.component';
import { ArticleEditComponent } from './articles/article-edit/article-edit.component';
import { ArticleDeleteComponent } from './articles/article-delete/article-delete.component';



const routes: Routes = [
  { path: '', redirectTo: 'articles', pathMatch: 'full' },
  { path: 'edit-user/:id', component: EditUserComponent, canActivate: [AuthGuard] },
  { path: 'adduser', component: AddUserComponent},
  { path: 'list-users', component: UsersListComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'articles', component: ArticleListComponent },
  { path: 'articles/create', component: ArticleCreateComponent, canActivate: [AuthGuard] },
  { path: 'articles/edit/:id', component: ArticleEditComponent, canActivate: [AuthGuard] },
  { path: 'articles/delete/:id', component: ArticleDeleteComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
