const https = require('https');

const projectId = '4e9rpy08';
const token = 'skdWH4v6jlXvKASUuDxHStdNlr7JQGhSOWn76Kpavy7izkzopfp6Rj3YpqEtHpfTQcOp25PQn1V5xe5HwMasAXqKlH0R8EPce6MKAPoGqogYGI9jG93GwtwbF72g4Gg9a3mTxdFX9QgcX5VcRPDG8VnLoyqwimJX2JXI5vBNfZASerPvTOB2';

const origins = [
  'http://localhost:3002',
  'http://localhost:3000',
  'http://localhost:3333'
];

async function addCorsOrigin(origin) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      origin: origin,
      allowCredentials: true
    });

    const options = {
      hostname: `${projectId}.api.sanity.io`,
      port: 443,
      path: '/v2021-06-07/cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Length': data.length
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          console.log(`✅ Added CORS origin: ${origin}`);
          resolve(responseData);
        } else {
          console.log(`ℹ️  Response for ${origin}: ${res.statusCode} - ${responseData}`);
          resolve(responseData);
        }
      });
    });

    req.on('error', (error) => {
      console.error(`❌ Error adding ${origin}:`, error.message);
      reject(error);
    });

    req.write(data);
    req.end();
  });
}

async function main() {
  console.log('Adding CORS origins...\n');

  for (const origin of origins) {
    try {
      await addCorsOrigin(origin);
    } catch (error) {
      console.error(`Failed to add ${origin}`);
    }
  }

  console.log('\n✅ Done!');
}

main();
