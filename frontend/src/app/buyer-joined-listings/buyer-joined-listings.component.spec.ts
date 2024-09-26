import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerJoinedListingsComponent } from './buyer-joined-listings.component';

describe('BuyerJoinedListingsComponent', () => {
  let component: BuyerJoinedListingsComponent;
  let fixture: ComponentFixture<BuyerJoinedListingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyerJoinedListingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuyerJoinedListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
