import { Component, EventEmitter, Input, Output } from "@angular/core";
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
    this.selectedValue.emit(event);
  }
}