import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-subdivision-display-details',
  templateUrl: './subdivision-display-details.component.html',
})
export class SubdivisionDisplayDetailsComponent {
  @Input() subdivision: any;
  expanded = false;
}