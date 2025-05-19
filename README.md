# Prerequisite

- NodeJS
- Git
- VS Code
- Nest CLI

## How to Start

- `npm install`
- `npm run start:dev`

## Project Structure

- src
  - controller
    - crypto/crypto.controller.ts
  - service
    - crypto/crypto.service.ts
    - merge/merge.ts ---for test number 14---
  - shared
    - dto
    - key //contains .pem keys
- swagger/crypto.swagger.ts
- test
  - controller
    - crypto/crypto.controller.spec.ts
  - service
    - crypto/crypto.service.spec.ts
    - merge/merge.spec.ts ---for test number 14---

# Test Number 13

## Swagger

- Swagger: http://localhost:3000/api-docs

- POST /get-encrypt-data
- POST /get-decrypt-data

# Test Number 14

- Insert input in test file (test/service/merge/spec.ts)
- using `npm run test` to run test and see result
