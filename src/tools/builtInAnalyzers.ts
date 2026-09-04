/**
 * SOL STRUCTURAL LAB v2.0
 * BUILT-IN VERIFIED ANALYZERS
 * 
 * Implements deterministic analyzers for structural profiling, invariant discovery, and architectural decomposition.
 */

import { LaboratoryExecutor, ToolContext } from '../pipeline/executor';
import { SourceCodeAnalyzer } from './sourceCodeAnalyzer';

export class BuiltInAnalyzers {
  public static initialize() {
    // 1. Deterministic Source-Structure Analyzer
    LaboratoryExecutor.registerToolHandler('tool_structural_analyzer', async (ctx: ToolContext) => {
      const files = ctx.files || [];

      if (files.length === 0 && !ctx.rawText) {
        return {
          rawPayload: {
            analyzer: 'tool_structural_analyzer',
            target: ctx.objectId,
            status: 'EMPTY_INPUT',
            nodeCount: 0,
            nodes: [],
            edgeCount: 0,
            edges: [],
            isStub: false,
            timestamp: Date.now(),
          },
          stdout: `No files available to analyze for target '${ctx.objectId}'.`,
        };
      }

      const analysis = SourceCodeAnalyzer.analyzeRepositoryStructure(files);

      return {
        rawPayload: {
          analyzer: 'tool_structural_analyzer',
          version: '2.0.0-deterministic',
          target: ctx.objectId,
          isStub: false,
          summary: analysis.summary,
          nodeCount: analysis.nodes.length,
          nodes: analysis.nodes,
          edgeCount: analysis.edges.length,
          edges: analysis.edges,
          fileAnalyses: analysis.fileAnalyses.map(f => ({
            filePath: f.filePath,
            language: f.language,
            lineCount: f.lineCount,
            sizeBytes: f.sizeBytes,
            nodeCount: f.nodes.length,
          })),
          timestamp: Date.now(),
        },
        stdout: `Decomposed ${analysis.summary.totalFiles} files into ${analysis.nodes.length} structural nodes (Classes: ${analysis.summary.totalClasses}, Functions: ${analysis.summary.totalFunctions}, Imports: ${analysis.summary.totalImports}, Calls: ${analysis.summary.totalCalls}) with ${analysis.edges.length} dependency edges for target '${ctx.objectId}'.`,
      };
    });

    // 2. Deterministic Invariant Discovery Analyzer
    LaboratoryExecutor.registerToolHandler('tool_invariant_discovery', async (ctx: ToolContext) => {
      const files = ctx.files || [];

      if (files.length === 0 && !ctx.rawText) {
        return {
          rawPayload: {
            analyzer: 'tool_invariant_discovery',
            target: ctx.objectId,
            status: 'EMPTY_INPUT',
            discoveredInvariantsCount: 0,
            invariants: [],
            isStub: false,
            timestamp: Date.now(),
          },
          stdout: `No files available to discover invariants for target '${ctx.objectId}'.`,
        };
      }

      const discoveredInvariants = SourceCodeAnalyzer.discoverInvariants(files);

      return {
        rawPayload: {
          analyzer: 'tool_invariant_discovery',
          version: '2.0.0-deterministic',
          target: ctx.objectId,
          isStub: false,
          discoveredInvariantsCount: discoveredInvariants.length,
          invariants: discoveredInvariants,
          summaryByClassification: {
            architecturalInvariants: discoveredInvariants.filter(i => i.classification === 'ARCHITECTURAL_INVARIANT').length,
            boundaryConstraints: discoveredInvariants.filter(i => i.classification === 'BOUNDARY_CONSTRAINT').length,
            sharedStateHazards: discoveredInvariants.filter(i => i.classification === 'SHARED_STATE').length,
            exceptionContracts: discoveredInvariants.filter(i => i.classification === 'EXCEPTION_CONTRACT').length,
            unsupportedInferenceHeuristics: discoveredInvariants.filter(i => i.classification === 'UNSUPPORTED_INFERENCE_HEURISTIC').length,
            promptTemplatePresets: discoveredInvariants.filter(i => i.classification === 'PROMPT_TEMPLATE_PRESET').length,
          },
          timestamp: Date.now(),
        },
        stdout: `Discovered ${discoveredInvariants.length} structural invariants and constraints for '${ctx.objectId}'.`,
      };
    });
  }
}

// Auto-initialize built-in analyzers
BuiltInAnalyzers.initialize();

