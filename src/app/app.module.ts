import { AlbumsService } from './_services/albums.service';
import { UsersService } from './_services/users.service';
import { CommentsService } from './_services/comments.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 


import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { NavComponent } from './nav/nav.component';
import { PostsService } from './_services/posts.service';
import { PaginationComponent } from './pagination/pagination.component';
import { RouteRoutes } from './route.routing';
import { CommentsComponent } from './comments/comments.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostFormComponent } from './post-form/post-form.component';
import { AlbumsComponent } from './albums/albums.component';
import { AlbumDetailComponent } from './album-detail/album-detail.component';
import { PhotosService } from './_services/photos.service';
import { PhotosComponent } from './photos/photos.component';


@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    NavComponent,
    PaginationComponent,
    PostDetailComponent,
    CommentsComponent,
    PostFormComponent,
    AlbumsComponent,
    AlbumDetailComponent,
    PhotosComponent
],
  imports: [
    BrowserModule,
    HttpClientModule, 
    RouteRoutes,
    FormsModule
  ],
  providers: [
    PostsService, 
    CommentsService,
    UsersService,
    AlbumsService,
    PhotosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
