import { Component, OnInit } from '@angular/core';
import { SubdivisionService } from "../services/subdivision.service";

@Component({
  selector: 'app-subdivision-data-display',
  templateUrl: './subdivision-data-display.component.html',
  styleUrls: ['./subdivision-data-display.component.css'],
})
export class SubdivisionDataDisplayComponent implements OnInit {

  readonly PAGE_SIZE = 2;
  readonly FILTER_VALUES = [
    { label:'Active', value: 'Active' },
    { label: 'Future', value: 'Future' },
    { label: 'Builtout', value: 'Builtout' }
  ];
  readonly SORT_VALUES = [
    { label:'name, ASC', value: 'name' },
    { label:'name, DESC', value: '-name' },
    { label:'nearMapImageDate, ASC', value: 'nearMapImageDate' },
    { label:'-nearMapImageDate, DESC', value: '-nearMapImageDate' }
  ];

  public page: any[] = [];
  public numberOfResults = this.page.length;
  public  criteria: Criteria = {
    filter: '',
    pageIndex: 0,
    pageSize: this.PAGE_SIZE,
    sortField: '',
  } as Criteria;

  constructor(private subdivisionService: SubdivisionService) { }

  async ngOnInit() {
    await this.updateResults();
  }

  async updateResults() {
    const [subdivisions, size] = await this.subdivisionService.getSubdivisions(this.criteria);
    this.page = subdivisions;
    this.numberOfResults = size;
  }

  async handlePagination(event: any) {
    this.criteria.pageIndex = event.pageIndex;
    await this.updateResults()
  }

  async updateFilter(event: any) {
    this.criteria.filter = event;
    this.criteria.pageIndex = 0;
    await this.updateResults();
  }

  async updateSort(event: any) {
    this.criteria.sortField = event;
    this.criteria.pageIndex = 0;
    await this.updateResults();
  }
}

interface Criteria {
  filter: any,
  pageIndex: number,
  pageSize: number,
  sortField: 'name' | '-name' | 'nearMapImageDate' | '-nearMapImageDate' | ''
}