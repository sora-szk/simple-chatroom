import * as admin from 'firebase-admin'

export const firestoreFactory = (): FirebaseFirestore.Firestore => admin.app().firestore()
