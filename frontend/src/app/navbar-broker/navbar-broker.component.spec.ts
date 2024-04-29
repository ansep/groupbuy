import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarBrokerComponent } from './navbar-broker.component';

describe('NavbarBrokerComponent', () => {
  let component: NavbarBrokerComponent;
  let fixture: ComponentFixture<NavbarBrokerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarBrokerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarBrokerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
