import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarService } from '../../services/sidebar';
import { ClickOutsideDirective } from '../../../directives/click-outside';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ClickOutsideDirective],
  templateUrl: './header.html',
})
export class HeaderComponent {
  readonly isMobileOpen$: any;
  isApplicationMenuOpen = false;
  isNotificationOpen = false;
  isUserMenuOpen = false;
  constructor(
    private sidebarService: SidebarService,
    private router: Router,
  ) {
    this.isMobileOpen$ = this.sidebarService.isMobileOpen$;
  }

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.isApplicationMenuOpen = false;
    });
  }

  handleToggle(): void {
    if (window.innerWidth >= 1024) {
      this.sidebarService.toggleExpanded();
    } else {
      this.sidebarService.toggleMobileOpen();
    }
  }

  toggleNotification() {
    this.isNotificationOpen = !this.isNotificationOpen;
    this.isUserMenuOpen = false;
  }

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
    this.isNotificationOpen = false;
  }

  toggleApplicationMenu() {
    this.isApplicationMenuOpen = !this.isApplicationMenuOpen;
    this.isNotificationOpen = false;
    this.isUserMenuOpen = false;
  }
}
