import * as forge from 'node-forge';
import * as fs from 'fs';
import * as crypto from 'crypto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CryptoService {
  private publicKey: string;
  private privateKey: string;

  constructor() {
    this.publicKey = fs.readFileSync('src/shared/key/public.pem', 'utf8');
    this.privateKey = fs.readFileSync('src/shared/key/private.pem', 'utf8');
  }

  encrypt(payload: string) {
    const aesKey = crypto.randomBytes(32);

    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', aesKey, iv);
    let encrypted = cipher.update(payload, 'utf8', 'base64');
    encrypted += cipher.final('base64');

    const encryptedPayload = iv.toString('base64') + ':' + encrypted;

    const encryptedAesKey = forge.util.encode64(
      forge.pki
        .publicKeyFromPem(this.publicKey)
        .encrypt(aesKey.toString('binary')),
    );

    return {
      data1: encryptedPayload,
      data2: encryptedAesKey,
    };
  }

  decrypt(data1: string, data2: string) {
    const decryptedAesKeyBinary = forge.pki
      .privateKeyFromPem(this.privateKey)
      .decrypt(forge.util.decode64(data2));
    const aesKey = Buffer.from(decryptedAesKeyBinary, 'binary');

    const [ivEncoded, encrypted] = data1.split(':');
    const iv = Buffer.from(ivEncoded, 'base64');
    const decipher = crypto.createDecipheriv('aes-256-cbc', aesKey, iv);
    let decrypted = decipher.update(encrypted, 'base64', 'utf8');
    decrypted += decipher.final('utf8');

    return { payload: decrypted };
  }
}
