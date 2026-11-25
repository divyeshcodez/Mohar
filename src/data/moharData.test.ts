import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DOCK_APPS,
  MOHAR_PRODUCTS,
  filterProducts,
  getEndingSoonProducts,
  toggleBackedItem,
  validateAuthForm,
  validateCreatorForm,
} from './moharData';

test('dock apps preserve exact 8 custom MoHaR icons and names in order', () => {
  assert.deepEqual(
    DOCK_APPS.map((a) => a.label),
    [
      'Our Story',
      'Explore',
      'Launch',
      'Trust',
      'Ending soon',
      'How it works',
      'My Backed',
      'Talk to us',
    ]
  );
});

test('filterProducts returns all or matching category items', () => {
  assert.equal(filterProducts(MOHAR_PRODUCTS, 'All').length, MOHAR_PRODUCTS.length);
  const craft = filterProducts(MOHAR_PRODUCTS, 'Craft');
  assert.ok(craft.length > 0);
  assert.ok(craft.every((p) => p.category === 'Craft'));
});

test('getEndingSoonProducts sorts campaigns by soonest closing hours', () => {
  const soon = getEndingSoonProducts(MOHAR_PRODUCTS);
  assert.ok(soon.length >= 2);
  for (let i = 1; i < soon.length; i++) {
    assert.ok((soon[i - 1].hoursLeft ?? 0) <= (soon[i].hoursLeft ?? 0));
  }
});

test('toggleBackedItem adds and removes backed product ids cleanly', () => {
  const added = toggleBackedItem(['a'], 'b');
  assert.deepEqual(added, ['a', 'b']);
  const removed = toggleBackedItem(added, 'a');
  assert.deepEqual(removed, ['b']);
});

test('validateAuthForm rejects invalid inputs and accepts valid inputs', () => {
  const invalid = validateAuthForm({
    mode: 'login',
    name: '',
    email: 'bad-email',
    password: '123',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.password);

  const valid = validateAuthForm({
    mode: 'signup',
    name: 'Maya',
    email: 'maya@mohar.studio',
    password: 'secretpassword',
  });
  assert.equal(valid.valid, true);
});

test('validateCreatorForm rejects invalid creator submission and accepts valid input', () => {
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
    productTitle: 'Kansa Dripper',
    goalAmount: '50000',
  });
  assert.equal(ok.valid, true);
});
