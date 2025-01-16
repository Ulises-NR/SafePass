import { db } from "@/app/firebase/config";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";

type PasswordBody = {
  account?: string;
  notes?: string;
  password: string;
  title: string;
  user_id: string;
  username: string;
  website?: string;
};

const service = {
  async getPasswords(user_id: string) {
    const q = query(
      collection(db, "password-manager"),
      where("user_id", "==", user_id)
    );

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  },
  async addPassword(values: PasswordBody) {
    try {
      const collectionRef = collection(db, "password-manager");

      const docRef = await addDoc(collectionRef, {
        ...(values.account && { account: values.account }),
        ...(values.notes && { notes: values.notes }),
        password: values.password,
        title: values.title,
        user_id: values.user_id,
        username: values.username,
        ...(values.website && { website: values.website }),
      });

      return {
        id: docRef.id,
        ...values,
      };
    } catch (e) {
      throw e;
    }
  },
  async updatePassword(id: string, values: PasswordBody) {
    try {
      const docRef = doc(db, "password-manager", id);

      await updateDoc(docRef, {
        ...(values.account && { account: values.account }),
        ...(values.notes && { notes: values.notes }),
        password: values.password,
        title: values.title,
        user_id: values.user_id,
        username: values.username,
        ...(values.website && { website: values.website }),
      });

      const updatedDoc = await getDoc(docRef);

      return { id: updatedDoc.id, ...updatedDoc.data() };
    } catch (e) {
      throw e;
    }
  },
  async removePassword(id: string) {
    try {
      await deleteDoc(doc(db, "password-manager", id));
    } catch (e) {
      throw e;
    }
  },
};

export default service;
