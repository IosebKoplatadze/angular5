import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';


import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { NavComponent } from './nav/nav.component';
import { PostsService } from './_services/posts.service';
import { PaginationComponent } from './pagination/pagination.component';
import { RouteRoutes } from './route.routing';


@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    NavComponent,
    PaginationComponent
],
  imports: [
    BrowserModule,
    HttpClientModule, 
    RouteRoutes
  ],
  providers: [PostsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
