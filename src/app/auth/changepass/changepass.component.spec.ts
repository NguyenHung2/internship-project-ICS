import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangepassComponent } from './changepass.component';

describe('ChangepassComponent', () => {
  let component: ChangepassComponent;
  let fixture: ComponentFixture<ChangepassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangepassComponent]
    });
    fixture = TestBed.createComponent(ChangepassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
