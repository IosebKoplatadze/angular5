import { CommentsService } from './../_services/comments.service';
import { Component, OnInit, Input } from '@angular/core';
import { Comment } from './../_models/Comment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() postId: number;
  comments: Comment[];
  newComment: Comment = {
    postId: 0,
    id: 0,
    name: '',
    email: '',
    body: ''
  }

  constructor(private commentsService: CommentsService) { }

  ngOnInit() {
    this.commentsService.getComments(this.postId)
      .subscribe(res => this.comments = res);
  }

  submit() {
    this.commentsService.addComment(this.postId, this.newComment)
      .subscribe(x => {
        console.log("added", x);
        this.comments.push(x as Comment);
      },
        err => console.log(err));
  }
}
