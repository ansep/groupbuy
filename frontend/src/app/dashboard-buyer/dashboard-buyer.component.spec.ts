import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardBuyerComponent } from './dashboard-buyer.component';

describe('DashboardBuyerComponent', () => {
  let component: DashboardBuyerComponent;
  let fixture: ComponentFixture<DashboardBuyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardBuyerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
