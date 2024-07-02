import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerNewListingComponent } from './broker-new-listing.component';

describe('BrokerNewListingComponent', () => {
  let component: BrokerNewListingComponent;
  let fixture: ComponentFixture<BrokerNewListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrokerNewListingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BrokerNewListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
