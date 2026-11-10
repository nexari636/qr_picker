import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursoGaleriaListComponent } from './recurso-galeria-list.component';

describe('RecursoGaleriaListComponent', () => {
  let component: RecursoGaleriaListComponent;
  let fixture: ComponentFixture<RecursoGaleriaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecursoGaleriaListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecursoGaleriaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
