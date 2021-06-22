import { ref } from "vue";
import { projectAuth } from "../firebase/config";

const error = ref(null);

//firebase function
const signup = async (email, password, displayName) => {
  //reset
  error.value = null;
  try {
    // console.log("email: ", email);
    //firebase trying to sign up the user
    const response = await projectAuth.createUserWithEmailAndPassword(
      email,
      password
    );
    if (!response) {
      throw new Error("Could not compleate the signup");
    }
    //update user after signup
    await response.user.updateProfile({ displayName });
    //reset again
    error.value = null;
    //response.user gives an object
    // console.log("response.user: ", response.user);
    return response;
  } catch (err) {
    console.log("err: ", err.message);
    error.value = err.message;
  }
};

const useSignup = () => {
  return { signup, error };
};
export default useSignup;
