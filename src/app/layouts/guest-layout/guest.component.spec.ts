import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestLayoutComponent } from './guest.component';

describe('GuestLayoutComponent', () => {
  let component: GuestLayoutComponent;
  let fixture: ComponentFixture<GuestLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuestLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
