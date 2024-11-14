import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { formatDistance } from 'date-fns';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzListModule } from 'ng-zorro-antd/list';
import { NgTemplateOutlet } from '@angular/common';
import { ApiService } from '../../api/api.service';
import { CommentDto } from '../../models/commentDtos/commentDto.model';
import { AddReplyDto } from '../../models/commentDtos/addReplyDto.model';
import { AddCommentDto } from '../../models/commentDtos/addCommentDto.model';

interface User {
  author: string;
  avatar: string;
}

interface Data extends User {
  id: number;
  author: string;
  content: string;
  datetime: Date; // Add this field for storing the actual Date object
  displayTime: string; // Change to string since formatDistance returns string
  children?: Data[];
}

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [
    FormsModule,
    NzAvatarModule,
    NzButtonModule,
    NzCommentModule,
    NzFormModule,
    NzInputModule,
    NzListModule,
    NgTemplateOutlet,
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent implements OnInit {
  @ViewChild('commentInput') commentInput!: ElementRef;

  data: CommentDto[] = [];
  submitting = false;
  user: User = {
    author: 'Han Solo',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  };
  inputValue = '';
  replyValue = '';
  activeReplyId: number | null = null;
  now = Date.now();

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.LoadComment();
  }

  LoadComment() {
    this.apiService
      .getCommentByMovieId('DE000F7E-9E13-4D7F-A775-C8020CD0BC7A')
      .subscribe((reponse) => {
        this.data = reponse;
      });
  }

  handleSubmit(): void {
    this.submitting = true;
    const newComment: AddCommentDto = {
      content: this.inputValue,
      userId: '919C241A-E503-4133-BB71-3AE9F5A19ECD',
      movieId: 'DE000F7E-9E13-4D7F-A775-C8020CD0BC7A',
    };
    setTimeout(() => {
      this.apiService.addComment(newComment).subscribe((reponse) => {
        this.submitting = false;
        this.LoadComment();
      });
    }, 500);
  }

  focusTextArea() {
    setTimeout(() => {
      this.commentInput.nativeElement.focus();
      this.commentInput.nativeElement.scrollIntoView({ behavior: 'smooth' });
    });
  }

  handleReply(comment: Data) {
    this.activeReplyId = comment.id;
    this.replyValue = '';
    setTimeout(() => {
      this.commentInput?.nativeElement?.focus();
    });
  }

  cancelReply() {
    this.activeReplyId = null;
    this.replyValue = '';
  }

  submitReply(parentComment: CommentDto) {
    if (!this.replyValue.trim()) return;

    this.submitting = true;
    var newReply: AddReplyDto = {
      commentId: parentComment.id,
      content: this.replyValue,
      userId: '919C241A-E503-4133-BB71-3AE9F5A19ECD',
    };
    this.apiService.reply(newReply).subscribe((reponse) => {
      this.apiService
        .getReplyByCommentId(parentComment.id)
        .subscribe((reponse) => {
          parentComment.children = reponse;
        });
    });

    // Reset form
    this.submitting = false;
    this.replyValue = '';
    this.activeReplyId = null;
  }

  showReply(comment: CommentDto) {
    this.apiService.getReplyByCommentId(comment.id).subscribe((reponse) => {
      comment.children = reponse;
    });
  }

  hiddenReply(comment: CommentDto) {
    comment.children = [];
  }

  // Optional: Helper method to update display times
  updateDisplayTimes(): void {
    // this.data = this.data.map((comment) => ({
    //   ...comment,
    //   displayTime: formatDistance(new Date(), comment.datetime),
    //   children: comment.children?.map((child) => ({
    //     ...child,
    //     displayTime: formatDistance(new Date(), child.datetime),
    //   })),
    // }));
  }

  formatDistanceToNow(date: string): string {
    return formatDistance(Date.parse(date), this.now, { addSuffix: true });
  }
}
