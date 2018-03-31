import { PostsComponent } from './posts/posts.component';
import { Routes, RouterModule } from '@angular/router';
import { PostDetailComponent } from './post-detail/post-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: 'posts', pathMatch: 'full' },
  { path: 'posts', component: PostsComponent },
  { path: 'posts/:id', component: PostDetailComponent },
  { path: '**', redirectTo: 'posts' }
];

export const RouteRoutes = RouterModule.forRoot(routes);
