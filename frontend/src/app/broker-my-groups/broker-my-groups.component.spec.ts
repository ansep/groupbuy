import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerMyGroupsComponent } from './broker-my-groups.component';

describe('BrokerMyGroupsComponent', () => {
  let component: BrokerMyGroupsComponent;
  let fixture: ComponentFixture<BrokerMyGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrokerMyGroupsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BrokerMyGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
