import { Test, TestingModule } from '@nestjs/testing';
import { TransaccionController } from './transaccion.controller';

describe('TransaccionController', () => {
  let controller: TransaccionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransaccionController],
    }).compile();

    controller = module.get<TransaccionController>(TransaccionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
