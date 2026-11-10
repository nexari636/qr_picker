import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteresListComponent } from './interes-list.component';

describe('InteresListComponent', () => {
  let component: InteresListComponent;
  let fixture: ComponentFixture<InteresListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InteresListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InteresListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
