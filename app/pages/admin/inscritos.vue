<script setup>

definePageMeta({ layout: 'admin' })
// Proteção simples por senha (opcional para o seu desenvolvimento)
const autenticado = ref(false)
const senha = ref('')

const { data: resposta, refresh } = await useFetch('/api/listar-inscritos')
const inscritos = computed(() => resposta.value?.data || [])

const formatarData = (dataStr) => {
  return new Date(dataStr).toLocaleString('pt-BR')
}
</script>

<template>
  <div class="min-h-screen bg-stone-100 p-8">
    <div class="max-w-7xl mx-auto">
      
      <div class="flex justify-between items-center mb-8">
        <div>
          <h1 class="text-3xl font-serif text-[#4a3728]">Gestão de Inscritos</h1>
          <p class="text-stone-500">Total de {{ inscritos.length }} matrículas registradas</p>
        </div>
        <Button label="Atualizar Lista" icon="pi pi-refresh" @click="refresh" class="p-button-outlined" />
      </div>

      <div class="bg-white rounded-2xl shadow-xl overflow-hidden border border-stone-200">
        <DataTable :value="inscritos" stripedRows responsiveLayout="stack" breakpoint="960px"
          class="p-datatable-sm custom-table">
          
          <Column field="data_registro" header="Data" sortable>
            <template #body="slotProps">
              {{ formatarData(slotProps.data.data_registro) }}
            </template>
          </Column>

          <Column field="nome" header="Nome" sortable class="font-bold text-[#4a3728]"></Column>
          
          <Column field="whatsapp" header="WhatsApp">
            <template #body="slotProps">
              <a :href="`https://wa.me/55${slotProps.data.whatsapp.replace(/\D/g,'')}`" 
                 target="_blank" class="text-green-700 font-bold hover:underline">
                <i class="pi pi-whatsapp mr-1"></i> {{ slotProps.data.whatsapp }}
              </a>
            </template>
          </Column>

          <Column field="email" header="E-mail"></Column>
          <Column field="cpf" header="CPF"></Column>
          
          <Column field="metodo_pagamento" header="Pagamento">
            <template #body="slotProps">
              <span class="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-stone-100 border border-stone-300">
                {{ slotProps.data.metodo_pagamento }}
              </span>
            </template>
          </Column>

        </DataTable>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estilização para manter o contraste alto solicitado */
:deep(.p-datatable .p-datatable-thead > tr > th) {
  background-color: #f8f7f5;
  color: #4a3728;
  font-weight: 900;
  text-transform: uppercase;
  font-size: 11px;
  letter-spacing: 0.1em;
  padding: 1.5rem 1rem;
  border-bottom: 2px solid #e5e7eb;
}

:deep(.p-datatable .p-datatable-tbody > tr > td) {
  padding: 1.25rem 1rem;
  color: #2d241e;
  border-bottom: 1px solid #f3f2f1;
}

:deep(.p-datatable.p-datatable-striped .p-datatable-tbody > tr:nth-child(even)) {
  background-color: #fdfcfb;
}
</style>