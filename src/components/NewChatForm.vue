<template>
  <form>
    <textarea
      placeholder="Type a message and hit Enter to send."
      v-model="message"
      @keypress.enter.prevent="handleSubmit"
    ></textarea>
    <div class="error">{{ error }}</div>
  </form>
</template>

<script>
import { ref } from "@vue/reactivity";
import getUser from "../composables/getUser";
import useCollection from "../composables/useCollection";
import { timestamp } from "../firebase/config";
export default {
  setup() {
    const message = ref("");
    const { user } = getUser();
    //specify the collection
    const { error, addDoc } = useCollection("messages");

    const handleSubmit = async () => {
      const chat = {
        message: message.value,
        name: user.value.displayName,
        createdAt: timestamp(),
      };

      //specify the doc
      await addDoc(chat);
      console.log("chat: ", chat);
      //reset
      if (!error.value) {
        message.value = "";
      }
    };

    return { message, handleSubmit, error };
  },
};
</script>

<style scoped>
form {
  margin: 10px;
}
textarea {
  width: 100%;
  max-width: 100%;
  margin-bottom: 6px;
  padding: 10px;
  box-sizing: border-box;
  border: 0;
  border-radius: 20px;
  font-family: inherit;
  outline: none;
}
</style>
