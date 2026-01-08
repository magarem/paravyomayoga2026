<template>
  <div v-if="content">
    
    <div v-if="isPreview" class="fixed bottom-6 right-6 z-50 animate-bounce">
      <button 
        @click="refresh" 
        class="flex items-center gap-2 bg-[#6f942e] text-white px-5 py-3 rounded-full shadow-2xl hover:scale-105 transition-all font-bold text-xs uppercase tracking-widest"
      >
        <i :class="['pi pi-sync', { 'pi-spin': isSyncing }]"></i>
        {{ isSyncing ? 'Sincronizando...' : 'Sirius Live Active' }}
      </button>
    </div>

    <main :class="['transition-opacity duration-300', isSyncing ? 'opacity-40' : 'opacity-100']">
      
      <section class="bg-[#f1f3e9] py-20">
        <div class="container mx-auto px-4 max-w-5xl">
          <h1 class="text-5xl font-serif text-[#4a3728] mb-8">{{ content.title }}</h1>
          
          <div class="prose prose-stone max-w-none mb-12">
            <ContentRenderer :value="content" />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
             <div class="bg-white p-4 rounded-xl shadow-sm border border-[#4a3728]/5">
                <span class="text-[10px] uppercase font-bold text-slate-400 block mb-1">Carga Horária</span>
                <span class="font-serif text-[#4a3728]">{{ content.cargaHoraria }}</span>
             </div>
             </div>
        </div>
      </section>

    </main>
  </div>

  <div v-else class="h-screen flex flex-col items-center justify-center bg-[#f1f3e9]">
    <i class="pi pi-spin pi-spinner text-2xl text-[#6f942e] mb-4"></i>
    <p class="font-serif italic text-slate-500">Acessando Sirius Studio...</p>
  </div>
</template>

<script setup>
// Agora basta chamar o composable. 
// Ele já sabe o path e detecta sozinho se é preview via URL.
const { content, isPreview, isSyncing, refresh } = await useSiriusContent('formacao-detalhada')

// SEO baseado no conteúdo estático (indexado)
useSeoMeta({
  title: content.value?.title || 'Formação Paravyoma',
  description: content.value?.description || 'Descrição do curso'
})
</script>

<style scoped>
.prose :deep(strong) { color: #6f942e; }
.prose :deep(p) { line-height: 1.8; margin-bottom: 1.2rem; }
</style>