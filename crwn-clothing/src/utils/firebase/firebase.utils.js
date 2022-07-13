

import { initializeApp } from "firebase/app"
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth"

import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    collection,
    writeBatch,
    query,
    getDocs
} from "firebase/firestore"



const firebaseConfig = {
    apiKey: "AIzaSyAQ9BWlsl6X7hLwL-RoZxaso8CB_9wXO-4",
    authDomain: "crwn-clothing-db-dcc8e.firebaseapp.com",
    projectId: "crwn-clothing-db-dcc8e",
    storageBucket: "crwn-clothing-db-dcc8e.appspot.com",
    messagingSenderId: "28665510791",
    appId: "1:28665510791:web:b2bed6e2a530b97adef122"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();


export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {

    const collectionRef = collection(db, collectionKey)
    const batch = writeBatch(db)

    objectsToAdd.forEach(object => {
        const docRef = doc(collectionRef, object.title.toLowerCase())
        batch.set(docRef, object)
    });

    await batch.commit();
    console.log("done")
}

export const getCollectionAndDocuments = async () => {
    const collectionRef = collection(db, "categories")
    const q = query(collectionRef)

    const querySnapshot = await getDocs(q)
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const { title, items } = docSnapshot.data()
        acc[title.toLowerCase()] = items
        return acc
    }, {})

    return categoryMap
}




export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {


    const userDocRef = doc(db, 'users', userAuth.uid)

    const userSnapshot = await getDoc(userDocRef);




    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth
        const createdAt = new Date()

        try {
            await setDoc(userDocRef, { displayName, email, createdAt, ...additionalInformation })
        } catch (error) {
            console.log("error creating the user", error.message);
        }

    }

    return userDocRef


}


export const createAuthUserWithEmailAndPassword = async (email, password) => {

    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password)


}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {

    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password)


}


export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListner = (callback) => onAuthStateChanged(auth, callback);