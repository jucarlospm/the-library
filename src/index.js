import express from 'express';
import { healthMonitor } from '@condor-labs/health-middleware';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema/schema';

const app = express();
healthMonitor(app);

app.use(
  '/',
  graphqlHTTP({
    graphiql: true,
    schema: schema,
    context: {
      messageId: 'test',
    },
  })
);

app.listen(3000, () => console.log('Server on port 3000'));
