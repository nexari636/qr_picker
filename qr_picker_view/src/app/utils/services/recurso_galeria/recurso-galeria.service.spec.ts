import { TestBed } from '@angular/core/testing';

import { RecursoGaleriaService } from './recurso-galeria.service';

describe('RecursoGaleriaService', () => {
  let service: RecursoGaleriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecursoGaleriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
