<template>
  <div
    :class="['min-h-screen bg-gray-50', { 'preview-active': isPreviewMode }]"
  >

    <Carrossel />
    <div id="sobre" class="scroll-mt-14">
      <WelcomeSection :is-preview="isPreviewMode" />
    </div>

    <div id="beneficios" class="scroll-mt-14">
      <Beneficios source="beneficios" :is-preview="isPreviewMode" />
    </div>

    <div id="curso" class="scroll-mt-14">
      <CoursePage :is-preview="isPreviewMode" />
    </div>

    <div id="depoimentos" class="scroll-mt-14">
      <Depoimentos :is-preview="isPreviewMode" />
    </div>

    <div id="contato" class="scroll-mt-14">
      <ContactSection :is-preview="isPreviewMode" />
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const isPreviewMode = computed(() => "preview" in route.query);

useHead({
  title: isPreviewMode.value ? "[PREVIEW] Paravyoma Yoga" : "Paravyoma Yoga",
});
</script>

<style scoped>
/* Estilização da Barra */
.preview-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10000;
  background-color: #1c0855; /* orange-600 */
  color: white;
  text-align: center;
  padding: 8px 0; /* py-2 */
  font-size: 0.875rem; /* text-sm */
  font-weight: bold;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.exit-btn {
  text-decoration: underline;
  font-size: 0.75rem;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 4px 8px;
  border-radius: 4px;
  margin-left: 1rem;
}

/* O SEGREDO: Empurrar tudo para baixo */
.preview-active {
  /* Empurra o conteúdo normal */
  padding-top: 36px !important;
}

/* Empurra especificamente a Topbar (seja header ou nav) */
.preview-active :deep(header),
.preview-active :deep(nav),
.preview-active :deep(.fixed.top-0) {
  top: 36px !important;
}

/* Ajusta o scroll-margin para as âncoras não ficarem escondidas */
.preview-active div[id] {
  scroll-margin-top: 90px !important; /* Ajuste para compensar a barra + menu */
}
</style>
