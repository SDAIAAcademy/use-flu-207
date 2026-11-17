/* The documents of the case study as small self-standing pages. Everything is invented:
   Shira Fisheries Authority, its people, its policy, its messages and every number. */
import * as W from './world.mjs';
import { letterChecklist, noticeChecklist, CALQUES, directionCheck } from '../solutions/rules.mjs';

const STYLE = `
  * { box-sizing: border-box; }
  body { margin: 0; font-family: "IBM Plex Sans Arabic", "IBM Plex Sans", "Segoe UI", Tahoma, sans-serif; background: #f6f4ef; color: #1c2330; line-height: 1.8; }
  main { max-width: 820px; margin: 0 auto; padding: 18px 16px 48px; }
  .doc { background: #fff; border: 1px solid #d9d5cb; border-radius: 12px; padding: 20px 22px; }
  .kicker { color: #0a7c72; font-weight: 700; font-size: .9rem; }
  h1 { margin: 2px 0 10px; font-size: 1.45rem; color: #14213d; }
  h2 { margin: 18px 0 6px; font-size: 1.08rem; color: #14213d; }
  h3 { margin: 12px 0 4px; font-size: 1rem; color: #14213d; }
  p { margin: 6px 0; }
  ul, ol { margin: 6px 0; padding-inline-start: 22px; }
  .scroll { overflow-x: auto; }
  table { border-collapse: collapse; width: 100%; margin: 8px 0; font-size: .95rem; }
  th, td { border: 1px solid #d9d5cb; padding: 7px 9px; text-align: start; vertical-align: top; }
  th { background: #eef1f6; }
  td.fill { background: #fffbe8; height: 2.6em; min-width: 6em; }
  .note { color: #5b6270; font-size: .9rem; border-top: 1px solid #d9d5cb; margin-top: 16px; padding-top: 8px; }
  .out { border: 1px solid #c9ced8; border-radius: 10px; padding: 12px 16px; margin: 10px 0 18px; background: #fbfcfe; }
  .page { border-top: 3px solid #14213d; margin-top: 18px; padding-top: 4px; }
  .tag { display: inline-block; background: #14213d; color: #fff; border-radius: 999px; padding: 0 10px; font-size: .82rem; }
  .ltr { direction: ltr; unicode-bidi: isolate; display: inline-block; }
  .en { direction: ltr; unicode-bidi: isolate; text-align: left; }
  button, select, textarea, input { font: inherit; }
  textarea { width: 100%; min-height: 12em; border: 1px solid #c9ced8; border-radius: 8px; padding: 8px; }
  .bar { display: flex; flex-wrap: wrap; gap: 8px; margin: 8px 0; align-items: center; }
  button { border: 1px solid #14213d; background: #14213d; color: #fff; border-radius: 8px; padding: 4px 14px; cursor: pointer; }
  button.alt { background: #fff; color: #14213d; }
  .pass { border-inline-start: 6px solid #0a7c72; background: #eef7f5; padding: 8px 12px; border-radius: 8px; }
  .fail { border-inline-start: 6px solid #c0392b; background: #fdf0ee; padding: 8px 12px; border-radius: 8px; }
  code, .marks { font-family: "IBM Plex Mono", Consolas, monospace; font-size: .9em; }
  .marks { direction: ltr; text-align: left; display: block; background: #f1f3f7; border-radius: 6px; padding: 2px 8px; overflow-x: auto; white-space: pre; }
  @media print { body { background: #fff; } .doc { border: 0; } }
`;
const SYNTHETIC = 'وثيقة تدريبية من مقرر أكاديمية سدايا USE-FLU-207. هيئة شراع للثروة السمكية جهة افتراضية، وكل الأسماء والأرقام والسياسات والرسائل فيها مختلقة لأغراض التدريب.';
const SYNTHETIC_EN = 'A training document of SDAIA Academy course USE-FLU-207. Every organisation, name, number and policy in it is invented.';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
/* Latin runs and signed numbers inside Arabic text are isolated by an element. */
const iso = (s) => esc(s)
  .replace(/\+966 11 555 0142/g, '<span class="ltr">+966 11 555 0142</span>')
  .replace(/(SFA-2027-01[45]|khidma@shiraa\.example|\bSFA\b)/g, '<span class="ltr">$1</span>');
const lines = (text) => text.split('\n').map((l) => `<p>${iso(l)}</p>`).join('\n');
const out = (id, text) => `<div class="out" id="${id}">\n${lines(text)}\n</div>`;
const outEn = (id, text) => `<div class="out en" id="${id}" dir="ltr" lang="en">\n${text.split('\n').map((l) => `<p>${esc(l)}</p>`).join('\n')}\n</div>`;
const fillRows = (n, cells, first = (i) => i + 1) => Array.from({ length: n }, (_, i) => `<tr><td>${first(i)}</td>${'<td class="fill"></td>'.repeat(cells)}</tr>`).join('\n');

export function page(title, kicker, body, opt = {}) {
  const en = opt.lang === 'en';
  return `<!doctype html>
<html lang="${en ? 'en' : 'ar'}" dir="${en ? 'ltr' : 'rtl'}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<style>${STYLE}</style>
</head>
<body>
<main>
<div class="doc">
<div class="kicker">${kicker}</div>
<h1>${title}</h1>
${body.trim()}
<p class="note">${en ? SYNTHETIC_EN : SYNTHETIC}</p>
</div>
</main>${opt.script ? `\n<script>\n${opt.script}\n</script>` : ''}
</body>
</html>
`;
}

/* ------------------------------------------------------------------ before the day */

export const prework = () => page('العمل التحضيري: مستنداتي العربية', 'قبل اليوم التدريبي · نحو 45 دقيقة', `
<p>املأ هذه الورقة قبل اليوم وأحضرها معك. لا تكتب فيها اسم شخص ولا رقم هوية ولا نصًّا مصنفًا فوق «عام».</p>
<h2>1 · ثلاثة مستندات عربية تكتبها بانتظام</h2>
<div class="scroll"><table>
<tr><th>#</th><th>المستند</th><th>لمن يُكتب؟</th><th>رسمي أم مبسط؟</th><th>هل يُترجم؟</th><th>ما الذي يراجَع فيه اليوم؟</th></tr>
${fillRows(3, 5)}
</table></div>
<h2>2 · مصطلحات جهتك</h2>
<p>اكتب خمسة مصطلحات تتكرر في عملك، ومقابل كل منها بالإنجليزية كما تعتمده جهتك. إن لم يكن لجهتك مسرد فاكتب ذلك.</p>
<div class="scroll"><table>
<tr><th>#</th><th>المصطلح بالعربية</th><th>المقابل بالإنجليزية</th><th>من أين عرفته؟</th></tr>
${fillRows(5, 3)}
</table></div>
<h2>3 · اقرأ قبل اليوم</h2>
<ul>
<li>التعميم <a href="circular_closure_ar.html">circular_closure_ar.html</a>: ستعمل عليه طوال اليوم.</li>
<li>الصفحة الأولى من <a href="policy_catch_reporting_ar.html">policy_catch_reporting_ar.html</a>.</li>
</ul>
<h2>4 · جهّز أدواتك</h2>
<ul>
<li>مساعدان يدعمان العربية مما تعتمده جهتك. إن لم يتح لك إلا واحد أو لم يتح لك شيء فالمخرجات المعدّة في الملفات تكفي.</li>
<li>محرر نصوص يُظهر العلامات غير المرئية، مثل Notepad++ أو Visual Studio Code.</li>
<li>مستند واحد من عملك تنوي فحصه في مهمة المتابعة، بعد حذف كل ما يعرّف بشخص أو جهة منه.</li>
</ul>`);

/* ------------------------------------------------------------------ lab 1.1 */

const factsTable = () => `<table>
<tr><th>الحقيقة</th><th>القيمة</th></tr>
<tr><td>التعميم</td><td><span class="ltr">${W.CIRCULAR_NO}</span> بتاريخ ${W.ar('circular')}</td></tr>
<tr><td>بداية موسم الحظر</td><td>${W.ar('start')}</td></tr>
<tr><td>نهاية موسم الحظر</td><td>نهاية يوم ${W.ar('end')} (61 يومًا)</td></tr>
<tr><td>استئناف الصيد</td><td>${W.ar('resume')}</td></tr>
<tr><td>النطاق</td><td>ضمن 12 ميلًا بحريًّا من الساحل</td></tr>
<tr><td>الاستثناء</td><td>مصيد عرضي لا يتجاوز 5 كجم في الرحلة، بشرط الإبلاغ عنه وعدم بيعه</td></tr>
<tr><td>الغرامة</td><td>5,000 ريال للمخالفة الأولى، وتعليق الرخصة 30 يومًا عند التكرار</td></tr>
<tr><td>الدعم</td><td>1,500 ريال في الشهر عن شهري الحظر لمن كانت رخصته سارية في 1 يوليو 2027</td></tr>
<tr><td>للاستفسار</td><td>مركز خدمات الصيادين: <span class="ltr">${W.PHONE}</span></td></tr>
</table>`;

export const briefSeason = () => page('بطاقة الحقائق: موسم حظر صيد الكنعد 2027', `${W.ORG} · إدارة الاتصال وخدمات الصيادين`, `
<p>من: شهد الشقير، مديرة الاتصال وخدمات الصيادين.</p>
<p>نحتاج إلى نصّين عن موسم الحظر، ولكل منهما قارئ مختلف:</p>
<ol>
<li><b>خطاب رسمي</b> إلى سعادة رئيس الجمعية التعاونية للصيادين بمرفأ الدانة، الأستاذ ميسرة الوشمي، رقمه <span class="ltr">SFA-2027-015</span> وتاريخه ${W.ar('letter')}. نطلب فيه إبلاغ أعضاء الجمعية، وعددهم 412 عضوًا، قبل ${W.ar('inform')}، وتزويدنا بأسماء من يتعذر إبلاغهم.</li>
<li><b>إشعار عام مبسط</b> للصيادين، يُعلَّق في مواقع الإنزال ويُرسل في رسائل الجوال. يقرؤه صياد واقف على الرصيف في أقل من دقيقة.</li>
</ol>
<h2>الحقائق</h2>
<div class="scroll">${factsTable()}</div>
<p>التصنيف في القصة: «عام». في عملك لا يدخل أي مساعد عام إلا ما صُنّف «عامًّا».</p>`);

export const registerChecklist = () => {
  const rows = (list) => list.map((x) => `<tr><td>${x.id}</td><td>${x.label}</td><td class="fill"></td><td class="fill"></td></tr>`).join('\n');
  return page('قائمة التحقق للمستوى اللغوي', `${W.ORG} · المختبر 1.1`, `
<p>لكل نص عشر نقاط. ضع 1 إذا استوفى النص النقطة و0 إذا لم يستوفها، مرة للمسودة الأولى ومرة بعد المراجعة.</p>
<h2>الخطاب الرسمي</h2>
<div class="scroll"><table>
<tr><th>#</th><th>النقطة</th><th>المسودة الأولى</th><th>بعد المراجعة</th></tr>
${rows(letterChecklist(''))}
<tr><th colspan="2">المجموع من 10</th><td class="fill"></td><td class="fill"></td></tr>
</table></div>
<h2>الإشعار العام المبسط</h2>
<div class="scroll"><table>
<tr><th>#</th><th>النقطة</th><th>المسودة الأولى</th><th>بعد المراجعة</th></tr>
${rows(noticeChecklist(''))}
<tr><th colspan="2">المجموع من 10</th><td class="fill"></td><td class="fill"></td></tr>
</table></div>
<h2>عبارات تبدو مترجمة</h2>
<div class="scroll"><table>
<tr><th>العبارة</th><th>بديل عربي</th></tr>
<tr><td>تم تحديد الموسم</td><td>حُدِّد الموسم، أو: حددت الهيئة الموسم</td></tr>
<tr><td>من قبل الهيئة</td><td>اجعل الهيئة فاعلًا: أقرّت الهيئة</td></tr>
<tr><td>يلعب دورًا مهمًّا</td><td>يسهم في، أو: يحمي</td></tr>
<tr><td>بشكل كبير، بشكل فعّال</td><td>كثيرًا، أو احذفها واذكر الأثر</td></tr>
<tr><td>بواسطة التطبيق</td><td>بالتطبيق، عبر التطبيق</td></tr>
<tr><td>لا تتردد في التواصل</td><td>للاستفسار اتصل بـ</td></tr>
<tr><td>نأمل أن تجدكم هذه الرسالة بخير</td><td>السلام عليكم ورحمة الله وبركاته</td></tr>
<tr><td>على الرغم من حقيقة أن</td><td>مع أن</td></tr>
</table></div>
<p>القائمة تضم ${CALQUES.length} أنماط. وجود عبارة منها يُسقط النقطة، وخلوّ النص منها لا يعني أنه عربي الصياغة: اقرأه بصوت مسموع.</p>`);
};

export const draftsSample = () => page('مسودات معدّة: الخطاب والإشعار', `${W.ORG} · المختبر 1.1 · لمن لا يتاح له مساعد`, `
<p>أربعة نصوص مكتوبة باليد بصيغة ما يكتبه مساعد: مسودة أولى من أمر من سطر واحد، ثم نسخة بعد أمر يحدد المستوى اللغوي والنبرة والجمهور والمصطلحات. لم يُنتجها أي نموذج.</p>
<h2>الخطاب: المسودة الأولى</h2>
<p><span class="tag">الأمر</span> اكتب رسالة لرئيس جمعية الصيادين عن موسم حظر الكنعد.</p>
${out('letter-v1', W.LETTER_V1)}
<h2>الخطاب: بعد المراجعة</h2>
${out('letter-v2', W.LETTER_V2)}
<h2>الإشعار: المسودة الأولى</h2>
<p><span class="tag">الأمر</span> اكتب إعلانًا للصيادين عن موسم حظر الكنعد.</p>
${out('notice-v1', W.NOTICE_V1)}
<h2>الإشعار: بعد المراجعة</h2>
${out('notice-v2', W.NOTICE_V2)}`);

/* ------------------------------------------------------------------ lab 1.2 */

export const policy = () => page('سياسة الإبلاغ الإلكتروني عن المصيد وبياناته', `${W.ORG} · الإصدار 1 · ثلاث صفحات واثنتا عشرة مادة`, [1, 2, 3].map((p) => `
<div class="page" id="page-${p}">
<h2>الصفحة ${p}</h2>
${W.POLICY.filter((a) => a.page === p).map((a) => `<p id="article-${a.id}"><b>المادة ${a.id} · ${a.title}.</b> ${a.text}</p>`).join('\n')}
</div>`).join('\n'));

export const glossarySheet = () => page('ورقة المسرد: عشرون مصطلحًا', `${W.ORG} · المختبر 1.2 · المسودة الأولى دون مساعد`, `
<p>اكتب المقابل الإنجليزي الذي تراه لكل مصطلح، من قراءتك للسياسة وحدها. لا تسأل مساعدًا في هذه الخطوة. ثم قارن بالمسرد المعتمد وضع علامة عند ما اختلف.</p>
<div class="scroll"><table>
<tr><th>#</th><th>المصطلح</th><th>مقابلي بالإنجليزية</th><th>المعتمد</th><th>اختلف؟</th></tr>
${W.GLOSSARY.map((g) => `<tr><td>${g.id}</td><td>${g.ar[0]}</td><td class="fill"></td><td class="fill"></td><td class="fill"></td></tr>`).join('\n')}
</table></div>
<h2>فحص المطابقة بالعينة</h2>
<p>لكل موضع: هل في الترجمة المقابل المعتمد نفسه؟ اكتب نعم أو لا، وما وجدته إن كان غيره.</p>
<div class="scroll"><table>
<tr><th>#</th><th>المادة أو الفقرة</th><th>المصطلح في المصدر</th><th>ما في الترجمة</th><th>مطابق؟</th></tr>
${fillRows(15, 4)}
</table></div>
<p>المجموع: <b>مطابق</b> ____ من ____.</p>`);

export const glossaryApproved = () => page('المسرد المعتمد: عربي إنجليزي', `${W.ORG} · اعتمدته المترجمة رباب السنبل`, `
<p>عشرون مصطلحًا لسياسة الإبلاغ الإلكتروني عن المصيد. سبعة منها مأخوذة من معجم البيانات والذكاء الاصطناعي الصادر عن سدايا، والباقي من مسرد الهيئة. الملف نفسه بصيغة يقرؤها برنامج OmegaT: <a href="glossary_shiraa.txt">glossary_shiraa.txt</a>.</p>
<div class="scroll"><table id="glossary">
<tr><th>#</th><th>العربية</th><th>الإنجليزية</th><th>المصدر</th><th>ملاحظة</th></tr>
${W.GLOSSARY.map((g) => `<tr><td>${g.id}</td><td>${g.ar[0]}</td><td><span class="ltr">${esc(g.en[0])}</span></td><td>${g.source}</td><td>${g.note.replace(/([A-Za-z][A-Za-z ]*[A-Za-z])/g, '<span class="ltr">$1</span>')}</td></tr>`).join('\n')}
</table></div>`);

export const glossaryTxt = () => W.GLOSSARY.map((g) => `${g.ar[0]}\t${g.en[0]}\t${g.source}`).join('\n') + '\n';

export const partnerNote = () => page('Data-sharing note', 'Gulf Coastal Fisheries Forum · to Shira Fisheries Authority', `
<p>To be translated into Arabic for the Authority's cooperative societies.</p>
${Object.entries(W.NOTE_EN).map(([i, t]) => `<p id="note-${i}"><b>${i}.</b> ${esc(t)}</p>`).join('\n')}`, { lang: 'en' });

export const translationSample = () => {
  const p2 = W.POLICY.filter((a) => a.page === 2);
  const t1 = (key) => `<div class="scroll"><table>
<tr><th>المادة</th><th>المصدر</th><th>الترجمة</th></tr>
${p2.map((a) => `<tr><td>${a.id}</td><td>${a.text}</td><td class="en" dir="ltr" lang="en" id="p2-${key}-${a.id}">${esc(W.PAGE2_EN[key][a.id])}</td></tr>`).join('\n')}
</table></div>`;
  const t2 = (key) => `<div class="scroll"><table>
<tr><th>#</th><th>المصدر</th><th>الترجمة</th></tr>
${Object.keys(W.NOTE_EN).map((i) => `<tr><td>${i}</td><td class="en" dir="ltr" lang="en">${esc(W.NOTE_EN[i])}</td><td id="note-${key}-${i}">${W.NOTE_AR[key][i]}</td></tr>`).join('\n')}
</table></div>`;
  return page('ترجمات معدّة: دون المسرد ومعه', `${W.ORG} · المختبر 1.2 · لمن لا يتاح له مساعد`, `
<p>أربع ترجمات مكتوبة باليد بصيغة ما يكتبه مساعد، ولم يُنتجها أي نموذج. في كل اتجاه ترجمة من أمر بلا مسرد، وترجمة من أمر أُلصق فيه المسرد المعتمد.</p>
<h2>الصفحة 2 إلى الإنجليزية: دون مسرد</h2>
${t1('none')}
<h2>الصفحة 2 إلى الإنجليزية: والمسرد في الأمر</h2>
${t1('glossary')}
<h2>مذكرة الشريك إلى العربية: دون مسرد</h2>
${t2('none')}
<h2>مذكرة الشريك إلى العربية: والمسرد في الأمر</h2>
${t2('glossary')}`);
};

/* ------------------------------------------------------------------ lab 1.3 */

export const reportEn = () => page(W.REPORT.title, `${W.REPORT.body} · published 14 March 2027`, `
<h2>Summary</h2>
<div id="summary">
${W.REPORT.summary.map((s) => `<p>${esc(s)}</p>`).join('\n')}
</div>
<h2>Recommendations</h2>
<div id="recommendations">
<p>${esc(W.REPORT.lead)}</p>
<ol>
${W.REPORT.recs.map((s) => `<li>${esc(s)}</li>`).join('\n')}
</ol>
</div>`, { lang: 'en' });

export const circularAr = () => page(`تعميم رقم <span class="ltr">${W.CIRCULAR_NO}</span>`, `${W.ORG} · <span class="ltr">${W.ORG_EN}</span>`, `
<p>التاريخ: ${W.ar('circular')}</p>
<p>إلى: الجمعيات التعاونية للصيادين وحاملي رخص الصيد في مرافئ الدانة والنورس والمحار</p>
<p><b>الموضوع: موسم حظر صيد الكنعد لعام 2027</b></p>
<ol id="circular">
${W.CIRCULAR.map((s) => `<li>${s}</li>`).join('\n')}
</ol>
<p>للاستفسار: مركز خدمات الصيادين، هاتف <span class="ltr">${W.PHONE}</span>.</p>
<p>شهد الشقير<br>مديرة الاتصال وخدمات الصيادين</p>`).replace(/<title>[^<]*<\/title>/, `<title>تعميم موسم حظر صيد الكنعد 2027</title>`);

export const threeOutputs = () => page('ثلاثة مخرجات للفحص', `${W.ORG} · المختبر 1.3 · فيها عشرة أخطاء مدسوسة`, `
<p>ثلاثة نصوص مكتوبة باليد بصيغة ما يكتبه مساعد، ولم يُنتجها أي نموذج. تبدو سليمة عند القراءة. قابل كل اسم ورقم وتاريخ ووحدة فيها بالمصدر، وابحث عمّا سقط منها.</p>
<h2>المخرج 1 · ملخص عربي للتقرير الإنجليزي</h2>
<p>المصدر: <a href="report_review_en.html">report_review_en.html</a>، القسمان كلاهما.</p>
<div class="out" id="o1">
${W.O1.map((s) => `<p>${s}</p>`).join('\n')}
</div>
<h2>المخرج 2 · ترجمة عربية لقسم التوصيات</h2>
<p>المصدر: قسم <span class="ltr">Recommendations</span> في التقرير نفسه.</p>
<div class="out" id="o2">
<p>${W.O2_LEAD}</p>
<ol>
${W.O2.map((s) => `<li>${s}</li>`).join('\n')}
</ol>
</div>
<h2>المخرج 3 · ترجمة إنجليزية للتعميم</h2>
<p>المصدر: <a href="circular_closure_ar.html">circular_closure_ar.html</a>.</p>
<div class="out en" id="o3" dir="ltr" lang="en">
<p>${esc(W.O3_HEAD)}</p>
<ol>
${W.O3.map((s) => `<li>${esc(s)}</li>`).join('\n')}
</ol>
</div>`);

export const errorLog = () => page('سجل الأخطاء', `${W.ORG} · المختبر 1.3`, `
<p>سطر لكل خطأ. النوع واحد من خمسة: اسم، رقم، تاريخ، وحدة، محذوف. في العمود الأخير: من وجده أولًا، أنت أم المساعد في الجولة الثانية؟</p>
<div class="scroll"><table>
<tr><th>#</th><th>المخرج</th><th>ما في المخرج</th><th>ما في المصدر</th><th>النوع</th><th>التصحيح</th><th>من وجده؟</th></tr>
${fillRows(12, 6)}
</table></div>
<p>وجدتُ دون مساعد: ____ من 10. أضاف المساعد: ____. إنذارات المساعد الخاطئة: ____.</p>`);

/* ------------------------------------------------------------------ lab 1.4 */

export const fiveTasks = () => page('خمس مهام لمساعدين', `${W.ORG} · المختبر 1.4`, `
<p>شغّل كل مهمة على المساعدين بالأمر نفسه حرفيًّا، في محادثة جديدة لكل مهمة. لا تصحّح لأحدهما ما لا تصحّحه للآخر.</p>
<h2>المهمة 1 · خطاب رسمي</h2>
<p>خطاب إلى رئيس الجمعية التعاونية للصيادين من <a href="brief_season.html">بطاقة الحقائق</a>. المقياس: قائمة الخطاب من عشر نقاط.</p>
<h2>المهمة 2 · إشعار مبسط</h2>
<p>إشعار للصيادين من البطاقة نفسها. المقياس: قائمة الإشعار من عشر نقاط.</p>
<h2>المهمة 3 · ترجمة إلى العربية بالمسرد</h2>
<p>ترجمة <a href="partner_note_en.html">مذكرة الشريك</a> والمسرد المعتمد في الأمر. المقياس: مطابقة المصطلحات في المواضع الثلاثة عشر.</p>
<h2>المهمة 4 · تفريغ نصي لرسالة صوتية باللهجة</h2>
<p>يقرأ المدرّب أو أحد المشاركين من أهل اللهجة الرسالة <span class="ltr">V2</span> بصوته ويسجّلها على الجوال، ثم تُعطى لكل مساعد أو لأداة تفريغ نصي معتمدة. المطلوب تفريغ حرفي يُبقي كلمات المتكلم، ثم جملة بالفصحى تقول ما يطلبه. من لا تتاح له أداة صوتية يعمل على التفريغين المعدّين. المقياس: نسبة الكلمات الخاطئة مقارنة بالنص المرجعي، وهل صحّ معنى الطلب.</p>
<div class="scroll"><table id="voice">
<tr><th>الرسالة</th><th>اللهجة</th><th>النص المرجعي كما قاله صاحبه</th></tr>
${W.VOICE.map((v) => `<tr><td><span class="ltr">${v.id}</span></td><td>${v.dialect}</td><td id="voice-${v.id}">${v.text}</td></tr>`).join('\n')}
</table></div>
<p>الرسائل الثلاث مكتوبة للتدريب ولم تُسجَّل من متكلمين حقيقيين. إن كان في القاعة من أهل إحدى هذه اللهجات فليصحّح صياغتها قبل قراءتها.</p>
<h2>المهمة 5 · ملخص بتاريخين</h2>
<p>ملخص عربي من جملتين لقسم <span class="ltr">Summary</span> والتوصية الأولى في <a href="report_review_en.html">التقرير الإنجليزي</a>، وتاريخا الحظر لعام 2027 باليوم والتقويمين. المقياس: كل رقم وكل تاريخ مطابق.</p>
<h2>سلم الدرجات</h2>
<div class="scroll"><table>
<tr><th>الدرجة</th><th>المهمتان 1 و2</th><th>المهمة 3</th><th>المهمة 4</th><th>المهمة 5</th><th>المعنى</th></tr>
<tr><td>2</td><td>9 أو 10 من 10</td><td>12 أو 13 من 13</td><td>10% أو أقل والمعنى صحيح</td><td>لا خطأ</td><td>يصلح بعد قراءتك</td></tr>
<tr><td>1</td><td>6 إلى 8</td><td>9 إلى 11</td><td>أكثر من 10% إلى 25%</td><td>خطأ واحد</td><td>يصلح بعد تصحيحك</td></tr>
<tr><td>0</td><td>5 أو أقل</td><td>8 أو أقل</td><td>أكثر من 25%</td><td>خطآن أو أكثر</td><td>لا يصلح دون مراجع أو مترجم</td></tr>
</table></div>`);

export const assistantsOutputs = () => {
  const cell = (id, text) => `<div class="out" id="${id}">\n${lines(text)}\n</div>`;
  const note = (k) => Object.values(W.NOTE_AR[k]).join('\n');
  return page('مخرجات معدّة للمساعدين أ و ب', `${W.ORG} · المختبر 1.4 · لمن لا يتاح له مساعدان`, `
<p>عشرة مخرجات مكتوبة باليد بصيغة ما يكتبه مساعدان مختلفان، ولم يُنتجها أي نموذج. «المساعد أ» و«المساعد ب» ليسا منتجين حقيقيين.</p>
<h2>المهمة 1 · خطاب رسمي</h2>
<h3>المساعد أ</h3>${cell('t1-a', W.LETTER_V2)}
<h3>المساعد ب</h3>${cell('t1-b', W.LETTER_B)}
<h2>المهمة 2 · إشعار مبسط</h2>
<h3>المساعد أ</h3>${cell('t2-a', W.NOTICE_A)}
<h3>المساعد ب</h3>${cell('t2-b', W.NOTICE_V2)}
<h2>المهمة 3 · ترجمة مذكرة الشريك بالمسرد</h2>
<h3>المساعد أ</h3>${cell('t3-a', note('glossary'))}
<h3>المساعد ب</h3>${cell('t3-b', note('partial'))}
<h2>المهمة 4 · تفريغ نصي للرسالة <span class="ltr">V2</span> ثم الطلب بالفصحى</h2>
<h3>المساعد أ</h3>${cell('t4-a', W.T4.A.transcript)}${cell('t4-a-request', W.T4.A.request)}
<h3>المساعد ب</h3>${cell('t4-b', W.T4.B.transcript)}${cell('t4-b-request', W.T4.B.request)}
<h2>المهمة 5 · ملخص بتاريخين</h2>
<h3>المساعد أ</h3>${cell('t5-a', W.T5.A)}
<h3>المساعد ب</h3>${cell('t5-b', W.T5.B)}`);
};

export const comparisonTable = () => page('جدول المقارنة بين مساعدين', `${W.ORG} · المختبر 1.4`, `
<p>المساعد الأول: ____________ · المساعد الثاني: ____________ · التاريخ: ____________</p>
<div class="scroll"><table>
<tr><th>المهمة</th><th>القياس: الأول</th><th>الدرجة</th><th>القياس: الثاني</th><th>الدرجة</th><th>هل يصلح أحدهما دون مراجع؟</th><th>من يراجع؟</th></tr>
${['1 · خطاب رسمي', '2 · إشعار مبسط', '3 · ترجمة بالمسرد', '4 · تفريغ نصي للهجة', '5 · ملخص بتاريخين'].map((t) => `<tr><td>${t}</td>${'<td class="fill"></td>'.repeat(6)}</tr>`).join('\n')}
<tr><th>المجموع من 10</th><td></td><td class="fill"></td><td></td><td class="fill"></td><td></td><td></td></tr>
</table></div>
<h2>ما لا يصلح فيه أي منهما دون مراجع أو مترجم</h2>
<div class="scroll"><table>
<tr><th>المهمة</th><th>الدليل من المخرجين</th><th>من يراجع: مراجع من أهل اللهجة، أم مترجم، أم صاحب الاختصاص؟</th></tr>
${fillRows(3, 2)}
</table></div>
<p>المجموع لا يختار لك مساعدًا. اكتب: أي مساعد لأي مهمة؟</p>`);

/* ------------------------------------------------------------------ lab 1.5 */

export const directionPage = () => {
  const script = `
var FACTS = { doc: ${JSON.stringify(W.DOC_FACTS)}, slide: ${JSON.stringify(W.SLIDE_FACTS)}, other: [] };
${directionCheck.toString()}
var NAMES = { 0x202A: 'LRE', 0x202B: 'RLE', 0x202C: 'PDF', 0x202D: 'LRO', 0x202E: 'RLO', 0x2066: 'LRI', 0x2067: 'RLI', 0x2068: 'FSI', 0x2069: 'PDI', 0x200E: 'LRM', 0x200F: 'RLM' };
function shown(line) {
  var s = '';
  for (var i = 0; i < line.length; i++) { var c = line.charCodeAt(i); s += NAMES[c] ? '[' + NAMES[c] + ']' : line[i]; }
  return s;
}
function run() {
  var text = document.getElementById('text').value.replace(/\\r\\n/g, '\\n');
  var which = document.getElementById('which').value;
  var kind = /<html|<!doctype/i.test(text) ? 'slide' : 'doc';
  var list = directionCheck(text, kind, FACTS[which]);
  var box = document.getElementById('result');
  box.textContent = '';
  var head = document.createElement('p');
  head.className = list.length ? 'fail' : 'pass';
  head.textContent = list.length ? 'عدد الملاحظات: ' + list.length : 'الملف يجتاز فحص الاتجاه: لا ملاحظات.';
  box.appendChild(head);
  var rows = text.split('\\n');
  list.forEach(function (f) {
    var p = document.createElement('p');
    p.textContent = (f.line ? 'السطر ' + f.line + ' · ' : 'الملف كله · ') + f.text;
    box.appendChild(p);
    if (f.line && kind === 'doc') { var m = document.createElement('span'); m.className = 'marks'; m.textContent = shown(rows[f.line - 1]); box.appendChild(m); }
  });
}
function load(input) {
  var file = input.files[0];
  if (!file) return;
  var reader = new FileReader();
  reader.onload = function () { document.getElementById('text').value = reader.result; run(); };
  reader.readAsText(file, 'utf-8');
}
function copyMark(code) {
  var mark = String.fromCharCode(code);
  if (navigator.clipboard) navigator.clipboard.writeText(mark);
  document.getElementById('copied').textContent = 'نُسخت العلامة ' + NAMES[code] + '. الصقها في المحرر حيث تريدها.';
}`;
  return page('فحص الاتجاه', `${W.ORG} · المختبر 1.5 · أداة تعمل في المتصفح دون اتصال`, `
<p>افتح ملفك أو الصق نصه، ثم اضغط «فحص». الأداة تقرأ الحروف المخزَّنة في الملف، لا شكلها على الشاشة، ولا ترسل شيئًا إلى أي مكان.</p>
<div class="bar">
<label>الملف: <select id="which"><option value="doc">التعميم circular_bidi.txt</option><option value="slide">الشريحة slide_bidi.html</option><option value="other">نص آخر</option></select></label>
<label>فتح ملف: <input type="file" accept=".txt,.html,.htm" onchange="load(this)"></label>
<button onclick="run()">فحص</button>
</div>
<textarea id="text" dir="auto" spellcheck="false"></textarea>
<div id="result"></div>
<h2>علامات الاتجاه</h2>
<p>لنسخ علامة غير مرئية إلى الحافظة ثم لصقها في المحرر:</p>
<div class="bar">
<button class="alt" onclick="copyMark(0x200E)">نسخ LRM</button>
<button class="alt" onclick="copyMark(0x200F)">نسخ RLM</button>
<span id="copied"></span>
</div>
<div class="scroll"><table>
<tr><th>القاعدة</th><th>ما تبحث عنه</th><th>الإصلاح</th></tr>
<tr><td>علامات التحكم</td><td>علامات التضمين والتجاوز القديمة، مثل <span class="ltr">RLO</span></td><td>احذفها</td></tr>
<tr><td>حقيقة معكوسة</td><td>رقم أو رمز كُتب معكوسًا في الملف</td><td>أعد كتابته</td></tr>
<tr><td>بداية السطر</td><td>سطر عربي يبدأ بحرف لاتيني</td><td>ابدأ بكلمة عربية أو بعلامة <span class="ltr">RLM</span></td></tr>
<tr><td>الترقيم</td><td>فاصلة أو علامة استفهام لاتينية، أو علامة في أول السطر</td><td>، ؛ ؟ في آخر الجملة</td></tr>
<tr><td>النطاق</td><td>رقمان بينهما شرطة ومسافتان</td><td>من … إلى …</td></tr>
<tr><td>الإشارة</td><td>رقم بإشارة أو رقم هاتف دون عزل</td><td><span class="ltr">LRM</span> قبله في النص، أو <span class="ltr">dir="ltr"</span> في الصفحة</td></tr>
<tr><td>الأرقام</td><td>أرقام مشرقية في مستند أرقامه 0 إلى 9</td><td>وحّد الأرقام</td></tr>
<tr><td>في الصفحة</td><td>غياب <span class="ltr">dir="rtl"</span>، ومقطع لاتيني غير معزول، ونص عربي داخل عنصر <span class="ltr">ltr</span></td><td>السمة <span class="ltr">dir</span> على العنصر الصحيح</td></tr>
</table></div>`, { script });
};

/* ------------------------------------------------------------------ lab 1.6 */

const bilingual = (v, opt) => `<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>إشعار ثنائي اللغة: موسم حظر صيد الكنعد</title>
<style>
  body { margin: 0; background: #f6f4ef; font-family: "IBM Plex Sans Arabic", "Segoe UI", Tahoma, sans-serif; color: #1c2330; line-height: 1.8; }
  main { max-width: 760px; margin: 0 auto; padding: 18px 16px 40px; }
  .notice { background: #fff; border: 1px solid #d9d5cb; border-radius: 12px; padding: 16px 22px; margin-bottom: 14px; }
  h1 { font-size: 1.3rem; margin: 0 0 6px; color: #14213d; }
  .small { color: #5b6270; font-size: .9rem; }
</style>
</head>
<body>
<main>
<div class="notice" id="notice-ar">
<h1>${v.ar[0]}</h1>
${v.ar.slice(1, 4).map((s) => `<p>${s}</p>`).join('\n')}
<p>${opt.fixed ? `للاستفسار: <span dir="ltr">${W.PHONE}</span>` : v.ar[4]}</p>
</div>
<div class="notice" id="notice-en"${opt.fixed ? ' dir="ltr" lang="en"' : ''}>
<h1>${v.en[0]}</h1>
${v.en.slice(1).map((s) => `<p>${s}</p>`).join('\n')}
</div>${opt.fixed ? `\n<p class="small" id="disclosure">${W.BI.disclosure}</p>` : ''}
<p class="small">وثيقة تدريبية من مقرر أكاديمية سدايا، وكل ما فيها مختلق.</p>
</main>
</body>
</html>
`;
export const bilingualDraft = () => bilingual(W.BI.draft, { fixed: false });
export const bilingualFixed = () => bilingual(W.BI.fixed, { fixed: true });

export const followupLog = () => page('سجل مهمة المتابعة', 'USE-FLU-207 · يُسلَّم خلال ثلاثة أسابيع من اليوم التدريبي', `
<p>سجل واحد لمستند واحد من عملك. احذف من المستند قبل أي شيء كل اسم ورقم هوية ورقم معاملة، ولا تُدخل في مساعد عام إلا ما صُنّف «عامًّا». يختار الميسّر من سجلك مواضع يراجعها معك.</p>
<div class="scroll"><table>
<tr><th>المستند (بعد حذف المعرّفات)</th><td class="fill"></td></tr>
<tr><th>تصنيفه</th><td class="fill"></td></tr>
<tr><th>المهمة: صياغة، أم ترجمة، أم تلخيص، أم تفريغ نصي؟</th><td class="fill"></td></tr>
<tr><th>المساعد المستخدم، وهل هو معتمد في جهتك؟</th><td class="fill"></td></tr>
<tr><th>المستوى اللغوي والجمهور كما كتبتهما في الأمر</th><td class="fill"></td></tr>
<tr><th>المسرد المستخدم ومصدره</th><td class="fill"></td></tr>
</table></div>
<h2>المصدر والمخرج والتصحيح جنبًا إلى جنب</h2>
<div class="scroll"><table>
<tr><th>#</th><th>الموضع في المصدر</th><th>ما في المخرج</th><th>التصحيح</th><th>نوع الفحص: مستوى لغوي، مصطلح، اسم، رقم، تاريخ، وحدة، محذوف، لهجة، اتجاه</th><th>من وجده؟</th></tr>
${fillRows(10, 5)}
</table></div>
<h2>القرار والإفصاح</h2>
<div class="scroll"><table>
<tr><th>هل راجعه مترجم محترف أو مراجع من أهل اللغة؟ من هو بصفته لا باسمه؟</th><td class="fill"></td></tr>
<tr><th>إن لم يراجعه أحد: لماذا يكفي فحصك؟</th><td class="fill"></td></tr>
<tr><th>القرار: نشر، أم نشر بعد التصحيح، أم إحالة؟</th><td class="fill"></td></tr>
<tr><th>سطر الإفصاح كما سيظهر مع النص</th><td class="fill"></td></tr>
</table></div>`);
