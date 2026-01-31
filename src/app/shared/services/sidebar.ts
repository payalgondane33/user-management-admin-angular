import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private isExpandedSubject = new BehaviorSubject<boolean>(true);
  private isMobileOpenSubject = new BehaviorSubject<boolean>(false);
  private isHoveredSubject = new BehaviorSubject<boolean>(false);

  readonly isExpanded$ = this.isExpandedSubject.asObservable();
  readonly isMobileOpen$ = this.isMobileOpenSubject.asObservable();
  readonly isHovered$ = this.isHoveredSubject.asObservable();

  /* ---------- setters ---------- */
  setExpanded(val: boolean): void {
    this.isExpandedSubject.next(val);
  }

  toggleExpanded(): void {
    this.isExpandedSubject.next(!this.isExpandedSubject.value);
  }

  setMobileOpen(val: boolean): void {
    this.isMobileOpenSubject.next(val);
  }

  toggleMobileOpen(): void {
    this.isMobileOpenSubject.next(!this.isMobileOpenSubject.value);
  }

  setHovered(val: boolean): void {
    this.isHoveredSubject.next(val);
  }

  isExpandedSnapshot(): boolean {
    return this.isExpandedSubject.value;
  }

  isMobileOpenSnapshot(): boolean {
    return this.isMobileOpenSubject.value;
  }

  isHoveredSnapshot(): boolean {
    return this.isHoveredSubject.value;
  }
}
