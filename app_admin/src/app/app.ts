import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Trip } from './trip';
import { TripDataService } from './services/trip-data';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {

  trips: Trip[] = [];
  loading = true;
  error: string | null = null;
  success: string = '';

  // Add form model (✅ include code)
  newTrip: Partial<Trip> = {
    code: '',
    name: '',
    length: '',
    resort: '',
    perPerson: 0,
    image: '',
    description: ''
  };

  // ✅ Edit by CODE (not _id)
  editingTripCode: string | null = null;
  editTrip: Partial<Trip> = {};

  constructor(
    private tripService: TripDataService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.refreshTrips();
  }

  refreshTrips(): void {
    this.loading = true;
    this.error = null;

    this.tripService.getTrips().subscribe({
      next: (data) => {
        this.trips = Array.isArray(data) ? data : [];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Trip API error:', err);
        this.error = 'Failed to load trips';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  onAddTrip(): void {
    this.error = null;
    this.success = '';

    // ✅ required fields guard
    if (!this.newTrip.code || this.newTrip.code.trim() === '') {
      this.error = 'Code is required (example: KIAH001)';
      return;
    }
    if (!this.newTrip.name || this.newTrip.name.trim() === '') {
      this.error = 'Name is required';
      return;
    }

    // API requires image -> don’t let it be blank
    if (!this.newTrip.image || this.newTrip.image.trim() === '') {
      this.newTrip.image = 'placeholder.jpg';
    }

    this.tripService.addTrip(this.newTrip).subscribe({
      next: () => {
        this.success = 'Trip added successfully!';
        this.newTrip = {
          code: '',
          name: '',
          length: '',
          resort: '',
          perPerson: 0,
          image: '',
          description: ''
        };
        this.refreshTrips();
      },
      error: (err) => {
        console.error('Add trip error:', err);
        this.error = 'Failed to add trip';
        this.cdr.detectChanges();
      }
    });
  }

  // --- EDIT FLOW ---
  startEdit(trip: Trip): void {
    this.success = '';
    this.error = null;

    const code = (trip as any).code;
    if (!code) {
      this.error = 'Cannot edit: missing trip code';
      return;
    }

    this.editingTripCode = code;

    // clone values
    this.editTrip = {
      code: code,
      name: trip.name,
      length: trip.length,
      resort: trip.resort,
      perPerson: trip.perPerson,
      image: trip.image,
      description: trip.description
    };
  }

  cancelEdit(): void {
    this.editingTripCode = null;
    this.editTrip = {};
    this.success = '';
    this.error = null;
  }

  saveEdit(): void {
    if (!this.editingTripCode) return;

    this.error = null;
    this.success = '';

    if (!this.editTrip.image || String(this.editTrip.image).trim() === '') {
      this.editTrip.image = 'placeholder.jpg';
    }

    this.tripService.updateTrip(this.editingTripCode, this.editTrip).subscribe({
      next: () => {
        this.success = 'Trip updated successfully!';
        this.cancelEdit();
        this.refreshTrips();
      },
      error: (err) => {
        console.error('Update trip error:', err);
        this.error = 'Failed to update trip';
        this.cdr.detectChanges();
      }
    });
  }

  // --- DELETE FLOW ---
  deleteTrip(code: string | undefined): void {
    this.error = null;
    this.success = '';

    if (!code) {
      this.error = 'Cannot delete: missing trip code';
      return;
    }

    this.tripService.deleteTrip(code).subscribe({
      next: () => {
        this.success = 'Trip deleted successfully!';
        this.refreshTrips();
      },
      error: (err) => {
        console.error('Delete trip error:', err);
        this.error = 'Failed to delete trip';
        this.cdr.detectChanges();
      }
    });
  }
}