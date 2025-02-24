<script setup lang="ts">
import { ref } from 'vue';
import ListaTratativas from '../components/ListaTratativas.vue';
import NovaTratativa from '../components/NovaTratativa.vue';

const showNovaTratativa = ref(false);
const listaTratativasRef = ref<InstanceType<typeof ListaTratativas> | null>(null);

const handleNovaTratativa = () => {
    showNovaTratativa.value = true;
};

const handleCloseNovaTratativa = () => {
    showNovaTratativa.value = false;
    // Recarrega a lista após criar uma nova tratativa
    listaTratativasRef.value?.fetchTratativas();
};
</script>

<template>
    <div class="tratativas">
        <ListaTratativas ref="listaTratativasRef" @novaTratativa="handleNovaTratativa" />
        <Teleport to="body">
            <NovaTratativa v-if="showNovaTratativa" @close="handleCloseNovaTratativa" />
        </Teleport>
    </div>
</template>

<style scoped>
.tratativas {
    height: 100%;
}
</style>