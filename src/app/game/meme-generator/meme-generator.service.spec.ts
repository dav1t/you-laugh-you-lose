/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MemeGeneratorService } from './meme-generator.service';

describe('Service: MemeGenerator', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MemeGeneratorService]
    });
  });

  it('should ...', inject([MemeGeneratorService], (service: MemeGeneratorService) => {
    expect(service).toBeTruthy();
  }));
});
