import { TestBed, inject } from '@angular/core/testing';

import { AppEffects } from './app.effects';

describe('AppEffectsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppEffects]
    });
  });

  it('should be created', inject([AppEffects], (service: AppEffects) => {
    expect(service).toBeTruthy();
  }));
});
