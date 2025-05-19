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
  - shared
    - dto
    - key //contains .pem keys
- swagger/crypto.swagger.ts
- test
  - controller
    - crypto/crypto.controller.spec.ts
  - service
    - crypto/crypto.service.spec.ts

## Swagger

- Swagger: http://localhost:3000/api-docs

- POST /get-encrypt-data
- POST /get-decrypt-data
