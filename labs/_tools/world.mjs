/* The world of the case study: Shira Fisheries Authority, a fictional regulator. Every name,
   number, policy and message here is invented for training. No randomness anywhere. */
import { dateAr, dateEn } from '../solutions/rules.mjs';

export const ORG = 'هيئة شراع للثروة السمكية';
export const ORG_EN = 'Shira Fisheries Authority';
export const PHONE = '+966 11 555 0142';
export const CIRCULAR_NO = 'SFA-2027-014';

/* Dates, written once and converted by the Umm al-Qura calendar of the runtime. */
export const D = {
  circular: [2027, 7, 4], letter: [2027, 7, 5], inform: [2027, 8, 1], start: [2027, 9, 1],
  end: [2027, 10, 31], resume: [2027, 11, 1], licence: [2027, 7, 1], review: [2027, 3, 14]
};
export const ar = (k, day = true) => dateAr(...D[k], day);
export const en = (k, day = true) => dateEn(...D[k], day);

/* ------------------------------------------------------------------ the glossary (lab 1.2) */

const SDAIA = 'معجم البيانات والذكاء الاصطناعي (سدايا)';
const HOUSE = 'مسرد الهيئة';
export const GLOSSARY = [
  { id: 1, ar: ['المصيد', 'مصيد', 'مصيدا'], en: ['catch', 'catches'], source: HOUSE, note: 'ليس haul' },
  { id: 2, ar: ['بلاغ المصيد', 'بلاغات المصيد'], en: ['catch report', 'catch reports'], source: HOUSE, note: 'ليس fishing report' },
  { id: 3, ar: ['موقع الإنزال', 'مواقع الإنزال', 'موقع إنزال'], en: ['landing site', 'landing sites'], source: HOUSE, note: 'ليس landing point ولا unloading site' },
  { id: 4, ar: ['موسم الحظر'], en: ['closed season'], source: HOUSE, note: 'ليس ban season' },
  { id: 5, ar: ['المصيد العرضي', 'مصيد عرضي', 'مصيدا عرضيا'], en: ['bycatch'], source: HOUSE, note: 'ليس incidental catch' },
  { id: 6, ar: ['رخصة الصيد', 'رخص الصيد'], en: ['fishing licence', 'fishing licences'], source: HOUSE, note: 'بالتهجئة البريطانية؛ ليس permit' },
  { id: 7, ar: ['قارب الصيد', 'قوارب الصيد', 'قارب صيد'], en: ['fishing vessel', 'fishing vessels'], source: HOUSE, note: 'ليس boat في النصوص الرسمية' },
  { id: 8, ar: ['الحصة', 'حصة'], en: ['quota', 'quotas'], source: HOUSE, note: 'ليس share' },
  { id: 9, ar: ['المخزون السمكي'], en: ['fish stock', 'fish stocks'], source: HOUSE, note: 'ليس fish wealth' },
  { id: 10, ar: ['الصياد الحرفي', 'صياد حرفي', 'الصيادين الحرفيين', 'الصيادون الحرفيون'], en: ['artisanal fisher', 'artisanal fishers'], source: HOUSE, note: 'ليس traditional fisherman' },
  { id: 11, ar: ['مراقب الإنزال'], en: ['landing inspector', 'landing inspectors'], source: HOUSE, note: 'ليس supervisor' },
  { id: 12, ar: ['الجمعية التعاونية للصيادين', 'جمعية تعاونية للصيادين'], en: ['fishers\' cooperative society', 'fishers\' cooperative societies'], source: HOUSE, note: 'الاسم المعتمد في المراسلات' },
  { id: 13, ar: ['مجموعة البيانات', 'مجموعة بيانات', 'مجموعات البيانات'], en: ['dataset', 'datasets', 'data set', 'data sets'], source: SDAIA, note: '' },
  { id: 14, ar: ['جودة البيانات'], en: ['data quality'], source: SDAIA, note: '' },
  { id: 15, ar: ['تعلُّم الآلة'], en: ['machine learning'], source: SDAIA, note: 'ليس «التعلم الآلي»' },
  { id: 16, ar: ['النموذج التنبؤي', 'نموذج تنبؤي'], en: ['predictive model', 'predictive models'], source: SDAIA, note: '' },
  { id: 17, ar: ['إخفاء بيانات الهوية'], en: ['data anonymization'], source: SDAIA, note: 'ليس «إخفاء الهوية» ولا «تجهيل البيانات»' },
  { id: 18, ar: ['تصنيف البيانات'], en: ['data classification'], source: SDAIA, note: '' },
  { id: 19, ar: ['البيانات الشخصية', 'بيانات شخصية'], en: ['personal data'], source: HOUSE, note: 'كما في مراسلات الهيئة' },
  { id: 20, ar: ['ترجمة الآلة'], en: ['machine translation'], source: SDAIA, note: 'ليس «الترجمة الآلية»' }
];

/* ------------------------------------------------------------------ the policy (three pages) */

export const POLICY = [
  { page: 1, id: 1, title: 'الغرض', text: 'تنظّم هذه السياسة الإبلاغ الإلكتروني عن المصيد في مرافئ الهيئة الثلاثة، وتحدد كيف تُجمع بياناته وتُحفظ وتُستخدم.' },
  { page: 1, id: 2, title: 'النطاق', text: 'تسري هذه السياسة على كل قارب صيد له رخصة سارية، وعلى كل صياد حرفي، وعلى كل جمعية تعاونية للصيادين تبلّغ عن أعضائها.' },
  { page: 1, id: 3, title: 'التعريفات', text: 'المصيد: كل ما يُصاد من الأحياء البحرية في الرحلة. المصيد العرضي: ما يُصاد من غير النوع المقصود. موقع الإنزال: المكان المعتمد لإنزال المصيد ووزنه. موسم الحظر: المدة التي يُمنع فيها صيد نوع محدد. الحصة: أقصى كمية يُسمح للقارب بإنزالها في الموسم.' },
  { page: 1, id: 4, title: 'بلاغ المصيد', text: 'يقدّم ربّان قارب الصيد بلاغ المصيد عبر التطبيق قبل مغادرة موقع الإنزال، وفيه النوع والوزن بالكيلوجرام ومنطقة الصيد والمصيد العرضي.' },
  { page: 2, id: 5, title: 'التحقق', text: 'يتحقق مراقب الإنزال من بلاغ المصيد قبل مغادرة القارب، ويطابق الوزن المسجَّل بالوزن الفعلي لعينة من القوارب كل يوم.' },
  { page: 2, id: 6, title: 'البلاغ في موسم الحظر', text: 'في موسم الحظر لا يُقبل بلاغ المصيد إذا تضمّن النوع المحظور، إلا إذا كان مصيدًا عرضيًّا لا يتجاوز 5 كجم في الرحلة.' },
  { page: 2, id: 7, title: 'الحصة', text: 'تُحتسب من الحصة كل كمية تُنزَل في موقع الإنزال، ويُشعَر صاحب رخصة الصيد عند بلوغ 80% من الحصة.' },
  { page: 2, id: 8, title: 'جودة البيانات', text: 'تقيس الهيئة جودة البيانات في كل مجموعة بيانات شهريًّا، وتعيد البلاغات الناقصة إلى أصحابها لتصحيحها خلال 7 أيام.' },
  { page: 3, id: 9, title: 'تصنيف البيانات', text: 'يحدد تصنيف البيانات في الهيئة أن بلاغات المصيد «مقيّدة»، ولا تُنشر منها إلا مجموعة بيانات مجمّعة بعد إخفاء بيانات الهوية.' },
  { page: 3, id: 10, title: 'البيانات الشخصية', text: 'لا تُجمع من الصياد الحرفي بيانات شخصية غير اللازمة لرخصة الصيد، ولا تُدخَل هذه البيانات في أي أداة ذكاء اصطناعي عامة.' },
  { page: 3, id: 11, title: 'النماذج', text: 'تستخدم الهيئة تعلُّم الآلة لبناء نموذج تنبؤي لحالة المخزون السمكي، ولا يُتخذ قرار بتعديل الحصة أو موسم الحظر بناءً على النموذج التنبؤي وحده.' },
  { page: 3, id: 12, title: 'ترجمة الآلة', text: 'لا يُنشر نص من نصوص الهيئة مترجمًا بترجمة الآلة قبل أن يراجعه مترجم معتمد، ويُذكر في النص المنشور أنه مترجم ومن راجعه.' }
];

/* Page 2 in English: without the glossary, and with it (one planted miss in article 7). */
export const PAGE2_EN = {
  none: {
    5: 'The unloading supervisor checks the catch report before the boat leaves, and compares the recorded weight with the actual weight for a sample of boats every day.',
    6: 'During the ban season, a fishing report is not accepted if it includes the banned species, unless it is incidental catch not exceeding 5 kg per trip.',
    7: 'Any quantity unloaded at the landing point is deducted from the share, and the fishing permit holder is notified upon reaching 80% of the quota.',
    8: 'The Authority measures data quality in each data set monthly and returns incomplete reports to their owners for correction within 7 days.'
  },
  glossary: {
    5: 'The landing inspector verifies the catch report before the vessel leaves, and compares the recorded weight with the actual weight for a sample of vessels each day.',
    6: 'During the closed season a catch report is not accepted if it includes the prohibited species, unless it is bycatch of no more than 5 kg per trip.',
    7: 'Every quantity landed at the landing point counts against the quota, and the holder of the fishing licence is notified when 80% of the quota is reached.',
    8: 'The Authority measures data quality in every dataset each month and returns incomplete reports to their owners for correction within 7 days.'
  },
  reference: {
    5: 'The landing inspector verifies the catch report before the vessel leaves, and compares the recorded weight with the actual weight for a sample of vessels each day.',
    6: 'During the closed season a catch report is not accepted if it includes the prohibited species, unless it is bycatch of no more than 5 kg per trip.',
    7: 'Every quantity landed at the landing site counts against the quota, and the holder of the fishing licence is notified when 80% of the quota is reached.',
    8: 'The Authority measures data quality in every dataset each month and returns incomplete reports to their owners for correction within 7 days.'
  }
};

/* The partner's note, English to Arabic. */
export const NOTE_EN = {
  1: 'The Forum will share one dataset of catch reports each quarter. Data anonymization is applied before sharing, and no personal data is included.',
  2: 'The predictive model for the fish stock is trained with machine learning on landings recorded at each landing site.',
  3: 'Bycatch recorded during the closed season is reported separately for each fishing vessel.',
  4: 'Summaries produced by machine translation are marked as such until a representative of the artisanal fishers and a certified translator have reviewed them.'
};
export const NOTE_AR = {
  none: {
    1: 'سيشارك المنتدى مجموعة بيانات واحدة من تقارير الصيد كل ربع سنة. ويُطبَّق إخفاء الهوية قبل المشاركة، ولا تُدرج أي بيانات شخصية.',
    2: 'يُدرَّب النموذج التنبؤي للثروة السمكية بالتعلم الآلي على كميات الإنزال المسجلة في كل نقطة إنزال.',
    3: 'يُبلَّغ عن الصيد الجانبي المسجل خلال فترة الحظر لكل سفينة صيد على حدة.',
    4: 'تُوسم الملخصات الناتجة عن الترجمة الآلية بذلك إلى أن يراجعها ممثل عن الصيادين التقليديين ومترجم معتمد.'
  },
  glossary: {
    1: 'سيشارك المنتدى مجموعة بيانات واحدة من بلاغات المصيد كل ربع سنة. ويُطبَّق إخفاء بيانات الهوية قبل المشاركة، ولا تُدرج أي بيانات شخصية.',
    2: 'يُدرَّب النموذج التنبؤي للمخزون السمكي بتعلُّم الآلة على كميات الإنزال المسجلة في كل موقع إنزال.',
    3: 'يُبلَّغ عن المصيد العرضي المسجل في موسم الحظر لكل قارب صيد على حدة.',
    4: 'تُوسم الملخصات الناتجة عن ترجمة الآلة بذلك إلى أن يراجعها ممثل عن الصيادين الحرفيين ومترجم معتمد.'
  },
  partial: {
    1: 'سيشارك المنتدى مجموعة بيانات واحدة من بلاغات المصيد كل ربع سنة. ويُطبَّق إخفاء بيانات الهوية قبل المشاركة، ولا تُدرج أي بيانات شخصية.',
    2: 'يُدرَّب النموذج التنبؤي للمخزون السمكي بالتعلم الآلي على كميات الإنزال المسجلة في كل موقع إنزال.',
    3: 'يُبلَّغ عن المصيد العرضي المسجل في موسم الحظر لكل قارب صيد على حدة.',
    4: 'تُوسم الملخصات الناتجة عن الترجمة الآلية بذلك إلى أن يراجعها ممثل عن الصيادين الحرفيين ومترجم معتمد.'
  }
};

/* ------------------------------------------------------------------ the circular and the report */

export const CIRCULAR = [
  `يبدأ موسم حظر صيد الكنعد يوم ${ar('start')}، ويستمر 61 يومًا حتى نهاية يوم ${ar('end')}.`,
  'يُمنع في موسم الحظر صيد الكنعد أو إنزاله في أي موقع إنزال أو بيعه أو نقله، ضمن 12 ميلًا بحريًّا من الساحل.',
  'يُستثنى من ذلك المصيد العرضي الذي لا يتجاوز 5 كجم في الرحلة الواحدة، بشرط الإبلاغ عنه في بلاغ المصيد وعدم بيعه.',
  'غرامة المخالفة الأولى 5,000 ريال، وتُعلَّق رخصة الصيد 30 يومًا عند تكرار المخالفة.',
  `يُصرف دعم شهري قدره 1,500 ريال عن شهري الحظر لكل صياد حرفي كانت رخصته سارية في ${ar('licence', false).split(' الموافق')[0]}.`,
  `يُستأنف الصيد يوم ${ar('resume')}.`
];

export const REPORT = {
  title: 'Shira Coast Kingfish Stock Review 2026',
  body: 'Gulf Coastal Fisheries Forum',
  summary: [
    'Kingfish landings on the Shira coast fell from 2,840 tonnes in 2023 to 1,960 tonnes in 2026, a decline of 31%.',
    'Sampling at 18 landing sites found that 42% of landed kingfish were below 65 cm fork length, the size at first maturity.',
    'The review was led by Dr. Razeen Al-Musnad, Director of Stock Assessment; he presented it to the Forum on 14 March 2027. Data management was by Ms. Talin Al-Qurayni.',
    'The coast has 1,250 licensed fishing vessels and 3,480 artisanal fishers.'
  ],
  lead: 'Because 42% of landed kingfish are below the size at first maturity, the Forum recommends:',
  recs: [
    'Close the kingfish fishery for 61 days each year, from 1 September to 31 October, within 12 nautical miles (22.2 km) of the coast.',
    'Vessels may not land kingfish at any landing site during the closed season.',
    'Set the minimum mesh size of gillnets at 100 mm.',
    'Allow bycatch of up to 5 kg per trip, provided it is reported and not sold.',
    'Pay support of SAR 1,500 per month for the two months of the closed season, only to artisanal fishers who held a valid fishing licence on 1 July 2027.',
    'Repeat the stock assessment by 31 December 2028.'
  ]
};

/* The three outputs of lab 1.3 and their ten planted errors. */
export const O1 = [
  'تراجع إنزال الكنعد على ساحل شراع من 2,840 طنًّا في عام 2023 إلى 1,690 طنًّا في عام 2026، بانخفاض نسبته 31%.',
  'وأظهرت العينات في 18 موقع إنزال أن 42% من الكنعد المُنزَل دون 65 سم، وهو حجم النضج الأول.',
  'قادت المراجعة د. رزان المسند، مديرة تقييم المخزون، وعرضتها على المنتدى في 14 مارس 2027، وأدارت البيانات تالين القريني.',
  'ويوصي المنتدى بإغلاق مصايد الكنعد 61 يومًا كل عام من 1 سبتمبر إلى 31 أكتوبر ضمن 12 كيلومترًا من الساحل.',
  'ويوصي بصرف دعم قدره 1,500 ريال شهريًّا عن شهري موسم الحظر لكل الصيادين الحرفيين، وبإعادة تقييم المخزون قبل 31 ديسمبر 2028.'
];
export const O2_LEAD = 'لأن 24% من الكنعد المُنزَل دون حجم النضج الأول، يوصي المنتدى بما يأتي:';
export const O2 = [
  'إغلاق مصايد الكنعد 61 يومًا كل عام، من الأربعاء 1 سبتمبر 2027 الموافق 30 ربيع الآخر 1449 هـ إلى 31 أكتوبر، ضمن 12 ميلًا بحريًّا (22.2 كم) من الساحل.',
  'يجوز للقوارب إنزال الكنعد في أي موقع إنزال في موسم الحظر.',
  'ألا تقل فتحة الشباك الخيشومية عن 100 سم.',
  'السماح بمصيد عرضي لا يتجاوز 5 كجم في الرحلة، بشرط الإبلاغ عنه وعدم بيعه.',
  'صرف دعم قدره 1,500 ريال شهريًّا عن شهري موسم الحظر، للصيادين الحرفيين الذين كانت رخص الصيد لديهم سارية في 1 يوليو 2027 دون غيرهم.',
  'إعادة تقييم المخزون السمكي قبل 31 ديسمبر 2028.'
];
export const O3_HEAD = `Sail Fisheries Authority · Circular No. ${CIRCULAR_NO} · ${en('circular')}`;
export const O3 = [
  `The closed season for kingfish begins on ${en('start')} and lasts 61 days, until the end of Saturday, 30 October 2027.`,
  'During the closed season it is prohibited to catch kingfish, land it at any landing site, sell it or transport it, within 12 nautical miles of the coast.',
  'Bycatch of up to 5 kg per trip is exempt, provided it is reported in the catch report and not sold.',
  'The fine for a first violation is SAR 5,000; the fishing licence is suspended for 30 days on a repeat violation.',
  'Monthly support of SAR 1,500 is paid for the two months of the closed season to every artisanal fisher whose licence was valid on 1 July 2027.',
  `Fishing resumes on ${en('resume')}.`
];
export const PLANTED = [
  { id: 'E1', output: 'O1', kind: 'اسم', wrong: 'رزان المسند، مديرة', right: 'Razeen Al-Musnad', fix: 'د. رزين المسند، مدير تقييم المخزون (والنص يقول he)' },
  { id: 'E2', output: 'O1', kind: 'رقم', wrong: '1,690', right: '1,960', fix: '1,960 طنًّا' },
  { id: 'E3', output: 'O1', kind: 'وحدة', wrong: '12 كيلومترًا', right: '12 nautical miles (22.2 km)', fix: '12 ميلًا بحريًّا (22.2 كم)' },
  { id: 'E4', output: 'O1', kind: 'محذوف', wrong: 'لكل الصيادين الحرفيين', right: 'only to artisanal fishers who held a valid fishing licence on 1 July 2027', fix: 'لمن كانت رخصته سارية في 1 يوليو 2027 فقط' },
  { id: 'E5', output: 'O2', kind: 'تاريخ', wrong: '30 ربيع الآخر 1449', right: '1 September', fix: '1 سبتمبر 2027 يوافق 30 ربيع الأول 1449 هـ، والمصدر لم يذكر تاريخًا هجريًّا' },
  { id: 'E6', output: 'O2', kind: 'رقم', wrong: '24%', right: '42%', fix: '42%' },
  { id: 'E7', output: 'O2', kind: 'محذوف', wrong: 'يجوز للقوارب إنزال الكنعد', right: 'Vessels may not land kingfish', fix: 'لا يجوز للقوارب إنزال الكنعد: سقط النفي' },
  { id: 'E8', output: 'O2', kind: 'وحدة', wrong: '100 سم', right: '100 mm', fix: '100 ملم' },
  { id: 'E9', output: 'O3', kind: 'تاريخ', wrong: 'Saturday, 30 October 2027', right: 'الأحد 31 أكتوبر 2027', fix: 'Sunday, 31 October 2027 (1 Jumada al-Akhirah 1449 AH)' },
  { id: 'E10', output: 'O3', kind: 'اسم', wrong: 'Sail Fisheries Authority', right: ORG_EN, fix: 'Shira Fisheries Authority: اسم العلم لا يُترجم' }
];

/* ------------------------------------------------------------------ lab 1.1: the four drafts */

export const LETTER_V1 = `عزيزي السيد ميسرة،
الموضوع: موسم حظر صيد الكنعد
نأمل أن تجدكم هذه الرسالة بخير.
نود أن نخبركم بأنه تم تحديد موسم حظر صيد الكنعد لهذا العام من قبل الهيئة، وسوف يلعب هذا الموسم دورًا مهمًّا في حماية المخزون السمكي بشكل كبير. سيبدأ الحظر في 1 سبتمبر 2027 وينتهي في 31 أكتوبر 2027.
من فضلكم أخبروا جميع أعضاء الجمعية بهذا الأمر، ولا تترددوا في التواصل معنا إذا كان لديكم أي سؤال.
شكرًا جزيلًا لك،
شهد`;

export const LETTER_V2 = `الرقم: SFA-2027-015
التاريخ: ${ar('letter')}
سعادة رئيس الجمعية التعاونية للصيادين بمرفأ الدانة
الأستاذ ميسرة الوشمي، حفظه الله
السلام عليكم ورحمة الله وبركاته،
الموضوع: موسم حظر صيد الكنعد لعام 2027
إشارة إلى التعميم رقم ${CIRCULAR_NO}، نفيدكم بأن موسم حظر صيد الكنعد يبدأ يوم ${ar('start')}، ويستمر 61 يومًا حتى نهاية يوم ${ar('end')}.
ويُصرف دعم شهري قدره 1,500 ريال عن شهري الحظر لكل صياد حرفي كانت رخصته سارية في 1 يوليو 2027، وغرامة المخالفة الأولى 5,000 ريال.
نأمل من سعادتكم إبلاغ أعضاء الجمعية، وعددهم 412 عضوًا، بمضمون التعميم قبل يوم ${ar('inform')}، وتزويدنا بأسماء من يتعذر إبلاغهم.
وتقبلوا وافر التحية والتقدير.
شهد الشقير
مديرة الاتصال وخدمات الصيادين`;

export const LETTER_B = LETTER_V2
  .replace('نفيدكم بأن موسم حظر صيد الكنعد يبدأ', 'نود إفادتكم بأنه تم تحديد بداية موسم حظر صيد الكنعد')
  .replace('وتقبلوا وافر التحية والتقدير.', 'مع خالص تحياتي،');

export const NOTICE_V1 = `إعلان بخصوص تطبيق موسم الحظر السنوي لصيد أسماك الكنعد في المياه الساحلية
استنادًا إلى التعميم رقم ${CIRCULAR_NO} المشار إليه، تفيدكم هيئة شراع للثروة السمكية بأنه تم إقرار موسم حظر صيد الكنعد بموجب السياسات المعتمدة، حيث إن الحظر سيبدأ في 1 سبتمبر 2027 وسيستمر حتى 31 أكتوبر 2027، وذلك من أجل حماية المخزون السمكي بشكل فعّال.
وعليه؛ يُحاط جميع الصيادين علمًا بأن المخالفين ستُطبَّق بحقهم الغرامات المقررة وفقًا لأحكام اللوائح، ولمزيد من المعلومات يمكن التواصل مع مركز خدمات الصيادين على الرقم ${PHONE}`;

export const NOTICE_V2 = `ممنوع صيد الكنعد في سبتمبر وأكتوبر
يبدأ الحظر يوم ${ar('start')}. وينتهي بنهاية يوم ${ar('end')}.
ما المطلوب منك؟
• لا تصطد الكنعد ولا تنزله ولا تبعه في مدة الحظر.
• أعد إلى البحر ما يعلق بشباكك من الكنعد، أو أبلغ عنه إذا لم يتجاوز 5 كجم في الرحلة.
• أبلغ عن كل رحلة في تطبيق بلاغ المصيد كعادتك.
الغرامة 5,000 ريال للمخالفة الأولى. وتُعلَّق الرخصة 30 يومًا إذا تكررت.
يُصرف دعم 1,500 ريال في الشهر لمن كانت رخصته سارية في 1 يوليو 2027.
للاستفسار اتصل بمركز خدمات الصيادين: ${PHONE}`;

export const NOTICE_A = `إشعار مهم لجميع الصيادين بخصوص موسم حظر صيد الكنعد لهذا العام
يبدأ الحظر يوم ${ar('start')} وينتهي يوم الأحد 31 أكتوبر 2027، وبموجب التعميم يُمنع صيد الكنعد وإنزاله وبيعه في هذه المدة، ومن يخالف تُطبَّق عليه غرامة قدرها 5,000 ريال.
للاستفسار اتصل بمركز خدمات الصيادين: ${PHONE}`;

/* ------------------------------------------------------------------ lab 1.4: voice notes */

export const VOICE = [
  { id: 'V1', dialect: 'حجازية', text: 'يا جماعة دحين أنا رجعت من البحر ولقيت الشبك حقي مقطوع، ومدري مين اللي سوّاها. أبغى أعرف فين أقدّم بلاغ، ولا لازم أجي المكتب بنفسي؟' },
  { id: 'V2', dialect: 'خليجية ساحلية', text: 'السلام عليكم، أنا نوخذة لنج صغير، وأبي أسأل عن الحظر مال الكنعد: متى يبدي ومتى يخلص؟ وإذا طلع لي كنعد في القراقير وش أسوي فيه، أهدّه ولا أبلّغ عنه؟' },
  { id: 'V3', dialect: 'مصرية', text: 'أنا شغّال على مركب في مرفأ الدانة بقالي تلات سنين، وعايز أعرف الدعم ده هيتصرف لمين بالظبط؟ لصاحب الرخصة بس ولا للعمالة اللي معاه كمان؟' }
];
export const KEYWORDS = ['نوخذة', 'لنج', 'القراقير', 'أهدّه', 'يبدي', 'مال'];
export const T4 = {
  A: { transcript: 'السلام عليكم، أنا ناخذ لنج صغير، وأبي أسأل عن الحظر مال الكنعد: متى يبدأ ومتى يخلص؟ وإذا طلع لي كنعد في القوارير وش أسوي فيه، أهديه ولا أبلّغ عنه؟',
    request: 'يسأل الصياد عن موعد بداية الحظر ونهايته، وهل يهدي الكنعد الذي يجده في القوارير أم يبلّغ عنه.' },
  B: { transcript: 'السلام عليكم، أنا نوخذة قارب صغير، وأريد أن أسأل عن حظر الكنعد: متى يبدأ ومتى ينتهي؟ وإذا خرج لي كنعد في القراقير ماذا أفعل به، أتركه أم أبلّغ عنه؟',
    request: 'يسأل ربّان قارب صغير عن موعد بداية حظر الكنعد ونهايته، وهل يعيد إلى البحر الكنعد الذي يعلق في أقفاص الصيد أم يبلّغ عنه.' }
};
const SUMMARY = (h) => `تراجع إنزال الكنعد على ساحل شراع من 2,840 طنًّا في 2023 إلى 1,960 طنًّا في 2026 بانخفاض 31%. ويوصي المنتدى بحظر صيده 61 يومًا من الأربعاء 1 سبتمبر 2027 الموافق ${h} ربيع الأول 1449 هـ إلى ${ar('end')}.`;
export const T5 = { A: SUMMARY(29), B: SUMMARY(30) };

/* ------------------------------------------------------------------ lab 1.5: the seeded files */

const RLO = '\u202E', PDF = '\u202C';
export const DOC_FACTS = ['2027', '5,000', CIRCULAR_NO];
export const SLIDE_FACTS = ['1,250', '5,000', '1,960', CIRCULAR_NO];
export const DOC_FAULTY = [
  ORG,
  `تعميم رقم ${RLO}${CIRCULAR_NO}${PDF}`,
  'التاريخ: الأحد 4 يوليو 7202',
  '',
  'إلى: الجمعيات التعاونية للصيادين',
  'الموضوع: موسم حظر صيد الكنعد لعام 2027',
  '',
  'SFA تعلن بدء موسم الحظر يوم الأربعاء 1 سبتمبر 2027.',
  'يستمر الحظر 61 يومًا, وينتهي بنهاية يوم الأحد 31 أكتوبر 2027.',
  '؟هل تسري الغرامة على المصيد العرضي',
  'لا تسري على مصيد عرضي وزنه 5 كجم أو أقل في الرحلة.',
  'فتحة الشباك المسموح بها خارج موسم الحظر: 100 - 120 ملم.',
  'الغرامة: 000,5 ريال للمخالفة الأولى.',
  `للاستفسار: ${PHONE}`,
  'عدد القوارب المرخصة: ١٬٢٥٠ قاربًا.',
  'البريد: khidma@shiraa.example',
  ''
].join('\n');
export const DOC_FIXED = DOC_FAULTY
  .replace(RLO, '').replace(PDF, '')
  .replace('7202', '2027')
  .replace('SFA تعلن بدء', 'تعلن الهيئة (SFA) بدء')
  .replace('يومًا,', 'يومًا،')
  .replace('؟هل تسري الغرامة على المصيد العرضي', 'هل تسري الغرامة على المصيد العرضي؟')
  .replace('100 - 120', 'من 100 إلى 120')
  .replace('000,5', '5,000')
  .replace(`: ${PHONE}`, `: \u200E${PHONE}`)
  .replace('١٬٢٥٠', '1,250');

const SLIDE_STYLE = `
  body { margin: 0; background: #e9ecf2; font-family: "IBM Plex Sans Arabic", "Segoe UI", Tahoma, sans-serif; color: #14213d; }
  .slide { width: min(960px, 94vw); aspect-ratio: 16 / 9; margin: 24px auto; background: #fff; border-radius: 14px; padding: 34px 44px; box-sizing: border-box; box-shadow: 0 2px 10px #0002; }
  h1 { margin: 0 0 4px; font-size: 30px; }
  .sub { margin: 0 0 14px; color: #0a7c72; font-weight: 700; }
  ul { margin: 0 0 12px; padding-inline-start: 24px; font-size: 19px; line-height: 1.75; }
  table { border-collapse: collapse; font-size: 18px; }
  th, td { border: 1px solid #c9ced8; padding: 6px 14px; text-align: start; }
  th { background: #eef1f6; }
`;
const slide = (o) => `<!doctype html>
<html lang="ar"${o.dir}>
<head>
<meta charset="utf-8">
<title>موسم حظر صيد الكنعد 2027</title>
<style>${SLIDE_STYLE}</style>
</head>
<body>
<div class="slide">
<h1>موسم حظر صيد الكنعد 2027</h1>
<p class="sub">التعميم <span dir="ltr">${CIRCULAR_NO}</span></p>
<ul>
<li>الحظر 61 يومًا: من 1 سبتمبر إلى 31 أكتوبر 2027</li>
<li>يسري ضمن ${o.miles} من الساحل</li>
<li>الغرامة: ${o.fine} للمخالفة الأولى</li>
<li>القوارب المرخصة: ${o.vessels} قاربًا</li>
<li>رخص الفئة ${o.cls} 420 رخصة</li>
<li>هل لديك سؤال${o.q} اتصل: ${o.phone}</li>
</ul>
<table>
<tr><th>المؤشر</th><th>القيمة</th></tr>
<tr><td>إنزال الكنعد في 2026</td><td>1,960 طنًّا</td></tr>
<tr><td>التغير عن 2023</td><td>${o.change}</td></tr>
</table>
</div>
</body>
</html>
`;
const L = (s) => `<span dir="ltr">${s}</span>`;
export const SLIDE_FAULTY = slide({ dir: '', miles: `${RLO}12 ميلًا بحريًّا${PDF}`, fine: L('5,000 ريال'), vessels: '052,1', cls: 'B', q: '?', phone: PHONE, change: '-31%' });
export const SLIDE_FIXED = slide({ dir: ' dir="rtl"', miles: '12 ميلًا بحريًّا', fine: `${L('5,000')} ريال`, vessels: '1,250', cls: L('B'), q: '؟', phone: L(PHONE), change: L('-31%') });

/* ------------------------------------------------------------------ lab 1.6: the bilingual notice */

export const BI = {
  draft: {
    ar: ['ممنوع صيد الكنعد في سبتمبر وأكتوبر',
      'يبدأ موسم الحظر يوم الخميس 1 سبتمبر 2027 الموافق 30 ربيع الأول 1449 هـ.',
      'تم تحديد غرامة قدرها 5,000 ريال من قبل الهيئة للمخالفة الأولى.',
      'سأل أحد الصيادين: «إذا طلع لي كنعد في القراقير وش أسوي فيه، أهديه ولا أبلّغ عنه؟» والجواب: أعده إلى البحر، أو أبلغ عنه إذا كان مصيدًا عرضيًّا لا يتجاوز 5 كجم في الرحلة.',
      `للاستفسار: ${PHONE}`],
    en: ['Kingfish fishing is prohibited in September and October',
      `The ban season begins on ${en('start')}.`,
      'A fine of SAR 500 applies to a first violation.',
      'Boats must return kingfish to the sea, or report incidental catch of up to 5 kg per trip.',
      `Enquiries: ${PHONE}`]
  },
  fixed: {
    ar: ['ممنوع صيد الكنعد في سبتمبر وأكتوبر',
      `يبدأ موسم الحظر يوم ${ar('start')}.`,
      'غرامة المخالفة الأولى 5,000 ريال.',
      'سأل أحد الصيادين: «إذا طلع لي كنعد في القراقير وش أسوي فيه، أهدّه ولا أبلّغ عنه؟» والجواب: أعده إلى البحر، أو أبلغ عنه إذا كان مصيدًا عرضيًّا لا يتجاوز 5 كجم في الرحلة.',
      'للاستفسار: '],
    en: ['Kingfish fishing is prohibited in September and October',
      `The closed season begins on ${en('start')}.`,
      'A fine of SAR 5,000 applies to a first violation.',
      'Return kingfish to the sea, or report bycatch of up to 5 kg per trip.',
      `Enquiries: ${PHONE}`]
  },
  disclosure: 'تُرجم النص الإنجليزي بمساعد ذكاء اصطناعي، وراجعته المترجمة المعتمدة رباب السنبل، وراجع عبارة الصياد مراجع من أهل اللهجة. المسؤول عن النص: إدارة الاتصال وخدمات الصيادين.'
};
