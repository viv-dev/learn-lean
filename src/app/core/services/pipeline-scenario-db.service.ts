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
  setDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import { addDoc } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { SCENARIOS_COLLECTION } from '../models/firebase-collections.model';
import { PipelineScenarioInstance } from '../models/scenarios.model';
@Injectable({
  providedIn: 'root',
})
export class PipelineScenarioDbService {
  constructor(private afs: Firestore) {}

  getAll(): Observable<PipelineScenarioInstance[]> {
    // Describe the collection
    const pipelineCollection = collection(
      this.afs,
      SCENARIOS_COLLECTION
    ) as CollectionReference<PipelineScenarioInstance>;

    // Specify order to get data
    const collectionQuery = query(
      pipelineCollection,
      orderBy('dateCreated', 'asc')
    );

    // Get the collection according to the query
    return collectionData<PipelineScenarioInstance>(collectionQuery, {
      idField: 'id',
    });
  }

  createOne(scenario: PipelineScenarioInstance): Promise<string> {
    const timestamp = serverTimestamp();
    scenario.dateCreated = timestamp;

    return addDoc(collection(this.afs, SCENARIOS_COLLECTION), scenario).then(
      (ref) => ref.id
    );
  }

  getOne(id: string): Observable<PipelineScenarioInstance> {
    const docRef = doc(
      this.afs,
      SCENARIOS_COLLECTION,
      id
    ) as DocumentReference<PipelineScenarioInstance>;

    return docData(docRef, { idField: 'id' });
  }

  updateOne(scenario: Partial<PipelineScenarioInstance>): void {
    if (scenario.id) {
      const docRef = doc(
        this.afs,
        SCENARIOS_COLLECTION,
        scenario.id
      ) as DocumentReference<PipelineScenarioInstance>;

      setDoc(docRef, scenario, { merge: true });
    }
  }

  replaceOne(scenario: PipelineScenarioInstance): void {
    if (scenario.id) {
      const docRef = doc(
        this.afs,
        SCENARIOS_COLLECTION,
        scenario.id
      ) as DocumentReference<PipelineScenarioInstance>;

      setDoc(docRef, scenario);
    }
  }

  deleteOne(scenario: Partial<PipelineScenarioInstance>): void {
    if (scenario.id) {
      const docRef = doc(
        this.afs,
        SCENARIOS_COLLECTION,
        scenario.id
      ) as DocumentReference<PipelineScenarioInstance>;

      deleteDoc(docRef);
    }
  }
}
