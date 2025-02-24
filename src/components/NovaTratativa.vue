<script setup lang="ts">
import { ref } from 'vue';
import { useAsyncState } from '@/composables/useAsyncState';
import { useNotification } from '@/composables/useNotification';
import { createTratativa } from '@/services/api';
import type { CreateTratativaDTO } from '@/services/api';
import BaseButton from './BaseButton.vue';

const emit = defineEmits<{
    (e: 'close'): void;
}>();

const notification = useNotification();
const { loading, execute } = useAsyncState<void>(undefined);

const formData = ref<CreateTratativaDTO>({
    titulo: '',
    descricao: '',
    prioridade: 'media',
    responsavel: ''
});

const handleSubmit = async (e: Event) => {
    e.preventDefault();

    await execute(
        () => createTratativa(formData.value),
        {
            onSuccess: () => {
                notification.success('Tratativa criada com sucesso!');
                emit('close');
            },
            onError: (error) => {
                notification.error(error.message);
            }
        }
    );
};

const handleClose = () => {
    emit('close');
};
</script>

<template>
    <div class="modal-overlay" @click="handleClose">
        <div class="modal" @click.stop>
            <div class="modal__header">
                <h2>Nova Tratativa</h2>
                <button class="modal__close" @click="handleClose">✕</button>
            </div>

            <form @submit="handleSubmit" class="modal__content">
                <div class="form-group">
                    <label for="titulo">Título</label>
                    <input id="titulo" v-model="formData.titulo" type="text" required
                        placeholder="Digite o título da tratativa">
                </div>

                <div class="form-group">
                    <label for="descricao">Descrição</label>
                    <textarea id="descricao" v-model="formData.descricao" required rows="4"
                        placeholder="Descreva a tratativa"></textarea>
                </div>

                <div class="form-group">
                    <label for="responsavel">Responsável</label>
                    <input id="responsavel" v-model="formData.responsavel" type="text" required
                        placeholder="Nome do responsável">
                </div>

                <div class="form-group">
                    <label for="prioridade">Prioridade</label>
                    <select id="prioridade" v-model="formData.prioridade" required>
                        <option value="baixa">Baixa</option>
                        <option value="media">Média</option>
                        <option value="alta">Alta</option>
                    </select>
                </div>

                <div class="modal__footer">
                    <BaseButton variant="outline" @click="handleClose" type="button">
                        Cancelar
                    </BaseButton>
                    <BaseButton variant="primary" :loading="loading" type="submit">
                        Criar Tratativa
                    </BaseButton>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: var(--z-modal);
}

.modal {
    background: var(--card-bg);
    border-radius: var(--border-radius-lg);
    width: 100%;
    max-width: 500px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: var(--shadow-lg);
    animation: modal-in 0.3s ease;
}

.modal__header {
    padding: var(--spacing-lg);
    border-bottom: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.modal__header h2 {
    font-size: var(--font-size-lg);
    font-weight: 500;
    margin: 0;
}

.modal__close {
    background: none;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    padding: var(--spacing-xs);
    font-size: var(--font-size-lg);
    line-height: 1;
    border-radius: var(--border-radius-sm);
    transition: all 0.2s ease;
}

.modal__close:hover {
    background: var(--bg-light);
    color: var(--text-primary);
}

.modal__content {
    padding: var(--spacing-lg);
}

.modal__footer {
    margin-top: var(--spacing-lg);
    display: flex;
    justify-content: flex-end;
    gap: var(--spacing-md);
}

.form-group {
    margin-bottom: var(--spacing-lg);
}

.form-group label {
    display: block;
    margin-bottom: var(--spacing-xs);
    font-weight: 500;
    color: var(--text-primary);
}

.form-group input,
.form-group textarea,
.form-group select {
    width: 100%;
    padding: var(--spacing-sm);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius-sm);
    background: var(--bg-lighter);
    color: var(--text-primary);
    font-size: var(--font-size-md);
    transition: border-color 0.2s ease;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
    outline: none;
    border-color: var(--primary-color);
}

.form-group textarea {
    resize: vertical;
    min-height: 100px;
}

@keyframes modal-in {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>