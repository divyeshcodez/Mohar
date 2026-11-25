import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DOCK_APPS,
  MOHAR_PRODUCTS,
  INITIAL_NOTES,
  INITIAL_MESSAGES,
  filterProducts,
  validateAuthForm,
  validateCreatorForm,
  addNoteItem,
  toggleFavoriteItem,
  sendMessageItem,
} from './moharData';

test('dock apps preserve exact 8-item reference order', () => {
  assert.deepEqual(
    DOCK_APPS.map((a) => a.id),
    ['notes', 'browser', 'camera', 'gallery', 'calendar', 'messages', 'favorites', 'mail']
  );
});

test('filterProducts returns all or matching category items', () => {
  assert.equal(filterProducts(MOHAR_PRODUCTS, 'All').length, MOHAR_PRODUCTS.length);
  const creative = filterProducts(MOHAR_PRODUCTS, 'Creative');
  assert.ok(creative.length > 0);
  assert.ok(creative.every((p) => p.category === 'Creative'));
});

test('validateAuthForm rejects empty or invalid inputs and accepts valid inputs', () => {
  const invalidLogin = validateAuthForm({
    mode: 'login',
    name: '',
    email: 'not-an-email',
    password: '123',
  });
  assert.equal(invalidLogin.valid, false);
  assert.ok(invalidLogin.errors.email);
  assert.ok(invalidLogin.errors.password);

  const invalidSignup = validateAuthForm({
    mode: 'signup',
    name: 'A',
    email: 'maker@mohar.studio',
    password: 'secretpassword',
  });
  assert.equal(invalidSignup.valid, false);
  assert.ok(invalidSignup.errors.name);

  const validSignup = validateAuthForm({
    mode: 'signup',
    name: 'Maya',
    email: 'maya@mohar.studio',
    password: 'secretpassword',
  });
  assert.equal(validSignup.valid, true);
  assert.deepEqual(validSignup.errors, {});
});

test('addNoteItem prepends valid note and ignores blank input', () => {
  const unchanged = addNoteItem(INITIAL_NOTES, '   ', 'Body');
  assert.equal(unchanged.length, INITIAL_NOTES.length);

  const updated = addNoteItem(INITIAL_NOTES, 'New Idea', 'Ship after quiet study.');
  assert.equal(updated.length, INITIAL_NOTES.length + 1);
  assert.equal(updated[0].title, 'New Idea');
});

test('toggleFavoriteItem adds and removes product ids cleanly', () => {
  const added = toggleFavoriteItem(['a'], 'b');
  assert.deepEqual(added, ['a', 'b']);
  const removed = toggleFavoriteItem(added, 'a');
  assert.deepEqual(removed, ['b']);
});

test('sendMessageItem appends valid messages and ignores whitespace', () => {
  assert.equal(sendMessageItem(INITIAL_MESSAGES, '   ').length, INITIAL_MESSAGES.length);
  const next = sendMessageItem(INITIAL_MESSAGES, 'Ready to bloom.');
  assert.equal(next.length, INITIAL_MESSAGES.length + 1);
  assert.equal(next[next.length - 1].text, 'Ready to bloom.');
  assert.equal(next[next.length - 1].fromMe, true);
});

test('validateCreatorForm rejects empty/low goal inputs and accepts valid creator submission', () => {
  const bad = validateCreatorForm({
    creatorName: 'A',
    productTitle: 'Hi',
    goalAmount: '200',
  });
  assert.equal(bad.valid, false);
  assert.ok(bad.errors.creatorName);
  assert.ok(bad.errors.productTitle);
  assert.ok(bad.errors.goalAmount);

  const ok = validateCreatorForm({
    creatorName: 'Aarav Studio',
    productTitle: 'Brass Dripper',
    goalAmount: '50000',
  });
  assert.equal(ok.valid, true);
  assert.deepEqual(ok.errors, {});
});
