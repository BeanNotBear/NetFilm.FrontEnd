import {Component, ElementRef, ViewChild} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { formatDistance } from 'date-fns';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzListModule } from 'ng-zorro-antd/list';
import {NgTemplateOutlet} from "@angular/common";

interface User {
  author: string;
  avatar: string;
}

interface Data extends User {
  id: number;
  author: string;
  content: string;
  datetime: Date;  // Add this field for storing the actual Date object
  displayTime: string;  // Change to string since formatDistance returns string
  children?: Data[];
}

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [FormsModule, NzAvatarModule, NzButtonModule, NzCommentModule, NzFormModule, NzInputModule, NzListModule, NgTemplateOutlet],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
  @ViewChild('commentInput') commentInput!: ElementRef;

  data: Data[] = [];
  submitting = false;
  user: User = {
    author: 'Han Solo',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
  };
  inputValue = '';
  replyValue = '';
  activeReplyId: number | null = null;

  handleSubmit(): void {
    this.submitting = true;
    const content = this.inputValue;
    this.inputValue = '';
    const now = new Date();

    setTimeout(() => {
      this.submitting = false;
      const newComment: Data = {
        ...this.user,
        id: Date.now(),
        content,
        datetime: now,
        displayTime: formatDistance(now, now)
      };

      this.data = [
        ...this.data,
        newComment
      ].map(e => ({
        ...e,
        displayTime: formatDistance(new Date(), e.datetime) // Use datetime instead of displayTime
      }));
    }, 800);
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

  submitReply(parentComment: Data) {
    if (!this.replyValue.trim()) return;

    this.submitting = true;
    const now = new Date();

    const newReply: Data = {
      ...this.user,
      id: Date.now(),
      content: this.replyValue,
      datetime: now,
      displayTime: formatDistance(now, now)
    };

    // Add reply to parent's children
    if (!parentComment.children) {
      parentComment.children = [];
    }
    parentComment.children.push(newReply);

    // Reset form
    this.submitting = false;
    this.replyValue = '';
    this.activeReplyId = null;
  }

  // Optional: Helper method to update display times
  updateDisplayTimes(): void {
    this.data = this.data.map(comment => ({
      ...comment,
      displayTime: formatDistance(new Date(), comment.datetime),
      children: comment.children?.map(child => ({
        ...child,
        displayTime: formatDistance(new Date(), child.datetime)
      }))
    }));
  }
}
