import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validate, type EnquiryValues } from '../src/lib/validate.ts';

const ok: EnquiryValues = {
  name: 'Priya Sharma', phone: '98765 43210', email: '', interest: 'bridal',
  date: '', message: '', consent: true, company: '',
};

test('accepts a complete enquiry', () => assert.deepEqual(validate(ok), {}));
test('accepts +91 and dashed numbers', () => {
  assert.deepEqual(validate({ ...ok, phone: '+91 98765-43210' }), {});
  assert.deepEqual(validate({ ...ok, phone: '919876543210' }), {});
});
test('rejects short name', () => assert.ok(validate({ ...ok, name: ' A ' }).name));
test('rejects invalid phones', () => {
  for (const phone of ['', '12345', '5876543210', '98765432100', 'abcdefghij']) {
    assert.ok(validate({ ...ok, phone }).phone, phone);
  }
});
test('email optional but validated when present', () => {
  assert.equal(validate({ ...ok, email: '' }).email, undefined);
  assert.ok(validate({ ...ok, email: 'priya@' }).email);
  assert.equal(validate({ ...ok, email: 'priya@example.in' }).email, undefined);
});
test('requires interest and consent', () => {
  const e = validate({ ...ok, interest: '', consent: false });
  assert.ok(e.interest && e.consent);
});
test('limits message length', () => assert.ok(validate({ ...ok, message: 'x'.repeat(1001) }).message));
