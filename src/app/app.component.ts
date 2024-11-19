import {AfterViewInit, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink, RouterOutlet} from '@angular/router';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {HeaderComponent} from "../layout/header/header.component";
import {FooterComponent} from "../layout/footer/footer.component";
import {TableComponent} from "../views/table/table.component";
import {ColumnDirective} from "../views/table/components/column.directive";
import {CellDirective} from "../views/table/components/cell.directive";
import {HeaderDirective} from "../views/table/components/header.directive";
import {DashboardComponent} from "../views/dashboard/dashboard.component";
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,
    RouterLink,
    RouterOutlet,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    HeaderComponent,
    FooterComponent,
    TableComponent,
    ColumnDirective,
    CellDirective,
    HeaderDirective,
    DashboardComponent,
    NzTableModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzModalModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent{

  isDashBoard = true;

  constructor(private authService: AuthService) {
    const savedState = localStorage.getItem('isDashboard');
    this.isDashBoard = savedState ? JSON.parse(savedState) : true;
  }

  isCollapsed = false;
  ngOnInit(): void {

  }

  onOpenDashboard() {
    this.isDashBoard = false;
    localStorage.setItem('isDashboard', JSON.stringify(this.isDashBoard));
  }

  onCloseDashboard() {
    this.isDashBoard = true;
    localStorage.setItem('isDashboard', JSON.stringify(this.isDashBoard));
  }
}
