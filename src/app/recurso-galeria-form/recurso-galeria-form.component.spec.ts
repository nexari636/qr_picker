import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursoGaleriaFormComponent } from './recurso-galeria-form.component';

describe('RecursoGaleriaFormComponent', () => {
  let component: RecursoGaleriaFormComponent;
  let fixture: ComponentFixture<RecursoGaleriaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecursoGaleriaFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecursoGaleriaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
