import { CommonModule } from '@angular/common';
import { Component, ElementRef, QueryList, ViewChildren, ChangeDetectorRef } from '@angular/core';
import { SidebarService } from '../../services/sidebar';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { combineLatest, Subscription } from 'rxjs';

type NavItem = {
  name: string;
  icon: string;
  path?: string;
  new?: boolean;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
})
export class SidebarComponent {
  navItems: NavItem[] = [
    {
      name: 'Dashboard',
      icon: '/images/dashboard.png',
      path: '/dashboard',
    },
    {
      name: 'Reports & Analytics',
      icon: '/images/report.png',
      path: '/reports-analytics',
      subItems: [
        { name: 'Performance Overview', path: '/reports-analytics/overview' },
        { name: 'Monthly Reports', path: '/reports-analytics/monthly' },
        { name: 'Custom Reports', path: '/reports-analytics/custom' },
      ],
    },
    {
      name: 'Users',
      icon: '/images/user.png',
      path: '/profile/:id',
    },
    {
      name: 'Emergency',
      icon: '/images/emergency.png',
      path: '/emergency',
    },
    {
      name: 'Complaints',
      icon: '/images/complaints.png',
      path: '/complaints',
    },
    {
      name: 'Attendance',
      icon: '/images/attendance.png',
      path: '/attendance',
    },
    {
      name: 'Leaves',
      icon: '/images/leaves.png',
      path: '/leaves',
    },
    {
      name: 'Hostel Mess',
      icon: '/images/hostel-mess.png',
      path: '/hostel-mess',
    },
    {
      name: 'Fees',
      icon: '/images/inr.png',
      path: '/fees',
    },
    {
      name: 'Amenities',
      icon: '/images/amenities.png',
      path: '/amenities',
    },
    {
      name: 'Inventory',
      icon: '/images/inventory.png',
      path: '/inventory',
    },
    {
      name: 'Visitors',
      icon: '/images/visitor.png',
      path: '/visitors',
    },
    {
      name: 'Community',
      icon: '/images/community.png',
      path: '/community',
    },
    {
      name: 'Laundry',
      icon: '/images/laundry.png',
      path: '/laundry',
    },
    {
      name: 'Rooms Allocation',
      icon: '/images/rooms-allocation.png',
      path: '/rooms-allocation',
    },
    {
      name: 'Parcel',
      icon: '/images/parcel.png',
      path: '/parcel',
    },
  ];

  openSubmenu: string | null | number = null;
  subMenuHeights: { [key: string]: number } = {};
  @ViewChildren('subMenu') subMenuRefs!: QueryList<ElementRef>;

  readonly isExpanded$;
  readonly isMobileOpen$;
  readonly isHovered$;

  private subscription: Subscription = new Subscription();

  constructor(
    public sidebarService: SidebarService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {
    this.isExpanded$ = this.sidebarService.isExpanded$;
    this.isMobileOpen$ = this.sidebarService.isMobileOpen$;
    this.isHovered$ = this.sidebarService.isHovered$;
  }

  ngOnInit() {
    this.subscription.add(
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.setActiveMenuFromRoute(this.router.url);
        }
      }),
    );

    this.subscription.add(
      combineLatest([this.isExpanded$, this.isMobileOpen$, this.isHovered$]).subscribe(
        ([isExpanded, isMobileOpen, isHovered]) => {
          if (!isExpanded && !isMobileOpen && !isHovered) {
            this.cdr.detectChanges();
          } else {
            // Restore saved heights when reopening
            // this.subMenuHeights = { ...this.savedSubMenuHeights };
            // this.cdr.detectChanges();
          }
        },
      ),
    );

    this.setActiveMenuFromRoute(this.router.url);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  isActive(path: string): boolean {
    return this.router.url === path;
  }

  toggleSubmenu(section: string, index: number) {
    const key = `${section}-${index}`;

    if (this.openSubmenu === key) {
      this.openSubmenu = null;
      this.subMenuHeights[key] = 0;
    } else {
      this.openSubmenu = key;

      setTimeout(() => {
        const el = document.getElementById(key);
        if (el) {
          this.subMenuHeights[key] = el.scrollHeight;
          this.cdr.detectChanges();
        }
      });
    }
  }

  onSidebarMouseEnter() {
    const expanded = this.sidebarService.isExpandedSnapshot();
    if (!expanded) {
      this.sidebarService.setHovered(true);
    }
  }

  private setActiveMenuFromRoute(currentUrl: string) {
    const menuGroups = [{ items: this.navItems, prefix: 'main' }];

    menuGroups.forEach((group) => {
      group.items.forEach((nav, i) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (currentUrl === subItem.path) {
              const key = `${group.prefix}-${i}`;
              this.openSubmenu = key;

              setTimeout(() => {
                const el = document.getElementById(key);
                if (el) {
                  this.subMenuHeights[key] = el.scrollHeight;
                  this.cdr.detectChanges();
                }
              });
            }
          });
        }
      });
    });
  }

  onSubmenuClick() {
    console.log('click submenu');
    this.isMobileOpen$
      .subscribe((isMobile) => {
        if (isMobile) {
          this.sidebarService.setMobileOpen(false);
        }
      })
      .unsubscribe();
  }
}
