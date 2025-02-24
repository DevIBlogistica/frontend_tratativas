<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useAsyncState } from '@/composables/useAsyncState';
import { useNotification } from '@/composables/useNotification';
import { getTratativas } from '@/services/api';
import type { Tratativa } from '@/services/api';
import BaseCard from './BaseCard.vue';
import BaseButton from './BaseButton.vue';
import SearchField from './SearchField.vue';
import DetalheTratativa from './DetalheTratativa.vue';

const emit = defineEmits<{
    (e: 'novaTratativa'): void;
}>();

const notification = useNotification();
const searchQuery = ref('');
const sortBy = ref<keyof Tratativa>('dataCriacao');
const sortOrder = ref<'asc' | 'desc'>('desc');
const selectedTratativaId = ref<number | null>(null);

const { data: tratativas, loading, error, execute } = useAsyncState<Tratativa[]>([]);

const filteredTratativas = computed(() => {
    let result = [...(tratativas.value || [])];

    // Apply search filter
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        result = result.filter(
            (t) =>
                t.titulo.toLowerCase().includes(query) ||
                t.descricao.toLowerCase().includes(query) ||
                t.responsavel.toLowerCase().includes(query)
        );
    }

    // Apply sorting
    result.sort((a, b) => {
        const aValue = a[sortBy.value];
        const bValue = b[sortBy.value];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
            return sortOrder.value === 'asc'
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue);
        }

        return sortOrder.value === 'asc'
            ? (aValue as number) - (bValue as number)
            : (bValue as number) - (aValue as number);
    });

    return result;
});

const handleSort = (field: keyof Tratativa) => {
    if (sortBy.value === field) {
        sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
    } else {
        sortBy.value = field;
        sortOrder.value = 'asc';
    }
};

const fetchTratativas = async () => {
    await execute(getTratativas, {
        onError: (error) => {
            notification.error(error.message);
        }
    });
};

const handleSearch = (value: string) => {
    searchQuery.value = value;
};

const handleRowClick = (tratativa: Tratativa) => {
    selectedTratativaId.value = tratativa.id;
};

const handleCloseDetalhe = () => {
    selectedTratativaId.value = null;
};

defineExpose({
    fetchTratativas
});

onMounted(() => {
    fetchTratativas();
});

const statusColors = {
    pendente: 'warning',
    em_andamento: 'primary',
    concluida: 'success'
} as const;

const prioridadeLabels = {
    baixa: 'Baixa',
    media: 'Média',
    alta: 'Alta'
} as const;
</script>

<template>
    <div class="lista-tratativas">
        <header class="lista-tratativas__header">
            <h1>Tratativas</h1>
            <div class="lista-tratativas__actions">
                <SearchField v-model="searchQuery" placeholder="Buscar tratativas..." @search="handleSearch" />
                <BaseButton variant="primary" icon="➕" @click="emit('novaTratativa')">
                    Nova Tratativa
                </BaseButton>
            </div>
        </header>

        <BaseCard>
            <div v-if="error" class="error-message">
                {{ error.message }}
                <BaseButton variant="primary" size="sm" :loading="loading" @click="fetchTratativas">
                    Tentar novamente
                </BaseButton>
            </div>

            <div v-else>
                <div class="table-container">
                    <table class="table">
                        <thead>
                            <tr>
                                <th @click="handleSort('titulo')" class="sortable">
                                    Título
                                    <span class="sort-icon">
                                        {{ sortBy === 'titulo' ? (sortOrder === 'asc' ? '↑' : '↓') : '↕' }}
                                    </span>
                                </th>
                                <th @click="handleSort('responsavel')" class="sortable">
                                    Responsável
                                    <span class="sort-icon">
                                        {{ sortBy === 'responsavel' ? (sortOrder === 'asc' ? '↑' : '↓') : '↕' }}
                                    </span>
                                </th>
                                <th @click="handleSort('status')" class="sortable">
                                    Status
                                    <span class="sort-icon">
                                        {{ sortBy === 'status' ? (sortOrder === 'asc' ? '↑' : '↓') : '↕' }}
                                    </span>
                                </th>
                                <th @click="handleSort('prioridade')" class="sortable">
                                    Prioridade
                                    <span class="sort-icon">
                                        {{ sortBy === 'prioridade' ? (sortOrder === 'asc' ? '↑' : '↓') : '↕' }}
                                    </span>
                                </th>
                                <th @click="handleSort('dataCriacao')" class="sortable">
                                    Data de Criação
                                    <span class="sort-icon">
                                        {{ sortBy === 'dataCriacao' ? (sortOrder === 'asc' ? '↑' : '↓') : '↕' }}
                                    </span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="loading" v-for="i in 3" :key="i" class="loading-row">
                                <td v-for="j in 5" :key="j">
                                    <div class="loading-cell"></div>
                                </td>
                            </tr>
                            <tr v-else v-for="tratativa in filteredTratativas" :key="tratativa.id" class="table-row"
                                @click="handleRowClick(tratativa)">
                                <td>{{ tratativa.titulo }}</td>
                                <td>{{ tratativa.responsavel }}</td>
                                <td>
                                    <span class="status-badge"
                                        :class="`status-badge--${statusColors[tratativa.status as keyof typeof statusColors]}`">
                                        {{ tratativa.status.replace('_', ' ') }}
                                    </span>
                                </td>
                                <td>
                                    <span class="prioridade-badge"
                                        :class="`prioridade-badge--${tratativa.prioridade as keyof typeof prioridadeLabels}`">
                                        {{ prioridadeLabels[tratativa.prioridade as keyof typeof prioridadeLabels] }}
                                    </span>
                                </td>
                                <td>{{ new Date(tratativa.dataCriacao).toLocaleDateString('pt-BR') }}</td>
                            </tr>
                            <tr v-if="!loading && filteredTratativas.length === 0">
                                <td colspan="5" class="empty-state">
                                    Nenhuma tratativa encontrada
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </BaseCard>

        <Teleport to="body">
            <DetalheTratativa v-if="selectedTratativaId" :id="selectedTratativaId" @close="handleCloseDetalhe"
                @updated="fetchTratativas" @deleted="fetchTratativas" />
        </Teleport>
    </div>
</template>

<style scoped>
.lista-tratativas {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
}

.lista-tratativas__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--spacing-lg);
}

.lista-tratativas__header h1 {
    font-size: var(--font-size-xl);
    font-weight: 500;
    margin: 0;
}

.lista-tratativas__actions {
    display: flex;
    gap: var(--spacing-md);
    align-items: center;
}

.table-container {
    overflow-x: auto;
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

.table th.sortable {
    cursor: pointer;
    user-select: none;
}

.table th.sortable:hover {
    color: var(--text-primary);
}

.sort-icon {
    display: inline-block;
    margin-left: var(--spacing-xs);
    opacity: 0.5;
}

.table-row {
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.table-row:hover {
    background-color: var(--bg-light);
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

.prioridade-badge {
    display: inline-block;
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--border-radius-sm);
    font-size: var(--font-size-sm);
    font-weight: 500;
}

.prioridade-badge--baixa {
    background: var(--success-color-light);
    color: var(--success-color);
}

.prioridade-badge--media {
    background: var(--warning-color-light);
    color: var(--warning-color);
}

.prioridade-badge--alta {
    background: var(--danger-color-light);
    color: var(--danger-color);
}

.loading-row td {
    padding: var(--spacing-sm) var(--spacing-md);
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