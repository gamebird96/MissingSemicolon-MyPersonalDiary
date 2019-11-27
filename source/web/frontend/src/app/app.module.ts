import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AuthenticationService } from './authentication.service';
import { ProfileGuardService } from './profile-guard.service';

import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';

import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { PostComponent } from './post/post.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSnackBarModule} from '@angular/material';
import {MatDividerModule} from '@angular/material/divider';


import {DatePipe} from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';
import { DiaryService } from './diary.service';
import { QueryService } from './query.service';
import { CKEditorModule } from 'ckeditor4-angular';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [ProfileGuardService] },
  { path: '', redirectTo: 'home', pathMatch: 'full' }

];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    FormsModule,
    MatSelectModule,
    HttpClientModule,
    MatSnackBarModule,
    NgbModule,
    MatTabsModule,
    MatSelectModule,
    MatDividerModule,
    CKEditorModule,
    MatExpansionModule,
    RouterModule.forRoot(routes) // I don't know how this works
  ],
  providers: [AuthenticationService, ProfileGuardService, DiaryService, QueryService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
