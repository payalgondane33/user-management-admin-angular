import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Api } from '../../shared/services/api';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashoard.html',
})
export class DashoardComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];

  loading = false;
  error: string | null = null;

  searchTerm = '';
  activeTab: 'all' | 'active' | 'inactive' = 'all';

  constructor(
    private api: Api,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.loading = true;

    this.api.GET<any[]>('users').subscribe({
      next: (data) => {
        this.users = data.map((user) => ({
          ...user,
          status: Math.random() > 0.5 ? 'active' : 'inactive',
        }));

        this.applyFilters();
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load users';
        this.loading = false;
      },
    });
  }

  applyFilters(): void {
    this.filteredUsers = this.users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesStatus = this.activeTab === 'all' || user.status === this.activeTab;

      return matchesSearch && matchesStatus;
    });
  }

  changeTab(tab: 'all' | 'active' | 'inactive'): void {
    this.activeTab = tab;
    this.applyFilters();
  }

  viewProfile(user: any): void {
    this.router.navigate(['/profile', user.id], {
      state: {
        status: user.status,
      },
    });
  }
}
