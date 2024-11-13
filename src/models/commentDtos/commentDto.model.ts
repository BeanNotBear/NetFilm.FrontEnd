export interface CommentDto {
  id: string;
  userName: string;
  content: string;
  datetime: Date;
  displayTime: string;
  children: CommentDto[];
}
