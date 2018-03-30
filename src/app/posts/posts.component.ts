import { Post } from './../_models/Post';
import { Component, OnInit } from '@angular/core';
import { PostsService } from '../_services/posts.service';
import { Pagination, PaginatedResult } from '../_models/pagination';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  userParams: any = {};
  pagination: any={};
  

  constructor(private postsService: PostsService) { }

  ngOnInit() {
    // this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts').
    //   .subscribe(response => {
    //     this.posts = response.json();
    //     this.posts.forEach(post=>{
    //       this.http.get(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
    //       .subscribe(res=>post.userName=res.json().username);
    //     })
    //   });
    // fetch('https://jsonplaceholder.typicode.com/posts')
    //   .then(response => response.json())
    //   .then(json => this.posts = json);

    this.loadPosts();
  }


  loadPosts() {
    this.postsService.getPosts(this.pagination ? this.pagination.currentPage : 1, this.pagination ? this.pagination.itemsPerPage : 10)
      .subscribe((res: PaginatedResult<Post[]>) => {
        this.posts = res.result;
        this.pagination = res.pagination;
      });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadPosts();
  }
}
