import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApplicationService } from '../services/application.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-application-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './application-form.component.html',
})
export class ApplicationFormComponent implements OnInit {
  applicationForm: FormGroup;
  submitted = false;
  response: any;
  applicationList: any[] = [];

  constructor(
    private fb: FormBuilder,
    private applicationService: ApplicationService
  ) {
    this.applicationForm = this.fb.group({
      applicantName: ['', Validators.required],
      monthlyIncome: [0, [Validators.required, Validators.min(0)]],
      monthlyExpense: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.loadApplications();
  }

  onSubmit(): void {
    if (this.applicationForm.valid) {
      this.applicationService
        .submitApplication(this.applicationForm.value)
        .subscribe({
          next: (res) => {
            this.response = res;
            this.submitted = true;
            this.loadApplications(); // โหลดใหม่หลัง submit
          },
          error: (err) => {
            alert('เกิดข้อผิดพลาดในการส่งใบสมัคร');
            console.error(err);
          }
        });
    } else {
      this.applicationForm.markAllAsTouched();
    }
  }

  loadApplications(): void {
    this.applicationService.getAllApplications().subscribe({
      next: (data) => {
        this.applicationList = data;
      },
      error: (err) => {
        console.error('โหลดรายการใบสมัครล้มเหลว', err);
      }
    });
  }
}
