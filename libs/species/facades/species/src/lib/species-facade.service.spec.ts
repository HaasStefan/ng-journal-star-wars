import { TestBed } from '@angular/core/testing';
import { provideSpeciesFacadeService } from './species-facade.service';

import { SpeciesFacadeService } from './species-facade.service';

describe('SpeciesFacadeService', () => {
  let service: SpeciesFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideSpeciesFacadeService()],
    });
    service = TestBed.inject(SpeciesFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
