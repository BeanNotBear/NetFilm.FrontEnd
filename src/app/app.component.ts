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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, NzIconModule, NzLayoutModule, NzMenuModule, HeaderComponent, FooterComponent, TableComponent, ColumnDirective, CellDirective, HeaderDirective, DashboardComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  constructor() {
  }

  isCollapsed = false;

  ngOnInit(): void {

  }
}
