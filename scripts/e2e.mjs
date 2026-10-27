// Browser interaction tests via the Chrome DevTools Protocol (no extra dependencies).
// Usage: start `npm run preview -- --port 4791` then
//   CHROME_PATH="C:/Program Files/Google/Chrome/Application/chrome.exe" node scripts/e2e.mjs http://localhost:4791/ [expect]
// expect = "unconfigured" (default) | "success" | "error" | "whatsapp" (set E2E_WA to the VITE_WHATSAPP_NUMBER used for the build)
import { spawn } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import fs from 'node:fs';

const url = process.argv[2] ?? 'http://localhost:4791/';
const expect = process.argv[3] ?? 'unconfigured';
const chrome = process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const port = 9300 + Math.floor(Math.random() * 500);
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'mb-e2e-'));

const proc = spawn(chrome, ['--headless=new', '--disable-gpu', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, '--window-size=1280,900', 'about:blank'], { stdio: 'ignore' });
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

let target;
for (let i = 0; i < 50 && !target; i++) {
  try { target = (await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find((t) => t.type === 'page'); } catch { await wait(200); }
}
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener('open', r, { once: true }));
let seq = 0;
const pending = new Map();
ws.addEventListener('message', (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
});
const send = (method, params = {}) => new Promise((r) => { const id = ++seq; pending.set(id, r); ws.send(JSON.stringify({ id, method, params })); });
const js = async (expression) => {
  const r = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
  if (r.result?.exceptionDetails) throw new Error(r.result.exceptionDetails.exception?.description ?? 'eval error');
  return r.result?.result?.value;
};
const type = async (selector, text) => {
  await js(`document.querySelector(${JSON.stringify(selector)}).focus()`);
  await send('Input.insertText', { text });
};

let failed = 0;
const check = (name, ok, detail = '') => { console.log(`${ok ? '✓' : '✗'} ${name}${detail ? ` – ${detail}` : ''}`); if (!ok) failed++; };

const errors = [];
await send('Runtime.enable');
ws.addEventListener('message', (e) => {
  const m = JSON.parse(e.data);
  if (m.method === 'Runtime.exceptionThrown') errors.push(m.params.exceptionDetails.text);
  if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') errors.push(m.params.args.map((a) => a.value ?? a.description).join(' '));
});
await send('Page.enable');
await send('Page.navigate', { url });
await wait(2500);

check('page title', (await js('document.title')).startsWith('Mohit Bhola Makeup Studio'));
check('hydrated without errors', errors.length === 0, errors.join(' | '));

// Service filters
await js(`[...document.querySelectorAll('#services [aria-pressed]')].find(b => b.textContent === 'Academy').click()`);
await wait(200);
check('Academy filter shows 2 courses', (await js(`document.querySelectorAll('#services li article').length`)) === 2);
await js(`[...document.querySelectorAll('#services [aria-pressed]')].find(b => b.textContent === 'All').click()`);
await wait(200);
check('All filter shows 9 cards', (await js(`document.querySelectorAll('#services li article').length`)) === 9);

// Enquiry modal from a service card, with preselected interest
await js(`document.querySelector('[aria-label="Book Bridal Makeup"]').click()`);
await wait(300);
check('modal opens', await js(`!!document.querySelector('dialog[open] #enquiry-title')`));
check('interest preselected', (await js(`document.querySelector('dialog[open] select').value`)) === 'bridal');

// Validation on empty submit
await js(`document.querySelector('dialog[open] button[type=submit]').click()`);
await wait(200);
const errCount = await js(`document.querySelectorAll('dialog[open] [aria-invalid=true]').length`);
check('empty submit flags required fields', errCount === 3, `${errCount} invalid (name, phone, consent)`);
check('focus moved to first invalid field', (await js(`document.activeElement?.name`)) === 'name');

// Valid submit (in WhatsApp mode, capture the URL instead of opening a real window)
if (expect === 'whatsapp') {
  await js(`window.__opened = []; window.open = (u) => { window.__opened.push(u); return {}; }`);
}
await type('dialog[open] [name=name]', 'Test Visitor');
await type('dialog[open] [name=phone]', '9876543210');
await js(`document.querySelector('dialog[open] [name=consent]').click()`);
await wait(100);
await js(`document.querySelector('dialog[open] button[type=submit]').click()`);
await wait(1200);
const text = await js(`document.querySelector('dialog[open]').innerText`);
if (expect === 'unconfigured') {
  check('no false success without backend', !text.includes('Thank you') && text.includes('Your details have not been sent'));
} else if (expect === 'whatsapp') {
  const opened = await js('window.__opened');
  const msg = opened?.[0] ? decodeURIComponent(opened[0].split('?text=')[1] ?? '') : '';
  check('WhatsApp opened with studio number', opened?.length === 1 && opened[0].startsWith(`https://wa.me/${process.env.E2E_WA ?? ''}?text=`), opened?.[0]?.slice(0, 40));
  check('WhatsApp message prefilled with enquiry', msg.includes('*Bridal Makeup*') && msg.includes('Name: Test Visitor') && msg.includes('Phone: 9876543210') && !msg.includes('Email:'), JSON.stringify(msg.slice(0, 80)));
  check('honest WhatsApp status (asks user to tap Send)', text.includes('Tap Send in WhatsApp') && !text.includes('Thank you'));
} else if (expect === 'success') {
  check('success shown after backend 2xx', text.includes('Your enquiry has been received'));
} else {
  check('error shown after backend failure', text.includes('couldn’t be sent') && !text.includes('Thank you'));
}

// Close modal with Escape
await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
await wait(300);
check('Escape closes modal', !(await js(`!!document.querySelector('dialog[open]')`)));

// Lightbox
await js(`document.querySelector('#portfolio ul button').click()`);
await wait(300);
const cap1 = await js(`document.querySelector('dialog[open] figcaption')?.textContent`);
await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'ArrowRight', code: 'ArrowRight', windowsVirtualKeyCode: 39 });
await wait(200);
const cap2 = await js(`document.querySelector('dialog[open] figcaption')?.textContent`);
check('lightbox opens and arrow key advances', !!cap1 && cap1 !== cap2 && cap2.includes('2/8'), cap2);
await js(`document.querySelector('[aria-label="Close image viewer"]').click()`);
await wait(200);
check('lightbox closes', !(await js(`!!document.querySelector('dialog[open]')`)));

// Map facade
check('map not loaded initially', !(await js(`!!document.querySelector('#contact iframe')`)));
await js(`[...document.querySelectorAll('#contact button')].find(b => b.textContent.includes('Load interactive map')).click()`);
await wait(200);
check('map loads on demand', (await js(`document.querySelector('#contact iframe')?.src ?? ''`)).includes('28.6454613,77.4186186'));

// Nav anchors resolve to sections
const anchors = await js(`[...document.querySelectorAll('header nav a')].map(a => a.getAttribute('href')).filter(h => !document.querySelector(h))`);
check('all nav anchors resolve', anchors.length === 0, anchors.join(','));

// External links are safe
const unsafe = await js(`[...document.querySelectorAll('a[target=_blank]')].filter(a => !/noopener/.test(a.rel)).length`);
check('external links use rel=noopener', unsafe === 0);

// Mobile menu at phone width
await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 2, mobile: true });
await wait(400);
check('no horizontal overflow at 390px', (await js('document.documentElement.scrollWidth')) <= 390, String(await js('document.documentElement.scrollWidth')));
await js(`document.querySelector('[aria-controls=mobile-menu]').click()`);
await wait(600);
check('mobile menu opens', (await js(`getComputedStyle(document.getElementById('mobile-menu')).visibility`)) === 'visible');
await js(`document.querySelector('#mobile-menu a[href="#academy"]').click()`);
await wait(700);
check('mobile menu closes after navigation', (await js(`getComputedStyle(document.getElementById('mobile-menu')).visibility`)) === 'hidden');

check('no runtime errors during run', errors.length === 0, errors.join(' | '));
ws.close();
proc.kill();
console.log(failed ? `\n${failed} e2e check(s) failed` : '\nAll e2e checks passed');
process.exit(failed ? 1 : 0);
