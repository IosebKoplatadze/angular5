import { PostFormComponent } from './post-form/post-form.component';
import { PostsComponent } from './posts/posts.component';
import { Routes, RouterModule } from '@angular/router';
import { PostDetailComponent } from './post-detail/post-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: 'posts', pathMatch: 'full' },
  { path: 'posts', component: PostsComponent },
  { path: 'posts/:id', component: PostDetailComponent },
  { path: 'posts/edit/:id', component: PostFormComponent },
  { path: 'posts/new', component: PostFormComponent },
  { path: '**', redirectTo: 'posts' }
];

export const RouteRoutes = RouterModule.forRoot(routes);
