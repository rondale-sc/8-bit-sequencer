import express from 'express'
import path,  { dirname } from 'path';

import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

const router = express.Router()

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'), { maxAge: 0 });
});

export { router as indexRoute };
