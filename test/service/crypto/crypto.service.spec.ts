import { Test, TestingModule } from '@nestjs/testing';
import { CryptoService } from 'src/service/crypto/crypto.service';
import * as fs from 'fs';
import * as path from 'path';

jest.setTimeout(10000);

describe('CryptoService', () => {
  let service: CryptoService;
  let privateKey: string;
  let publicKey: string;

  beforeAll(() => {
    privateKey = fs.readFileSync(
      path.resolve(__dirname, '../../../src/shared/key/private.pem'),
      'utf8',
    );
    publicKey = fs.readFileSync(
      path.resolve(__dirname, '../../../src/shared/key/public.pem'),
      'utf8',
    );

    jest.spyOn(fs, 'readFileSync').mockImplementation((filePath: string) => {
      if (filePath.includes('private.pem')) {
        return privateKey;
      } else if (filePath.includes('public.pem')) {
        return publicKey;
      }
      return '';
    });
  });
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CryptoService],
    }).compile();

    service = module.get<CryptoService>(CryptoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should encrypt and decrypt payload correctly', () => {
    const payload = 'Hello, unit test secret!';
    const { data1, data2 } = service.encrypt(payload);

    expect(data1).toBeDefined();
    expect(data2).toBeDefined();

    const result = service.decrypt(data1, data2);
    expect(result.payload).toBe(payload);
  });

  it('should throw error if data2 is tampered', () => {
    const payload = 'Tamper test!';
    const { data1, data2 } = service.encrypt(payload);

    const brokenData2 = data2.slice(0, -4) + 'xxxx';

    expect(() => {
      service.decrypt(data1, brokenData2);
    }).toThrow();
  });
});
