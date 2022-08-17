
import Shopify from '@shopify/shopify-api';
import { initializeApp } from 'firebase/app'
import { doc, getDoc, getFirestore, setDoc, deleteDoc } from 'firebase/firestore'

const fbApp = initializeApp({
    apiKey: "AIzaSyBVbUajosWuWo6RDhcwarsoFb5vQULdm50",
    authDomain: "shopify-recharge-352914.firebaseapp.com",
    projectId: "shopify-recharge-352914",
    storageBucket: "shopify-recharge-352914.appspot.com",
    messagingSenderId: "282916076195",
    appId: "1:282916076195:web:5f4863d335fd2394ff5d16",
    measurementId: "G-3LFMNFVE5Y"
});

const db = getFirestore(fbApp);

export default class firestoreSessionDB {
    /*
    The storeCallback takes in the Session, and sets it in Firestore
    This callback is used for BOTH saving new Sessions and updating existing Sessions
    Returns a Firebase write result if the session can be stored
    */
   async storeCallback(session)  {
        console.log(`\n\n\nCustom session storage storeCallback fired with session`, session);
        try {
            if (session) {
                console.log(`\n\n\n =========== SESSION =========\n\n\n`);
                const docRef = doc(db, 'app-sessions', `${session.id}`);
                await setDoc(docRef, await JSON.parse(JSON.stringify(session)), { merge: true });
                return true;
            } else {
                console.log(`\n\n\n =========== OTHER =========\n\n\n `);
                const docRef = doc(db, 'app-sessions', `ERROR: `);
                await setDoc(docRef, await JSON.parse(JSON.stringify({id: "FAKE_ID"})), { merge: true });
                return false;
            }
        } catch (err) {
            throw new Error(err);
        }
    };
    
    /*
        The loadCallback takes in the session.id, and tries to retrieve the session data from Firestore
        If a stored session exists, it's returned
        Otherwise, return undefined
        */
    async loadCallback (sessionID) {
        console.log(`\n\n\nCustom session storage loadCallback fired with id`, sessionID);
        try {
            const docRef = doc(db, "app-sessions",`${sessionID}`);
            const docSnap = await getDoc(docRef);

            if (!sessionID) {
                return undefined;
            }
            else {
                if (docSnap.exists()) {
                    console.log("Document data:", docSnap.data());
                    const session = docSnap.data();
                    const example = await JSON.parse(JSON.stringify(session));
                    return new Object({
                        ...example,
                        isActive: () => {
                            if (example?.accessToken) return true
                        }
                    }); //Shopify.Session.Session.cloneSession(example, example.id);
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                    return undefined;
                }  
            } 
        } catch (err) {
            throw new Error(err);
        }
    };
    
    /*
        The deleteCallback takes in the session.id, and attempts to delete the session from Firestore
        If the session can be deleted, return true,
        otherwise, return false
        */
    async deleteCallback(sessionID) {
        console.log(`\n\n\nCustom session storage deleteCallback fired with id id`, sessionID);
        try {
            const docRef = doc(db, "app-sessions",`${sessionID}`);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                await deleteDoc(docRef);
                return true;
            } else {
                console.log("No such document!");
                return false;
            }   
        } catch (err) {
            throw new Error(err);
        }
    };

    /*
    The findSessionByShopCallback takes in the session.shop, and attempts to delete the session from Firestore
    If the session can be deleted, return true,
    otherwise, return false
    */
    async findSessionsByShopCallback(shop) {
        console.log(`Custom session storage findSessionsByShop fired with Shop: `, shop);
        try {
            const docRef = doc(db, "app-sessions",`offline_${shop}`);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                const session = docSnap.data();
                const example = await JSON.parse(JSON.stringify(session));
                return [ new Object({
                    ...example,
                    isActive: () => {
                        if (example?.accessToken) return true
                    }
                })];
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                return undefined;
            }   
        } catch (err) {
            throw new Error(err);
        }
    }

    /*
    The deleteCallback takes in the session, and attempts to delete the session from Firestore
    If the session can be deleted, return true,
    otherwise, return false
    */
    async deleteSessionsCallback(sessionIDs) {
        console.log(`\n\n\nCustom session storage deleteCallback fired with id id`, sessionIDs);
        try {
            const docRef = doc(db, "app-sessions",`${sessionIDs[0]}`);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                await deleteDoc(docRef);
                return true;
            } else {
                console.log("No such document!");
                return false;
            }   
        } catch (err) {
            throw new Error(err);
        }
    };

}
;