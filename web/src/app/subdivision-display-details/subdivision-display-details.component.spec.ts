import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubdivisionDisplayDetailsComponent } from "./subdivision-display-details.component";


describe('SubdivisionDisplayDetailsComponent', () => {
  let component: SubdivisionDisplayDetailsComponent;
  let fixture: ComponentFixture<SubdivisionDisplayDetailsComponent>;
  const subdivision = {
    id: '42',
    code:'HUQ',
    name: 'Test',
    subdivisionStatusCode: 'Active',
    nearMapImageDate: new Date().toISOString()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubdivisionDisplayDetailsComponent ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SubdivisionDisplayDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('render subdivision', () => {
    component.subdivision = subdivision;
    fixture.detectChanges();
    const { debugElement } = fixture;
    const { nativeElement } = debugElement;
    checkSubdivision(nativeElement.textContent, subdivision)
  });

  //@TODO: test click show more
  // check if button exists when there are results
  // Trigger click in the button "show more" and check if it displays more fields

  //@TODO: test click show less
  // check if button exists when it was expanded(show more)
  // Trigger click in the button "show less" and check that it hides the expanded fields
});

function checkSubdivision(textContent: string, subdivision: any) {
  expect(textContent).toContain(subdivision.id);
  expect(textContent).toContain(subdivision.name);
  expect(textContent).toContain(subdivision.code);
  expect(textContent).toContain(subdivision.subdivisionStatusCode);
  expect(textContent).toContain(subdivision.nearMapImageDate);
}
