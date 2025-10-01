import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { dirname, resolve } from 'path';
import { fileURLToPath }    from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(__dirname, '../browser');

const app = express();
const engine = new AngularNodeAppEngine();

app.use(express.static(browserDistFolder, {
  maxAge: '1y',
  index: false,
  redirect: false,
}));

app.use('/**', (req, res, next) => {
  engine.handle(req)
    .then(response => {
      if (response) writeResponseToNodeResponse(response, res);
      else next();
    })
    .catch(next);
});

if (isMainModule(import.meta.url)) {
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
}

export const reqHandler = createNodeRequestHandler(app);
