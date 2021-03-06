import { Component, OnInit } from '@angular/core';
import { PostsService } from '../_services/posts.service';
import { Post } from '../_models/Post';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  post: Post;
  constructor(private postsService: PostsService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    let id;
    this.route.params.subscribe(params => id = params['id']);

    this.postsService.getPost(id)
      .subscribe(post => this.post = post,
        err => {
          if (err.status == 404)
            this.router.navigate(['/posts/']);
        });
  }

}
