<script setup lang="ts">
import { ref, onMounted } from 'vue';
import StatsCard from './StatsCard.vue';
import { getDashboardStats } from '../services/api';
import type { DashboardStats } from '../services/api';

type StatCardVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger';

interface StatItem {
    title: string;
    value: number | string;
    subtitle: string;
    variant: StatCardVariant;
    icon: string;
}

const stats = ref<StatItem[]>([
    {
        title: 'Total de Tratativas',
        value: 0,
        subtitle: 'Últimos 30 dias',
        variant: 'primary',
        icon: '📊'
    },
    {
        title: 'Tratativas Pendentes',
        value: 0,
        subtitle: 'Aguardando retorno',
        variant: 'warning',
        icon: '⏳'
    },
    {
        title: 'Tratativas Concluídas',
        value: 0,
        subtitle: 'Últimos 30 dias',
        variant: 'success',
        icon: '✅'
    },
    {
        title: 'Tempo Médio',
        value: '0 dias',
        subtitle: 'Para conclusão',
        variant: 'default',
        icon: '⏱️'
    }
]);

const loading = ref(true);
const error = ref<string | null>(null);

const fetchStats = async () => {
    try {
        loading.value = true;
        error.value = null;
        const data = await getDashboardStats();

        stats.value = [
            {
                ...stats.value[0],
                value: data.total
            },
            {
                ...stats.value[1],
                value: data.pendentes
            },
            {
                ...stats.value[2],
                value: data.concluidas
            },
            {
                ...stats.value[3],
                value: data.tempoMedio
            }
        ];
    } catch (e) {
        error.value = 'Erro ao carregar estatísticas';
        console.error('Erro ao carregar estatísticas:', e);
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchStats();
});
</script>

<template>
    <section class="dashboard-stats">
        <div v-if="error" class="error-message">
            {{ error }}
        </div>
        <div class="stats-grid">
            <StatsCard v-for="stat in stats" :key="stat.title" v-bind="stat" :loading="loading" />
        </div>
    </section>
</template>

<style scoped>
.dashboard-stats {
    margin-bottom: var(--spacing-xl);
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: var(--spacing-md);
}

.error-message {
    background-color: rgba(220, 53, 69, 0.1);
    color: var(--danger-color);
    padding: var(--spacing-md);
    border-radius: var(--border-radius-sm);
    margin-bottom: var(--spacing-md);
    text-align: center;
}
</style>