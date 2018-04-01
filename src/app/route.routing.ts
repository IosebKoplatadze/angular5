import { AlbumsComponent } from './albums/albums.component';
import { PostFormComponent } from './post-form/post-form.component';
import { PostsComponent } from './posts/posts.component';
import { Routes, RouterModule } from '@angular/router';
import { PostDetailComponent } from './post-detail/post-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: 'posts', pathMatch: 'full' },
  { path: 'posts/new', component: PostFormComponent},
  { path: 'posts/:id', component: PostDetailComponent },
  { path: 'posts/edit/:id', component: PostFormComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'albums', component: AlbumsComponent },
  { path: '**', redirectTo: 'posts' }
];

export const RouteRoutes = RouterModule.forRoot(routes);
