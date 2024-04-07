import { createServer } from 'node:http';
import { readFile} from 'node:fs';
import cookie from 'cookie';

const home = (_, res) => readFile('./src/index.html', 'utf8', (err, data) => {
  if (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal server error');
  } else {
    res.writeHead(200, { 
      'Content-Type': 'text/html',
      'Set-Cookie': [
        'week14.2=cookie-set-by-server-home-page;',
        'week14.3=everything-cookie; HttpOnly; SameSite=Strict; path=/; Domain=127.0.0.1; Max-Age=5; Secure;',
      ]
    });
    res.end(data);
  }
});

const about = (_, res) => {
  res.writeHead(200, { 
    'Content-Type': 'text/plain',
    'Set-Cookie': 'week14.4=cookie-set-by-server-about-page; path=/about;'
  });
  res.end('About page');
}

const contact = (_, res) => {
  res.writeHead(200, { 
    'Content-Type': 'text/plain',
    'Set-Cookie': 'week14.5=cookie-set-by-server-contact-page; path=/contact;'
  });
  res.end('Contact page');
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
    case '/contact':
      contact(req, res);
      break;
    default:
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
  }
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});
