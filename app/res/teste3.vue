<script setup>
import { parseMarkdown } from '#imports'

const route = useRoute()
const isPreview = computed(() => route.query.preview === 'true')
const path = 'formacao-detalhada'

// --- 1. FONTE ESTÁTICA (Rápida, funciona no build) ---
const { data: staticData } = await useAsyncData(`static-${path}`, () => 
  queryCollection('content').path(`/${path}`).first()
)

// --- 2. FONTE LIVE (Busca do disco para o Preview) ---
const liveData = ref(null)
const loadingLive = ref(false)

const fetchFromDisk = async () => {
  if (!isPreview.value) return
  loadingLive.value = true
  try {
    const data = await $fetch('/api/admin/storage', {
      params: { 
        site: 'paravyomayoga', 
        folder: 'content', 
        file: `${path}.md`,
        _v: Date.now() 
      }
    })
    if (data?.content) {
      liveData.value = await parseMarkdown(data.content)
    }
  } catch (e) {
    console.error("Erro no Live Preview:", e)
  } finally {
    loadingLive.value = false
  }
}

// Dispara a busca live apenas no cliente se o modo preview estiver ativo
onMounted(() => {
  if (isPreview.value) fetchFromDisk()
})

// --- 3. LÓGICA DE PRIORIDADE ---
// Se for preview e o dado do disco chegou, usa o Live. Senão, usa o estático.
const content = computed(() => {
  if (isPreview.value && liveData.value) return liveData.value
  return staticData.value
})

// SEO: Sempre baseado no dado estático para os bots de busca
useSeoMeta({
  title: staticData.value?.title,
  description: staticData.value?.description
})
</script>

<template>
  <div class="bg-gray-600 p-10 m-20">
    
    <div v-if="isPreview" class="mb-4 flex items-center justify-between border-b pb-2">
      <span class="text-[10px] font-bold text-red-500 uppercase tracking-widest">
        {{ liveData ? '● Live do Disco' : '○ Sincronizando...' }}
      </span>
      <button @click="fetchFromDisk" class="text-[10px] bg-gray-100 px-2 py-1 rounded">
        Recarregar Disco
      </button>
    </div>

    <div v-if="content">
      <ContentRenderer :value="content" />
    </div>
    
    <div v-else-if="loadingLive" class="animate-pulse italic text-slate-400">
      Carregando versão do disco...
    </div>
    
    <div v-else class="text-white">
      Página não encontrada.
    </div>
  </div>
</template>