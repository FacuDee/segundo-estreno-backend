import { Test, TestingModule } from '@nestjs/testing';
import { PrendaController } from './prenda.controller';

describe('PrendaController', () => {
  let controller: PrendaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrendaController],
    }).compile();

    controller = module.get<PrendaController>(PrendaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
