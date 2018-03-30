import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any=[];
  constructor(private http:Http) { }

  ngOnInit() {
    this.http.get('https://jsonplaceholder.typicode.com/posts')
    .subscribe(response => this.posts=response.json());
    // fetch('https://jsonplaceholder.typicode.com/posts')
    //   .then(response => response.json()).then(json => this.posts=json);
  }

}
