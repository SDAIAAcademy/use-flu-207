/* The instruments of the course, as functions: the register checklists of lab 1.1, the glossary
   match of lab 1.2, the date and number checks of lab 1.3, the word error rate of lab 1.4 and
   the direction rules of lab 1.5. check.mjs runs the reference solutions with them, and
   labs/_tools/prepare_files.mjs writes the direction rules into files/direction_check.html, so
   the page a participant opens and the checker cannot disagree.
   Node 22, no dependencies. Every function is pure: text in, findings out. */

/* ------------------------------------------------------------------ text helpers */

const TASHKEEL = /[ً-ْٰ]/g;
export const plain = (s) => s.replace(TASHKEEL, '').replace(/ـ/g, '');
export const stripHtml = (html) => html
  .replace(/<style[\s\S]*?<\/style>/g, ' ')
  .replace(/<script[\s\S]*?<\/script>/g, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ')
  .replace(/[ \t]+/g, ' ').trim();
export const sentences = (s) => s.split(/[.!?؟\n]+/).map((x) => x.trim()).filter((x) => x.split(/\s+/).length > 1);
export const wordCount = (s) => s.trim().split(/\s+/).filter(Boolean).length;

/* ------------------------------------------------------------------ lab 1.1: register */

/* Wording that reads as translated from English, and wording too heavy for a public notice. */
export const CALQUES = [
  [/يلعب(ون)?( [^ ]+){0,3} دور/, 'يلعب دورًا'],
  [/(^|\s)تم(ت)? /, 'تم + مصدر'],
  [/من قبل /, 'من قبل'],
  [/بواسطة/, 'بواسطة'],
  [/لا تتردد/, 'لا تتردد في'],
  [/تجدكم? (هذه الرسالة|رسالتنا)/, 'نأمل أن تجدكم هذه الرسالة بخير'],
  [/بشكل \S+/, 'بشكل + صفة'],
  [/على الرغم من حقيقة/, 'على الرغم من حقيقة أن']
];
export const INFORMAL = [/مرحب[ًا]+/, /عزيزي/, /لو سمحت/, /شكر[ًا]+ جزيل[ًا]+ لك(?!م)/, /(^|\s)أنت(?!م)/, /تحياتي/];
export const HEAVY = [/بموجب/, /استناد[ًا]+ إلى/, /المشار إليه/, /آنف الذكر/, /حيث إن/, /وفق[ًا]+ لأحكام/, /نفيدكم/, /يُحاط/, /عليه؛/];
const hits = (list, s) => list.filter(([re]) => re.test(s)).map(([, name]) => name);
const any = (list, s) => list.some((re) => re.test(s));

export const DAYS_AR = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
const G_AR = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
const H_AR = ['محرم', 'صفر', 'ربيع الأول', 'ربيع الآخر', 'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'];
const G_EN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const H_EN = ['Muharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Thani', 'Jumada al-Ula', 'Jumada al-Akhirah', 'Rajab', 'Shaban', 'Ramadan', 'Shawwal', 'Dhu al-Qadah', 'Dhu al-Hijjah'];
const DAYS_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const alt = (list) => list.map((x) => x.replace(/ /g, '\\s')).join('|');
const RE_G_AR = new RegExp(`(\\d{1,2}) (${alt(G_AR)}) (20\\d\\d)`, 'g');
const RE_H_AR = new RegExp(`(\\d{1,2}) (${alt(H_AR)}) (14\\d\\d)`, 'g');

/* The ten points of the official-letter checklist. */
export function letterChecklist(text) {
  const t = plain(text);
  const calques = hits(CALQUES, t);
  return [
    { id: 'L1', label: 'رقم الخطاب وتاريخه في أعلاه', ok: /الرقم:/.test(t) && /التاريخ:/.test(t) },
    { id: 'L2', label: 'التاريخ بالتقويمين الهجري والميلادي', ok: new RegExp(RE_G_AR.source).test(t) && new RegExp(RE_H_AR.source).test(t) },
    { id: 'L3', label: 'المخاطَب بلقبه وصفته', ok: /(^|\n)\s*(سعادة|معالي|سمو|المكرم)/.test(t) },
    { id: 'L4', label: 'تحية الافتتاح الرسمية', ok: /السلام عليكم ورحمة الله وبركاته/.test(t) },
    { id: 'L5', label: 'سطر للموضوع', ok: /الموضوع:/.test(t) },
    { id: 'L6', label: 'افتتاح رسمي يدخل في الموضوع', ok: /(أما بعد|نفيدكم|نود إفادتكم|إشارة إلى)/.test(t) },
    { id: 'L7', label: 'الطلب بصيغة رسمية', ok: /(نأمل|نرجو) (من سعادتكم|منكم|التكرم|تكرمكم)/.test(t) },
    { id: 'L8', label: 'لا عبارات تبدو مترجمة', ok: calques.length === 0, found: calques },
    { id: 'L9', label: 'لا خطاب شخصي غير رسمي', ok: !any(INFORMAL, t) },
    { id: 'L10', label: 'خاتمة رسمية وتوقيع بالاسم والصفة', ok: /وتقبلوا[^\n]*(التحية|التقدير)/.test(t) && /\n\s*(مدير|مديرة|رئيس|رئيسة)[^\n]*\s*$/.test(t.trim()) }
  ];
}

/* The ten points of the plain-language notice checklist. */
export function noticeChecklist(text) {
  const t = plain(text);
  const lines = t.split('\n').map((x) => x.trim()).filter(Boolean);
  const body = lines.slice(1).filter((x) => !/^[•\-\d]/.test(x)).join('. ');
  const sent = sentences(body);
  const lengths = sent.map(wordCount);
  const mean = lengths.reduce((a, b) => a + b, 0) / Math.max(1, lengths.length);
  const calques = hits(CALQUES, t);
  const dayDate = new RegExp(`(${DAYS_AR.join('|')})،? ${RE_G_AR.source}`);
  return [
    { id: 'N1', label: 'عنوان يقول المطلوب في ثماني كلمات على الأكثر', ok: wordCount(lines[0] || '') <= 8 },
    { id: 'N2', label: 'متوسط طول الجملة 14 كلمة أو أقل', ok: mean <= 14, value: Math.round(mean * 10) / 10 },
    { id: 'N3', label: 'لا جملة أطول من 22 كلمة', ok: Math.max(0, ...lengths) <= 22, value: Math.max(0, ...lengths) },
    { id: 'N4', label: 'التاريخ باليوم والتقويمين', ok: dayDate.test(t) && new RegExp(RE_H_AR.source).test(t) },
    { id: 'N5', label: 'خطاب مباشر للصياد بفعل واضح', ok: /(لا تصطد|لا تصد|أبلغ|اتصل|أعد|يُمنع|ممنوع)/.test(text) || /(لا تصطد|ابلغ|اتصل|اعد|ممنوع)/.test(t) },
    { id: 'N6', label: 'المطلوب في قائمة من ثلاثة بنود على الأقل', ok: lines.filter((x) => /^[•\-]|^\d+[.)]/.test(x)).length >= 3 },
    { id: 'N7', label: 'الغرامة برقمها', ok: /5,000/.test(t) },
    { id: 'N8', label: 'وسيلة تواصل', ok: /\+?966[\d ]{6,}/.test(t) },
    { id: 'N9', label: 'لا ألفاظ إدارية ثقيلة', ok: !any(HEAVY, t) },
    { id: 'N10', label: 'لا عبارات تبدو مترجمة', ok: calques.length === 0, found: calques }
  ];
}
export const score = (list) => list.filter((x) => x.ok).length;

/* ------------------------------------------------------------------ lab 1.2: the glossary */

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
function formRegex(form, lang) {
  if (lang === 'en') return new RegExp(`(?<![A-Za-z])${esc(form)}(?![A-Za-z])`, 'gi');
  return new RegExp(`(?<![\\u0621-\\u064A])(?:[وفبلك]|ال|لل|بال|وال)*${esc(plain(form)).replace(/^ال/, '(?:ال)?')}(?![\\u0621-\\u064A])`, 'g');
}
/* Which glossary terms occur in a text of the given language. Longer terms are found first and
   masked, so "catch report" is not also counted as "catch". */
export function termsIn(text, glossary, lang) {
  let rest = lang === 'en' ? text : plain(text);
  const found = [];
  const byLength = [...glossary].sort((a, b) => Math.max(...b[lang].map((f) => f.length)) - Math.max(...a[lang].map((f) => f.length)));
  for (const term of byLength) {
    let n = 0;
    for (const form of [...term[lang]].sort((a, b) => b.length - a.length)) {
      rest = rest.replace(formRegex(form, lang), () => { n += 1; return ' § '; });
    }
    if (n) found.push({ id: term.id, count: n });
  }
  return found;
}
/* The sample check: for every glossary term in a source segment, is its approved equivalent in
   the target segment? Returns one row per (segment, term). */
export function termCheck(segments, glossary, from, to) {
  const rows = [];
  for (const seg of segments) {
    const inTarget = new Map(termsIn(seg[to], glossary, to).map((x) => [x.id, x.count]));
    for (const { id } of termsIn(seg[from], glossary, from)) {
      rows.push({ segment: seg.id, term: id, ok: inTarget.has(id) });
    }
  }
  return rows.sort((a, b) => String(a.segment).localeCompare(String(b.segment)) || a.term - b.term);
}

/* ------------------------------------------------------------------ lab 1.3: dates and numbers */

const fmtH = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura-nu-latn', { day: 'numeric', month: 'numeric', year: 'numeric', timeZone: 'UTC' });
/* The Umm al-Qura date of a Gregorian day, as the runtime's calendar tables give it. */
export function hijri(y, m, d) {
  const date = new Date(Date.UTC(y, m - 1, d));
  const parts = Object.fromEntries(fmtH.formatToParts(date).map((p) => [p.type, p.value]));
  return { day: Number(parts.day), month: Number(parts.month), year: Number(parts.year), weekday: date.getUTCDay() };
}
export const dateAr = (y, m, d, withDay = true) => {
  const h = hijri(y, m, d);
  return `${withDay ? DAYS_AR[h.weekday] + ' ' : ''}${d} ${G_AR[m - 1]} ${y} الموافق ${h.day} ${H_AR[h.month - 1]} ${h.year} هـ`;
};
export const dateEn = (y, m, d, withDay = true) => {
  const h = hijri(y, m, d);
  return `${withDay ? DAYS_EN[h.weekday] + ', ' : ''}${d} ${G_EN[m - 1]} ${y} (${h.day} ${H_EN[h.month - 1]} ${h.year} AH)`;
};
/* Every Gregorian date in a text that is followed by a Hijri date or preceded by a weekday:
   does the pair agree with the calendar? Arabic and English. */
export function datePairs(text) {
  const t = plain(text);
  const out = [];
  const scan = (re, G, H, D, lang) => {
    for (const m of t.matchAll(re)) {
      const [whole, dayName, d, mon, y, hd, hmon, hy] = m;
      const gm = G.findIndex((x) => x === mon.replace(/\s/g, ' ')) + 1;
      const h = hijri(Number(y), gm, Number(d));
      const row = { text: whole.trim(), lang, ok: true, why: [] };
      if (dayName && D.indexOf(dayName) !== h.weekday) { row.ok = false; row.why.push(`weekday: ${D[h.weekday]}`); }
      if (hd) {
        const hm = H.findIndex((x) => x === hmon.replace(/\s/g, ' ')) + 1;
        if (Number(hd) !== h.day || hm !== h.month || Number(hy) !== h.year) { row.ok = false; row.why.push(`hijri: ${h.day} ${H[h.month - 1]} ${h.year}`); }
      }
      if (dayName || hd) out.push(row);
    }
  };
  scan(new RegExp(`(?:(${DAYS_AR.join('|')})،? )?(\\d{1,2}) (${alt(G_AR)}) (20\\d\\d)(?: م)?(?:،? الموافق (\\d{1,2}) (${alt(H_AR)}) (14\\d\\d))?`, 'g'), G_AR, H_AR, DAYS_AR, 'ar');
  scan(new RegExp(`(?:(${DAYS_EN.join('|')}),? )?(\\d{1,2}) (${alt(G_EN)}) (20\\d\\d)(?: \\((\\d{1,2}) (${alt(H_EN)}) (14\\d\\d) AH\\))?`, 'g'), G_EN, H_EN, DAYS_EN, 'en');
  return out;
}
/* The numbers of a text, commas removed, as a set of strings. */
export const numbers = (s) => new Set((s.match(/\d+(?:[.,]\d+)*/g) || []).map((n) => n.replace(/,/g, '')));
export const numbersNotIn = (output, source) => [...numbers(output)].filter((n) => !numbers(source).has(n)).sort((a, b) => Number(a) - Number(b));

/* ------------------------------------------------------------------ lab 1.4: word error rate */

export const tokens = (s) => plain(s).replace(/[^ء-ي0-9A-Za-z\s]/g, ' ').split(/\s+/).filter(Boolean);
/* Word error rate of a transcript against a reference: substitutions, deletions and insertions
   over the number of reference words. */
export function wer(reference, hypothesis) {
  const r = tokens(reference), h = tokens(hypothesis);
  const d = Array.from({ length: r.length + 1 }, (_, i) => [i, ...Array(h.length).fill(0)]);
  for (let j = 0; j <= h.length; j++) d[0][j] = j;
  for (let i = 1; i <= r.length; i++) {
    for (let j = 1; j <= h.length; j++) {
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (r[i - 1] === h[j - 1] ? 0 : 1));
    }
  }
  return { errors: d[r.length][h.length], words: r.length, rate: Math.round((d[r.length][h.length] / r.length) * 1000) / 10 };
}
export const kept = (words, hypothesis) => words.filter((w) => tokens(hypothesis).includes(plain(w)));

/* ------------------------------------------------------------------ lab 1.5: direction rules */

/* One self-contained function, because prepare_files.mjs writes its source into the page
   files/direction_check.html. kind: 'doc' (plain text) or 'slide' (an HTML page).
   facts: the strings the file must hold in stored order. Returns [{ line, rule, text }]. */
export function directionCheck(input, kind, facts) {
  var NAMES = { '\u202A': 'LRE U+202A', '\u202B': 'RLE U+202B', '\u202C': 'PDF U+202C', '\u202D': 'LRO U+202D', '\u202E': 'RLO U+202E',
    '\u2066': 'LRI U+2066', '\u2067': 'RLI U+2067', '\u2068': 'FSI U+2068', '\u2069': 'PDI U+2069', '\u200E': 'LRM U+200E', '\u200F': 'RLM U+200F' };
  var AR = /[ء-ي]/;
  var out = [];
  var add = function (line, rule, text) { out.push({ line: line, rule: rule, text: text }); };
  var lineOf = function (index) { return input.slice(0, index).split('\n').length; };
  var reverse = function (s) { return s.split('').reverse().join(''); };

  /* Rules on one run of text that is laid out right to left. */
  var textRules = function (text, line, isolatedBefore) {
    if (!AR.test(text)) return;
    if (/[,;?]/.test(text.replace(/\d,\d/g, '0'))) add(line, 'punct', 'علامة ترقيم لاتينية في نص عربي: استخدم ، أو ؛ أو ؟');
    if (/^\s*[؟،؛.!:]/.test(text)) add(line, 'lead', 'علامة ترقيم في أول السطر: مكانها آخر الجملة في الترتيب المخزَّن');
    if (/\d\s+[-\u2013]\s+\d/.test(text)) add(line, 'range', 'نطاق بشرطة بين مسافتين ينقلب طرفاه: اكتب «من … إلى …»');
    if (/[٠-٩]/.test(text)) add(line, 'digits', 'أرقام عربية مشرقية في مستند أرقامه 0 إلى 9: وحّد الأرقام');
    var signs = /(^|[\s(:])([+\-\u2212]\d)/g, m;
    while ((m = signs.exec(text))) {
      var before = text.slice(0, m.index + m[1].length);
      var guarded = /[\u200E\u2066]$/.test(before) || (isolatedBefore && before.trim() === '');
      if (!guarded) add(line, 'sign', 'رقم بإشارة أو رقم هاتف دون عزل: الإشارة تقفز إلى الجهة الأخرى');
    }
  };
  var controls = function (text, line, allowMarks) {
    for (var i = 0; i < text.length; i++) {
      var ch = text[i];
      if (/[\u202A-\u202E]/.test(ch)) add(line, 'control', 'علامة تحكم ' + NAMES[ch] + ': احذفها');
      else if (!allowMarks && /[\u2066-\u2069\u200E\u200F]/.test(ch)) add(line, 'control', 'علامة اتجاه ' + NAMES[ch] + ' في صفحة: استخدم السمة dir بدلًا منها');
    }
  };
  var factRule = function (text) {
    (facts || []).forEach(function (fact) {
      var back = reverse(fact), at = -1, from = 0, token = /[0-9A-Za-z,]/;
      while (back !== fact && (from = text.indexOf(back, from)) >= 0) {
        if (!token.test(text.charAt(from - 1)) && !token.test(text.charAt(from + back.length))) { at = from; break; }
        from += 1;
      }
      if (at >= 0) add(text.slice(0, at).split('\n').length, 'fact', 'المتوقع «' + fact + '» والموجود معكوس «' + back + '»: أعد كتابته');
      else if (text.indexOf(fact) < 0) add(0, 'fact', 'المتوقع «' + fact + '» وليس في الملف');
    });
  };

  if (kind === 'doc') {
    var open = 0;
    input.split('\n').forEach(function (raw, i) {
      var line = i + 1;
      controls(raw, line, true);
      open += (raw.match(/[\u2066-\u2068]/g) || []).length - (raw.match(/\u2069/g) || []).length;
      var text = raw.replace(/[\u202A-\u202E\u2067-\u2069]/g, '');
      if (AR.test(text)) {
        var strong = text.match(/[A-Za-zء-ي\u200E\u200F]/);
        if (strong && /[A-Za-z\u200E]/.test(strong[0])) add(line, 'first', 'السطر يبدأ بحرف لاتيني فيُعرض من اليسار: ابدأ بكلمة عربية أو بعلامة RLM');
      }
      textRules(text.replace(/[\u200F]/g, ''), line, false);
    });
    if (open !== 0) add(0, 'control', 'علامات العزل غير متوازنة: لكل LRI أو RLI علامة PDI تغلقها');
    factRule(input.replace(/[\u202A-\u202E\u2066-\u2069\u200E\u200F]/g, ''));
  } else {
    var html = input.replace(/<head[\s\S]*?<\/head>/i, function (h) { return h.replace(/[^\n]/g, ' '); })
      .replace(/<![^>]*>/g, function (h) { return h.replace(/[^\n]/g, ' '); });
    var root = input.match(/<html[^>]*>/i);
    if (!root || !/dir\s*=\s*["']?rtl/i.test(root[0])) add(root ? lineOf(root.index) : 1, 'dir', 'الصفحة بلا dir="rtl" على العنصر html: كل فقراتها تُعرض من اليسار');
    var re = /<(\/?)([a-zA-Z0-9]+)([^>]*)>|([^<]+)/g, stack = [], t;
    while ((t = re.exec(html))) {
      if (t[4] !== undefined) {
        var text2 = t[4].replace(/&[a-z]+;/g, ' ');
        if (!text2.trim()) continue;
        var line2 = lineOf(t.index + (t[4].length - t[4].replace(/^\s+/, '').length));
        var inLtr = stack.some(function (s) { return s.ltr; });
        controls(text2, line2, false);
        var clean = text2.replace(/[\u202A-\u202E\u2066-\u2069\u200E\u200F]/g, '');
        if (inLtr) {
          if (AR.test(clean)) add(line2, 'ltr-arabic', 'نص عربي داخل عنصر dir="ltr": ترتيب كلماته ينقلب. اعزل المقطع اللاتيني أو الرقم وحده');
        } else {
          if (/[A-Za-z]/.test(clean)) add(line2, 'latin', 'مقطع لاتيني غير معزول «' + clean.match(/[A-Za-z][A-Za-z0-9.@_\-]*/)[0] + '»: ضعه في <span dir="ltr">');
          textRules(clean, line2, false);
          if (!AR.test(clean)) textRules('ع ' + clean, line2, false);
        }
      } else if (t[1]) {
        for (var k = stack.length - 1; k >= 0; k--) { if (stack[k].tag === t[2].toLowerCase()) { stack.length = k; break; } }
      } else if (!/^(br|img|meta|link|hr|input)$/i.test(t[2]) && !/\/\s*$/.test(t[3])) {
        var ltr = /dir\s*=\s*["']?ltr/i.test(t[3]) || t[2].toLowerCase() === 'bdi';
        stack.push({ tag: t[2].toLowerCase(), ltr: ltr });
      }
    }
    factRule(stripTags(html));
  }
  return out.sort(function (a, b) { return a.line - b.line; });

  function stripTags(h) { return h.replace(/<[^>]+>/g, '').replace(/[\u202A-\u202E\u2066-\u2069\u200E\u200F]/g, ''); }
}
