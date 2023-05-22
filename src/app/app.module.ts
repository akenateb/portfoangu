import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersComponent } from './users/users.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import {FormsModule} from "@angular/forms";
import {NgOptimizedImage} from "@angular/common";
import {MatTableModule} from "@angular/material/table";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import { JwtModule } from '@auth0/angular-jwt';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { ArticleListComponent } from './articles/article-list/article-list.component';
import { ArticleCreateComponent } from './articles/article-create/article-create.component';
import { ArticleEditComponent } from './articles/article-edit/article-edit.component';
import { ArticleDeleteComponent } from './articles/article-delete/article-delete.component';
import { CorsInterceptor } from '../../middleware/cors.interceptor';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UsersListComponent,
    EditUserComponent,
    AddUserComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    LogoutComponent,
    ArticleListComponent,
    ArticleCreateComponent,
    ArticleEditComponent,
    ArticleDeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgOptimizedImage,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:5000'],
        disallowedRoutes: ['http://localhost:5000/auth/login', 'http://localhost:5000/auth/register'],
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CorsInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
