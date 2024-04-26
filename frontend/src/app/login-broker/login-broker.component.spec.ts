import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginBrokerComponent } from './login-broker.component';

describe('LoginBrokerComponent', () => {
  let component: LoginBrokerComponent;
  let fixture: ComponentFixture<LoginBrokerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginBrokerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginBrokerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
