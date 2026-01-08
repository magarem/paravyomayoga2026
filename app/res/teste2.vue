<script setup lang="ts">
const { data: home } = await useAsyncData(() => queryCollection('content').path('/formacao-detalhada').first())

useSeoMeta({
  title: home.value?.title,
  description: home.value?.description
})
</script>

<template>
  <div class="bg-gray-600 p-10 m-20">
  <ContentRenderer v-if="home" :value="home" />
  <div v-else>Home not found</div>
  </div>

</template>