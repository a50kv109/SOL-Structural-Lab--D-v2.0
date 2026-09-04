/**
 * SOL STRUCTURAL LAB v2.0
 * LABORATORY CANON — FROZEN
 * 
 * 4 CANONICAL PRIMITIVES
 * 1. OBJECT     — Entity observed in the system (e.g. ClientRequest, AuthModule, Router)
 * 2. RELATION   — Link/edge between OBJECTs (e.g. ClientRequest → AuthModule)
 * 3. CONSTRAINT — Invariant/rule holding the architecture (e.g. "Order of pipeline stages is fixed")
 * 4. STATE      — State transition lifecycle of an OBJECT (e.g. REQUEST_RECEIVED, AUTHENTICATED)
 */

export enum CanonPrimitiveKind {
  OBJECT = 'OBJECT',
  RELATION = 'RELATION',
  CONSTRAINT = 'CONSTRAINT',
  STATE = 'STATE',
}

export interface StructuralObject {
  id: string;
  name: string;
  kind: CanonPrimitiveKind.OBJECT;
  category: 'MODULE' | 'INTERFACE' | 'SERVICE' | 'DATA_STORE' | 'PIPELINE_NODE' | 'EXTERNAL_BOUNDARY';
  attributes?: Record<string, string | number | boolean>;
  sourceRef?: string;
}

export interface StructuralRelation {
  id: string;
  kind: CanonPrimitiveKind.RELATION;
  sourceObjectId: string;
  targetObjectId: string;
  type: 'CALLS' | 'DEPENDS_ON' | 'WRITES_TO' | 'READS_FROM' | 'PIPES_INTO' | 'CONSTRAINS';
  isSynchronous?: boolean;
}

export interface StructuralConstraint {
  id: string;
  kind: CanonPrimitiveKind.CONSTRAINT;
  name: string;
  expression: string;
  enforcementLevel: 'STRICT' | 'ADVISORY' | 'INVARIANT';
  affectsObjectIds: string[];
}

export interface StructuralState {
  id: string;
  kind: CanonPrimitiveKind.STATE;
  objectId: string;
  stateName: string;
  transitionTo?: string[];
}

export interface CanonicalSystemModel {
  id: string;
  name: string;
  description: string;
  objects: StructuralObject[];
  relations: StructuralRelation[];
  constraints: StructuralConstraint[];
  states: StructuralState[];
}
