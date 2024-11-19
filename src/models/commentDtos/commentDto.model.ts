export interface CommentDto {
  id: string;
  userName: string;
  content: string;
  date: Date;
  movie: string;
  userId: string;
  children: CommentDto[];
}
