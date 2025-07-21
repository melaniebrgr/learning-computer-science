import { createServer } from 'node:http';
import cookie from 'cookie';

const home = (_, res) => {
    res.writeHead(200, { 
      'Content-Type': 'text/html',
      'Set-Cookie': [
        'week14.2=cookie-set-by-server-home-page;',
        'week14.3=everything-cookie; HttpOnly; SameSite=Strict; path=/; Domain=127.0.0.1; Max-Age=5; Secure;',
      ]
    });
    res.end(`
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <title>Week 14: Cookies</title>
        <script>
          document.cookie = 'week14.1=cookie-set-by-client';
        </script>
      </head>
      <body>
        <h1>Week 14: Magic Cookies</h1>
        <a href="/about">about</a>
      </body>
      </html>
    `);
};

const about = (_, res) => {
  res.writeHead(200, { 
    'Content-Type': 'text/plain',
    'Set-Cookie': 'week14.4=cookie-set-by-server-about-page; path=/about;'
  });
  res.end('About page');
}

const server = createServer((req, res) => {
  const cookies = cookie.parse(req.headers.cookie || '');
  console.log(req.url, cookies);
  
  switch (req.url) {
    case '/':
      home(req, res);
      break;
    case '/about':
      about(req, res);
      break;
    default:
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
  }
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});
