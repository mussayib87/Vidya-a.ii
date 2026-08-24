import { test, describe, before, after } from 'node:test';
import assert from 'node:assert';
import http from 'node:http';
import app from '../src/app.js';

let server;
let baseUrl;

before(async () => {
  await new Promise((resolve) => {
    server = app.listen(0, () => {
      const port = server.address().port;
      baseUrl = `http://localhost:${port}`;
      resolve();
    });
  });
});

after(async () => {
  await new Promise((resolve) => server.close(resolve));
});

describe('VIDYA AI Backend Integration Tests', () => {
  test('GET /api/v1/health - should return running status', async () => {
    const res = await fetch(`${baseUrl}/api/v1/health`);
    assert.strictEqual(res.status, 200);

    const body = await res.json();
    assert.strictEqual(body.success, true);
    assert.strictEqual(body.message, 'Vidya AI API is running');
    assert.ok(body.timestamp);
  });

  test('GET /api/v1/translation/languages - should list supported Indian languages', async () => {
    const res = await fetch(`${baseUrl}/api/v1/translation/languages`);
    assert.strictEqual(res.status, 200);

    const body = await res.json();
    assert.strictEqual(body.success, true);
    assert.ok(Array.isArray(body.data.languages));
    assert.ok(body.data.languages.includes('Kannada'));
    assert.ok(body.data.languages.includes('English'));
  });

  test('POST /api/v1/translation - should translate text', async () => {
    const res = await fetch(`${baseUrl}/api/v1/translation`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: 'Real numbers are the numbers that include both rational and irrational numbers.',
        sourceLanguage: 'en',
        targetLanguage: 'kn',
      }),
    });

    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert.strictEqual(body.success, true);
    assert.ok(body.data.translatedText);
  });

  test('POST /api/v1/ai/lesson - should generate structured lesson', async () => {
    const res = await fetch(`${baseUrl}/api/v1/ai/lesson`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topic: 'Euclids Division Lemma',
        subject: 'Mathematics',
        classLevel: '10',
        board: 'Karnataka State Board',
        language: 'English',
      }),
    });

    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert.strictEqual(body.success, true);
    assert.ok(body.data.title);
    assert.ok(Array.isArray(body.data.sections));
    assert.ok(Array.isArray(body.data.learningObjectives));
  });

  test('POST /api/v1/ai/explanation - should generate personalized explanation', async () => {
    const res = await fetch(`${baseUrl}/api/v1/ai/explanation`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topic: 'Quadratic Equations',
        studentQuery: 'Why do we need the quadratic formula?',
        subject: 'Mathematics',
        classLevel: '10',
        learningStyle: 'interactive',
      }),
    });

    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert.strictEqual(body.success, true);
    assert.ok(body.data.explanation);
    assert.ok(body.data.analogy);
  });

  test('POST /api/v1/ai/quiz - should generate quiz questions', async () => {
    const res = await fetch(`${baseUrl}/api/v1/ai/quiz`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topic: 'Polynomials',
        subject: 'Mathematics',
        classLevel: '10',
        count: 3,
      }),
    });

    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert.strictEqual(body.success, true);
    assert.ok(Array.isArray(body.data.questions));
    assert.strictEqual(body.data.questions.length, 3);
  });

  test('POST /api/v1/auth/signup - validation error on invalid email', async () => {
    const res = await fetch(`${baseUrl}/api/v1/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'invalid-email',
        password: '123',
        fullName: 'A',
      }),
    });

    assert.strictEqual(res.status, 422);
    const body = await res.json();
    assert.strictEqual(body.success, false);
    assert.strictEqual(body.error.code, 'VALIDATION_ERROR');
  });

  test('GET /api/v1/non-existing-endpoint - should return 404 standard error format', async () => {
    const res = await fetch(`${baseUrl}/api/v1/non-existing-endpoint`);
    assert.strictEqual(res.status, 404);

    const body = await res.json();
    assert.strictEqual(body.success, false);
    assert.strictEqual(body.error.code, 'NOT_FOUND');
  });
});
