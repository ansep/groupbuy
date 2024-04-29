import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardUnloggedComponent } from './dashboard-unlogged.component';

describe('DashboardUnloggedComponent', () => {
  let component: DashboardUnloggedComponent;
  let fixture: ComponentFixture<DashboardUnloggedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardUnloggedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardUnloggedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
