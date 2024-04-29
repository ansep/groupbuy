import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarBuyerComponent } from './navbar-buyer.component';

describe('NavbarBuyerComponent', () => {
  let component: NavbarBuyerComponent;
  let fixture: ComponentFixture<NavbarBuyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarBuyerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
