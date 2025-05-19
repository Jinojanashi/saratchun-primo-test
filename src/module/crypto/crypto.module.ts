import { Module } from '@nestjs/common';
import { CryptoService } from '../../service/crypto/crypto.service';
import { CryptoController } from '../../controller/crypto/crypto.controller';

@Module({
  providers: [CryptoService],
  controllers: [CryptoController]
})
export class CryptoModule {}
