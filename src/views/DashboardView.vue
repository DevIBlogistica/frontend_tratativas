<script setup lang="ts">
import { ref, onMounted } from 'vue';
import DashboardStats from '../components/DashboardStats.vue';
import BaseCard from '../components/BaseCard.vue';
import { getTratativas } from '../services/api';
import type { Tratativa } from '../services/api';
import { useAsyncState } from '@/composables/useAsyncState';
import { useNotification } from '@/composables/useNotification';

const notification = useNotification();
const { data: recentTratativas, loading, error, execute } = useAsyncState<Tratativa[]>([]);

const fetchRecentTratativas = async () => {
    await execute(getTratativas, {
        onError: (error) => {
            notification.error(error.message);
        }
    });
};

onMounted(() => {
    fetchRecentTratativas();
});

const statusColors = {
    pendente: 'warning',
    em_andamento: 'primary',
    concluida: 'success'
} as const;
</script>

<template>
    <div class="dashboard">
        <header class="dashboard-header">
            <h1>Dashboard</h1>
        </header>

        <DashboardStats />

        <div class="dashboard-content">
            <BaseCard title="Tratativas Recentes" subtitle="Últimas tratativas registradas no sistema">
                <div v-if="error" class="error-message">
                    {{ error.message }}
                    <BaseButton variant="primary" size="sm" :loading="loading" @click="fetchRecentTratativas">
                        Tentar novamente
                    </BaseButton>
                </div>

                <div v-else-if="loading" class="loading-table">
                    <div v-for="i in 3" :key="i" class="loading-row">
                        <div class="loading-cell"></div>
                        <div class="loading-cell"></div>
                        <div class="loading-cell"></div>
                        <div class="loading-cell"></div>
                    </div>
                </div>

                <table v-else class="table">
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Responsável</th>
                            <th>Status</th>
                            <th>Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="tratativa in recentTratativas.slice(0, 5)" :key="tratativa.id">
                            <td>{{ tratativa.titulo }}</td>
                            <td>{{ tratativa.responsavel }}</td>
                            <td>
                                <span class="status-badge"
                                    :class="`status-badge--${statusColors[tratativa.status as keyof typeof statusColors]}`">
                                    {{ tratativa.status.replace('_', ' ') }}
                                </span>
                            </td>
                            <td>{{ new Date(tratativa.dataCriacao).toLocaleDateString('pt-BR') }}</td>
                        </tr>
                        <tr v-if="recentTratativas.length === 0">
                            <td colspan="4" class="empty-state">
                                Nenhuma tratativa encontrada
                            </td>
                        </tr>
                    </tbody>
                </table>
            </BaseCard>
        </div>
    </div>
</template>

<style scoped>
.dashboard {
    height: 100%;
}

.dashboard-header {
    margin-bottom: var(--spacing-lg);
}

.dashboard-header h1 {
    font-size: var(--font-size-xl);
    font-weight: 500;
    margin: 0;
}

.dashboard-content {
    display: grid;
    gap: var(--spacing-lg);
}

.table {
    width: 100%;
    border-collapse: collapse;
}

.table th,
.table td {
    padding: var(--spacing-md);
    text-align: left;
    border-bottom: 1px solid var(--border-color);
}

.table th {
    font-weight: 500;
    color: var(--text-muted);
}

.status-badge {
    display: inline-block;
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--border-radius-sm);
    font-size: var(--font-size-sm);
    font-weight: 500;
}

.status-badge--warning {
    background: var(--warning-color-light);
    color: var(--warning-color);
}

.status-badge--primary {
    background: var(--primary-color-light);
    color: var(--primary-color);
}

.status-badge--success {
    background: var(--success-color-light);
    color: var(--success-color);
}

.loading-table {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
}

.loading-row {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: var(--spacing-md);
}

.loading-cell {
    height: 24px;
    background: linear-gradient(90deg, var(--bg-light) 25%, var(--bg-lighter) 50%, var(--bg-light) 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
    border-radius: var(--border-radius-sm);
}

.empty-state {
    text-align: center;
    color: var(--text-muted);
    padding: var(--spacing-xl);
}

.error-message {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-md);
    padding: var(--spacing-lg);
    text-align: center;
    color: var(--danger-color);
}

@keyframes loading {
    0% {
        background-position: 200% 0;
    }

    100% {
        background-position: -200% 0;
    }
}
</style>