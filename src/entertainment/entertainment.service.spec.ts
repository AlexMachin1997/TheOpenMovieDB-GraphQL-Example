import { Test, TestingModule } from '@nestjs/testing';
import { EntertainmentService } from './entertainment.service';

describe('EntertainmentService', () => {
  let service: EntertainmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EntertainmentService],
    }).compile();

    service = module.get<EntertainmentService>(EntertainmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
