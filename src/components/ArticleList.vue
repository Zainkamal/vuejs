<script>
import { reactive, toRefs } from "vue";

export default {
  async setup() {
    const data = reactive({
      list: [],
    });

    const result = await fetch("https://jsonplaceholder.typicode.com/posts");
    data.list = await result.json();
    // console.log("data", data);
    return { ...toRefs(data) };
  },
};
</script>
<template>
  <ul v-for="(item, index) in list" :key="index">
    <li>
      <h3>
        <router-link :to="`/artikel/${item.id}`">{{ item.title }}</router-link>
      </h3>
      <p>{{ item.body }}</p>
    </li>
  </ul>
</template>
