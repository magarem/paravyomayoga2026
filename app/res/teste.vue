<script setup>
// Forçamos a importação do parser que transforma texto em árvore AST
import { parseMarkdown } from '#imports'

const props = defineProps({
  isPreview: { type: Boolean, default: true } // Forçamos true para o teste
})

const path = 'formacao-detalhada'
const liveData = ref(null)

// 1. A BUSCA BRUTA (O que a API vê)
const fetchFromDisk = async () => {
  try {
    // Chamada pura de rede, sem useFetch para não ter cache do Nuxt
    const data = await $fetch('/api/admin/storage', {
      params: { 
        site: 'paravyomayoga', 
        folder: 'content', 
        file: `${path}.md`,
        _v: Date.now() // Versão única para ignorar cache de rede
      }
    })

    if (data?.content) {
      // Transformamos a string que a API leu do disco em objeto AST
      liveData.value = await parseMarkdown(data.content)
      console.log("🚀 API leu do disco com sucesso!")
    }
  } catch (e) {
    console.error("❌ Erro ao ler da API no componente:", e)
  }
}

// Executa ao carregar a página
onMounted(() => {
  fetchFromDisk()
})
</script>

<template>
  <div class="p-8 bg-white text-black">
    <h1 class="text-xs font-bold text-red-500 mb-4 uppercase tracking-widest">
      Status: {{ liveData ? 'Lido do Disco' : 'Carregando...' }}
    </h1>

    <div v-if="liveData">
      <ContentRenderer :value="liveData" />
    </div>
    
    <div v-else class="animate-pulse italic text-slate-400">
      Sincronizando com o Sirius Studio...
    </div>
  </div>
</template>