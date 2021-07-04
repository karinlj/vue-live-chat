import { ref } from "@vue/reactivity";
import { projectFirestore } from "../firebase/config";

const useCollection = () => {
  //here: inside because we might use different collections each with own error
  //every time we use the func we get a different error object
  const error = ref();
};
export default useCollection;
