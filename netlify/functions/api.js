const serverless = require('serverless-http');
const { connectLambda } = require('@netlify/blobs');
const { server, hydrateDatabase, persistDatabase } = require('../../server');

const handler = serverless(server, { requestId: true });

exports.handler = async (event, context) => {
  connectLambda(event);
  await hydrateDatabase();
  const result = await handler(event, context);
  await persistDatabase();
  return result;
};
