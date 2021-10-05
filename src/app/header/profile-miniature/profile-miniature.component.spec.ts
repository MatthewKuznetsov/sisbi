import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileMiniatureComponent } from './profile-miniature.component';

describe('ProfileMiniatureComponent', () => {
  let component: ProfileMiniatureComponent;
  let fixture: ComponentFixture<ProfileMiniatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileMiniatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileMiniatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
