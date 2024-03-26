import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerHomeComponent } from './broker-home.component';

describe('BrokerHomeComponent', () => {
  let component: BrokerHomeComponent;
  let fixture: ComponentFixture<BrokerHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrokerHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BrokerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
