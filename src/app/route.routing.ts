import { PostsComponent } from './posts/posts.component';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'posts', pathMatch: 'full' },
  { path: 'posts', component: PostsComponent },
  { path: '**', redirectTo: 'posts' }
];

export const RouteRoutes = RouterModule.forRoot(routes);
