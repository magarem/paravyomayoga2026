<script setup lang="ts">
const { data: page, isPreview, status } =
  await useSmartContent('/formacao-detalhada')

useSeoMeta({
  title: page.value?.title,
  description: page.value?.description
})
</script>
<template>
  <div class="p-10 bg-gray-600">

    <div
      v-if="isPreview"
      class="mb-4 text-xs font-bold uppercase tracking-widest text-red-400"
    >
      Preview ativo — leitura direta do disco
    </div>

    <ContentRenderer v-if="page" :value="page" />

    <div v-else class="italic animate-pulse text-gray-300">
      Status: {{ status }}
    </div>

  </div>
</template>
