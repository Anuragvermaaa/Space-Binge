import { initializeApp } from "firebase/app";
 import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
 
const firebaseConfig = {
  apiKey: "AIzaSyCHFr5Ksn4kP0xm39OiTUeEvpAudrL7Ewc",
  authDomain: "netflix-clone-6dd91.firebaseapp.com",
  projectId: "netflix-clone-6dd91",
  storageBucket: "netflix-clone-6dd91.firebasestorage.app",
  messagingSenderId: "397640499494",
  appId: "1:397640499494:web:efa4b113880a4af480c1e7"
};

 
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
try {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  const user = res.user;
  await addDoc(collection(db, "user"), {
    uid: user.uid,
    name,
    authProvider: "local",
    email,
  });
} catch (error) {
  console.log(error)
  toast.error(error.code.split('/')[1].split('-').join(" "));
}
}

const login = async (email, password)=>{
  try {
    await signInWithEmailAndPassword(auth, email, password);

  } catch (error) {
   console.log(error);
   toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}

const logout = ()=>{
  signOut(auth);
}

export {auth, db, login, signup, logout};