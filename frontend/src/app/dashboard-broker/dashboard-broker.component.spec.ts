import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardBrokerComponent } from './dashboard-broker.component';

describe('DashboardBrokerComponent', () => {
  let component: DashboardBrokerComponent;
  let fixture: ComponentFixture<DashboardBrokerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardBrokerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardBrokerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
