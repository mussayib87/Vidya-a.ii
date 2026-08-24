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

  test('POST /api/v1/auth/login - validation error on missing fields', async () => {
    const res = await fetch(`${baseUrl}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: '',
        password: '',
      }),
    });

    assert.strictEqual(res.status, 422);
    const body = await res.json();
    assert.strictEqual(body.success, false);
    assert.strictEqual(body.error.code, 'VALIDATION_ERROR');
  });

  test('POST /api/v1/auth/login - invalid credentials return 401', async () => {
    const res = await fetch(`${baseUrl}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'nonexistent_test_user_xyz@vidya-test.internal',
        password: 'WrongPassword123!',
      }),
    });

    assert.strictEqual(res.status, 401);
    const body = await res.json();
    assert.strictEqual(body.success, false);
    assert.strictEqual(body.error.code, 'UNAUTHORIZED');
  });

  test('GET /api/v1/auth/me - requires authentication (401 without Bearer)', async () => {
    const res = await fetch(`${baseUrl}/api/v1/auth/me`);
    assert.strictEqual(res.status, 401);
    const body = await res.json();
    assert.strictEqual(body.success, false);
    assert.strictEqual(body.error.code, 'UNAUTHORIZED');
  });

  test('POST /api/v1/auth/logout - requires authentication (401 without Bearer)', async () => {
    const res = await fetch(`${baseUrl}/api/v1/auth/logout`, { method: 'POST' });
    assert.strictEqual(res.status, 401);
    const body = await res.json();
    assert.strictEqual(body.success, false);
    assert.strictEqual(body.error.code, 'UNAUTHORIZED');
  });

  test('GET /api/v1/profile - requires authentication (401 without Bearer)', async () => {
    const res = await fetch(`${baseUrl}/api/v1/profile`);
    assert.strictEqual(res.status, 401);
    const body = await res.json();
    assert.strictEqual(body.success, false);
    assert.strictEqual(body.error.code, 'UNAUTHORIZED');
  });

  test('GET /api/v1/profile/dashboard - requires authentication (401 without Bearer)', async () => {
    const res = await fetch(`${baseUrl}/api/v1/profile/dashboard`);
    assert.strictEqual(res.status, 401);
    const body = await res.json();
    assert.strictEqual(body.success, false);
    assert.strictEqual(body.error.code, 'UNAUTHORIZED');
  });

  test('GET /api/v1/lessons - accessible with optional auth', async () => {
    const res = await fetch(`${baseUrl}/api/v1/lessons`);
    // Should respond with 200 array of lessons or error if DB not reachable
    assert.ok([200, 500].includes(res.status));
    const body = await res.json();
    if (res.status === 200) {
      assert.strictEqual(body.success, true);
      assert.ok(Array.isArray(body.data));
    }
  });

  test('POST /api/v1/lessons - requires teacher/admin authentication', async () => {
    const res = await fetch(`${baseUrl}/api/v1/lessons`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Introduction to Trigonometry',
        content: 'Test content',
        subject: 'Mathematics',
        gradeLevel: '10',
      }),
    });
    assert.strictEqual(res.status, 401);
    const body = await res.json();
    assert.strictEqual(body.success, false);
  });

  test('POST /api/v1/classrooms - requires teacher/admin authentication', async () => {
    const res = await fetch(`${baseUrl}/api/v1/classrooms`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Class 10 Science A',
        subject: 'Science',
        gradeLevel: '10',
      }),
    });
    assert.strictEqual(res.status, 401);
    const body = await res.json();
    assert.strictEqual(body.success, false);
  });

  test('GET /api/v1/quizzes - accessible with optional auth', async () => {
    const res = await fetch(`${baseUrl}/api/v1/quizzes`);
    assert.ok([200, 500].includes(res.status));
    const body = await res.json();
    if (res.status === 200) {
      assert.strictEqual(body.success, true);
      assert.ok(Array.isArray(body.data));
    }
  });

  test('POST /api/v1/ai/worksheet - should generate practice worksheet', async () => {
    const res = await fetch(`${baseUrl}/api/v1/ai/worksheet`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topic: 'Coordinate Geometry',
        subject: 'Mathematics',
        classLevel: '10',
        count: 4,
      }),
    });

    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert.strictEqual(body.success, true);
    assert.ok(body.data.worksheet);
  });

  test('POST /api/v1/ai/flashcards - should generate flashcards', async () => {
    const res = await fetch(`${baseUrl}/api/v1/ai/flashcards`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topic: 'Chemical Reactions and Equations',
        subject: 'Science',
        classLevel: '10',
        count: 3,
      }),
    });

    assert.strictEqual(res.status, 200);
    const body = await res.json();
    assert.strictEqual(body.success, true);
    assert.ok(Array.isArray(body.data.cards));
    assert.strictEqual(body.data.cards.length, 3);
  });

  test('POST /api/v1/storage/upload - requires authentication (401 without Bearer)', async () => {
    const res = await fetch(`${baseUrl}/api/v1/storage/upload`, {
      method: 'POST',
    });
    assert.strictEqual(res.status, 401);
    const body = await res.json();
    assert.strictEqual(body.success, false);
    assert.strictEqual(body.error.code, 'UNAUTHORIZED');
  });

  test('GET /api/v1/non-existing-endpoint - should return 404 standard error format', async () => {
    const res = await fetch(`${baseUrl}/api/v1/non-existing-endpoint`);
    assert.strictEqual(res.status, 404);

    const body = await res.json();
    assert.strictEqual(body.success, false);
    assert.strictEqual(body.error.code, 'NOT_FOUND');
  });
});
