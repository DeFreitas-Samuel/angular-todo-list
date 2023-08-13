import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificTaskListComponent } from './specific-task-list.component';

describe('SpecificTaskListComponent', () => {
  let component: SpecificTaskListComponent;
  let fixture: ComponentFixture<SpecificTaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificTaskListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecificTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
