import { Component, OnInit } from '@angular/core';
import { Message } from '../../shared/models/chat/';
import { CommentService } from '../../shared/services/comment.service';
import { CommentResponse } from '../../shared/models/api-response/comment-response';
import { PagedResult } from '../../shared/models/paged-result';
import { UserService } from '../../shared/services/user.service';
import { JwtService } from '../../shared/services/jwt.service';
import { AlertService } from '../../shared/services/alert.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  listComment: CommentResponse[];
  pagedResult: PagedResult<CommentResponse> = new PagedResult<CommentResponse>();
  commentContent = '';
  userId: number;
  constructor(
    private commentService: CommentService,
    private jwtService: JwtService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.userId = this.jwtService.getUserId();
    this.getListComment();
  }

  getListComment() {
    this.listComment = [];
    this.commentService.getListComment(0, 5)
      .subscribe(data => {
        this.pagedResult = data;
        this.pagedResult.currentPage++;
        this.listComment = this.listComment.concat(data.items);
      });
  }

  viewMore() {
    this.commentService.getListComment(this.pagedResult.currentPage, this.pagedResult.pageSize)
      .subscribe(data => {
        this.pagedResult = data;
        this.pagedResult.currentPage++;
        this.listComment = this.listComment.concat(this.pagedResult.items);
      });
  }

  postComment() {
    if (this.commentContent.trim()) {
      this.commentService.createComment(this.commentContent, this.userId)
        .subscribe(data => {
          this.alertService.success('Thêm bình luận thành công');
          this.commentContent = '';
          this.getListComment();
        }, err => {
          console.log(err);
          this.alertService.error(err.error.errorMessage);
        });
    }
  }

}
