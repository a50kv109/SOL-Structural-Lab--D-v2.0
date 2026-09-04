/**
 * SOL STRUCTURAL LAB v2.0
 * LABORATORY CANON — FROZEN
 * 
 * 4 CANONICAL OPERATORS (Applied exclusively in CONFIGURATION SEARCH mode)
 * 1. BIND   — Merge two objects into one composite object
 * 2. SPLIT  — Decompose one object into two distinct objects
 * 3. INSERT — Insert a new object between existing related objects
 * 4. DELETE — Remove an object and re-wire or prune adjacent relations
 */

import { CanonicalSystemModel, StructuralObject, StructuralRelation } from './primitives';

export enum CanonOperatorType {
  BIND = 'BIND',
  SPLIT = 'SPLIT',
  INSERT = 'INSERT',
  DELETE = 'DELETE',
}

export interface OperatorApplicationResult {
  operatorType: CanonOperatorType;
  targetIds: string[];
  resultingModel: CanonicalSystemModel;
  rationale: string;
  invariantsPreserved: boolean;
}

export class StructuralTransformationEngine {
  /**
   * BIND: Merge two objects into one
   */
  public static applyBind(
    model: CanonicalSystemModel,
    objectAId: string,
    objectBId: string,
    newMergedName: string
  ): OperatorApplicationResult {
    const objA = model.objects.find(o => o.id === objectAId);
    const objB = model.objects.find(o => o.id === objectBId);
    if (!objA || !objB) {
      throw new Error(`BIND operator failure: objects [${objectAId}, ${objectBId}] not found.`);
    }

    const mergedId = `merged_${objectAId}_${objectBId}`;
    const mergedObject: StructuralObject = {
      id: mergedId,
      name: newMergedName,
      kind: objA.kind,
      category: objA.category,
      attributes: { ...objA.attributes, ...objB.attributes, boundFrom: [objectAId, objectBId].join(',') },
    };

    const remainingObjects = model.objects.filter(o => o.id !== objectAId && o.id !== objectBId);
    remainingObjects.push(mergedObject);

    // Re-map relations
    const updatedRelations: StructuralRelation[] = model.relations.map(rel => {
      let source = rel.sourceObjectId;
      let target = rel.targetObjectId;
      if (source === objectAId || source === objectBId) source = mergedId;
      if (target === objectAId || target === objectBId) target = mergedId;
      return { ...rel, sourceObjectId: source, targetObjectId: target };
    }).filter(rel => rel.sourceObjectId !== rel.targetObjectId); // Remove self-loops created by bind

    return {
      operatorType: CanonOperatorType.BIND,
      targetIds: [objectAId, objectBId],
      resultingModel: {
        ...model,
        objects: remainingObjects,
        relations: updatedRelations,
      },
      rationale: `Bound objects [${objA.name}] and [${objB.name}] into unified node [${newMergedName}]`,
      invariantsPreserved: true,
    };
  }

  /**
   * SPLIT: Decompose one object into two distinct objects
   */
  public static applySplit(
    model: CanonicalSystemModel,
    targetObjectId: string,
    partAName: string,
    partBName: string
  ): OperatorApplicationResult {
    const targetObj = model.objects.find(o => o.id === targetObjectId);
    if (!targetObj) {
      throw new Error(`SPLIT operator failure: object [${targetObjectId}] not found.`);
    }

    const partAId = `${targetObjectId}_partA`;
    const partBId = `${targetObjectId}_partB`;

    const partA: StructuralObject = {
      id: partAId,
      name: partAName,
      kind: targetObj.kind,
      category: targetObj.category,
      attributes: { ...targetObj.attributes, splitRole: 'PartA' },
    };

    const partB: StructuralObject = {
      id: partBId,
      name: partBName,
      kind: targetObj.kind,
      category: targetObj.category,
      attributes: { ...targetObj.attributes, splitRole: 'PartB' },
    };

    const remainingObjects = model.objects.filter(o => o.id !== targetObjectId);
    remainingObjects.push(partA, partB);

    // Create relation between parts
    const splitRel: StructuralRelation = {
      id: `rel_${partAId}_to_${partBId}`,
      kind: targetObj.kind as any,
      sourceObjectId: partAId,
      targetObjectId: partBId,
      type: 'PIPES_INTO',
    };

    const updatedRelations: StructuralRelation[] = model.relations.map(rel => {
      let source = rel.sourceObjectId;
      let target = rel.targetObjectId;
      if (source === targetObjectId) source = partAId;
      if (target === targetObjectId) target = partBId;
      return { ...rel, sourceObjectId: source, targetObjectId: target };
    });
    updatedRelations.push(splitRel);

    return {
      operatorType: CanonOperatorType.SPLIT,
      targetIds: [targetObjectId],
      resultingModel: {
        ...model,
        objects: remainingObjects,
        relations: updatedRelations,
      },
      rationale: `Split object [${targetObj.name}] into [${partAName}] and [${partBName}]`,
      invariantsPreserved: true,
    };
  }

  /**
   * INSERT: Insert new object between two linked objects
   */
  public static applyInsert(
    model: CanonicalSystemModel,
    sourceObjectId: string,
    targetObjectId: string,
    insertedName: string,
    insertedCategory: StructuralObject['category']
  ): OperatorApplicationResult {
    const insertedId = `inserted_${Date.now()}`;
    const insertedObject: StructuralObject = {
      id: insertedId,
      name: insertedName,
      kind: model.objects[0]?.kind || ('OBJECT' as any),
      category: insertedCategory,
    };

    const objects = [...model.objects, insertedObject];

    // Replace direct relation with two relations: source -> inserted -> target
    const remainingRelations = model.relations.filter(
      r => !(r.sourceObjectId === sourceObjectId && r.targetObjectId === targetObjectId)
    );

    remainingRelations.push(
      {
        id: `rel_${sourceObjectId}_${insertedId}`,
        kind: insertedObject.kind as any,
        sourceObjectId,
        targetObjectId: insertedId,
        type: 'PIPES_INTO',
      },
      {
        id: `rel_${insertedId}_${targetObjectId}`,
        kind: insertedObject.kind as any,
        sourceObjectId: insertedId,
        targetObjectId,
        type: 'PIPES_INTO',
      }
    );

    return {
      operatorType: CanonOperatorType.INSERT,
      targetIds: [sourceObjectId, targetObjectId],
      resultingModel: {
        ...model,
        objects,
        relations: remainingRelations,
      },
      rationale: `Inserted intermediary node [${insertedName}] between [${sourceObjectId}] and [${targetObjectId}]`,
      invariantsPreserved: true,
    };
  }

  /**
   * DELETE: Remove object from structure
   */
  public static applyDelete(model: CanonicalSystemModel, objectId: string): OperatorApplicationResult {
    const targetObj = model.objects.find(o => o.id === objectId);
    if (!targetObj) {
      throw new Error(`DELETE operator failure: object [${objectId}] not found.`);
    }

    const objects = model.objects.filter(o => o.id !== objectId);
    const relations = model.relations.filter(
      r => r.sourceObjectId !== objectId && r.targetObjectId !== objectId
    );

    return {
      operatorType: CanonOperatorType.DELETE,
      targetIds: [objectId],
      resultingModel: {
        ...model,
        objects,
        relations,
      },
      rationale: `Deleted object [${targetObj.name}] and pruned connected edges`,
      invariantsPreserved: true,
    };
  }
}
