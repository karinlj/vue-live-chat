import { ref } from "vue";
import { projectAuth } from "../firebase/config";

const error = ref(null);

const logout = async () => {
  error.value = null;

  try {
    //firebase func
    await projectAuth.signOut();
  } catch (err) {
    console.log("err: ", err.message);
    error.value = err.message;
  }
};

const useLogout = () => {
  return { logout, error };
};
export default useLogout;
