import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubdivisionDataDisplayComponent } from './subdivision-data-display.component';
import { SubdivisionService } from "../services/subdivision.service";
import { of } from "rxjs";

describe('SubdivisionDataDisplayComponent', () => {
  let component: SubdivisionDataDisplayComponent;
  let fixture: ComponentFixture<SubdivisionDataDisplayComponent>;

  const valueSubdivisions = subdivisionsForTest(2);

  beforeEach(async () => {
    const subdivisionServiceMock: Pick<SubdivisionService, 'getSubdivisions'> = {
      async getSubdivisions(): Promise<any> {
        return of(valueSubdivisions);
      },
    };
    spyOn(subdivisionServiceMock, 'getSubdivisions').and.resolveTo(valueSubdivisions);

    await TestBed.configureTestingModule({
      providers: [
        SubdivisionService,
        { provide: SubdivisionService, useValue: subdivisionServiceMock }
      ],
      declarations: [ SubdivisionDataDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubdivisionDataDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('render 2 subdivisions using mock service', () => {
    const [ expectedPages, expectedNumber ] = valueSubdivisions as [any[], number];
    expect(component.page.length).toEqual(expectedNumber);
    for (let i = 0; i < expectedNumber ; i++) {
      assertRenderTestSubdivisions(component.page[i], expectedPages[i])
    }
  });

  // @TODO test sort by name, desc
  // Trigger sort by name,desc
  // check if results are sorted by name

  // @TODO test filter by status = Active
  // Trigger filter status = 'Active'
  // check if results contains only 'Active'

  // @TODO test filter by status = Future
  // Trigger filter status = 'Future'
  // check if results contains only 'Future'

  // @TODO test filter by status = BuiltOn
  // Trigger filter status = 'BuiltOn'
  // check if results contains only 'BuiltOn'

  // @TODO test pagination page 1
  // Overwrite pageSize = 1
  // check if first page contains only the first row

  // @TODO test pagination page 2
  // Overwrite pageSize = 1
  // check if first page contains only second row
});

function assertRenderTestSubdivisions(a: any, b: any) {
  expect(a.id).toEqual(b.id);
  expect(a.name).toEqual(b.name);
  expect(a.subdivisionStatusCode).toEqual(b.subdivisionStatusCode);
  expect(a.nearMapImageDate).toEqual(b.nearMapImageDate);
}

function subdivisionsForTest(numberOfSubdivisions: number) {
  const subdivisions: any[] = [];
  [...Array(numberOfSubdivisions).keys()]
    .forEach( i => subdivisions.push(createSubdivisionFromIndex(i)));
  return [ subdivisions, subdivisions.length ];
}

function createSubdivisionFromIndex(index: number) {
  const alphabet = [...'abcdefghijklmnopqrstuvwxyz'];
  const statuses = ['Active', 'Future', 'Builtout'];

  const id = index + '';
  const name = alphabet.at(index)!;
  const code = name;
  const subdivisionStatusCode = statuses.at( index % statuses.length)!;
  const nearMapImageDate = new Date(2024, 0, index).toISOString();
  return {
    id,
    name,
    code,
    subdivisionStatusCode,
    nearMapImageDate
  }
}