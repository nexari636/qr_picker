import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaleriaFormComponent } from './galeria-form.component';

describe('GaleriaFormComponent', () => {
  let component: GaleriaFormComponent;
  let fixture: ComponentFixture<GaleriaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GaleriaFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GaleriaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
