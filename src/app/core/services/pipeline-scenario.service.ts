import { Injectable } from '@angular/core';

import {
  collection,
  doc,
  docData,
  DocumentReference,
  CollectionReference,
  Firestore,
  onSnapshot,
  query,
  where,
  Unsubscribe,
  Query,
  DocumentData,
  collectionData,
  collectionChanges,
  docSnapshots,
  orderBy,
  serverTimestamp,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { SCENARIOS_COLLECTION } from '../models/firebase-collections.model';
import { PipelineScenarioInstance } from '../models/scenarios.model';
@Injectable({
  providedIn: 'root',
})
export class PipelineScenarioService {
  constructor(private afs: Firestore) {}

  getAll(): Observable<PipelineScenarioInstance[]> {
    // Describe the collection
    const pipelineCollection = collection(
      this.afs,
      SCENARIOS_COLLECTION
    ) as CollectionReference<PipelineScenarioInstance>;

    // Specify order to get data
    const q = query(pipelineCollection, orderBy('created', 'asc'));

    // Get the collection according to the query
    return collectionData<PipelineScenarioInstance>(q);
  }

  createOne(scenario: Partial<PipelineScenarioInstance>): void {
    const timestamp = serverTimestamp();
  }
}
