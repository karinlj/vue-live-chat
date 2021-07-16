<template>
  <div class="chat-window">
    <div v-if="error">{{ error }}</div>
    <div v-if="docs" class="messages" ref="messages">
      <div v-for="doc in formattedDocuments" :key="doc.id" class="single">
        <span class="created-at">{{ doc.createdAt }}</span>
        <span class="name">{{ doc.name }}</span>
        <span class="message">{{ doc.message }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import getCollection from "../composables/getCollection";
import { formatDistanceToNow } from "date-fns";
import { computed, onUpdated, ref } from "@vue/runtime-core";
export default {
  setup() {
    //want docs and error
    const { error, docs } = getCollection("messages");
    const formattedDocuments = computed(() => {
      //docs.value??
      if (docs.value) {
        //return an array
        return docs.value.map((doc) => {
          let time = formatDistanceToNow(doc.createdAt.toDate());
          //spreading the props and overriding with time
          return { ...doc, createdAt: time };
        });
      }
    });
    //auto-scroll to bottom
    //this ref references the div with this ref on it
    const messages = ref(null);

    onUpdated(() => {
      //I want scrollTop = the height of the container...
      //scrollTop: 0 = at the top
      messages.value.scrollTop = messages.value.scrollHeight;
    });
    return { error, docs, formattedDocuments, messages };
  },
};
</script>

<style scoped>
.chat-window {
  background: #fafafa;
  padding: 30px 20px;
}
.single {
  margin: 18px 0;
}
.created-at {
  display: block;
  color: #999;
  font-size: 12px;
  margin-bottom: 4px;
}
.name {
  font-weight: bold;
  margin-right: 6px;
}
.messages {
  max-height: 400px;
  overflow: auto;
}
</style>
