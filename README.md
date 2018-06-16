# backend
Backend

## Installation
Install the dependencies and devDependencies and start the server.
```
npm install
npm start
```

For production environment:
```
npm install --production
NODE_ENV=production npm start
```

### Environment Variables

| Name | Default | Usage |
| ------ | ------ | ------ |
| DB_URI |  | MongoDB URI |
| PRIVATE_KEY |  | Private key for Cloud Firestore |
| PRIVATE_KEY_ID |  | Private key ID for Cloud Firestore |
| NODE_ENV |  | Set `production` in production environment and `test` for mocha test cases |
| PORT |  | API exposed at this port |
| TOKEN_TTL | `3600` | JSON web token expiry (seconds) |

## API Specification

[Here](API.md)
