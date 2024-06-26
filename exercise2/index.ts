import { query } from '@/data';

const PORT = +(process.env.PORT || 3002);

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'OPTIONS, GET',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
};

Bun.serve({
  port: PORT,
  async fetch(req) {
    const params = new URL(req.url).searchParams;
    const startKey = params.get('continuation_token') ?? undefined;
    const limit = Number(params.get('limit') ?? 10);
    const data = await query(limit, startKey);
    return new Response(JSON.stringify(data), { headers });
  },
});

console.log(`Exercise 2 app listening on http://localhost:${PORT}/`);
