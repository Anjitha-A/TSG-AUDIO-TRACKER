import { TestBed } from '@angular/core/testing';

import { EditAudioService } from './edit-audio.service';

describe('EditAudioService', () => {
  let service: EditAudioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditAudioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
