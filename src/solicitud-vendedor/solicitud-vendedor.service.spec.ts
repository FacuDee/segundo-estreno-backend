import { Test, TestingModule } from '@nestjs/testing';
import { SolicitudVendedorService } from './solicitud-vendedor.service';

describe('SolicitudVendedorService', () => {
  let service: SolicitudVendedorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SolicitudVendedorService],
    }).compile();

    service = module.get<SolicitudVendedorService>(SolicitudVendedorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
