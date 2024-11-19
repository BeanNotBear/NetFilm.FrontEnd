import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { formatDistance } from 'date-fns';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzListModule } from 'ng-zorro-antd/list';
import { NgTemplateOutlet } from '@angular/common';
import { ApiService } from '../../api/api.service';
import { CommentDto } from '../../models/commentDtos/commentDto.model';
import { AddReplyDto } from '../../models/commentDtos/addReplyDto.model';
import { AddCommentDto } from '../../models/commentDtos/addCommentDto.model';
import { AuthService } from '../../service/auth.service';
import Swal from 'sweetalert2';
import { UpdateCommentDto } from '../../models/commentDtos/updateCommentDto.model';

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
    NzIconModule,
    NgTemplateOutlet,
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent implements OnInit {
  @ViewChild('commentInput') commentInput!: ElementRef;
  @Input() movieId!: string;

  data: CommentDto[] = [];
  submitting = false;
  inputValue = '';
  replyValue = '';
  activeReplyId: string | null = null;
  now = Date.now();
  userId = '';

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.LoadComment();
    this.userId = this.authService.parseJwt(
      localStorage.getItem('token') ?? ''
    ).id;
  }

  LoadComment() {
    this.apiService.getCommentByMovieId(this.movieId).subscribe((reponse) => {
      this.data = reponse;
    });
  }

  handleSubmit(): void {
    if (!localStorage.getItem('token')) {
      Swal.fire({
        title: 'Not allow!',
        text: 'You need login to comment',
        icon: 'info',
      }).then(() => {});
      return;
    }
    this.submitting = true;
    const newComment: AddCommentDto = {
      content: this.inputValue,
      userId: this.userId,
      movieId: this.movieId,
    };
    setTimeout(() => {
      this.apiService.addComment(newComment).subscribe((reponse) => {
        this.submitting = false;
        this.LoadComment();
      });
    }, 500);
    this.inputValue = '';
  }

  focusTextArea() {
    setTimeout(() => {
      this.commentInput.nativeElement.focus();
      this.commentInput.nativeElement.scrollIntoView({ behavior: 'smooth' });
    });
  }

  handleReply(comment: CommentDto) {
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
    if (!localStorage.getItem('token')) {
      Swal.fire({
        title: 'Not allow!',
        text: 'You need login to comment',
        icon: 'info',
      }).then(() => {});
      return;
    }
    if (!this.replyValue.trim()) return;

    this.submitting = true;
    var newReply: AddReplyDto = {
      commentId: parentComment.id,
      content: this.replyValue,
      userId: this.userId,
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

  DeleteComment(commentId: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to delete this comment!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
        }).then(() => {
          this.apiService.deleteComment(commentId).subscribe(() => {
            this.LoadComment();
          });
        });
      }
    });
  }

  async Modify(comment: CommentDto) {
    const { value: text } = await Swal.fire({
      input: 'textarea',
      inputLabel: 'Message',
      inputValue: comment.content,
      showCancelButton: true,
    });
    if (text) {
      const updateComment: UpdateCommentDto = {
        content: text,
      };
      this.apiService.updateComment(comment.id, updateComment).subscribe(() => {
        Swal.fire({
          title: 'Modified!',
          text: 'Your comment has been modified.',
          icon: 'success',
        }).then(() => {
          this.LoadComment();
        });
      });
    }
  }
}
