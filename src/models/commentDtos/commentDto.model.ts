export interface CommentDto {
  id: string;
  userName: string;
  content: string;
  date: Date;
  userId: string;
  children: CommentDto[];
}
