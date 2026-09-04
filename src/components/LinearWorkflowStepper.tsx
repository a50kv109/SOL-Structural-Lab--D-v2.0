import React from 'react';
import { Sliders, Check, Lock, Play, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export interface LinearWorkflowStepperProps {
  currentStep: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  onSelectStep: (step: 1 | 2 | 3 | 4 | 5 | 6 | 7) => void;
  isProcessing: boolean;
  hasFiles: boolean;
  hasAnalysis: boolean;
  hasValidation: boolean;
  sourceMode?: 'FULL_ZIP' | 'GITHUB_QUICK_SCAN' | 'CANONICAL_PRESET';
  onStartAnalysis: () => void;
}

export type StepState = 'LOCKED' | 'READY' | 'RUNNING' | 'COMPLETE';

export const LinearWorkflowStepper: React.FC<LinearWorkflowStepperProps> = ({
  currentStep,
  onSelectStep,
  isProcessing,
  hasFiles,
  hasAnalysis,
  hasValidation,
  sourceMode = 'FULL_ZIP',
  onStartAnalysis,
}) => {
  const { language, t } = useLanguage();

  const getStepState = (stepNum: number): StepState => {
    if (isProcessing) {
      if (stepNum === 4) return 'RUNNING';
      if (stepNum < 4) return 'COMPLETE';
      return 'LOCKED';
    }
    if (stepNum === 1) return hasFiles ? 'COMPLETE' : 'READY';
    if (stepNum === 2) return hasFiles ? (currentStep >= 2 ? 'COMPLETE' : 'READY') : 'LOCKED';
    if (stepNum === 3) return hasFiles ? (currentStep >= 3 ? 'COMPLETE' : 'READY') : 'LOCKED';
    if (stepNum === 4) return hasAnalysis ? 'COMPLETE' : hasFiles ? 'READY' : 'LOCKED';
    if (stepNum === 5) return hasValidation ? 'COMPLETE' : hasAnalysis ? 'READY' : 'LOCKED';
    if (stepNum === 6) return hasAnalysis ? 'COMPLETE' : 'LOCKED';
    if (stepNum === 7) return hasAnalysis ? 'COMPLETE' : 'LOCKED';
    return 'LOCKED';
  };

  const steps = [
    { num: 1 as const, title: t.workflowStep1, desc: language === 'RU' ? 'Выбор объекта (ZIP / URL)' : 'Object Selection (ZIP / URL)' },
    { num: 2 as const, title: t.workflowStep2, desc: language === 'RU' ? 'Проверка файлов и AST' : 'Buffer & AST Verification' },
    { num: 3 as const, title: t.workflowStep3, desc: language === 'RU' ? 'Выбор Single / Dual' : 'Single / Dual Mode' },
    { num: 4 as const, title: t.workflowStep4, desc: language === 'RU' ? '10 стадий протокола' : '10-Stage Protocol Run' },
    { num: 5 as const, title: t.workflowStep5, desc: language === 'RU' ? 'Сравнение с Gold Standard' : 'Gold Standard Audit' },
    { num: 6 as const, title: t.workflowStep6, desc: language === 'RU' ? 'Итоговые выводы и отчёт' : 'Final Diagnostic Report' },
    { num: 7 as const, title: t.workflowStep7, desc: language === 'RU' ? 'Скачивание пакета ZIP' : 'Artifacts Download' },
  ];

  const getNextActionPrompt = () => {
    if (isProcessing) {
      return {
        text: language === 'RU' ? 'Выполняется 10-стадийное исследование...' : 'Executing 10-stage protocol investigation...',
        btnText: null,
        onClick: null,
      };
    }
    if (currentStep === 1) {
      return {
        text: language === 'RU' ? 'Объект выбран. Перейдите к подготовке или сразу начните анализ.' : 'Object ready. Review buffer or launch investigation.',
        btnText: sourceMode === 'FULL_ZIP' ? (language === 'RU' ? 'Исследовать полный корпус →' : 'Investigate Full Corpus →') : (language === 'RU' ? 'Начать исследование →' : 'Start Investigation →'),
        onClick: onStartAnalysis,
      };
    }
    if (currentStep === 2 || currentStep === 3) {
      return {
        text: language === 'RU' ? 'Параметры зафиксированы. Готово к запуску.' : 'Parameters frozen. Ready to launch investigation.',
        btnText: language === 'RU' ? 'Запустить анализ →' : 'Launch Analysis →',
        onClick: onStartAnalysis,
      };
    }
    if (currentStep === 4) {
      return {
        text: hasAnalysis ? (language === 'RU' ? 'Анализ завершён. Перейдите к валидации или отчёту.' : 'Analysis complete. Proceed to validation or results.') : (language === 'RU' ? 'Готово к запуску анализа.' : 'Ready to start analysis.'),
        btnText: hasAnalysis ? (language === 'RU' ? 'Перейти к отчёту (Шаг 06) →' : 'Go to Report (Step 06) →') : (language === 'RU' ? 'Запустить анализ →' : 'Launch Analysis →'),
        onClick: hasAnalysis ? () => onSelectStep(6) : onStartAnalysis,
      };
    }
    if (currentStep === 5 || currentStep === 6) {
      return {
        text: language === 'RU' ? 'Результаты сформированы. Вы можете скачать пакет результатов.' : 'Results sealed. You can download the complete artifacts package.',
        btnText: language === 'RU' ? 'Скачать результаты (Шаг 07) →' : 'Download Artifacts (Step 07) →',
        onClick: () => onSelectStep(7),
      };
    }
    return {
      text: language === 'RU' ? 'Пакет артефактов готов к скачиванию.' : 'Artifact package ready for download.',
      btnText: null,
      onClick: null,
    };
  };

  const nextAction = getNextActionPrompt();

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-3 font-mono">
      {/* Stepper Header */}
      <div className="flex items-center justify-between text-xs font-bold text-slate-600 uppercase tracking-wider px-1">
        <span className="flex items-center gap-2 text-slate-900">
          <Sliders className="w-4 h-4 text-blue-600" />
          {t.workflowTitle}
        </span>
        <span className="text-[10px] bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded border border-slate-200">
          01 → 07 LINEAR PIPELINE
        </span>
      </div>

      {/* 7 Workflow Steps Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-xs">
        {steps.map(s => {
          const state = getStepState(s.num);
          const isCurrent = currentStep === s.num;
          const isClickable = state !== 'LOCKED' || s.num === 1;

          let badgeBg = 'bg-slate-100 text-slate-400 border-slate-200';
          let borderStyle = 'border-slate-200 bg-slate-50 text-slate-400';

          if (state === 'COMPLETE') {
            badgeBg = 'bg-emerald-100 text-emerald-800 border-emerald-300';
            borderStyle = isCurrent
              ? 'border-emerald-500 bg-emerald-50/50 text-emerald-950 ring-2 ring-emerald-500/20 shadow-xs'
              : 'border-slate-200 bg-white text-slate-800 hover:border-slate-300';
          } else if (state === 'RUNNING') {
            badgeBg = 'bg-blue-500 text-white border-blue-500 animate-pulse';
            borderStyle = 'border-blue-500 bg-blue-50 text-blue-900 shadow-xs ring-2 ring-blue-500/20';
          } else if (state === 'READY') {
            badgeBg = 'bg-amber-100 text-amber-800 border-amber-300 font-bold';
            borderStyle = isCurrent
              ? 'border-amber-500 bg-amber-50 text-amber-950 ring-2 ring-amber-500/20 shadow-xs'
              : 'border-amber-200 bg-amber-50/40 text-amber-900 hover:border-amber-300';
          } else {
            badgeBg = 'bg-slate-100 text-slate-400 border-slate-200';
            borderStyle = 'border-slate-200 bg-slate-50/50 text-slate-400 opacity-70';
          }

          return (
            <button
              key={s.num}
              type="button"
              disabled={!isClickable || isProcessing}
              onClick={() => onSelectStep(s.num)}
              className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition relative text-left ${borderStyle} ${
                isClickable && !isProcessing ? 'cursor-pointer hover:shadow-xs' : 'cursor-not-allowed'
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="font-bold text-[11px]">
                  0{s.num}
                </span>
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${badgeBg}`}>
                  {state === 'COMPLETE' ? (
                    <span className="flex items-center gap-0.5">
                      <Check className="w-2.5 h-2.5" />
                      {t.stateComplete}
                    </span>
                  ) : state === 'RUNNING' ? (
                    t.stateRunning
                  ) : state === 'READY' ? (
                    t.stateReady
                  ) : (
                    <span className="flex items-center gap-0.5">
                      <Lock className="w-2.5 h-2.5" />
                      {t.stateLocked}
                    </span>
                  )}
                </span>
              </div>
              <div className="font-bold text-xs truncate text-slate-900">
                {s.title}
              </div>
              <div className="text-[10px] text-slate-500 font-sans truncate mt-0.5">
                {s.desc}
              </div>
            </button>
          );
        })}
      </div>

      {/* Operator Guidance Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-2.5 rounded-lg bg-slate-900 text-slate-200 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
          <span className="text-slate-300 font-sans text-xs">
            <strong className="text-white font-mono">{language === 'RU' ? `ШАГ 0${currentStep}:` : `STEP 0${currentStep}:`}</strong> {nextAction.text}
          </span>
        </div>
        {nextAction.btnText && nextAction.onClick && (
          <button
            onClick={nextAction.onClick}
            disabled={isProcessing}
            className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] transition shrink-0 cursor-pointer shadow-xs disabled:opacity-50"
          >
            {nextAction.btnText}
          </button>
        )}
      </div>
    </div>
  );
};
