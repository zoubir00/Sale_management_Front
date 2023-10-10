import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenteDetailComponent } from './vente-detail.component';

describe('VenteDetailComponent', () => {
  let component: VenteDetailComponent;
  let fixture: ComponentFixture<VenteDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VenteDetailComponent]
    });
    fixture = TestBed.createComponent(VenteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
