/**
 * SOL STRUCTURAL LAB v2.0
 * INTERNATIONALIZATION & LOCALIZATION ENGINE
 * 
 * Epistemic Rules:
 * 1. Technical identifiers MUST NOT be translated:
 *    - 5.2 CORE, DUAL_ANALYSIS, DUAL_ANALYSIS_EVALUATION_PROTOCOL_v1.0
 *    - Observation, Inference, Unknown, Decision, Evidence
 *    - two-heroes-tool, Gold Standard
 *    - SINGLE, DUAL, AGREEMENT, DISAGREEMENT, COMPLEMENTARITY
 *    - PRIMARY_CORPUS, CONTROL, CANDIDATE, HISTORICAL_REFERENCE
 *    - RUN_ID, OBJECT_ID, REPOSITORY_URL, ANALYST_A_ID, ANALYST_B_ID
 * 2. Russian translation covers all operator-facing UI text, instructions, labels, tooltips, and status messages.
 */

export type Language = 'EN' | 'RU';

export interface Translations {
  // App & Header
  appTitle: string;
  appSubtitle: string;
  headerStatusReady: string;
  coreStatusLabel: string;
  coreStatusFrozen: string;
  dualStatusLabel: string;
  dualStatusHypothesis: string;
  twoHeroesLabel: string;
  twoHeroesCandidate: string;
  btnRunAudit: string;
  btnAuditing: string;

  // Navigation Tabs
  tabRealCorpus: string;
  tabRealCorpusDesc: string;
  tabPipeline: string;
  tabPipelineDesc: string;
  tabDualAnalysis: string;
  tabDualAnalysisDesc: string;
  tabCoreCanon: string;
  tabCoreCanonDesc: string;
  tabMemory: string;
  tabMemoryDesc: string;
  tabTools: string;
  tabToolsDesc: string;
  tabProtocols: string;
  tabProtocolsDesc: string;
  tabIntegrity: string;
  tabIntegrityDesc: string;

  // Operator Workflow
  workflowTitle: string;
  workflowStep1: string;
  workflowStep2: string;
  workflowStep3: string;
  workflowStep4: string;
  workflowStep5: string;
  workflowStep6: string;
  workflowStep7: string;
  workflowCurrentHere: string;
  workflowNextAction: string;
  btnNextWorkflowStep: string;

  // Intake Modes & Object Card
  intakeZipOptionTitle: string;
  intakeZipOptionDesc: string;
  intakeGitHubOptionTitle: string;
  intakeGitHubWarning: string;
  cardInvestigatedObject: string;
  cardRepo: string;
  cardRevision: string;
  cardSourceMode: string;
  cardFiles: string;
  cardCorpusStatus: string;
  cardReady: string;
  cardIncomplete: string;
  btnInvestigateFullCorpus: string;
  btnLaunchQuickScan: string;
  btnStartRigorousInvestigation: string;
  partialCorpusWarningBanner: string;
  sourceZipSectionTitle: string;
  analysisZipSectionTitle: string;
  btnDownloadOriginalZip: string;
  btnDownloadFullAnalysisZip: string;

  // Real Corpus Intake
  intakeSectionTitle: string;
  intakeSectionSubtitle: string;
  selectPresetTarget: string;
  customRepoInputHeader: string;
  lblRepoUrl: string;
  lblRepoName: string;
  lblBranchRef: string;
  lblObjectId: string;
  lblCategory: string;
  lblVerificationState: string;
  lblFilesIngested: string;
  lblCharacteristics: string;
  lblDescription: string;
  btnImportPrepare: string;
  btnImporting: string;
  statusSourceImported: string;
  statusSourcePending: string;
  distinctionSourceVsResult: string;

  // Modes
  modeSectionTitle: string;
  modeSingleTitle: string;
  modeSingleDesc: string;
  modeSingleBadge: string;
  modeDualTitle: string;
  modeDualDesc: string;
  modeDualBadge: string;
  warningDualHypothesis: string;

  // Execution & Actions
  btnRunAnalysis: string;
  btnRunSmokeTest: string;
  smokeTestBadge: string;
  smokeTestWarning: string;
  btnExecuting: string;
  btnStep1Single: string;
  btnStep2Dual: string;
  btnStep3Compare: string;
  btnStep4Validate: string;

  // Gold Standard
  goldStandardSectionTitle: string;
  goldStandardNotice: string;
  goldStandardNotProvided: string;
  goldStandardLocked: string;
  goldStandardUnlocked: string;
  validationStatusCannotComplete: string;
  validationStatusComplete: string;
  btnLockGoldStandard: string;

  // Result View
  resultSectionTitle: string;
  resultRunId: string;
  resultObjectId: string;
  resultRepoUrl: string;
  resultRevision: string;
  resultMode: string;
  resultTimestamp: string;
  resultConfiguration: string;
  resultStatus: string;
  analystConfigFingerprint: string;
  independenceEnforcedNotice: string;
  epistemicDistinctionBanner: string;
  
  // Tabs in Workbench
  tabIntakeView: string;
  tabSingleView: string;
  tabDualView: string;
  tabCompareView: string;
  tabValidationView: string;
  tabMetricsView: string;
  tabResultArtifactsView: string;

  // Downloads
  downloadSectionTitle: string;
  downloadSourceTitle: string;
  downloadSourceDesc: string;
  downloadResultTitle: string;
  downloadResultDesc: string;
  btnOpenGitHub: string;
  btnDownloadSourceZip: string;
  btnDownloadResultJson: string;
  btnDownloadReportMd: string;
  btnDownloadReportTxt: string;
  btnDownloadCompleteZip: string;
  downloadingZip: string;
  sandboxNotice: string;

  // Statuses & Verdicts
  statusNotReady: string;
  statusReadyForExecution: string;
  statusRunning: string;
  statusCompleted: string;
  statusValidationPending: string;
  statusValidated: string;
  statusStoppedInvalid: string;

  // Integrity Panel
  integrityPanelTitle: string;
  integrityPanelSubtitle: string;

  // LAB-G Operator & Protocol Extensions
  readOnlyBadge: string;
  zeroMutationBadge: string;
  sealedShaBadge: string;
  canonicalStandardBadge: string;
  labMissionText: string;
  protocol10StagesTitle: string;
  stageWaiting: string;
  stageRunning: string;
  stageComplete: string;
  stageBlocked: string;
  stage1Name: string;
  stage2Name: string;
  stage3Name: string;
  stage4Name: string;
  stage5Name: string;
  stage6Name: string;
  stage7Name: string;
  stage8Name: string;
  stage9Name: string;
  stage10Name: string;
  principlesTitle: string;
  principle1: string;
  principle2: string;
  principle3: string;
  principle4: string;
  presetTargetsTitle: string;
  presetTargetsSubtitle: string;
  btnInspectSample: string;
  dropzoneTitle: string;
  dropzoneSubtitle: string;
  btnUploadZip: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  EN: {
    appTitle: 'SOL STRUCTURAL LAB',
    appSubtitle: '5.2 Core Epistemic Discipline & Autonomous Research Pipeline',
    headerStatusReady: 'Status: Ready for Real Corpus',
    coreStatusLabel: 'Current Core',
    coreStatusFrozen: '5.2 CORE: FROZEN',
    dualStatusLabel: 'DUAL:',
    dualStatusHypothesis: 'HYPOTHESIS',
    twoHeroesLabel: 'two-heroes:',
    twoHeroesCandidate: 'CANDIDATE',
    btnRunAudit: 'Run Audit',
    btnAuditing: 'Auditing...',

    tabRealCorpus: 'Real Corpus Test',
    tabRealCorpusDesc: 'Intake → Single 5.2 → Dual A/B → GS Validation → Metrics',
    tabPipeline: '5.2 Pipeline Engine',
    tabPipelineDesc: 'Profiling → Planning → Execution → Validation → Report',
    tabDualAnalysis: 'Dual Analysis Operator',
    tabDualAnalysisDesc: 'A/B Isolation → Diff → Epistemic Tagging → Synthesis',
    tabCoreCanon: '5.2 Core & Canon',
    tabCoreCanonDesc: '5 Entities, 5 Statuses, 7 Invariants, 3 Rules',
    tabMemory: 'Memory & Checkpoint',
    tabMemoryDesc: 'Evolution History, Frozen Epochs, Run Logs',
    tabTools: 'Tools & Registry',
    tabToolsDesc: 'Internal vs External (two-heroes-tool: CANDIDATE)',
    tabProtocols: 'Protocols & Verification',
    tabProtocolsDesc: 'Validation protocol, 4 candidate gates',
    tabIntegrity: 'Integrity & Verification',
    tabIntegrityDesc: 'Comprehensive System Test Suite (5.2 Core)',

    workflowTitle: 'OPERATOR WORKFLOW',
    workflowStep1: '1. OBJECT',
    workflowStep2: '2. PREPARATION',
    workflowStep3: '3. MODE',
    workflowStep4: '4. ANALYSIS',
    workflowStep5: '5. VALIDATION',
    workflowStep6: '6. RESULT',
    workflowStep7: '7. DOWNLOAD',
    workflowCurrentHere: 'You are currently at step',
    workflowNextAction: 'Next action',
    btnNextWorkflowStep: 'Proceed to Next Step →',

    intakeZipOptionTitle: 'UPLOAD FULL REPOSITORY ZIP — RECOMMENDED',
    intakeZipOptionDesc: 'Primary, complete research intake. Extracts all authentic AST nodes, contracts, and invariants from your archive.',
    intakeGitHubOptionTitle: 'GITHUB URL — QUICK SCAN',
    intakeGitHubWarning: 'GitHub quick scan may be partial. For a complete, rigorous investigation, upload the full repository ZIP.',
    cardInvestigatedObject: 'INVESTIGATED OBJECT',
    cardRepo: 'Repository',
    cardRevision: 'Revision / Ref',
    cardSourceMode: 'Source mode',
    cardFiles: 'Files',
    cardCorpusStatus: 'Corpus status',
    cardReady: 'READY',
    cardIncomplete: 'INCOMPLETE',
    btnInvestigateFullCorpus: 'INVESTIGATE FULL CORPUS',
    btnLaunchQuickScan: 'LAUNCH QUICK SCAN (PARTIAL CORPUS)',
    btnStartRigorousInvestigation: 'START RIGOROUS INVESTIGATION',
    partialCorpusWarningBanner: 'Result is based on an accessible subset of the repository. This is not equivalent to a full corpus analysis.',
    sourceZipSectionTitle: 'SOURCE REPOSITORY ARTIFACT',
    analysisZipSectionTitle: 'ANALYSIS RESULTS PACKAGE',
    btnDownloadOriginalZip: 'DOWNLOAD SOURCE CORPUS ZIP',
    btnDownloadFullAnalysisZip: 'DOWNLOAD COMPLETE ANALYSIS ZIP',

    intakeSectionTitle: 'RESEARCH PROJECT INTAKE & OBJECT PREPARATION',
    intakeSectionSubtitle: 'Provide a GitHub repository link or upload a project ZIP archive. Read-only analysis without target mutation.',
    selectPresetTarget: 'Quick Target Select:',
    customRepoInputHeader: 'Custom GitHub Repository Intake',
    lblRepoUrl: 'GITHUB REPOSITORY URL:',
    lblRepoName: 'Repository Name / Display:',
    lblBranchRef: 'Branch / Revision Ref:',
    lblObjectId: 'Object ID (Unique identifier):',
    lblCategory: 'Repository Category:',
    lblVerificationState: 'Verification State:',
    lblFilesIngested: 'Ingested Files:',
    lblCharacteristics: 'Structural Characteristics:',
    lblDescription: 'Description:',
    btnImportPrepare: 'IMPORT / PREPARE OBJECT',
    btnImporting: 'Preparing Object...',
    statusSourceImported: 'OBJECT READY FOR ANALYSIS',
    statusSourcePending: 'SOURCE PENDING INTAKE',
    distinctionSourceVsResult: 'Epistemic Boundary: SOURCE OBJECT (Input artifacts) is strictly decoupled from ANALYSIS RESULT (Generated telemetry & inferences).',

    modeSectionTitle: 'SELECT RESEARCH MODE',
    modeSingleTitle: 'SINGLE Analysis Pass',
    modeSingleDesc: 'Standard baseline execution utilizing the canonical 5.2 Core (C1 Profiler → C2 Planner → C3 Executor → C4 Validator → C5 Reporter).',
    modeSingleBadge: 'BASELINE',
    modeDualTitle: 'DUAL_ANALYSIS Pass',
    modeDualDesc: 'Dual decoupled perspectives (Analyst A ∥ Analyst B) with structural diffing, dispute classification, and inference synthesis.',
    modeDualBadge: 'HYPOTHESIS',
    warningDualHypothesis: 'This is an experimental test. DUAL_ANALYSIS is a HYPOTHESIS and is not part of the canonical 5.2 CORE.',

    btnRunAnalysis: 'START ANALYSIS →',
    btnRunSmokeTest: 'Run Smoke Test',
    smokeTestBadge: 'SMOKE TEST — NOT EXPERIMENTAL EVIDENCE',
    smokeTestWarning: 'Smoke test executes full pipeline plumbing (Intake → Analysis → Result → Download packaging) to verify operational readiness without claiming formal empirical validation.',
    btnExecuting: 'Executing Pipeline...',
    btnStep1Single: 'Step 1: Execute Single 5.2 Pass',
    btnStep2Dual: 'Step 2: Execute Dual Analysis (A ∥ B)',
    btnStep3Compare: 'Step 3: Advance to Compare & Synthesis',
    btnStep4Validate: 'Step 4: Validate against Gold Standard & Compute Metrics',

    goldStandardSectionTitle: 'GOLD STANDARD SUBSYSTEM',
    goldStandardNotice: 'GOLD STANDARD ≠ ANALYST OUTPUT. Gold Standard is pre-annotated ground truth locked before analysis. Analysts cannot observe or mutate Gold Standard.',
    goldStandardNotProvided: 'GOLD STANDARD: NOT PROVIDED',
    goldStandardLocked: 'GOLD STANDARD: LOCKED & FINGERPRINTED',
    goldStandardUnlocked: 'GOLD STANDARD: UNLOCKED (UNSAFE)',
    validationStatusCannotComplete: 'VALIDATION STATUS: CANNOT COMPLETE (Missing pre-analysis Gold Standard lock)',
    validationStatusComplete: 'VALIDATION STATUS: MATCHED & COMPUTED',
    btnLockGoldStandard: 'Lock Gold Standard (Pre-Analysis)',

    resultSectionTitle: 'ANALYSIS RESULT & REPRODUCIBILITY TRACE',
    resultRunId: 'RUN_ID:',
    resultObjectId: 'OBJECT_ID:',
    resultRepoUrl: 'REPOSITORY_URL:',
    resultRevision: 'REVISION / REF:',
    resultMode: 'RESEARCH MODE:',
    resultTimestamp: 'TIMESTAMP:',
    resultConfiguration: 'CONFIGURATION:',
    resultStatus: 'RESULT STATUS:',
    analystConfigFingerprint: 'ANALYST A / B CONFIGURATION FINGERPRINT:',
    independenceEnforcedNotice: 'INDEPENDENCE ENFORCED BY EXPERIMENTAL CONFIGURATION (Analyst A does not observe Analyst B; Analyst B does not observe Analyst A).',
    epistemicDistinctionBanner: 'CRITICAL EPISTEMIC BOUNDARIES: OBSERVATION ≠ INFERENCE | INFERENCE ≠ EVIDENCE | UNKNOWN ≠ FALSE | DISPUTED ≠ TRUE. Synthesized inferences are never promoted to EVIDENCE without independent validation.',

    tabIntakeView: '1. Project Intake',
    tabSingleView: '2. Single 5.2 Pass',
    tabDualView: '3. Dual A/B Pass',
    tabCompareView: '4. Compare & Synthesis',
    tabValidationView: '5. GS Validation',
    tabMetricsView: '6. Protocol Metrics',
    tabResultArtifactsView: '7. Result & Downloads',

    downloadSectionTitle: 'DOWNLOADABLE ARTIFACTS & REPOSITORY PACKAGES',
    downloadSourceTitle: 'SOURCE REPOSITORY ARTIFACTS',
    downloadSourceDesc: 'Inspect or download the raw ingested source repository files.',
    downloadResultTitle: 'ANALYSIS RESULT PACKAGE (SL-ARTIFACT)',
    downloadResultDesc: 'Complete reproducible analytical package containing telemetry, structured logs, validation records, and synthesis reports.',
    btnOpenGitHub: 'Open GitHub Repository',
    btnDownloadSourceZip: 'Download Source ZIP (GitHub)',
    btnDownloadResultJson: 'Download analysis_result.json',
    btnDownloadReportMd: 'Download analysis_report.md',
    btnDownloadReportTxt: 'Download analysis_report.txt',
    btnDownloadCompleteZip: 'Download Complete Analysis ZIP',
    downloadingZip: 'Packaging ZIP...',
    sandboxNotice: 'Note: Direct server-side git clones run in sandboxed container perimeter. GitHub web links and local file uploads are fully supported.',

    statusNotReady: 'NOT READY',
    statusReadyForExecution: 'READY FOR EXECUTION',
    statusRunning: 'RUNNING',
    statusCompleted: 'COMPLETED',
    statusValidationPending: 'VALIDATION PENDING',
    statusValidated: 'VALIDATED',
    statusStoppedInvalid: 'STOPPED — INVALID EXPERIMENT',

    integrityPanelTitle: 'EXPERIMENTAL INTEGRITY PANEL',
    integrityPanelSubtitle: 'Runtime Epistemic Guard',

    readOnlyBadge: 'READ-ONLY MODE',
    zeroMutationBadge: 'GUARANTEE: ZERO MUTATIONS',
    sealedShaBadge: 'SEALED SHA-256',
    canonicalStandardBadge: '16-SECTION CANONICAL REPORTS',
    labMissionText: 'Autonomous diagnostic & experimental research laboratory for external software engineering projects. Inspects source code in read-only mode, enforcing strict epistemic discipline (5.2 CORE: FROZEN | DUAL_ANALYSIS: HYPOTHESIS). LAB-D DOES NOT mutate the investigated project.',
    protocol10StagesTitle: '10 RESEARCH PROTOCOL STAGES',
    stageWaiting: 'WAITING',
    stageRunning: 'RUNNING',
    stageComplete: 'COMPLETED',
    stageBlocked: 'BLOCKED',
    stage1Name: '1. Project Intake & Checksum',
    stage2Name: '2. Sample Registration',
    stage3Name: '3. File Ingestion & Inventory',
    stage4Name: '4. Structural Reconstruction (C1)',
    stage5Name: '5. Dependency & Invariants (C2)',
    stage6Name: '6. Invariants & Contracts (C4)',
    stage7Name: '7. Architectural Attack / Diff (Dual)',
    stage8Name: '8. Hypothesis Falsification / Synthesis',
    stage9Name: '9. Synthesis Report Formation (C5)',
    stage10Name: '10. Sealing & Export Result',
    principlesTitle: 'LABORATORY PRINCIPLES & GUARANTEES',
    principle1: 'Zero File Modification: target source code remains strictly immutable.',
    principle2: 'Cryptographic Signature: all generated artifacts sealed with SHA-256.',
    principle3: 'Epistemic Registry: strict separation of Observation ≠ Inference | GS ≠ Analyst Output.',
    principle4: 'Hypothesis Isolation: DUAL_ANALYSIS is an unpromoted hypothesis outside 5.2 CORE.',
    presetTargetsTitle: 'REFERENCE PROJECTS FOR RAPID AUDIT',
    presetTargetsSubtitle: 'Ready-made samples with verified source payloads and test suites.',
    btnInspectSample: 'AUDIT SAMPLE →',
    dropzoneTitle: 'Drag & Drop Project ZIP Archive / Code Files Here',
    dropzoneSubtitle: 'or click to browse local files',
    btnUploadZip: 'UPLOAD PROJECT (ZIP / CODE)',
  },
  RU: {
    appTitle: 'SOL STRUCTURAL LAB',
    appSubtitle: 'Эпистемическая дисциплина ядра 5.2 Core и автономный исследовательский пайплайн',
    headerStatusReady: 'Статус: Готов к тесту реального корпуса',
    coreStatusLabel: 'Текущее ядро',
    coreStatusFrozen: '5.2 CORE: FROZEN',
    dualStatusLabel: 'DUAL:',
    dualStatusHypothesis: 'HYPOTHESIS',
    twoHeroesLabel: 'two-heroes:',
    twoHeroesCandidate: 'CANDIDATE',
    btnRunAudit: 'Запустить аудит',
    btnAuditing: 'Аудит...',

    tabRealCorpus: 'Тест реального корпуса',
    tabRealCorpusDesc: 'Приемка → Single 5.2 → Dual A/B → GS Валидация → Метрики',
    tabPipeline: 'Пайплайн 5.2 Core',
    tabPipelineDesc: 'Профилирование → Планирование → Исполнение → Валидация → Отчет',
    tabDualAnalysis: 'Оператор Dual Analysis',
    tabDualAnalysisDesc: 'A/B изоляция → Дифф → Эпистемическая разметка → Синтез',
    tabCoreCanon: '5.2 Core и канон',
    tabCoreCanonDesc: '5 сущностей, 5 статусов, 7 инвариантов, 3 правила',
    tabMemory: 'Память и чекпоинты',
    tabMemoryDesc: 'История эволюции, замороженные эпохи, логи прогонов',
    tabTools: 'Инструменты и реестр',
    tabToolsDesc: 'Внутренние vs внешние (two-heroes-tool: CANDIDATE)',
    tabProtocols: 'Протоколы и верификация',
    tabProtocolsDesc: 'Протокол валидации, 4 шлюза для кандидатов',
    tabIntegrity: 'Целостность и верификация',
    tabIntegrityDesc: 'Комплексный набор тестов системы (5.2 Core)',

    workflowTitle: 'ОПЕРАТОРСКИЙ ПРОЦЕСС (WORKFLOW)',
    workflowStep1: '1. ОБЪЕКТ',
    workflowStep2: '2. ПОДГОТОВКА',
    workflowStep3: '3. РЕЖИМ',
    workflowStep4: '4. АНАЛИЗ',
    workflowStep5: '5. ВАЛИДАЦИЯ',
    workflowStep6: '6. РЕЗУЛЬТАТ',
    workflowStep7: '7. СКАЧИВАНИЕ',
    workflowCurrentHere: 'Сейчас вы находитесь на шаге',
    workflowNextAction: 'Следующее действие',
    btnNextWorkflowStep: 'Перейти к следующему шагу →',

    intakeZipOptionTitle: 'ЗАГРУЗИТЬ ПОЛНЫЙ ZIP — РЕКОМЕНДУЕТСЯ',
    intakeZipOptionDesc: 'Основной и наиболее полный вариант. Загрузите ZIP-архив всего репозитория для извлечения всех AST-узлов и инвариантов.',
    intakeGitHubOptionTitle: 'GITHUB URL — БЫСТРЫЙ АНАЛИЗ',
    intakeGitHubWarning: 'GitHub-анализ может быть неполным. Для полного исследования загрузите ZIP всего репозитория.',
    cardInvestigatedObject: 'ИССЛЕДУЕМЫЙ ОБЪЕКТ',
    cardRepo: 'Репозиторий',
    cardRevision: 'Ветка / Ревизия',
    cardSourceMode: 'Режим источника',
    cardFiles: 'Файлов',
    cardCorpusStatus: 'Состояние корпуса',
    cardReady: 'ГОТОВ',
    cardIncomplete: 'НЕПОЛНЫЙ',
    btnInvestigateFullCorpus: 'ИССЛЕДОВАТЬ ПОЛНЫЙ КОРПУС',
    btnLaunchQuickScan: 'ЗАПУСТИТЬ БЫСТРЫЙ АНАЛИЗ (ЧАСТИЧНЫЙ КОРПУС)',
    btnStartRigorousInvestigation: 'НАЧАТЬ ИССЛЕДОВАНИЕ',
    partialCorpusWarningBanner: 'Результат основан на доступном подмножестве репозитория. Это не эквивалентно анализу полного корпуса.',
    sourceZipSectionTitle: 'ИСХОДНЫЙ ОБЪЕКТ (SOURCE REPOSITORY)',
    analysisZipSectionTitle: 'ПАКЕТ РЕЗУЛЬТАТОВ АНАЛИЗА (ANALYSIS RESULTS PACKAGE)',
    btnDownloadOriginalZip: 'СКАЧАТЬ ZIP ИСХОДНОГО КОРПУСА',
    btnDownloadFullAnalysisZip: 'СКАЧАТЬ ПОЛНЫЙ ZIP АНАЛИЗА',

    intakeSectionTitle: 'ПРИЁМ ИССЛЕДУЕМОГО ПРОЕКТА',
    intakeSectionSubtitle: 'Укажите ссылку на GitHub-репозиторий или загрузите ZIP-архив проекта. Лаборатория исследует проект в режиме только для чтения.',
    selectPresetTarget: 'Быстрый выбор цели:',
    customRepoInputHeader: 'Приемка пользовательского GitHub репозитория',
    lblRepoUrl: 'ССЫЛКА НА GITHUB-РЕПОЗИТОРИЙ:',
    lblRepoName: 'Название / отображение репозитория:',
    lblBranchRef: 'Ветка / Ревизия (Ref):',
    lblObjectId: 'Object ID (Уникальный идентификатор):',
    lblCategory: 'Категория репозитория:',
    lblVerificationState: 'Состояние верификации:',
    lblFilesIngested: 'Загруженные файлы:',
    lblCharacteristics: 'Структурные характеристики:',
    lblDescription: 'Описание:',
    btnImportPrepare: 'ИМПОРТИРОВАТЬ / ПОДГОТОВИТЬ ОБЪЕКТ',
    btnImporting: 'Подготовка объекта...',
    statusSourceImported: 'ОБЪЕКТ ГОТОВ К АНАЛИЗУ',
    statusSourcePending: 'ИСТОЧНИК ОЖИДАЕТ ЗАГРУЗКИ',
    distinctionSourceVsResult: 'Эпистемическая граница: SOURCE OBJECT (Входные артефакты) строго отделен от ANALYSIS RESULT (Сгенерированная телеметрия и выводы).',

    modeSectionTitle: 'ВЫБОР РЕЖИМА ИССЛЕДОВАНИЯ',
    modeSingleTitle: 'Одиночный проход SINGLE',
    modeSingleDesc: 'Стандартное базовое исполнение на каноническом ядре 5.2 Core (C1 Profiler → C2 Planner → C3 Executor → C4 Validator → C5 Reporter).',
    modeSingleBadge: 'BASELINE',
    modeDualTitle: 'Проход DUAL_ANALYSIS',
    modeDualDesc: 'Двойной разделенный анализ (Analyst A ∥ Analyst B) со структурным диффом, классификацией разногласий и синтезом выводов.',
    modeDualBadge: 'HYPOTHESIS',
    warningDualHypothesis: 'Это экспериментальная проверка. DUAL_ANALYSIS является HYPOTHESIS и не входит в каноническое ядро 5.2 CORE.',

    btnRunAnalysis: 'НАЧАТЬ ИССЛЕДОВАНИЕ →',
    btnRunSmokeTest: 'Запустить smoke-тест',
    smokeTestBadge: 'SMOKE-ТЕСТ — НЕ ЯВЛЯЕТСЯ ЭКСПЕРИМЕНТАЛЬНЫМ ДОКАЗАТЕЛЬСТВОМ',
    smokeTestWarning: 'Smoke-тест проверяет работоспособность всей цепочки лаборатории (Приемка → Анализ → Результат → Скачивание архива) перед проведением строгих экспериментов.',
    btnExecuting: 'Выполнение пайплайна...',
    btnStep1Single: 'Шаг 1: Запустить проход Single 5.2',
    btnStep2Dual: 'Шаг 2: Запустить Dual Analysis (A ∥ B)',
    btnStep3Compare: 'Шаг 3: Перейти к сравнению и синтезу',
    btnStep4Validate: 'Шаг 4: Валидация по Gold Standard и расчет метрик',

    goldStandardSectionTitle: 'ПОДСИСТЕМА GOLD STANDARD',
    goldStandardNotice: 'GOLD STANDARD ≠ ANALYST OUTPUT. Gold Standard — это независимая эталонная разметка, зафиксированная до анализа. Аналитики не могут наблюдать или изменять Gold Standard.',
    goldStandardNotProvided: 'GOLD STANDARD: НЕ ПРЕДОСТАВЛЕН',
    goldStandardLocked: 'GOLD STANDARD: ЗАБЛОКИРОВАН И ХЕШИРОВАН',
    goldStandardUnlocked: 'GOLD STANDARD: НЕ ЗАБЛОКИРОВАН (НЕБЕЗОПАСНО)',
    validationStatusCannotComplete: 'VALIDATION STATUS: НЕВОЗМОЖНО ЗАВЕРШИТЬ (Отсутствует фиксация Gold Standard до анализа)',
    validationStatusComplete: 'VALIDATION STATUS: СОПОСТАВЛЕН И РАССЧИТАН',
    btnLockGoldStandard: 'Зафиксировать Gold Standard (Pre-Analysis)',

    resultSectionTitle: 'РЕЗУЛЬТАТ АНАЛИЗА И ТРАССИРУЕМОСТЬ',
    resultRunId: 'RUN_ID:',
    resultObjectId: 'OBJECT_ID:',
    resultRepoUrl: 'REPOSITORY_URL:',
    resultRevision: 'РЕВИЗИЯ / ВЕТКА:',
    resultMode: 'РЕЖИМ ИССЛЕДОВАНИЯ:',
    resultTimestamp: 'ВРЕМЯ ЗАПУСКА:',
    resultConfiguration: 'КОНФИГУРАЦИЯ:',
    resultStatus: 'СТАТУС РЕЗУЛЬТАТА:',
    analystConfigFingerprint: 'ФИНГЕРПРИНТ КОНФИГУРАЦИИ ANALYST A / B:',
    independenceEnforcedNotice: 'INDEPENDENCE ENFORCED BY EXPERIMENTAL CONFIGURATION (Analyst A не видит результат Analyst B; Analyst B не видит результат Analyst A).',
    epistemicDistinctionBanner: 'КРИТИЧЕСКИЕ ЭПИСТЕМИЧЕСКИЕ ГРАНИЦЫ: OBSERVATION ≠ INFERENCE | INFERENCE ≠ EVIDENCE | UNKNOWN ≠ FALSE | DISPUTED ≠ TRUE. Синтезированные выводы никогда не повышаются до EVIDENCE без независимой верификации.',

    tabIntakeView: '1. Приемка проекта',
    tabSingleView: '2. Проход Single 5.2',
    tabDualView: '3. Проход Dual A/B',
    tabCompareView: '4. Сравнение и синтез',
    tabValidationView: '5. Валидация GS',
    tabMetricsView: '6. Метрики протокола',
    tabResultArtifactsView: '7. Результаты и скачивание',

    downloadSectionTitle: 'СКАЧИВАНИЕ АРТЕФАКТОВ И ПАКЕТОВ РЕПОЗИТОРИЯ',
    downloadSourceTitle: 'АРТЕФАКТЫ ИСХОДНОГО РЕПОЗИТОРИЯ (SOURCE)',
    downloadSourceDesc: 'Просмотр и скачивание файлов исходного репозитория.',
    downloadResultTitle: 'ПАКЕТ РЕЗУЛЬТАТОВ АНАЛИЗА (SL-ARTIFACT)',
    downloadResultDesc: 'Полный самодостаточный аналитический пакет, содержащий телеметрию, структурированные логи, записи валидации и отчеты синтеза.',
    btnOpenGitHub: 'Открыть GitHub репозиторий',
    btnDownloadSourceZip: 'Скачать ZIP исходного кода (GitHub)',
    btnDownloadResultJson: 'Скачать analysis_result.json',
    btnDownloadReportMd: 'Скачать analysis_report.md',
    btnDownloadReportTxt: 'Скачать analysis_report.txt',
    btnDownloadCompleteZip: 'Скачать полный ZIP анализа',
    downloadingZip: 'Формирование ZIP архива...',
    sandboxNotice: 'Примечание: Прямые сетевые операции git ограничены периметром песочницы. Ссылки на GitHub и прямая загрузка локальных файлов полностью доступны.',

    statusNotReady: 'NOT READY',
    statusReadyForExecution: 'READY FOR EXECUTION',
    statusRunning: 'RUNNING',
    statusCompleted: 'COMPLETED',
    statusValidationPending: 'VALIDATION PENDING',
    statusValidated: 'VALIDATED',
    statusStoppedInvalid: 'STOPPED — INVALID EXPERIMENT',

    integrityPanelTitle: 'ПАНЕЛЬ ЭКСПЕРИМЕНТАЛЬНОЙ ЦЕЛОСТНОСТИ',
    integrityPanelSubtitle: 'Рантайм-контроль эпистемических правил',

    readOnlyBadge: 'РЕЖИМ ТОЛЬКО ДЛЯ ЧТЕНИЯ',
    zeroMutationBadge: 'ГАРАНТИЯ: НОЛЬ МУТАЦИЙ',
    sealedShaBadge: 'ЗАПЕЧАТАНО SHA-256',
    canonicalStandardBadge: '16-СЕКЦИОННЫЕ КАНОНИЧЕСКИЕ ОТЧЁТЫ',
    labMissionText: 'LAB-D — автономная диагностическая лаборатория для исследования внешних инженерных проектов. Загрузите проект или укажите GitHub-репозиторий. Лаборатория исследует проект в режиме только для чтения и формирует диагностический отчёт. LAB-D НЕ изменяет исследуемый проект.',
    protocol10StagesTitle: '10 ЭТАПОВ ПРОТОКОЛА ИССЛЕДОВАНИЯ',
    stageWaiting: 'ожидание',
    stageRunning: 'в работе',
    stageComplete: 'завершено',
    stageBlocked: 'заблокировано',
    stage1Name: '1. Приём проекта и контрольная сумма',
    stage2Name: '2. Регистрация образца',
    stage3Name: '3. Инвентаризация файлов',
    stage4Name: '4. Структурная реконструкция (C1)',
    stage5Name: '5. Анализ зависимостей (C2)',
    stage6Name: '6. Проверка инвариантов и контрактов (C4)',
    stage7Name: '7. Архитектурная атака / Дифф (Dual)',
    stage8Name: '8. Фальсификация гипотез / Синтез',
    stage9Name: '9. Формирование отчёта (C5)',
    stage10Name: '10. Запечатывание и экспорт результата',
    principlesTitle: 'ПРИНЦИПЫ И ГАРАНТИИ ЛАБОРАТОРИИ',
    principle1: 'Без модификации файлов: целевой код остаётся неизменным.',
    principle2: 'Криптографическая подпись: все артефакты заверяются SHA-256.',
    principle3: 'Эпистемический реестр: строгое разделение фактов (Observation) и гипотез (Inference).',
    principle4: 'Изоляция гипотез: DUAL_ANALYSIS является гипотезой вне канонического ядра 5.2 CORE.',
    presetTargetsTitle: 'ЭТАЛОННЫЕ ПРОЕКТЫ ДЛЯ БЫСТРОГО АУДИТА',
    presetTargetsSubtitle: 'Готовые образцы с верифицированным кодом и наборами тестов.',
    btnInspectSample: 'ИССЛЕДОВАТЬ ОБРАЗЕЦ →',
    dropzoneTitle: 'Перетащите ZIP-архив проекта или файлы кода сюда',
    dropzoneSubtitle: 'или нажмите, чтобы выбрать файл на компьютере',
    btnUploadZip: 'ЗАГРУЗИТЬ ПРОЕКТ (ZIP / CODE)',
  },
};
