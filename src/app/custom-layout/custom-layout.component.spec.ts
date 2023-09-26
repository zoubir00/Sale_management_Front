import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomLayoutComponent } from './custom-layout.component';

describe('CustomLayoutComponent', () => {
  let component: CustomLayoutComponent;
  let fixture: ComponentFixture<CustomLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomLayoutComponent]
    });
    fixture = TestBed.createComponent(CustomLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
