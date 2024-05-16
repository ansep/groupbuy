import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleGroupListingComponent } from './single-group-listing.component';

describe('SingleGroupListingComponent', () => {
  let component: SingleGroupListingComponent;
  let fixture: ComponentFixture<SingleGroupListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleGroupListingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleGroupListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
