import { ref } from "@vue/reactivity";
import { projectFirestore } from "../firebase/config";

//to do something with the collection
const useCollection = (collection) => {
  //here: error-ref inside because we might use different collections each with own error
  //every time we use the func we get a different error object
  const error = ref();

  //add doc to the collection
  const addDoc = async (doc) => {
    //console.log("doc: ", doc);
    error.value = null;

    try {
      //try to connect and add
      await projectFirestore.collection(collection).add(doc);
    } catch (err) {
      console.log("err.message: ", err.message);
      error.value = "Could not send the message";
    }
  };
  return { error, addDoc };
};
export default useCollection;
