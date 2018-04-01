import { UsersService } from './../_services/users.service';
import { Post } from './../_models/Post';
import { PostsService } from './../_services/posts.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../_models/User';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  post: Post = {
    id: 0,
    title: '',
    body: '',
    userId: 0,
    userName: ''
  };
  users: User[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postsService: PostsService,
    private userService: UsersService) {

    route.params.subscribe(p => {
      this.post.id = +p['id'];
    });
  }

  ngOnInit() {
    var sources:any[] = [
      this.userService.getUsers()
    ];
    if (this.post.id)
      sources.push(this.postsService.getPost(this.post.id));


    Observable.forkJoin(sources).subscribe(data => {
      this.users = data[0] as User[];
      if (this.post.id)
        this.post = data[1] as Post;
    }, err => {
      if (err.status == 404)
        this.router.navigate(['/posts']);
    });
  }

  submit() {
    if (this.post.id) {
      this.postsService.updatePost(this.post)
        .subscribe(x => {
          console.log("Updated", x);
        },
          err => console.log(err),
          () => this.router.navigate(['/posts/' + this.post.id]));
    }
    else {
      this.postsService.addPost(this.post)
        .subscribe(x => {
          console.log("added", x);
          this.router.navigate(['/posts/']);
      },
          err => console.log(err));

    }
  }
}
