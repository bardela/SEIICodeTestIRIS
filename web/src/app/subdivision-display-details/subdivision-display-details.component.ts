import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: 'app-subdivision-display-details',
  templateUrl: './subdivision-display-details.component.html',
})
export class SubdivisionDisplayDetailsComponent implements OnInit {
  @Input() subdivision: any;
  expanded = false;

  ngOnInit(): void {
  }
}