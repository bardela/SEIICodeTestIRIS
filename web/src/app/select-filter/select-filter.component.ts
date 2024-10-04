import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-select-filter',
  templateUrl: './select-filter.component.html'
})
export class SelectFilterComponent {
  @Input() label: string = '';
  @Input() options: any[] = [];
  @Output() selectedValue = new EventEmitter<any>;
  filter = new FormControl();

  selectChange(event: any): void {
    console.log('event:', event);
    this.selectedValue.emit(event);
  }
}