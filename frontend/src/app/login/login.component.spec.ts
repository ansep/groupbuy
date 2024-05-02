import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginBuyerComponent } from './login.component';

describe('LoginBuyerComponent', () => {
  let component: LoginBuyerComponent;
  let fixture: ComponentFixture<LoginBuyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginBuyerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
