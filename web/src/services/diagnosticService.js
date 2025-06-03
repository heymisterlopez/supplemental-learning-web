// web/src/services/diagnosticService.js
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

/**
 * Saves a diagnostic entry for a given userId & childId
 * @param {string} userId
 * @param {string} childId
 * @param {{ readingLevel: number, writingLevel: number, mathLevel: number, takenAt: Date }} diagnostic
 */
export async function saveDiagnostic(userId, childId, diagnostic) {
  // Each diagnostic is its own document in the subcollection “diagnostics”
  const diagColRef = collection(
    db,
    "users",
    userId,
    "children",
    childId,
    "diagnostics"
  );
  // Firestore’s addDoc auto-generates an ID
  await addDoc(diagColRef, {
    readingLevel: diagnostic.readingLevel,
    writingLevel: diagnostic.writingLevel,
    mathLevel: diagnostic.mathLevel,
    takenAt: diagnostic.takenAt,
  });
}
