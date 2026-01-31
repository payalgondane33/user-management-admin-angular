import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Api } from '../../shared/services/api';
import { switchMap, map, catchError, of } from 'rxjs';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company?: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo?: {
      lat: string;
      lng: string;
    };
  };
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
})
export class Profile {
  private route = inject(ActivatedRoute);
  private api = inject(Api);
  private router = inject(Router);

  status: 'active' | 'inactive' = history.state?.status ?? 'inactive';

  private _loading = signal(true);
  private _error = signal(false);
  private _user = signal<User | null>(null);

  loading = true;
  error = false;
  user: User | null = null;

  constructor() {
    this.route.paramMap
      .pipe(
        map((params) => params.get('id')),
        switchMap((id) => {
          if (!id) {
            this.setError();
            return of(null);
          }

          return this.api.GET<User>(`users/${id}`).pipe(
            catchError(() => {
              this.setError();
              return of(null);
            }),
          );
        }),
      )
      .subscribe((res) => {
        if (res) {
          this._user.set(res);
          this._loading.set(false);
          this.syncState();
        }
      });
  }

  private setError() {
    this._error.set(true);
    this._loading.set(false);
    this.syncState();
  }

  private syncState() {
    this.loading = this._loading();
    this.error = this._error();
    this.user = this._user();
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
