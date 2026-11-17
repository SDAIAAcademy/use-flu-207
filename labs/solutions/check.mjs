/* Runs the reference solution of every lab against the course files.

     node labs/solutions/check.mjs            every lab
     node labs/solutions/check.mjs 1.2 1.5    some labs

   Node 22, no dependencies. Nothing is written to disk and no model is called.
   What runs for real: the two register checklists on the four drafts (1.1); the glossary match
   of the four translations (1.2); the ten planted errors against their sources, the calendar
   check of every date pair and the number comparison (1.3); the measures and scores of the ten
   prepared outputs, word error rate included (1.4); the direction rules on the seeded and the
   fixed files (1.5); every instrument on the bilingual notice, draft and fixed (1.6).
   What runs against a stand-in: every step a participant does in a chat assistant. The prepared
   outputs in labs/files and the replies in standin.json are written by hand, with the mistakes a
   real assistant makes. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as R from './rules.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const FILES = path.join(HERE, '..', 'files');
const read = (name) => fs.readFileSync(path.join(FILES, name), 'utf8');
const sol = (name) => fs.readFileSync(path.join(HERE, name), 'utf8');
const ANS = JSON.parse(sol('answers.json'));
const STANDIN = JSON.parse(sol('standin.json'));

function equal(actual, expected, what) {
  const a = JSON.stringify(actual), e = JSON.stringify(expected);
  if (a !== e) throw new Error(`${what}: expected ${e}, got ${a}`);
}
const truthy = (x, what) => { if (!x) throw new Error(what); };
/* The inner HTML of the element with this id, nested elements of the same tag counted. */
function element(html, id) {
  const m = html.match(new RegExp(`<([a-z0-9]+)[^>]*\\bid="${id}"[^>]*>`));
  if (!m) throw new Error(`no element with id ${id}`);
  const tag = m[1], start = m.index + m[0].length;
  const re = new RegExp(`<(/?)${tag}\\b[^>]*>`, 'g');
  re.lastIndex = start;
  let depth = 1, t;
  while ((t = re.exec(html))) {
    depth += t[1] ? -1 : 1;
    if (depth === 0) return html.slice(start, t.index);
  }
  throw new Error(`element ${id} is not closed`);
}
/* Its text, one line per paragraph or list item. */
const textOf = (html, id) => element(html, id)
  .replace(/<\/(p|li|h1|h2|h3)>/g, '\n').replace(/<[^>]+>/g, '')
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .split('\n').map((x) => x.trim()).filter(Boolean).join('\n');
const failed = (list) => list.filter((x) => !x.ok).map((x) => x.id);

/* The glossary, read from the approved page; the forms a term may take are in answers.json. */
function glossary() {
  const rows = [...element(read('glossary_approved.html'), 'glossary').matchAll(/<tr><td>(\d+)<\/td><td>([^<]+)<\/td><td><span class="ltr">([^<]+)<\/span>/g)];
  return rows.map(([, id, ar, en]) => ({
    id: Number(id),
    ar: [ar, ...(ANS.forms[id]?.ar || [])],
    en: [en.replace(/&#39;|&apos;/g, '\''), ...(ANS.forms[id]?.en || [])]
  }));
}
const tally = (rows) => `${rows.filter((x) => x.ok).length}/${rows.length}`;
const misses = (rows) => rows.filter((x) => !x.ok).map((x) => `${x.segment}:${x.term}`);

const LABS = {
  '1.1'() {
    const html = read('drafts_sample.html');
    const l1 = R.letterChecklist(textOf(html, 'letter-v1')), l2 = R.letterChecklist(textOf(html, 'letter-v2'));
    const n1 = R.noticeChecklist(textOf(html, 'notice-v1')), n2 = R.noticeChecklist(textOf(html, 'notice-v2'));
    equal([R.score(l1), R.score(l2), R.score(n1), R.score(n2)], ANS.lab_1_1.scores, 'scores of the four drafts');
    equal(l1.find((x) => x.id === 'L8').found, ANS.lab_1_1.letter_calques, 'translated wording in the first letter');
    equal(R.datePairs(textOf(html, 'letter-v2')).filter((x) => !x.ok), [], 'date pairs of the revised letter');
    equal(R.datePairs(textOf(html, 'notice-v2')).filter((x) => !x.ok), [], 'date pairs of the revised notice');
    const n2len = n2.find((x) => x.id === 'N2').value, n1len = n1.find((x) => x.id === 'N2').value;
    return `letter ${R.score(l1)}/10 then ${R.score(l2)}/10; notice ${R.score(n1)}/10 then ${R.score(n2)}/10; mean sentence ${n1len} then ${n2len} words; translated wording in letter 1: ${l1.find((x) => x.id === 'L8').found.length} patterns`;
  },

  '1.2'() {
    const G = glossary();
    equal(G.length, 20, 'terms in the glossary');
    const pol = read('policy_catch_reporting_ar.html');
    equal((pol.match(/class="page"/g) || []).length, 3, 'pages of the policy');
    const articles = [...pol.matchAll(/<p id="article-(\d+)"><b>[^<]*<\/b> ([^<]+)<\/p>/g)].map(([, id, text]) => ({ id: Number(id), text }));
    equal(articles.length, 12, 'articles of the policy');
    equal(R.termsIn(articles.map((a) => a.text).join(' '), G, 'ar').length, 20, 'glossary terms used by the policy');
    equal(sol('../files/glossary_shiraa.txt').trim().split('\n').length, 20, 'lines of the OmegaT glossary');
    const sample = read('translation_sample.html');
    const page2 = (key) => articles.filter((a) => a.id >= 5 && a.id <= 8).map((a) => ({ id: a.id, ar: a.text, en: textOf(sample, `p2-${key}-${a.id}`) }));
    const noteEn = read('partner_note_en.html');
    const note = (key) => [1, 2, 3, 4].map((i) => ({ id: i, en: textOf(noteEn, `note-${i}`), ar: textOf(sample, `note-${key}-${i}`) }));
    const a = R.termCheck(page2('none'), G, 'ar', 'en'), b = R.termCheck(page2('glossary'), G, 'ar', 'en');
    const c = R.termCheck(note('none'), G, 'en', 'ar'), d = R.termCheck(note('glossary'), G, 'en', 'ar');
    equal([tally(a), tally(b), tally(c), tally(d)], ANS.lab_1_2.tallies, 'glossary match of the four translations');
    equal(misses(b), ANS.lab_1_2.miss_with_glossary, 'the planted miss with the glossary');
    const ref = articles.filter((x) => x.id >= 5 && x.id <= 8).map((x) => ({ id: x.id, ar: x.text, en: ANS.lab_1_2.reference_en[x.id] }));
    equal(tally(R.termCheck(ref, G, 'ar', 'en')), '10/10', 'the reference translation');
    const five = d.filter((x) => ANS.lab_1_2.national.includes(x.term)), five0 = c.filter((x) => ANS.lab_1_2.national.includes(x.term));
    equal([tally(five0), tally(five)], ANS.lab_1_2.national_tallies, 'the five terms of the national glossary');
    const back = STANDIN.lab_1_2.back_translation;
    truthy(/يجوز|يُقبل/.test(back.ar) && back.catches === false, 'the back-translation stand-in');
    return `20 terms, 3 pages, 12 articles; to English ${tally(a)} without the glossary, ${tally(b)} with it (miss ${misses(b)}); to Arabic ${tally(c)} then ${tally(d)}; national terms ${tally(five0)} then ${tally(five)}`;
  },

  '1.3'() {
    const report = read('report_review_en.html'), circular = read('circular_closure_ar.html'), outs = read('three_outputs.html');
    const src = { O1: textOf(report, 'summary') + '\n' + textOf(report, 'recommendations'), O2: textOf(report, 'summary') + '\n' + textOf(report, 'recommendations'), O3: R.stripHtml(circular) };
    const out = { O1: textOf(outs, 'o1'), O2: textOf(outs, 'o2'), O3: textOf(outs, 'o3') };
    equal(Object.keys(out).length, 3, 'outputs');
    equal(ANS.lab_1_3.planted.length, 10, 'planted errors');
    const kinds = {};
    for (const e of ANS.lab_1_3.planted) {
      truthy(out[e.output].includes(e.wrong), `${e.id}: "${e.wrong}" is not in ${e.output}`);
      truthy(R.plain(src[e.output]).includes(R.plain(e.right)), `${e.id}: "${e.right}" is not in the source of ${e.output}`);
      kinds[e.kind] = (kinds[e.kind] || 0) + 1;
    }
    equal(kinds, { 'اسم': 2, 'رقم': 2, 'وحدة': 2, 'محذوف': 2, 'تاريخ': 2 }, 'two errors of each kind');
    equal(R.numbersNotIn(out.O1, src.O1), ['1690'], 'numbers of output 1 that the source does not have');
    equal(R.numbersNotIn(out.O2, src.O2), ANS.lab_1_3.o2_new_numbers, 'numbers of output 2 that the source does not have');
    const bad2 = R.datePairs(out.O2).filter((x) => !x.ok);
    equal(bad2.map((x) => x.why[0]), ['hijri: 30 ربيع الأول 1449'], 'the wrong Hijri date of output 2');
    equal(R.datePairs(out.O3).filter((x) => !x.ok), [], 'date pairs of output 3 agree with the calendar, so only the source shows E9');
    equal(Math.round(12 * 1.852 * 10) / 10, 22.2, '12 nautical miles in kilometres: the decoy is right');
    const second = STANDIN.lab_1_3.second_pass;
    const real = second.filter((x) => ANS.lab_1_3.planted.some((e) => e.id === x.id));
    const falseAlarms = second.filter((x) => x.id === null);
    equal([real.length, falseAlarms.length], [5, 1], 'the stand-in second pass: caught and false alarms');
    const first = ANS.lab_1_3.reference_first_pass;
    truthy(first.length >= 8, 'the reference first pass catches at least eight');
    equal(new Set([...first, ...real.map((x) => x.id)]).size, 10, 'first pass and second pass together');
    return `10 planted errors in 3 outputs, 2 of each kind; number comparison alone finds ${R.numbersNotIn(out.O1, src.O1).length + R.numbersNotIn(out.O2, src.O2).filter((n) => ['24'].includes(n)).length} of them; calendar check finds 1 of the 2 date errors; stand-in second pass finds 5 and raises 1 false alarm; reference first pass ${first.length}/10`;
  },

  '1.4'() {
    const G = glossary();
    const outs = read('assistants_outputs_sample.html'), tasks = read('five_tasks.html'), noteEn = read('partner_note_en.html');
    equal((tasks.match(/<h2>المهمة \d/g) || []).length, 5, 'tasks');
    const ref = textOf(tasks, 'voice-V2');
    const band = (v, two, one) => (v >= two ? 2 : v >= one ? 1 : 0);
    const measure = {}, scores = {};
    for (const k of ['a', 'b']) {
      const t1 = R.score(R.letterChecklist(textOf(outs, `t1-${k}`)));
      const t2 = R.score(R.noticeChecklist(textOf(outs, `t2-${k}`)));
      const arLines = textOf(outs, `t3-${k}`).split('\n');
      const t3rows = R.termCheck([1, 2, 3, 4].map((i) => ({ id: i, en: textOf(noteEn, `note-${i}`), ar: arLines[i - 1] })), G, 'en', 'ar');
      const t3 = t3rows.filter((x) => x.ok).length;
      const w = R.wer(ref, textOf(outs, `t4-${k}`));
      const meaning = ANS.lab_1_4.meaning_right[k];
      const t5 = R.datePairs(textOf(outs, `t5-${k}`)).filter((x) => !x.ok).length + ['2,840', '1,960', '31%', '61'].filter((n) => !textOf(outs, `t5-${k}`).includes(n)).length;
      measure[k] = [t1, t2, t3, w.rate, t5];
      scores[k] = [band(t1, 9, 6), band(t2, 9, 6), band(t3, 12, 9), w.rate <= 10 && meaning ? 2 : w.rate <= 25 ? 1 : 0, t5 === 0 ? 2 : t5 === 1 ? 1 : 0];
    }
    equal(measure, ANS.lab_1_4.measures, 'measures of the ten prepared outputs');
    equal(scores, ANS.lab_1_4.scores, 'scores of the ten prepared outputs');
    const kept = { a: R.kept(ANS.lab_1_4.keywords, textOf(outs, 't4-a')), b: R.kept(ANS.lab_1_4.keywords, textOf(outs, 't4-b')) };
    equal([kept.a.length, kept.b.length], [2, 2], 'dialect words kept, of six');
    truthy(textOf(outs, 't4-a-request').includes('يهدي') && textOf(outs, 't4-a-request').includes('القوارير'), 'assistant A misreads the request');
    const neither = [0, 1, 2, 3, 4].filter((i) => scores.a[i] < 2 && scores.b[i] < 2).map((i) => i + 1);
    equal(neither, ANS.lab_1_4.neither, 'tasks where neither is usable without a reviewer');
    const sum = (x) => x.reduce((a, b) => a + b, 0);
    return `A ${scores.a.join(' ')} = ${sum(scores.a)}/10, B ${scores.b.join(' ')} = ${sum(scores.b)}/10; word error rate ${measure.a[3]}% and ${measure.b[3]}%; neither usable alone on task ${neither.join(', ')}`;
  },

  '1.5'() {
    const F = ANS.lab_1_5;
    const doc = read('circular_bidi.txt'), slide = read('slide_bidi.html');
    const d = R.directionCheck(doc, 'doc', F.doc_facts), s = R.directionCheck(slide, 'slide', F.slide_facts);
    equal(d.map((x) => `${x.line}:${x.rule}`), F.doc_findings, 'findings in the seeded document');
    equal(s.map((x) => `${x.line}:${x.rule}`), F.slide_findings, 'findings in the seeded slide');
    equal(R.directionCheck(sol('circular_bidi_fixed.txt'), 'doc', F.doc_facts), [], 'the fixed document');
    equal(R.directionCheck(sol('slide_bidi_fixed.html'), 'slide', F.slide_facts), [], 'the fixed slide');
    const page = read('direction_check.html');
    truthy(page.includes(R.directionCheck.toString()), 'the page runs the same rules as this check');
    truthy(!/[\u202A-\u202E\u2066-\u2069\u200E\u200F]/.test(page), 'the page holds no invisible character itself');
    return `document ${d.length} findings then 0; slide ${s.length} findings then 0; the page files/direction_check.html holds the same function`;
  },

  '1.6'() {
    const G = glossary();
    const draft = read('bilingual_notice_draft.html'), fixed = sol('bilingual_notice_fixed.html');
    const parts = (html) => ({ ar: textOf(html, 'notice-ar'), en: textOf(html, 'notice-en') });
    const check = (html) => {
      const p = parts(html);
      const seg = [{ id: 1, ar: p.ar, en: p.en }];
      return {
        calques: R.CALQUES.filter(([re]) => re.test(R.plain(p.ar))).length,
        terms: misses(R.termCheck(seg, G, 'ar', 'en')).length,
        dates: [...R.datePairs(p.ar), ...R.datePairs(p.en)].filter((x) => !x.ok).length,
        numbers: R.numbersNotIn(p.en, p.ar + ' 1449 30').length,
        quote: p.ar.includes(ANS.lab_1_6.quote_word) ? 0 : 1,
        direction: R.directionCheck(html, 'slide', []).length > 0 ? 1 : 0,
        disclosure: /id="disclosure"/.test(html) ? 0 : 1
      };
    };
    const a = check(draft), b = check(fixed);
    equal(a, ANS.lab_1_6.draft, 'problems in the draft notice');
    equal(b, { calques: 0, terms: 0, dates: 0, numbers: 0, quote: 0, direction: 0, disclosure: 0 }, 'the fixed notice');
    equal(ANS.lab_1_6.decision, 'إحالة', 'the reference decision');
    return `draft: ${Object.entries(a).map(([k, v]) => `${k} ${v}`).join(', ')}; fixed: all 0; decision: refer to the certified translator and a native reviewer`;
  }
};

const wanted = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(LABS);
let bad = 0;
for (const id of wanted) {
  try {
    if (!LABS[id]) throw new Error('no such lab');
    console.log(`lab ${id}: ${LABS[id]()}\nlab ${id}: PASS`);
  } catch (e) {
    bad += 1;
    console.log(`lab ${id}: FAIL: ${e.message}`);
  }
}
process.exit(bad ? 1 : 0);
