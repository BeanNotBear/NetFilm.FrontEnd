import {Component, Input} from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  @Input() isSearchVisible = true;
  @Input() searchQuery = "";

  onSearch() {

  }

  closeSearch() {
    this.isSearchVisible = false;
  }

  clearSearch() {

  }
}
