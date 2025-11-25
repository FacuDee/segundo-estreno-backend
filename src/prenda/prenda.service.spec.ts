import { Test, TestingModule } from '@nestjs/testing';
import { PrendaService } from './prenda.service';

describe('PrendaService', () => {
  let service: PrendaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrendaService],
    }).compile();

    service = module.get<PrendaService>(PrendaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
