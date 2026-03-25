const express = require('express');
const path = require('path');
const app = express();

// Set MIME types for Brotli files
app.set('view engine', 'html');

// Middleware to set correct headers for .br files
app.use((req, res, next) => {
  if (req.url.endsWith('.br')) {
    res.set('Content-Encoding', 'br');
    
    // Set correct content type based on filename
    if (req.url.endsWith('.js.br')) {
      res.set('Content-Type', 'application/javascript');
    } else if (req.url.endsWith('.wasm.br')) {
      res.set('Content-Type', 'application/wasm');
    } else if (req.url.endsWith('.data.br')) {
      res.set('Content-Type', 'application/octet-stream');
    }
  }
  next();
});

// Serve static files from current directory
app.use(express.static(__dirname));

// Fallback to index.html for SPA
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log('Note: Some browsers may require HTTPS for full functionality');
});
