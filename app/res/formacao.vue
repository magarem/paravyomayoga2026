<script setup>
const props = defineProps({
  isPreview: { type: Boolean, default: false }
})

const { content, staticPage } = await useContentSource('formacao-detalhada', props.isPreview)
</script>

<template>
  <main v-if="content" class="min-h-screen bg-[#fdfcf0] py-12 text-[#2d241e]">

<div class="absolute -top-[300px] md:-top-[550px] left-1/2 -translate-x-1/2 z-0 pointer-events-none opacity-[0.04]">
      <img 
        src="/images/mandala_fundo.jpg" 
        class="w-[800px] md:w-[1200px] max-w-none _animate-spin-slow" 
        alt="Mandala Decorativa"
      />
    </div>

    <div class="container mx-auto px-4 max-w-6xl">
      
      <section class="mb-7 text-center">
        <span class="inline-block px-4 py-1 rounded-full bg-[#4a3728] text-white font-bold text-sm mb-6 tracking-widest">
          FORMAÇÃO PROFISSIONAL
        </span>
        <h1 class="text-5xl md:text-6xl font-serif text-[#4a3728] mb-6 leading-tight">
          {{ content.title }}
        </h1>
        <p class="text-2xl text-[#5d4a3a] font-medium italic mb-10 max-w-4xl mx-auto">
          {{ content.subtitle }}
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="(info, index) in [
            { icon: 'pi-clock', label: 'Carga Horária', val: content.cargaHoraria },
            { icon: 'pi-calendar', label: 'Duração', val: content.duracao },
            { icon: 'pi-verified', label: 'Certificado', val: content.certificacao }
          ]" :key="index" 
          class="bg-white border-2 border-[#4a3728]/20 p-6 rounded-2xl shadow-md">
            <i :class="`pi ${info.icon} text-2xl text-[#4a3728] mb-3`" style="display: block"></i>
            <h3 class="font-bold text-[#4a3728] uppercase text-xs tracking-tighter mb-1">{{ info.label }}</h3>
            <p class="text-lg font-bold text-gray-900">{{ info.val }}</p>
          </div>
        </div>
      </section>

      <section class="mb-9 bg-white p-4 md:p-10 rounded-[2rem] shadow-xl border border-[#4a3728]/10">
        <div class="prose prose-stone lg:prose-xl max-w-none text-[#3a2f26] leading-relaxed">
          <div v-if="isPreview" v-html="content.bodyHtml" class="markdown-render"></div>
          <ContentRenderer v-else :value="staticPage" />
        </div>
      </section>

    <section class="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-9">
       
  <div class="lg:col-span-7 bg-white p-8 md:p-12 rounded-[2rem] shadow-lg border border-[#4a3728]/10">
    <h2 class="text-4xl font-serif text-[#4a3728] mb-10 text-center border-b-2 border-[#4a3728]/5 pb-6">
      Conteúdo Programático
    </h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
      <div v-for="(item, index) in content.programacao" :key="index" 
           class="flex items-center p-3 rounded-xl hover:bg-[#fdfcf0] transition-colors group border-b border-stone-50 md:border-none">
        
        <span class="flex-none w-8 h-8 rounded-full bg-[#4a3728] text-white flex items-center justify-center text-xs font-bold mr-4 shadow-sm">
          {{ index + 1 }}
        </span>
        
        <span class="text-lg font-bold text-[#2d241e] group-hover:text-[#4a3728] transition-colors leading-tight">
          {{ item }}
        </span>
      </div>
    </div>
  </div>

  <div class="lg:col-span-5 flex flex-col gap-8">
    
    <div class="bg-amber-50 p-8 rounded-3xl border-2 border-amber-200/50 shadow-inner">
      <h2 class="text-3xl font-serif text-[#4a3728] mb-6 border-b border-amber-200 pb-2">
        A quem se destina
      </h2>
      <div class="grid grid-cols-1 gap-3">
        <div v-for="extra in content.a_quem_se_destina" :key="extra" 
          class="flex text-lg items-center bg-white border border-amber-200 px-4 py-3 rounded-xl shadow-sm transition-transform hover:translate-x-2">
          <!-- <i class="pi pi-users text-[#4a3728] mr-3 font-bold"></i> -->
          {{ extra }}
        </div>
      </div>
    </div>

    <div class="p-8 bg-[#4a3728] text-white rounded-[2rem] shadow-2xl relative overflow-hidden">
      <div class="relative z-10">
        <!-- <h3 class="text-2xl font-bold mb-4">Informações de Acesso</h3> -->
        <p class="text-lg mb-4 leading-relaxed"><i class="pi pi-video mr-3"></i> {{ content.modalidade }}</p>
        <p class="text-amber-200 font-medium italic">Encontros mensais: 1 sábado por mês (9h às 18h). Aulas gravadas para consulta ilimitada.</p>
      </div>
      <div class="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full"></div>
    </div>

    <div class="p-7 bg-white border-2 border-[#25D366]/30 rounded-[2rem] shadow-lg flex flex-col items-center text-center">
        <h3 class="text-xl font-serif text-[#4a3728] mb-4">Dúvidas e Matrículas</h3>
        
        <a 
        :href="`https://wa.me/55${content.contato.replace(/\D/g,'')}`"
        target="_blank"
        class="flex items-center gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-4 rounded-2xl transition-all transform hover:scale-105 shadow-md group"
        >
        <i class="pi pi-whatsapp text-2xl group-hover:animate-bounce"></i>
        <span class="text-2xl font-black">{{ content.contato }}</span>
        </a>
        
        <p class="mt-4 text-sm text-gray-600 font-bold uppercase tracking-widest">
        Atendimento direto via WhatsApp
        </p>
    </div>

  </div>
</section>


 <section class="bg-white rounded-[3rem] p-10 lg:p-16 shadow-2xl border border-gray-50">
        <div class="flex flex-col lg:flex-row gap-16 items-center">
         
          <div class="w-64 h-64 rounded-full overflow-hidden border-8 border-[#fdfcf0] shadow-xl shrink-0">
             <img src="/images/paravyoma.png" class="w-full h-full object-cover" alt="Pedro Paravyoma" />
          </div>



          
          <div>



            <h2 class="text-3xl font-serif text-[#4a3728] mb-6">Seu Instrutor: {{ content.instrutor.nome }}</h2>
            <ul class="space-y-4">
             <li v-for="bio in content.instrutor.bio" :key="bio" class="flex items-start gap-3">
                <span class="text-[#4a3728] font-black mt-1">ॐ</span>
                <span class="text-gray-900 font-medium leading-tight">{{ bio }}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>


    
 <div class="mt-10 p-7 _bg-white  flex flex-col items-center text-center">
        <!-- <h3 class="text-xl font-serif text-[#4a3728] mb-4">Dúvidas e Matrículas</h3> -->
        
        <a 
        href="/inscricao"
        target="_blank"
        class="flex items-center gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-4 rounded-2xl transition-all transform hover:scale-105 shadow-md group"
        >
        <span class="text-2xl font-black">Quero me inscrever!</span>
        </a>
        
      
    </div>
    </div>
    
   
  </main>
</template>

<style scoped>

/* Animação suave para a mandala girar lentamente */
.animate-spin-slow {
  animation: spin 250s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
/* Ajustes finos para garantir que o conteúdo renderizado pelo MDC seja legível */
:deep(.prose) {
    font-size: 20px;
  color: #2d241e !important;
}
:deep(.prose h2) {
  color: #4a3728;
  font-family: serif;
  margin-top: 2rem;
  border-bottom: 1px solid rgba(74, 55, 40, 0.1);
  padding-bottom: 0.5rem;
}
:deep(.prose p) {
  margin-bottom: 1.5rem;
  font-weight: 500; /* Aumenta um pouco a espessura da fonte */
}
:deep(.prose strong) {
  color: #4a3728;
  font-weight: 800;
}
</style>