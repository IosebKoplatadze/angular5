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
  constructor(private commentService: CommentsService) { }

  ngOnInit() {
    this.commentService.getComments(this.postId)
      .subscribe(res => this.comments = res);
      console.log(this.postId);
  }

}
