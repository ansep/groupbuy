import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerModuleSingleGroupComponent } from './broker-module-single-group.component';

describe('BrokerModuleSingleGroupComponent', () => {
  let component: BrokerModuleSingleGroupComponent;
  let fixture: ComponentFixture<BrokerModuleSingleGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrokerModuleSingleGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BrokerModuleSingleGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
