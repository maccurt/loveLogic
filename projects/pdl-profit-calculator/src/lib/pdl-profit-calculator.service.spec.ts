import { TestBed } from '@angular/core/testing';

import { PdlProfitCalculatorService } from './pdl-profit-calculator.service';

describe('PdlProfitCalculatorService', () => {
  let service: PdlProfitCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PdlProfitCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
