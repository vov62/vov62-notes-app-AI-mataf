import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoiceNote } from './voice-note';

describe('VoiceNote', () => {
  let component: VoiceNote;
  let fixture: ComponentFixture<VoiceNote>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VoiceNote]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoiceNote);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
