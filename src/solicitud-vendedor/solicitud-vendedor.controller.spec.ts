import { Test, TestingModule } from '@nestjs/testing';
import { SolicitudVendedorController } from './solicitud-vendedor.controller';

describe('SolicitudVendedorController', () => {
  let controller: SolicitudVendedorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SolicitudVendedorController],
    }).compile();

    controller = module.get<SolicitudVendedorController>(SolicitudVendedorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
