<template>
  <div class="container">
    <Navbar />
    <NewChatForm />
  </div>
</template>

<script>
//get current user using the getUser()
//watch current user for changes
//redirect user to Welcome page when logged out
import Navbar from "../components/Navbar.vue";
import getUser from "../composables/getUser";
import { watch } from "@vue/runtime-core";
import { useRouter } from "vue-router";
import NewChatForm from "../components/NewChatForm.vue";
export default {
  components: {
    Navbar,
    NewChatForm,
  },
  setup() {
    const { user } = getUser();
    const router = useRouter();
    //vue func when value changes
    watch(user, () => {
      //redirect if no user (=logged out)
      if (!user.value) {
        router.push({ name: "Welcome" });
      }
    });
  },
};
</script>

<style></style>
