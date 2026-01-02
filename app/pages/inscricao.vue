<script setup>
const props = defineProps({ isPreview: { type: Boolean, default: false } })
const { content } = await useContentSource('inscricao-yogaterapia', props.isPreview)

// ESTADOS
const etapaAtual = ref(1)
const loading = ref(false)
const submetido = ref(false)

const formData = ref({
  nome: '', email: '', whatsapp: '',
  nascimento: '', cpf: '', endereco: '',
  metodoPagamento: 'pix'
})

// NAVEGAÇÃO
const proximaEtapa = () => { etapaAtual.value++ }
const voltarEtapa = () => { etapaAtual.value-- }

// ENVIO PARA API
const finalizarInscricao = async () => {
  loading.value = true
  try {
    const { data, error } = await useFetch('/api/registrar-inscricao', {
      method: 'POST',
      body: formData.value
    })
    if (error.value) throw new Error(error.value.message)
    if (data.value?.success) submetido.value = true
  } catch (err) {
    alert('Erro ao processar. Tente novamente.')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main v-if="content" class="min-h-screen bg-[#fdfcf0] py-16 relative overflow-hidden text-[#2d241e]">
<div class="mb-7 text-center">
    <div class="absolute -top-[500px] left-1/2 -translate-x-1/2 opacity-[0.05] z-0 pointer-events-none">
      <img src="/images/mandala_fundo.jpg" class="w-[1200px] animate-spin-slow" />
    </div>
        <h1 class="text-5xl md:text-5xl font-serif text-[#4a3728] mb-6 leading-tight">
          {{ content.title }}
        </h1>
        <p class="text-1xl text-[#5d4a3a] font-medium italic mb-10 max-w-4xl mx-auto">
          {{ content.subtitle }}
        </p>
    </div>
    <div class="container mx-auto px-4 max-w-2xl relative z-10">
      
      <!-- <div v-if="!submetido" class="flex justify-center gap-4 mb-10">
        <div v-for="i in 3" :key="i" 
          :class="['h-2 w-16 rounded-full transition-all duration-500', etapaAtual >= i ? 'bg-[#4a3728]' : 'bg-stone-300']">
        </div>
      </div> -->

      <header class="text-center mb-10">
        <!-- <h1 class="text-4xl font-serif text-[#4a3728] mb-2">{{ content.title }}</h1> -->
        <p v-if="!submetido" class="font-black text-stone-500 uppercase tracking-[0.2em] text-[10px]">
          Passo {{ etapaAtual }} de 3
        </p>
      </header>

      <div class="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-[#4a3728]/10 min-h-[500px]">
        
        <div v-if="!submetido">
          <div v-if="etapaAtual === 1" class="flex flex-col gap-6 animate-fade-in">
            <div v-for="campo in content.etapa_1" :key="campo.name" class="flex flex-col gap-2">
              <label class="font-black text-[#4a3728] text-sm uppercase">{{ campo.label }}</label>
              <InputText v-model="formData[campo.name]" class="custom-input" :placeholder="campo.label" />
            </div>
            <Button label="PRÓXIMO" icon="pi pi-chevron-right" iconPos="right" @click="proximaEtapa" 
              class="bg-[#4a3728] text-white border-none py-5 rounded-xl mt-4 font-black tracking-widest" />
          </div>

          <div v-if="etapaAtual === 2" class="flex flex-col gap-6 animate-fade-in">
            <div v-for="campo in content.etapa_2" :key="campo.name" class="flex flex-col gap-2">
              <label class="font-black text-[#4a3728] text-sm uppercase">{{ campo.label }}</label>
              <InputText v-model="formData[campo.name]" class="custom-input" :placeholder="campo.label" />
            </div>
            <div class="grid grid-cols-2 gap-4 mt-4">
              <Button label="VOLTAR" @click="voltarEtapa" class="p-button-text text-stone-500 font-bold" />
              <Button label="PRÓXIMO" @click="proximaEtapa" class="bg-[#4a3728] text-white border-none py-5 rounded-xl font-black tracking-widest" />
            </div>
          </div>

          <div v-if="etapaAtual === 3" class="flex flex-col gap-5 animate-fade-in">
            <div class="bg-amber-50 border-2 border-amber-200 p-5 rounded-2xl">
              <div class="flex justify-between text-xs mb-1"><span>Valor Integral:</span><span class="line-through">{{ content.valores.total }}</span></div>
              <div class="flex justify-between font-black text-green-700 text-lg"><span>À Vista (20% OFF):</span><span>{{ content.valores.vista }}</span></div>
              <div class="flex justify-between font-black text-[#4a3728]"><span>Mensalidade:</span><span>{{ content.valores.mensalidade }}</span></div>
            </div>

            <div v-for="opt in content.opcoes_pagamento" :key="opt.id"
              @click="formData.metodoPagamento = opt.id" 
              :class="['p-4 border-2 rounded-xl cursor-pointer transition-all flex justify-between items-center', 
                      formData.metodoPagamento === opt.id ? 'border-[#4a3728] bg-stone-50 shadow-inner' : 'border-stone-200']">
              <span class="font-bold text-[#4a3728]">{{ opt.label }}</span>
              <div :class="['w-5 h-5 rounded-full border-2 flex items-center justify-center', formData.metodoPagamento === opt.id ? 'border-[#4a3728]' : 'border-stone-300']">
                <div v-if="formData.metodoPagamento === opt.id" class="w-2.5 h-2.5 bg-[#4a3728] rounded-full"></div>
              </div>
            </div>

            <div class="text-[11px] font-medium text-stone-600 space-y-1 bg-stone-100 p-4 rounded-xl">
              <p>• {{ content.valores.obs_taxas }}</p>
              <p>• {{ content.valores.obs_prazo }}</p>
              <p class="text-[#4a3728] font-black uppercase mt-2 italic">🎁 {{ content.valores.bonus }}</p>
            </div>

            <div class="grid grid-cols-2 gap-4 mt-4">
              <Button label="VOLTAR" @click="voltarEtapa" class="p-button-text text-stone-500 font-bold" />
              <Button label="FINALIZAR" icon="pi pi-lock" :loading="loading" @click="finalizarInscricao" 
                class="bg-green-700 text-white border-none py-5 rounded-xl font-black tracking-widest shadow-lg" />
            </div>
          </div>
        </div>

        <div v-else class="text-center py-12 animate-fade-in">
          <i class="pi pi-check-circle text-8xl text-green-600 mb-6"></i>
          <h2 class="text-3xl font-serif text-[#4a3728] mb-4">Inscrição Realizada!</h2>
          <p class="text-lg font-medium mb-8">Obrigado, <strong>{{ formData.nome }}</strong>. Entraremos em contato via WhatsApp para os próximos passos.</p>
          <Button label="VOLTAR AO INÍCIO" @click="navigateTo('/')" class="bg-[#4a3728] text-white px-8 py-4 rounded-xl font-black" />
        </div>

      </div>
    </div>

    <div class="absolute -bottom-[500px] left-1/2 -translate-x-1/2 opacity-[0.05] z-0 pointer-events-none">
      <img src="/images/mandala_fundo.jpg" class="w-[1200px] animate-spin-slow" style="animation-direction: reverse;" />
    </div>
  </main>
</template>

<style scoped>
.animate-spin-slow { animation: spin 180s linear infinite; }
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
.animate-fade-in { animation: fadeIn 0.4s ease-out; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }

/* Ajuste de Linhas das Caixas de Texto */
:deep(.p-inputtext) {
  border-radius: 0.8rem;
  border: 2px solid #8b8580 !important; /* Linha mais escura e definida */
  padding: 1rem;
  width: 100%;
  color: #1a1a1a;
  font-weight: 700; /* Texto digitado mais forte */
  background-color: #ffffff;
}

:deep(.p-inputtext:focus) {
  border-color: #4a3728 !important;
  box-shadow: 0 0 0 3px rgba(74, 55, 40, 0.15) !important;
}

/* Contraste do Botão e Label */
.font-black { font-weight: 900; }
</style>