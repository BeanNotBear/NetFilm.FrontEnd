import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {AddUser} from "../../../models/userDtos/addUser.model";
import {UserService} from "../../../service/user.service";

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent implements OnInit{
  @Output() close = new EventEmitter<void>();
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: ['', Validators.required],
      role: ['user', Validators.required]
    });
  }

  addUserRequestDto: AddUser = new class implements AddUser {
    dateOfBirth: Date = new Date();
    email: string = "";
    firstName: string = "";
    lastName: string = "";
    passWord: string = "";
    phoneNumber: string = "";
    roles: string[] = [];
    userName: string = "";
  }

  isAdmin: boolean = false;
  isUser: boolean = false;

  ngOnInit() {}

  onSubmit() {
    if (this.registrationForm.valid) {
      if(this.isAdmin){
        this.addUserRequestDto.roles.push("admin");
      }
      if(this.isUser){
        this.addUserRequestDto.roles.push("user");
      }
      // console.log(this.registrationForm.value);
      console.log(this.addUserRequestDto);
      this.userService.createUser(this.addUserRequestDto);
      this.closePopup();
    }
  }

  closePopup() {
    this.close.emit();
  }

  onClose() {
    this.close.emit();
  }
}
