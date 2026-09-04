import React from 'react';
import {
  Fingerprint,
  FileCode,
  FileArchive,
  Download,
  ExternalLink,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  FolderDown,
  Layers,
  FileText,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { CorpusObjectRecord, SourceMode, CorpusIntegrityStatus } from '../protocols/corpusIntake';
import { ExperimentSession } from '../protocols/experimentStateMachine';

export interface ResultArtifactsPanelProps {
  runId: string;
  selectedRepoId: string;
  selectedResearchMode: 'SINGLE' | 'DUAL_ANALYSIS';
  currentRepo: CorpusObjectRecord;
  customBranchRef: string;
  runTimestamp: string;
  isSmokeTestRun: boolean;
  session: ExperimentSession;
  sourceMode: SourceMode;
  corpusStatus: CorpusIntegrityStatus;
  isPackagingZip: boolean;
  isPackagingSourceZip: boolean;
  onDownloadResultJson: () => void;
  onDownloadReportMd: () => void;
  onDownloadReportTxt: () => void;
  onDownloadCompleteZip: () => void;
  onDownloadSourceZip: () => void;
}

export const ResultArtifactsPanel: React.FC<ResultArtifactsPanelProps> = ({
  runId,
  selectedRepoId,
  selectedResearchMode,
  currentRepo,
  customBranchRef,
  runTimestamp,
  isSmokeTestRun,
  session,
  sourceMode,
  corpusStatus,
  isPackagingZip,
  isPackagingSourceZip,
  onDownloadResultJson,
  onDownloadReportMd,
  onDownloadReportTxt,
  onDownloadCompleteZip,
  onDownloadSourceZip,
}) => {
  const { language, t } = useLanguage();
  const isPartial = sourceMode === 'GITHUB_QUICK_SCAN' || corpusStatus === 'PARTIAL';

  return (
    <div className="space-y-6 font-sans">
      {/* 1. Dedicated Analysis Result View Header & Metadata */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-5 font-mono">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div className="flex items-center space-x-2">
            <Fingerprint className="w-4 h-4 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-tight">
              {t.resultSectionTitle}
            </h3>
          </div>
          <div className="flex items-center gap-2 text-xs">
            {isSmokeTestRun && (
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-300">
                {t.smokeTestBadge}
              </span>
            )}
            <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200">
              {session.state}
            </span>
          </div>
        </div>

        {/* Result Meta Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div>
            <span className="text-[10px] text-slate-400 uppercase">{t.resultRunId}</span>
            <div className="font-bold text-slate-900 mt-0.5">{runId}</div>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase">{t.resultObjectId}</span>
            <div className="font-bold text-slate-900 mt-0.5">{selectedRepoId}</div>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase">{t.resultMode}</span>
            <div className="font-bold text-blue-700 mt-0.5">{selectedResearchMode}</div>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase">{t.resultRepoUrl}</span>
            <div className="font-bold text-slate-800 truncate mt-0.5">{currentRepo.url}</div>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase">{t.resultRevision}</span>
            <div className="font-bold text-slate-800 mt-0.5">{customBranchRef || 'HEAD'}</div>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase">{t.resultTimestamp}</span>
            <div className="font-bold text-slate-800 mt-0.5">{runTimestamp}</div>
          </div>
        </div>

        {/* Partial Corpus Warning Banner if GitHub Quick Scan */}
        {isPartial && (
          <div className="p-3.5 bg-amber-950 text-amber-200 border border-amber-800 rounded-xl text-xs space-y-1">
            <div className="flex items-center gap-2 font-bold text-amber-300">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>{language === 'RU' ? 'РЕЗУЛЬТАТ НА ОСНОВЕ ЧАСТИЧНОГО КОРПУСА' : 'RESULT BASED ON PARTIAL CORPUS'}</span>
            </div>
            <p className="text-[11px] text-amber-200 font-sans leading-relaxed">
              {language === 'RU'
                ? 'Результат основан на доступном подмножестве репозитория. Это не эквивалентно анализу полного корпуса. Для получения исчерпывающих инвариантов и полного графа вызовов загрузите полный ZIP-архив репозитория.'
                : 'This result is based on the accessible subset of the repository. It is not equivalent to a full corpus audit. For exhaustive invariant coverage and complete call graphs, upload the full repository ZIP.'}
            </p>
          </div>
        )}

        {/* Epistemic Guard Banner */}
        <div className="p-3 bg-slate-900 text-slate-200 rounded-lg text-[11px] font-mono leading-relaxed">
          {t.epistemicDistinctionBanner}
        </div>
      </div>

      {/* 2. VISUALLY SEPARATED DOWNLOAD ACTIONS (LAB-G Pattern) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-mono">
        {/* Box 1: SOURCE REPOSITORY DOWNLOAD */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <FileCode className="w-4 h-4 text-slate-700" />
              <h3 className="text-xs font-bold text-slate-900 uppercase">
                {t.downloadSourceTitle}
              </h3>
            </div>
            <p className="text-xs text-slate-600 font-sans">
              {t.downloadSourceDesc}
            </p>
          </div>

          <div className="space-y-2.5 pt-2">
            <a
              href={currentRepo.url}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer border border-slate-300"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              {t.btnOpenGitHub}
            </a>

            <button
              onClick={onDownloadSourceZip}
              disabled={isPackagingSourceZip}
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-50"
            >
              {isPackagingSourceZip ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>{language === 'RU' ? 'Упаковка исходников...' : 'Archiving source...'}</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>{t.btnDownloadSourceZip}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Box 2: ANALYSIS RESULT PACKAGE DOWNLOAD */}
        <div className="bg-white border border-blue-200 rounded-xl p-5 shadow-xs space-y-4 flex flex-col justify-between bg-blue-50/20">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <FileArchive className="w-4 h-4 text-blue-600" />
              <h3 className="text-xs font-bold text-slate-900 uppercase">
                {t.downloadResultTitle}
              </h3>
            </div>
            <p className="text-xs text-slate-600 font-sans">
              {t.downloadResultDesc}
            </p>
          </div>

          <div className="space-y-2.5 pt-2">
            {/* Direct format downloads */}
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={onDownloadResultJson}
                className="py-1.5 bg-white hover:bg-slate-100 text-slate-800 rounded-lg text-xs font-bold transition border border-slate-300 flex items-center justify-center gap-1 cursor-pointer"
              >
                <Download className="w-3 h-3" />
                .json
              </button>
              <button
                onClick={onDownloadReportMd}
                className="py-1.5 bg-white hover:bg-slate-100 text-slate-800 rounded-lg text-xs font-bold transition border border-slate-300 flex items-center justify-center gap-1 cursor-pointer"
              >
                <Download className="w-3 h-3" />
                .md
              </button>
              <button
                onClick={onDownloadReportTxt}
                className="py-1.5 bg-white hover:bg-slate-100 text-slate-800 rounded-lg text-xs font-bold transition border border-slate-300 flex items-center justify-center gap-1 cursor-pointer"
              >
                <Download className="w-3 h-3" />
                .txt
              </button>
            </div>

            {/* Complete Results Zip */}
            <button
              onClick={onDownloadCompleteZip}
              disabled={isPackagingZip}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm cursor-pointer disabled:opacity-50"
            >
              {isPackagingZip ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  {t.downloadingZip}
                </>
              ) : (
                <>
                  <FileArchive className="w-3.5 h-3.5" />
                  {t.btnDownloadCompleteZip}
                </>
              )}
            </button>

            <div className="text-[10px] text-blue-700 font-mono text-center">
              Contains: /metadata.json, /raw_input/, /analysis/, /validation/, /report/, /artifacts/
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
