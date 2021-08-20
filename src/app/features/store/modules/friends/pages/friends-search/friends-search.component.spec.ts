import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsSearchComponent } from './friends-search.component';

describe('FriendsSearchComponent', () => {
  let component: FriendsSearchComponent;
  let fixture: ComponentFixture<FriendsSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendsSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
