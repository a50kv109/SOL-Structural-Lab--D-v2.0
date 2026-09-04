import React, { useRef, useState } from 'react';
import {
  Upload,
  FolderOpen,
  FileCode,
  Plus,
  Play,
  Activity,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  FileArchive,
  ExternalLink,
  GitBranch,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { CorpusObjectRecord, SourceMode, CorpusIntegrityStatus } from '../protocols/corpusIntake';

export interface IntakePanelProps {
  currentRepo: CorpusObjectRecord;
  customRepoUrl: string;
  setCustomRepoUrl: (url: string) => void;
  customBranchRef: string;
  setCustomBranchRef: (branch: string) => void;
  intakeMethod: 'ZIP' | 'GITHUB' | 'PRESETS';
  setIntakeMethod: (method: 'ZIP' | 'GITHUB' | 'PRESETS') => void;
  sourceMode: SourceMode;
  corpusStatus: CorpusIntegrityStatus;
  onZipUpload: (file: File) => void;
  onFilesDropped: (files: FileList | null) => void;
  onPrepareGitHub: () => void;
  onSelectPreset: (repoId: string) => void;
  onShowAddFileModal: () => void;
  repositories: CorpusObjectRecord[];
  selectedResearchMode: 'SINGLE' | 'DUAL_ANALYSIS';
  setSelectedResearchMode: (mode: 'SINGLE' | 'DUAL_ANALYSIS') => void;
  isProcessing: boolean;
  onExecuteAnalysis: (isSmokeTest: boolean) => void;
}

export const IntakePanel: React.FC<IntakePanelProps> = ({
  currentRepo,
  customRepoUrl,
  setCustomRepoUrl,
  customBranchRef,
  setCustomBranchRef,
  intakeMethod,
  setIntakeMethod,
  sourceMode,
  corpusStatus,
  onZipUpload,
  onFilesDropped,
  onPrepareGitHub,
  onSelectPreset,
  onShowAddFileModal,
  repositories,
  selectedResearchMode,
  setSelectedResearchMode,
  isProcessing,
  onExecuteAnalysis,
}) => {
  const { language, t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const totalBytes = (currentRepo.files || []).reduce((acc, f) => acc + (f.sizeBytes || 0), 0);
  const totalKb = (totalBytes / 1024).toFixed(1);

  const getPrimaryButtonLabel = () => {
    if (isProcessing) return t.btnExecuting;
    if (sourceMode === 'FULL_ZIP') {
      return language === 'RU' ? 'ИССЛЕДОВАТЬ ПОЛНЫЙ КОРПУС' : 'INVESTIGATE FULL CORPUS';
    }
    if (sourceMode === 'GITHUB_QUICK_SCAN') {
      return language === 'RU' ? 'ЗАПУСТИТЬ БЫСТРЫЙ АНАЛИЗ (ЧАСТИЧНЫЙ КОРПУС)' : 'RUN QUICK SCAN (PARTIAL CORPUS)';
    }
    return language === 'RU' ? 'НАЧАТЬ ИССЛЕДОВАНИЕ' : 'START INVESTIGATION';
  };

  return (
    <div className="space-y-5 font-sans">
      {/* 1. Intake Method Selector Header Tabs */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-4 font-mono">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
          <div className="flex items-center space-x-2">
            <FolderOpen className="w-4 h-4 text-blue-600" />
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-tight">
              {t.intakeSectionTitle}
            </h3>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
            {language === 'RU' ? 'ВХОДНЫЕ ДАННЫЕ' : 'INPUT ARTIFACT'}
          </span>
        </div>

        {/* 3 Input Tabs: ZIP (Primary), GitHub (Secondary), Presets */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {/* Tab 1: ZIP (RECOMMENDED / PRIMARY) */}
          <button
            type="button"
            onClick={() => setIntakeMethod('ZIP')}
            className={`p-3 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
              intakeMethod === 'ZIP'
                ? 'bg-emerald-50/80 border-emerald-500 ring-2 ring-emerald-500/20 text-emerald-950 shadow-xs'
                : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold flex items-center gap-1.5">
                <FileArchive className="w-3.5 h-3.5 text-emerald-600" />
                {t.intakeTabZip}
              </span>
              <span className="text-[9px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded border border-emerald-300 uppercase">
                {t.primaryInputBadge}
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-sans mt-1">
              {language === 'RU' ? '100% полный архив репозитория' : '100% complete archive corpus'}
            </p>
          </button>

          {/* Tab 2: GitHub URL (SECONDARY / QUICK SCAN) */}
          <button
            type="button"
            onClick={() => setIntakeMethod('GITHUB')}
            className={`p-3 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
              intakeMethod === 'GITHUB'
                ? 'bg-amber-50/80 border-amber-500 ring-2 ring-amber-500/20 text-amber-950 shadow-xs'
                : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold flex items-center gap-1.5">
                <GitBranch className="w-3.5 h-3.5 text-amber-600" />
                {t.intakeTabGithub}
              </span>
              <span className="text-[9px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded border border-amber-300 uppercase">
                {t.secondaryInputBadge}
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-sans mt-1">
              {language === 'RU' ? 'Быстрый скан (частичный корпус)' : 'Quick scan (partial corpus)'}
            </p>
          </button>

          {/* Tab 3: Canonical Presets */}
          <button
            type="button"
            onClick={() => setIntakeMethod('PRESETS')}
            className={`p-3 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
              intakeMethod === 'PRESETS'
                ? 'bg-blue-50/80 border-blue-500 ring-2 ring-blue-500/20 text-blue-950 shadow-xs'
                : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                {t.intakeTabPresets}
              </span>
              <span className="text-[9px] font-bold bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded border border-blue-300 uppercase">
                BENCHMARK
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-sans mt-1">
              {language === 'RU' ? 'Канонические эталонные проекты' : 'Canonical reference benchmark projects'}
            </p>
          </button>
        </div>

        {/* 2. MODE-SPECIFIC INTAKE CONTENT */}
        {intakeMethod === 'ZIP' && (
          <div className="space-y-3 pt-2">
            {/* Primary Recommended Callout */}
            <div className="p-3 bg-emerald-950 text-emerald-200 border border-emerald-800 rounded-xl text-xs space-y-1">
              <div className="flex items-center gap-2 font-bold text-white">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{language === 'RU' ? 'РЕКОМЕНДОВАННЫЙ РЕЖИМ ИССЛЕДОВАНИЯ' : 'RECOMMENDED INVESTIGATION MODE'}</span>
              </div>
              <p className="text-[11px] text-emerald-300 font-sans leading-relaxed">
                {language === 'RU'
                  ? 'Загрузка полного ZIP-архива гарантирует 100% полноту корпуса файлов, точный AST-анализ графа вызовов и обнаружение всех структурных инвариантов без сетевых пропусков.'
                  : 'Uploading a full repository ZIP guarantees 100% corpus completeness, precise AST call-graph parsing, and exhaustive discovery of structural invariants without network omissions.'}
              </p>
            </div>

            {/* ZIP Drag and Drop Zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragOver(false);
                onFilesDropped(e.dataTransfer.files);
              }}
              onClick={() => fileInputRef.current?.click()}
              className={`p-8 border-2 border-dashed rounded-xl text-center cursor-pointer transition flex flex-col items-center justify-center space-y-2.5 ${
                isDragOver
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-emerald-300 bg-emerald-50/30 hover:bg-emerald-50/60'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".zip,.ts,.tsx,.js,.jsx,.py,.json,.md,.txt"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    const file = e.target.files[0];
                    if (file.name.endsWith('.zip')) {
                      onZipUpload(file);
                    } else {
                      onFilesDropped(e.target.files);
                    }
                  }
                }}
              />
              <div className="w-12 h-12 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 shadow-xs">
                <Upload className="w-6 h-6" />
              </div>
              <div className="text-sm font-bold text-slate-900 font-mono">
                {t.dropzoneTitle}
              </div>
              <div className="text-xs text-slate-600 font-sans max-w-md">
                {t.dropzoneSubtitle}
              </div>
              <button
                type="button"
                className="mt-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-mono font-bold shadow-xs transition"
              >
                {t.btnUploadZip}
              </button>
            </div>
          </div>
        )}

        {intakeMethod === 'GITHUB' && (
          <div className="space-y-3 pt-2">
            {/* Warning Banner for Partial GitHub Scan */}
            <div className="p-3.5 bg-amber-950 text-amber-200 border border-amber-800 rounded-xl text-xs space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-amber-300">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>{language === 'RU' ? 'ПРЕДУПРЕЖДЕНИЕ: ЧАСТИЧНЫЙ КОРПУС' : 'WARNING: PARTIAL REPOSITORY CORPUS'}</span>
              </div>
              <p className="text-[11px] text-amber-200 font-sans leading-relaxed">
                {t.githubWarningText}
              </p>
            </div>

            {/* GitHub URL & Branch Input */}
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">
                  {t.lblRepoUrl}
                </label>
                <input
                  type="text"
                  value={customRepoUrl}
                  onChange={e => setCustomRepoUrl(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-mono text-slate-800 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  placeholder="https://github.com/a50kv109/BOOK-NAV-CLASSIC-FINAL-RELEASE-2"
                />
              </div>

              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">
                    {t.lblBranchRef}
                  </label>
                  <input
                    type="text"
                    value={customBranchRef}
                    onChange={e => setCustomBranchRef(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-mono text-slate-800 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                    placeholder="main"
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={onPrepareGitHub}
                    className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-mono font-bold shadow-xs transition cursor-pointer"
                  >
                    {t.btnPrepareTarget}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {intakeMethod === 'PRESETS' && (
          <div className="space-y-3 pt-2">
            <p className="text-xs text-slate-600 font-sans">
              {t.presetTargetsSubtitle}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {repositories.map(repo => {
                const isSelected = currentRepo.id === repo.id;
                return (
                  <div
                    key={repo.id}
                    onClick={() => onSelectPreset(repo.id)}
                    className={`p-3.5 rounded-xl border transition cursor-pointer flex flex-col justify-between space-y-2 ${
                      isSelected
                        ? 'bg-blue-50/80 border-blue-500 ring-2 ring-blue-500/20 shadow-xs'
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                        repo.category === 'PRIMARY_CORPUS'
                          ? 'bg-emerald-100 text-emerald-800'
                          : repo.category === 'CANDIDATE_TOOL'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-slate-200 text-slate-800'
                      }`}>
                        {repo.category}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {repo.files?.length || 0} {language === 'RU' ? 'файлов' : 'files'}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 truncate">{repo.name}</h4>
                      <p className="text-[11px] text-slate-600 font-sans line-clamp-2 mt-0.5">{repo.description}</p>
                    </div>
                    <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[10px]">
                      <span className="text-slate-500 truncate max-w-[150px]">{repo.structuralCharacteristics}</span>
                      <span className={`font-bold ${isSelected ? 'text-blue-600' : 'text-slate-700'}`}>
                        {isSelected ? '✓ Выбран' : 'Выбрать →'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. Research Mode Selector (SINGLE vs DUAL_ANALYSIS) */}
        <div className="space-y-2 pt-2 border-t border-slate-200">
          <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono">
            {t.modeSectionTitle}
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div
              onClick={() => setSelectedResearchMode('SINGLE')}
              className={`p-3 rounded-xl border transition cursor-pointer ${
                selectedResearchMode === 'SINGLE'
                  ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-500 text-blue-900 shadow-xs'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold">
                <span>SINGLE</span>
                <span className="text-[9px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded font-bold">BASELINE</span>
              </div>
              <div className="text-[10px] text-slate-500 font-sans mt-1">5.2 Core Canonical Pass</div>
            </div>

            <div
              onClick={() => setSelectedResearchMode('DUAL_ANALYSIS')}
              className={`p-3 rounded-xl border transition cursor-pointer ${
                selectedResearchMode === 'DUAL_ANALYSIS'
                  ? 'bg-amber-50 border-amber-500 ring-1 ring-amber-500 text-amber-900 shadow-xs'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold">
                <span>DUAL_ANALYSIS</span>
                <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-bold">HYPOTHESIS</span>
              </div>
              <div className="text-[10px] text-slate-500 font-sans mt-1">Isolated A ∥ B Passes</div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. PRE-ANALYSIS OPERATOR CARD (ИССЛЕДУЕМЫЙ ОБЪЕКТ) */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg text-white space-y-4 font-mono">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              {language === 'RU' ? 'КАРТОЧКА ОБЪЕКТА ИССЛЕДОВАНИЯ' : 'OPERATOR TARGET CARD'}
            </h3>
          </div>
          <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            {currentRepo.files && currentRepo.files.length > 0 ? 'READY FOR AUDIT' : 'NO BUFFER'}
          </span>
        </div>

        {/* Target Metadata Summary Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-500 uppercase">{language === 'RU' ? 'Репозиторий' : 'Repository'}</span>
            <div className="font-bold text-white truncate mt-0.5">{currentRepo.name}</div>
          </div>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-500 uppercase">{language === 'RU' ? 'Режим источника' : 'Source Mode'}</span>
            <div className="mt-0.5">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                sourceMode === 'FULL_ZIP'
                  ? 'bg-emerald-900/80 text-emerald-300 border border-emerald-700'
                  : sourceMode === 'GITHUB_QUICK_SCAN'
                  ? 'bg-amber-900/80 text-amber-300 border border-amber-700'
                  : 'bg-blue-900/80 text-blue-300 border border-blue-700'
              }`}>
                {sourceMode}
              </span>
            </div>
          </div>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-500 uppercase">{language === 'RU' ? 'Полнота корпуса' : 'Corpus Integrity'}</span>
            <div className="mt-0.5">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                corpusStatus === 'COMPLETE'
                  ? 'bg-emerald-900/80 text-emerald-300 border border-emerald-700'
                  : 'bg-amber-900/80 text-amber-300 border border-amber-700'
              }`}>
                {corpusStatus}
              </span>
            </div>
          </div>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-500 uppercase">{language === 'RU' ? 'Файлов в буфере' : 'Ingested Files'}</span>
            <div className="font-bold text-emerald-400 mt-0.5">{currentRepo.files?.length || 0} {language === 'RU' ? 'файлов' : 'files'}</div>
          </div>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-500 uppercase">{language === 'RU' ? 'Объём кода' : 'Buffer Volume'}</span>
            <div className="font-bold text-blue-400 mt-0.5">{totalKb} KB</div>
          </div>

          <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-500 uppercase">{language === 'RU' ? 'Редактор' : 'Buffer'}</span>
              <div className="text-[11px] text-slate-300 mt-0.5">{language === 'RU' ? 'Добавить файл' : '+ File'}</div>
            </div>
            <button
              onClick={onShowAddFileModal}
              className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded text-[10px] font-bold transition flex items-center gap-1 cursor-pointer border border-slate-700"
            >
              <Plus className="w-3 h-3" />
              {language === 'RU' ? 'Файл' : 'Add'}
            </button>
          </div>
        </div>

        {/* Primary and Secondary Launch Action Buttons */}
        <div className="pt-2 space-y-2.5">
          <button
            onClick={() => onExecuteAnalysis(false)}
            disabled={isProcessing || !currentRepo.files || currentRepo.files.length === 0}
            className={`w-full py-3.5 rounded-xl text-xs font-mono font-bold transition flex items-center justify-center gap-2 shadow-lg cursor-pointer disabled:opacity-50 ${
              sourceMode === 'FULL_ZIP'
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                : sourceMode === 'GITHUB_QUICK_SCAN'
                ? 'bg-amber-600 hover:bg-amber-500 text-white'
                : 'bg-blue-600 hover:bg-blue-500 text-white'
            }`}
          >
            {isProcessing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin text-white" />
                <span>{t.btnExecuting}</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>{getPrimaryButtonLabel()}</span>
              </>
            )}
          </button>

          <button
            onClick={() => onExecuteAnalysis(true)}
            disabled={isProcessing || !currentRepo.files || currentRepo.files.length === 0}
            className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-mono font-bold transition flex items-center justify-center gap-1.5 border border-slate-700 cursor-pointer disabled:opacity-50"
          >
            <Activity className="w-3.5 h-3.5 text-blue-400" />
            <span>{t.btnRunSmokeTest}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
