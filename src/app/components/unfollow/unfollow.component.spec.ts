import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnfollowComponent } from './unfollow.component';

describe('UnfollowComponent', () => {
  let component: UnfollowComponent;
  let fixture: ComponentFixture<UnfollowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnfollowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnfollowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
