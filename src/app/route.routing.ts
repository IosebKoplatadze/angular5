import { AlbumsComponent } from './albums/albums.component';
import { PostFormComponent } from './post-form/post-form.component';
import { PostsComponent } from './posts/posts.component';
import { Routes, RouterModule } from '@angular/router';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { AlbumDetailComponent } from './album-detail/album-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: 'posts', pathMatch: 'full' },
  {
    path: 'posts',
    children: [
      { path: 'new', component: PostFormComponent },
      { path: ':id', component: PostDetailComponent },
      { path: 'edit/:id', component: PostFormComponent },
      { path: '', component: PostsComponent }
    ]
  },
  {
    path: 'albums',
    children: [
      { path: ':id', component: AlbumDetailComponent },
      { path: '', component: AlbumsComponent }
    ]
  },
  { path: '**', redirectTo: 'posts' }
];

export const RouteRoutes = RouterModule.forRoot(routes);
