import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../trip';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {
  private apiBaseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  private authHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token ?? ''}`
    });
  }

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.apiBaseUrl}/trips`, {
      headers: this.authHeaders()
    });
  }

  addTrip(trip: Partial<Trip>): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}/trips`, trip, {
      headers: this.authHeaders()
    });
  }

  // ✅ IMPORTANT: update by CODE (not _id)
  updateTrip(code: string, trip: Partial<Trip>): Observable<any> {
    return this.http.put(`${this.apiBaseUrl}/trips/${encodeURIComponent(code)}`, trip, {
      headers: this.authHeaders()
    });
  }

  // ✅ IMPORTANT: delete by CODE (not _id)
  deleteTrip(code: string): Observable<any> {
    return this.http.delete(`${this.apiBaseUrl}/trips/${encodeURIComponent(code)}`, {
      headers: this.authHeaders()
    });
  }
}