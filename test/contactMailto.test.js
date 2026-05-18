import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildMailto } from '../src/utils/contactMailto.js';

test('buildMailto composes a Spanish subject and encoded body', () => {
  const url = buildMailto({
    to: 'aisafetycolombia@gmail.com',
    name: 'Ana',
    email: 'ana@x.com',
    message: 'Hola',
    locale: 'es',
  });
  assert.ok(url.startsWith('mailto:aisafetycolombia@gmail.com?'));
  assert.ok(
    url.includes(
      `subject=${encodeURIComponent('Mensaje de Ana (web AI Safety Colombia)')}`
    )
  );
  assert.ok(url.includes(encodeURIComponent('Nombre: Ana')));
  assert.ok(url.includes(encodeURIComponent('ana@x.com')));
});

test('buildMailto composes an English subject', () => {
  const url = buildMailto({
    to: 'aisafetycolombia@gmail.com',
    name: 'Bob',
    email: 'bob@x.com',
    message: 'Hi',
    locale: 'en',
  });
  assert.ok(
    url.includes(
      `subject=${encodeURIComponent('Message from Bob (AI Safety Colombia site)')}`
    )
  );
  assert.ok(url.includes(encodeURIComponent('Name: Bob')));
});
