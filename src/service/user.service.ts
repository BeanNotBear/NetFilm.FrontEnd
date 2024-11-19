import {Injectable} from "@angular/core";
import {ApiService} from "../api/api.service";
import {AddUser} from "../models/userDtos/addUser.model";
import Swal from "sweetalert2";
import {UpdateUserRequestDto} from "../models/userDtos/updateUserRequestDto.model";
import {UpdateUser} from "../models/userDtos/updateUser.model";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private apiService: ApiService) {
  }

  createUser(addUserRequestDto: AddUser){
    return this.apiService.createUser(addUserRequestDto).subscribe({
      next: (response) => {
        Swal.fire('Success', `User created successfully! ID: ${response.id}`, 'success');
      },
      error: (err) => {
        Swal.fire('Error', err.error || 'An error occurred while creating the user.', 'error');
      }
    });
  }

  getUserById(id: string){
    return this.apiService.getUserById(id);
  }

  updateUser(id: string, updateUserRequestDto: UpdateUser){
    this.apiService.updateUserAdmin(id, updateUserRequestDto).subscribe({
      next: (data) => {
        console.log('User updated successfully:', data);
        Swal.fire('Success', `User updated successfully!`, 'success');
      },
      error: (err) => {
        console.error('Error updating user:', err);
        Swal.fire('Error', err.error || 'An error occurred while creating the user.', 'error');
      },
    });
  }
}
