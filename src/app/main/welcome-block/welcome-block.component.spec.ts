import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeBlockComponent } from './welcome-block.component';

describe('WelcomeBlockComponent', () => {
  let component: WelcomeBlockComponent;
  let fixture: ComponentFixture<WelcomeBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomeBlockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomeBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
