import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckBoxSettingsComponent } from './check-box-settings.component';

describe('CheckBoxSettingsComponent', () => {
  let component: CheckBoxSettingsComponent;
  let fixture: ComponentFixture<CheckBoxSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckBoxSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckBoxSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
