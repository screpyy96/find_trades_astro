import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  return new Response(
    `<!DOCTYPE html>
<html lang="ro">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>410 - Pagină ștearsă | Meserias Local</title>
  <meta name="robots" content="noindex, nofollow">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(180deg, #1a1d2e 0%, #252a3d 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .container {
      text-align: center;
      max-width: 500px;
    }
    .code {
      font-size: 120px;
      font-weight: bold;
      color: #f59e0b;
      line-height: 1;
      margin-bottom: 20px;
    }
    h1 {
      color: white;
      font-size: 24px;
      margin-bottom: 16px;
    }
    p {
      color: #94a3b8;
      font-size: 16px;
      margin-bottom: 32px;
      line-height: 1.6;
    }
    .btn {
      display: inline-block;
      padding: 14px 28px;
      background: linear-gradient(to right, #f59e0b, #ea580c);
      color: white;
      text-decoration: none;
      border-radius: 12px;
      font-weight: 600;
      transition: transform 0.2s;
    }
    .btn:hover {
      transform: scale(1.05);
    }
    .links {
      margin-top: 24px;
      display: flex;
      gap: 16px;
      justify-content: center;
      flex-wrap: wrap;
    }
    .links a {
      color: #60a5fa;
      text-decoration: none;
      font-size: 14px;
    }
    .links a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="code">410</div>
    <h1>Această pagină nu mai există</h1>
    <p>
      Pagina pe care o căutai a fost ștearsă permanent. 
      Te invităm să explorezi serviciile noastre sau să găsești un meseriaș pentru proiectul tău.
    </p>
    <a href="/" class="btn">Mergi la pagina principală</a>
    <div class="links">
      <a href="/servicii/">Servicii</a>
      <a href="/tradesmen/">Tradesmen</a>
      <a href="/blog/">Blog</a>
    </div>
  </div>
</body>
</html>`,
    {
      status: 410,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=86400'
      }
    }
  );
};

export const ALL: APIRoute = GET;
