export interface ResetPasswordRequestDto {
  token: string;
  email: string;
  password: string;
  confirmPassword: string;
}
