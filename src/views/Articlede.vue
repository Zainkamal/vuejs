<script setup>
import Articledetail from "../components/Articledetail.vue";
</script>
<template>
  <Suspense>
    <template #default>
      <Articledetail />
    </template>
  </Suspense>
</template>
