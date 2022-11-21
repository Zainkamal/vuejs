<script setup>
import ArticleList from "../components/ArticleList.vue";
</script>
<template>
  <Suspense>
    <template #default>
      <ArticleList />
    </template>
  </Suspense>
</template>
