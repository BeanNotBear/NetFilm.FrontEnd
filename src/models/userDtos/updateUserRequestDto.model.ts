export interface UpdateUserRequestDto {
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  userName: string;
  email: string;
  phoneNumber: string;
  roles: string[];
}
