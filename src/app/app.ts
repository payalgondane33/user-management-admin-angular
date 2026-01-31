import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarService } from './shared/services/sidebar';
import { SidebarComponent } from './shared/layout/sidebar/sidebar';
import { HeaderComponent } from './shared/layout/header/header';
import { BackdropComponent } from './shared/layout/backdrop/backdrop';
import { Footer } from './shared/layout/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SidebarComponent,
    HeaderComponent,
    BackdropComponent,
    Footer,
  ],
  templateUrl: './app.html',
})
export class App {
  title = signal('user-management-admin');

  readonly isExpanded$;
  readonly isHovered$;
  readonly isMobileOpen$;

  constructor(private sidebarService: SidebarService) {
    this.isExpanded$ = this.sidebarService.isExpanded$;
    this.isHovered$ = this.sidebarService.isHovered$;
    this.isMobileOpen$ = this.sidebarService.isMobileOpen$;
  }
}
