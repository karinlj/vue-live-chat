import { ref, watchEffect } from "vue";
import { projectFirestore } from "../firebase/config";

//get docs from the collection
const getCollection = (collection) => {
  const docs = ref();
  const error = ref();

  let collectionRef = projectFirestore
    .collection(collection)
    .orderBy("createdAt");
  //a snap for every change
  //function unSub...???
  const unSub = collectionRef.onSnapshot(
    (snap) => {
      console.log("snapshot");
      let results = [];
      snap.docs.forEach((doc) => {
        console.log("doc.data: ", doc.data());
        //if code on the left of && is true, the code on the right will execute
        doc.data().createdAt && results.push({ ...doc.data(), id: doc.id });
      });

      docs.value = results;
      error.value = null;
    },
    //callback if error
    (err) => {
      console.log("err.message: ", err.message);
      docs.value = null;
      error.value = "Could not fetch data";
    }
  );
  console.log("docs: ", docs);

  watchEffect((onInvalidate) => {
    //I want to unsubscribe from the the collection when onInvalidate() changes i.e when the component unmounts
    onInvalidate(() => unSub());
  });
  return { error, docs };
};
export default getCollection;
