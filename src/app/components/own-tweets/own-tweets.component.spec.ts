import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnTweetsComponent } from './own-tweets.component';

describe('OwnTweetsComponent', () => {
  let component: OwnTweetsComponent;
  let fixture: ComponentFixture<OwnTweetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnTweetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnTweetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
