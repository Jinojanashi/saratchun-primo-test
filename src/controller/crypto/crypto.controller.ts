import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CryptoService } from 'src/service/crypto/crypto.service';
import { DecryptDto } from 'src/shared/dto/decrypt.dto';
import { EncryptDto } from 'src/shared/dto/encrypt.dto';
import {
  CRYPTO_TAG,
  decryptDataSwagger,
  encryptDataSwagger,
} from 'swagger/crypto.swagger';

@ApiTags(CRYPTO_TAG.name)
@Controller()
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) {}

  @Post('get-encrypt-data')
  @ApiBody(encryptDataSwagger)
  encrypt(@Body() body: EncryptDto) {
    try {
      const result = this.cryptoService.encrypt(body.payload);
      return {
        successful: true,
        error_code: '',
        data: result,
      };
    } catch (ex) {
      return {
        successful: false,
        error_code: 'ENCRYPT_FAILED',
        data: ex.message || 'Unknown error',
      };
    }
  }

  @Post('get-decrypt-data')
  @ApiBody(decryptDataSwagger)
  decrypt(@Body() body: DecryptDto) {
    try {
      const result = this.cryptoService.decrypt(body.data1, body.data2);
      return {
        successful: true,
        error_code: '',
        data: result,
      };
    } catch (ex) {
      return {
        successful: false,
        error_code: 'DECRYPT_FAILED',
        data: ex.message || 'Unknown error',
      };
    }
  }
}
