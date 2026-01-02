import { marked } from 'marked'

export const useContentSource = async (path: string, isPreview: boolean = false) => {
  // 1. Iniciamos as chamadas IMEDIATAMENTE no topo
  // Isso garante que o Nuxt registre o uso dos composables no contexto correto
  
  const staticTask = useAsyncData(`${path}-static`, () => 
    queryCollection('content').path(`/${path}`).first()
  )

  const rawTask = useFetch('/api/get-raw-content', {
    query: { file: path },
    immediate: isPreview,
    key: `raw-${path}`
  })

  // 2. Agora sim podemos aguardar os resultados
  const [{ data: staticPage }, { data: rawData, refresh: refreshRaw }] = await Promise.all([
    staticTask,
    rawTask
  ])

  // 3. Processamento reativo
  const content = computed(() => {
    if (isPreview && rawData.value) {
      return {
        ...rawData.value.data,
        bodyHtml: marked.parse(rawData.value.content || '')
      }
    }
    
    const staticData = staticPage.value || {}
    const meta = staticData.meta || {}
    
    return {
      ...staticData,
      ...meta,
      bodyHtml: '' 
    }
  })

  return {
    content,
    staticPage,
    refreshRaw
  }
}