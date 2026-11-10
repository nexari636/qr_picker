import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteresFormComponent } from './interes-form.component';

describe('InteresFormComponent', () => {
  let component: InteresFormComponent;
  let fixture: ComponentFixture<InteresFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InteresFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InteresFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
