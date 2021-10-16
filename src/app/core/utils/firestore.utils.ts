export function MapDocSnap<T>(snap) {
  return { id: snap.payload.id, ...snap.payload.data() };
}

export function MapCollectionSnaps<T>(snaps) {
  return snaps.map((snap) => {
    return { id: snap.payload.doc.id, ...snap.payload.doc.data() };
  }) as T[];
}
