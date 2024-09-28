import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerEditListingComponent } from './broker-edit-listing.component';

describe('BrokerEditListingComponent', () => {
  let component: BrokerEditListingComponent;
  let fixture: ComponentFixture<BrokerEditListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrokerEditListingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BrokerEditListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
