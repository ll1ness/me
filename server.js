const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const PUBLIC_DIR = path.join(__dirname);

// MIME types for common file extensions
const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.webp': 'image/webp'
};

// Create server
const server = http.createServer((req, res) => {
    // Parse the requested URL
    const parsedUrl = url.parse(req.url);
    let pathname = parsedUrl.pathname;
    
    // Default to index.html for root path
    if (pathname === '/') {
        pathname = '/index.html';
    }
    
    // Resolve the file path
    const filePath = path.join(PUBLIC_DIR, pathname);
    
    // Prevent directory traversal attacks
    if (!filePath.startsWith(PUBLIC_DIR)) {
        if (NODE_ENV === 'development') {
            console.log(`Forbidden access attempt: ${filePath}`);
        }
        res.writeHead(403, { 'Content-Type': 'text/html' });
        res.end('<h1>403 Forbidden</h1>');
        return;
    }
    
    // Get the file extension
    const ext = path.parse(filePath).ext;
    
    // Set default MIME type
    const mimeType = MIME_TYPES[ext] || 'application/octet-stream';
    
    // Read and serve the file
    fs.readFile(filePath, (err, data) => {
        if (err) {
            // File not found or other error
            if (err.code === 'ENOENT') {
                // Try to serve index.html for non-existent files (for SPA routing)
                const indexPath = path.join(PUBLIC_DIR, 'index.html');
                fs.readFile(indexPath, (err, data) => {
                    if (err) {
                        // index.html also not found
                        if (NODE_ENV === 'development') {
                            console.log(`404: ${filePath}`);
                        }
                        res.writeHead(404, { 'Content-Type': 'text/html' });
                        res.end('<h1>404 Not Found</h1>');
                    } else {
                        // Serve index.html
                        if (NODE_ENV === 'development') {
                            console.log(`Fallback to index.html for: ${req.url}`);
                        }
                        res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.end(data);
                    }
                });
            } else {
                // Server error
                if (NODE_ENV === 'development') {
                    console.error(`Server error: ${err.code}`, err);
                }
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal server error');
            }
        } else {
            // File found
            res.writeHead(200, { 'Content-Type': mimeType });
            res.end(data);
            
            // Log request in development
            if (NODE_ENV === 'development') {
                console.log(`${res.statusCode} ${req.method} ${req.url}`);
            }
        }
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`\nServer running in ${NODE_ENV} mode at http://localhost:${PORT}/`);
    console.log('Press Ctrl+C to stop the server');
});

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\nShutting down server...');
    server.close(() => {
        console.log('Server stopped');
        process.exit(0);
    });
});