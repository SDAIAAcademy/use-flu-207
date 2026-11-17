/* Writes the file pack of the course into labs/files/ and the fixed files of labs 1.5 and 1.6
   into labs/solutions/. Node 22, no dependencies, no randomness: the same bytes on every run.
   Run from anywhere:  node labs/_tools/prepare_files.mjs */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as W from './world.mjs';
import * as D from './docs.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const FILES = path.join(HERE, '..', 'files');
const SOLUTIONS = path.join(HERE, '..', 'solutions');
fs.mkdirSync(FILES, { recursive: true });
const write = (dir, name, text) => fs.writeFileSync(path.join(dir, name), text.replace(/\r\n/g, '\n'), 'utf8');

const pack = {
  'prework_my_documents.html': D.prework(),
  'brief_season.html': D.briefSeason(),
  'register_checklist.html': D.registerChecklist(),
  'drafts_sample.html': D.draftsSample(),
  'policy_catch_reporting_ar.html': D.policy(),
  'glossary_sheet.html': D.glossarySheet(),
  'glossary_approved.html': D.glossaryApproved(),
  'glossary_shiraa.txt': D.glossaryTxt(),
  'partner_note_en.html': D.partnerNote(),
  'translation_sample.html': D.translationSample(),
  'report_review_en.html': D.reportEn(),
  'circular_closure_ar.html': D.circularAr(),
  'three_outputs.html': D.threeOutputs(),
  'error_log.html': D.errorLog(),
  'five_tasks.html': D.fiveTasks(),
  'assistants_outputs_sample.html': D.assistantsOutputs(),
  'comparison_table.html': D.comparisonTable(),
  'circular_bidi.txt': W.DOC_FAULTY,
  'slide_bidi.html': W.SLIDE_FAULTY,
  'direction_check.html': D.directionPage(),
  'bilingual_notice_draft.html': D.bilingualDraft(),
  'followup_log.html': D.followupLog()
};
for (const [name, text] of Object.entries(pack)) write(FILES, name, text);
write(SOLUTIONS, 'circular_bidi_fixed.txt', W.DOC_FIXED);
write(SOLUTIONS, 'slide_bidi_fixed.html', W.SLIDE_FIXED);
write(SOLUTIONS, 'bilingual_notice_fixed.html', D.bilingualFixed());
console.log(`wrote ${Object.keys(pack).length} files into labs/files and 3 fixed files into labs/solutions`);
