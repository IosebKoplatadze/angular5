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
  pagination: Pagination = new Pagination();


  constructor(private postsService: PostsService) { }

  ngOnInit() {
    this.loadPosts();
  }


  loadPosts() {
    this.postsService.getPosts(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe((res: PaginatedResult<Post[]>) => {
        this.posts = res.result;
        this.pagination.totalItems = res.totalItems;
      });
  }

  pageChanged(event: Pagination): void {
    this.pagination = event;
    this.loadPosts();
  }
}
