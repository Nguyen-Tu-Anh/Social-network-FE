import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './component/home/home.component';
import {LoginComponent} from './component/login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from "@angular/material/card";
import {RegisterComponent} from './component/register/register.component';
import {FormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {RouterModule, Routes} from "@angular/router";
import {PostComponent} from './component/post/show-post/post.component';
import { CreatePostComponent } from './component/post/create-post/create-post.component';
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment.prod";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import { EditPostComponent } from './component/post/edit-post/edit-post.component';
import {httpInterceptorProviders} from "./security/auth.interceptor";
import { ChatComponent } from './component/chat/chat.component';
import { PageCommentComponent } from './component/post/comment/page-comment/page-comment.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import { HeaderComponent } from './component/header/header.component';
import { FriendRequestComponent } from './component/friend/friend-request/friend-request.component';
import { AddFriendComponent } from './component/friend/add-friend/add-friend.component';
import { TimelineComponent } from './component/Profile/timeline/timeline.component';



export const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'friend-request', component: FriendRequestComponent},
  {path: 'add-friend', component: AddFriendComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    PostComponent,
    CreatePostComponent,
    EditPostComponent,
    ChatComponent,
    PageCommentComponent,
    HeaderComponent,
    FriendRequestComponent,
    AddFriendComponent,
    TimelineComponent,
  ],
    imports: [
        RouterModule.forRoot(appRoutes),
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatCardModule,
        FormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        HttpClientModule,

        AngularFireStorageModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        MatPaginatorModule,
    ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
