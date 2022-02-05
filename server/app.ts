import next from 'next';
import express from 'express';

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server: express.Express = express();
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
  });

  server.get('/health', (req: express.Request, res: express.Response) => {
    res.send(JSON.stringify({ message: 'ok' }));
  });

  server.all('*', (req: express.Request, res: express.Response) => {
    return handle(req, res);
  });

  server.listen(port, () => {
    console.log(`> Ready on ${process.env.CLIENT_URL || `http://localhost:${port}`}`);
  });
});
