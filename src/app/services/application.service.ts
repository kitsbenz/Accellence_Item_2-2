
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private apiUrl = 'http://localhost:8080/applications';

  constructor(private http: HttpClient) {}

  // ส่งข้อมูลฟอร์มไป backend
  submitApplication(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  // โหลดรายการ applications ทั้งหมด
  getAllApplications(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  }
