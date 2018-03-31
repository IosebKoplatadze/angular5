import { CommentsService } from './_services/comments.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';


import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { NavComponent } from './nav/nav.component';
import { PostsService } from './_services/posts.service';
import { PaginationComponent } from './pagination/pagination.component';
import { RouteRoutes } from './route.routing';
import { CommentsComponent } from './comments/comments.component';
import { PostDetailComponent } from './post-detail/post-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    NavComponent,
    PaginationComponent,
    PostDetailComponent,
    CommentsComponent
],
  imports: [
    BrowserModule,
    HttpClientModule, 
    RouteRoutes
  ],
  providers: [PostsService, CommentsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
