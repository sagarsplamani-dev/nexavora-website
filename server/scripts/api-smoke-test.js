import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const port = 5187;
const baseUrl = `http://127.0.0.1:${port}`;
const serverDirectory = fileURLToPath(new URL('..', import.meta.url));
const server = spawn(process.execPath, ['src/index.js'], {
  cwd: serverDirectory,
  env: {
    ...process.env,
    PORT: String(port),
    MONGO_URI: 'invalid://disabled-for-smoke-test',
    CLIENT_URL: 'http://localhost:5173',
    ADMIN_EMAIL: '',
  },
  stdio: ['ignore', 'pipe', 'pipe'],
});

let serverOutput = '';
server.stdout.on('data', (chunk) => { serverOutput += chunk.toString(); });
server.stderr.on('data', (chunk) => { serverOutput += chunk.toString(); });

try {
  const deadline = Date.now() + 10000;
  let health;
  while (Date.now() < deadline) {
    try {
      health = await fetch(`${baseUrl}/api/health`, { signal: AbortSignal.timeout(1000) });
      break;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  assert.ok(health, `API did not start in time. ${serverOutput}`);
  assert.equal(health.status, 503, 'Health should report unavailable without a database.');

  for (const route of ['/api/leads', '/api/demo-bookings', '/api/contact']) {
    const response = await fetch(`${baseUrl}${route}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{}',
    });
    assert.equal(response.status, 400, `${route} should reject an empty body.`);
  }

  const invalidChatResponse = await fetch(`${baseUrl}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: [] }),
  });
  assert.equal(invalidChatResponse.status, 400, 'Chat should reject an empty message list.');

  const unconfiguredChatResponse = await fetch(`${baseUrl}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: [{ role: 'user', content: 'Hello' }] }),
  });
  assert.equal(unconfiguredChatResponse.status, 503, 'Chat should explain missing AI configuration.');

  const leadCourseResponse = await fetch(`${baseUrl}/api/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Course Test',
      email: 'learner@example.invalid',
      phone: '9686712017',
      course: 'Unknown Course',
      message: 'Test request',
    }),
  });
  assert.equal(leadCourseResponse.status, 400, 'Leads should reject unsupported course values.');
  assert.match((await leadCourseResponse.json()).error, /Choose Data Science or Data Analytics/);

  const demoCourseResponse = await fetch(`${baseUrl}/api/demo-bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Course Test',
      email: 'learner@example.invalid',
      phone: '9686712017',
      course: 'Unknown Course',
      preferredDate: '2030-01-01',
      preferredTime: '10:00 AM',
      learningMode: 'Online',
    }),
  });
  assert.equal(demoCourseResponse.status, 400, 'Demo bookings should reject unsupported course values.');
  assert.match((await demoCourseResponse.json()).error, /Choose Data Science or Data Analytics/);

  const unavailableRequests = [
    ['/api/leads', {
      name: 'Course Test',
      email: 'learner@example.invalid',
      phone: '9686712017',
      course: 'Data Science',
      message: 'Test request',
    }],
    ['/api/demo-bookings', {
      name: 'Course Test',
      email: 'learner@example.invalid',
      phone: '9686712017',
      course: 'Data Analytics',
      preferredDate: '2030-01-01',
      preferredTime: '10:00 AM',
      learningMode: 'Online',
      message: '',
    }],
    ['/api/contact', {
      name: 'Course Test',
      email: 'learner@example.invalid',
      subject: 'Test request',
      message: 'Checking database readiness.',
    }],
  ];

  for (const [route, payload] of unavailableRequests) {
    const response = await fetch(`${baseUrl}${route}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    assert.equal(response.status, 503, `${route} should explain the missing database connection.`);
    assert.match((await response.json()).error, /database is not connected/i);
  }

  const spamResponse = await fetch(`${baseUrl}/api/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ website: 'bot-filled-field' }),
  });
  assert.equal(spamResponse.status, 202, 'The honeypot should stop spam without saving a lead.');

  console.log('API smoke tests passed: health, validation, course allowlists, database readiness, and honeypot.');
} finally {
  server.kill();
}