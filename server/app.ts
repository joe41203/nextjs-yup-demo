import next from 'next';
import express, { Response, Request, NextFunction } from 'express';
import { EmailSchema } from '../validations/EmailValidator';

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server: express.Express = express();
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
  });

  server.get('/health', (req: Request, res: Response) => {
    res.send(JSON.stringify({ message: 'ok' }));
  });

  server.post("/api/users", async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body)
      await EmailSchema.validate(req.body, { abortEarly: false })
      res.send(JSON.stringify({ body: req.body, message: "ok" }))
    } catch(e) {
      return next(e)
    }
  })

  server.use(function (err: Error, _req: Request, res: Response, next: NextFunction) {
    res.status(403)
    res.send(JSON.stringify({ body: { errors: err.message }, message: "Ops!!" }))
  })

  server.all('*', (req: Request, res: Response) => {
    return handle(req, res);
  });

  server.listen(port, () => {
    console.log(`> Ready on ${process.env.CLIENT_URL || `http://localhost:${port}`}`);
  });
});
