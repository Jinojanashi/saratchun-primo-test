import { Test, TestingModule } from '@nestjs/testing';
import { CryptoController } from 'src/controller/crypto/crypto.controller';
import { CryptoService } from 'src/service/crypto/crypto.service';
import { DecryptDto } from 'src/shared/dto/decrypt.dto';
import { EncryptDto } from 'src/shared/dto/encrypt.dto';
describe('CryptoController', () => {
  let controller: CryptoController;
  let mockCryptoService: Partial<CryptoService>;
  beforeEach(async () => {
    mockCryptoService = {
      encrypt: jest.fn(),
      decrypt: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CryptoController],
      providers: [
        {
          provide: CryptoService,
          useValue: mockCryptoService,
        },
      ],
    }).compile();

    controller = module.get<CryptoController>(CryptoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('encrypt()', () => {
    it('should return successful response when encryption works', () => {
      const mockEncryptResult = {
        data1: 'test-data1',
        data2: 'test-data2',
      };
      (mockCryptoService.encrypt as jest.Mock).mockReturnValue(
        mockEncryptResult,
      );

      const dto: EncryptDto = { payload: 'Hello world' };
      const result = controller.encrypt(dto);

      expect(result).toEqual({
        successful: true,
        error_code: '',
        data: mockEncryptResult,
      });
      expect(mockCryptoService.encrypt).toHaveBeenCalledWith('Hello world');
    });

    it('should return error response when encryption fails', () => {
      (mockCryptoService.encrypt as jest.Mock).mockImplementation(() => {
        throw new Error('Encryption failed');
      });

      const dto: EncryptDto = { payload: 'Broken' };
      const result = controller.encrypt(dto);

      expect(result.successful).toBe(false);
      expect(result.error_code).toBe('ENCRYPT_FAILED');
      expect(result.data).toBe('Encryption failed');
    });
  });

  describe('decrypt()', () => {
    it('should return successful response when decryption works', () => {
      const mockDecryptResult = {
        payload: 'decrypted text',
      };
      (mockCryptoService.decrypt as jest.Mock).mockReturnValue(
        mockDecryptResult,
      );

      const dto: DecryptDto = {
        data1: 'data1',
        data2: 'data2',
      };

      const result = controller.decrypt(dto);

      expect(result).toEqual({
        successful: true,
        error_code: '',
        data: mockDecryptResult,
      });
      expect(mockCryptoService.decrypt).toHaveBeenCalledWith('data1', 'data2');
    });

    it('should return error response when decryption fails', () => {
      (mockCryptoService.decrypt as jest.Mock).mockImplementation(() => {
        throw new Error('Decryption failed');
      });

      const dto: DecryptDto = {
        data1: 'broken1',
        data2: 'broken2',
      };

      const result = controller.decrypt(dto);

      expect(result.successful).toBe(false);
      expect(result.error_code).toBe('DECRYPT_FAILED');
      expect(result.data).toBe('Decryption failed');
    });
  });
});
