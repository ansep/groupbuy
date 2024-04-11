import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenGroupsListComponent } from './open-groups-list.component';

describe('OpenGroupsListComponent', () => {
  let component: OpenGroupsListComponent;
  let fixture: ComponentFixture<OpenGroupsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenGroupsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OpenGroupsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
