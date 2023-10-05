import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVenteComponent } from './create-vente.component';

describe('CreateVenteComponent', () => {
  let component: CreateVenteComponent;
  let fixture: ComponentFixture<CreateVenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateVenteComponent]
    });
    fixture = TestBed.createComponent(CreateVenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
