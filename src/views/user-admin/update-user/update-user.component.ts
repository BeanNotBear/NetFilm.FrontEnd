import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {UserService} from "../../../service/user.service";
import {UpdateUserRequestDto} from "../../../models/userDtos/updateUserRequestDto.model";

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss'
})
export class UpdateUserComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Input({required: true}) id!: string;
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      adminRole: [false],  // separate control for admin
      userRole: [false]    // separate control for user
    });
  }

  updateUserRequestDto: UpdateUserRequestDto = new class implements UpdateUserRequestDto {
    dateOfBirth: Date = new Date();
    email: string = "";
    firstName: string = "";
    lastName: string = "";
    phoneNumber: string = "";
    roles: string[] = [];
    userName: string = "";
  }

  isAdmin: boolean = false;
  isUser: boolean = false;

  ngOnInit() {
    this.userService.getUserById(this.id).subscribe(data => {
      this.updateUserRequestDto = data;
      this.isAdmin = this.updateUserRequestDto.roles.includes('ADMIN');
      this.isUser = this.updateUserRequestDto.roles.includes('USER');
      console.log(this.updateUserRequestDto);
      console.log(this.isUser);
      console.log(this.isAdmin);
    })
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.updateUserRequestDto.roles.pop();
      this.updateUserRequestDto.roles.pop();
      if(this.isAdmin){
        this.updateUserRequestDto.roles.push("admin");
      }
      if(this.isUser){
        this.updateUserRequestDto.roles.push("user");
      }
      console.log(this.updateUserRequestDto);
      this.userService.updateUser(this.id, this.updateUserRequestDto);
      this.closePopup();
    }
  }

  onClose() {
    this.close.emit();
  }

  closePopup() {
    this.close.emit();
  }
}
