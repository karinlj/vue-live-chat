import { ref } from "vue";
import { projectAuth } from "../firebase/config";

const error = ref(null);

//firebase function
const login = async (email, password) => {
  //reset
  error.value = null;
  try {
    // console.log("email: ", email);
    //firebase trying to login the user
    const response = await projectAuth.signInWithEmailAndPassword(
      email,
      password
    );
    // if (!response) { ?????????
    //   throw new Error("Could not login");
    // }
    //reset again
    error.value = null;
    console.log("response: ", response);
    return response;
  } catch (err) {
    console.log("err: ", err.message);
    error.value = "Incorrect login credentials";
  }
};

const useLogin = () => {
  return { login, error };
};
export default useLogin;
