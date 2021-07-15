import { ref } from "vue";
import { projectAuth } from "../firebase/config";

//read who is current user
//on first load: if logged in: currentUser, otherwise: null
const user = ref(projectAuth.currentUser);

//read logn changes
projectAuth.onAuthStateChanged((myuser) => {
  //callback func as arg
  // console.log("user state change. Current user is: ", myuser);
  user.value = myuser;
});

const getUser = () => {
  return { user };
};
export default getUser;
