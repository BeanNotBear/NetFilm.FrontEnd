import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Participant } from '../../models/participantDtos/participant';
import { ApiService } from "../../api/api.service";
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.scss'],
  standalone: true,
  imports: [
    NzModalModule,
    NzButtonModule,
    NzInputModule,
    NzFormModule,
    NzTableModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class ParticipantComponent {
  participants: Participant[] = [];
  participantToUpdate: Participant = new Participant();
  participantIdToDelete: number | undefined;
  participantIdToUpdate: number | undefined;
  isModalVisible = false;
  isEdit = false;
  participantForm: FormGroup;
  modalTitle: string = 'Add Participant';

  constructor(private fb: FormBuilder, private apiService: ApiService, private cd: ChangeDetectorRef) {
    this.participantForm = this.fb.group({
      name: [null, [Validators.required]],
      roleInMovie: [null, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.loadParticipants();
  }

  // Load participants from API
  loadParticipants(): void {
    this.apiService.getAllParticipants().subscribe({
      next: (data) => {
        this.participants = data;
      },
      error: (error) => {
        console.error('Error fetching participants:', error);
      },
    });
  }

  // Open modal for creating a new participant
  openCreateModal(): void {
    this.modalTitle = 'Add Participant';
    this.isEdit = false;  // Reset edit mode for creating new participant
    this.isModalVisible = true;
    this.participantForm.reset();  // Reset form controls to initial state
    this.cd.detectChanges();  // Force change detection to ensure modal updates
  }

  // Open modal for editing a participant
  editParticipant(participant: Participant): void {
    this.modalTitle = 'Edit Participant';
    this.isEdit = true;  // Set to edit mode
    this.isModalVisible = true;
    this.participantToUpdate = { ...participant };  // Clone participant for editing
    this.participantForm.setValue({
      name: participant.name,
      roleInMovie: participant.roleInMovie
    });
    this.cd.detectChanges();  // Force change detection to update the modal
  }

  // Handle modal OK button (Create or Update)
  handleOk(): void {
    if (this.participantForm.valid) {
      const participant = this.participantForm.value;

      if (this.isEdit && this.participantIdToUpdate !== undefined) {
        // Update existing participant
        this.apiService.putParticipant({ ...this.participantToUpdate, ...participant }, this.participantIdToUpdate).subscribe({
          next: (updatedParticipant) => {
            console.log('Updated participant:', updatedParticipant);
            this.loadParticipants();  // Reload the list
            this.isModalVisible = false;
          },
          error: (error) => {
            console.log({error})
            alert(error?.message || 'Error updating participant')
          }
        });
      } else {
        // Add new participant
        this.apiService.addParticipant(participant).subscribe({
          next: (addedParticipant) => {
            console.log('Added participant:', addedParticipant);
            this.loadParticipants();  // Reload the list
            this.isModalVisible = false;
          },
          error: (error) => {
            console.log({error: JSON.stringify(error)})
            alert(error?.error?.detail || 'Error Add participant')
          }
        });
      }
    }
  }

  // Handle modal Cancel button
  handleCancel(): void {
    this.isModalVisible = false;
  }

  // Delete a participant
  deleteParticipant(): void {
    if (this.participantIdToDelete !== undefined) {
      this.apiService.deleteParticipant(this.participantIdToDelete).subscribe({
        next: () => {
          console.log('Deleted participant with ID:', this.participantIdToDelete);
          this.loadParticipants();  // Reload the list after deleting
          this.isModalVisible = false;  // Close the modal after deletion
        },
        error: (error) => {
          console.error('Error deleting participant:', error);
        }
      });
    }
  }
}
