<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAsyncState } from '@/composables/useAsyncState';
import { useNotification } from '@/composables/useNotification';
import { getTratativa, updateTratativa, deleteTratativa } from '@/services/api';
import type { Tratativa, UpdateTratativaDTO } from '@/services/api';
import BaseButton from './BaseButton.vue';

const props = defineProps<{
  id: number;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'deleted'): void;
  (e: 'updated'): void;
}>();

const notification = useNotification();
const isEditing = ref(false);
const showDeleteConfirm = ref(false);

const { 
  data: tratativa,
  loading,
  error,
  execute: executeFetch
} = useAsyncState<Tratativa | null>(null);

const {
  loading: updateLoading,
  execute: executeUpdate
} = useAsyncState<void>(undefined);

const {
  loading: deleteLoading,
  execute: executeDelete
} = useAsyncState<void>(undefined);

const editForm = ref<UpdateTratativaDTO>({
  titulo: '',
  descricao: '',
  status: 'pendente',
  prioridade: 'media',
  responsavel: ''
});

const fetchTratativa = () => {
  return executeFetch(() => getTratativa(props.id), {
    onSuccess: (data) => {
      if (data) {
        editForm.value = {
          titulo: data.titulo,
          descricao: data.descricao,
          status: data.status,
          prioridade: data.prioridade,
          responsavel: data.responsavel
        };
      }
    },
    onError: (error) => {
      notification.error(error.message);
    }
  });
};

const handleUpdate = async () => {
  await executeUpdate(
    () => updateTratativa(props.id, editForm.value),
    {
      onSuccess: () => {
        notification.success('Tratativa atualizada com sucesso!');
        isEditing.value = false;
        fetchTratativa();
        emit('updated');
      },
      onError: (error) => {
        notification.error(error.message);
      }
    }
  );
};

const handleDelete = async () => {
  await executeDelete(
    () => deleteTratativa(props.id),
    {
      onSuccess: () => {
        notification.success('Tratativa excluída com sucesso!');
        emit('deleted');
        emit('close');
      },
      onError: (error) => {
        notification.error(error.message);
      }
    }
  );
};

const statusLabels = {
  pendente: 'Pendente',
  em_andamento: 'Em Andamento',
  concluida: 'Concluída'
} as const;

const prioridadeLabels = {
  baixa: 'Baixa',
  media: 'Média',
  alta: 'Alta'
} as const;

onMounted(() => {
  fetchTratativa();
});
</script>

<template>
  <div class="modal-overlay" @click="emit('close')">
    <div class="modal" @click.stop>
      <div class="modal__header">
        <h2>Detalhes da Tratativa</h2>
        <button class="modal__close" @click="emit('close')">✕</button>
      </div>

      <div v-if="error" class="modal__error">
        {{ error.message }}
        <BaseButton variant="primary" size="sm" :loading="loading" @click="fetchTratativa">
          Tentar novamente
        </BaseButton>
      </div>

      <div v-else-if="loading" class="modal__loading">
        <div class="loading-spinner"></div>
        Carregando...
      </div>

      <div v-else-if="tratativa" class="modal__content">
        <form v-if="isEditing" @submit.prevent="handleUpdate">
          <div class="form-group">
            <label for="titulo">Título</label>
            <input
              id="titulo"
              v-model="editForm.titulo"
              type="text"
              required
            >
          </div>

          <div class="form-group">
            <label for="descricao">Descrição</label>
            <textarea
              id="descricao"
              v-model="editForm.descricao"
              required
              rows="4"
            ></textarea>
          </div>

          <div class="form-group">
            <label for="status">Status</label>
            <select id="status" v-model="editForm.status" required>
              <option v-for="(label, value) in statusLabels" :key="value" :value="value">
                {{ label }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="prioridade">Prioridade</label>
            <select id="prioridade" v-model="editForm.prioridade" required>
              <option v-for="(label, value) in prioridadeLabels" :key="value" :value="value">
                {{ label }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="responsavel">Responsável</label>
            <input
              id="responsavel"
              v-model="editForm.responsavel"
              type="text"
              required
            >
          </div>

          <div class="modal__footer">
            <BaseButton
              variant="outline"
              @click="isEditing = false"
              type="button"
            >
              Cancelar
            </BaseButton>
            <BaseButton
              variant="primary"
              :loading="updateLoading"
              type="submit"
            >
              Salvar Alterações
            </BaseButton>
          </div>
        </form>

        <div v-else class="tratativa-details">
          <div class="detail-group">
            <h3>Título</h3>
            <p>{{ tratativa.titulo }}</p>
          </div>

          <div class="detail-group">
            <h3>Descrição</h3>
            <p>{{ tratativa.descricao }}</p>
          </div>

          <div class="detail-group">
            <h3>Status</h3>
            <span
              class="status-badge"
              :class="`status-badge--${tratativa.status}`"
            >
              {{ statusLabels[tratativa.status as keyof typeof statusLabels] }}
            </span>
          </div>

          <div class="detail-group">
            <h3>Prioridade</h3>
            <span
              class="prioridade-badge"
              :class="`prioridade-badge--${tratativa.prioridade}`"
            >
              {{ prioridadeLabels[tratativa.prioridade as keyof typeof prioridadeLabels] }}
            </span>
          </div>

          <div class="detail-group">
            <h3>Responsável</h3>
            <p>{{ tratativa.responsavel }}</p>
          </div>

          <div class="detail-group">
            <h3>Data de Criação</h3>
            <p>{{ new Date(tratativa.dataCriacao).toLocaleDateString('pt-BR') }}</p>
          </div>

          <div class="detail-group">
            <h3>Última Atualização</h3>
            <p>{{ new Date(tratativa.dataAtualizacao).toLocaleDateString('pt-BR') }}</p>
          </div>
        </div>

        <div class="modal__footer">
          <div v-if="showDeleteConfirm" class="delete-confirm">
            <p>Tem certeza que deseja excluir esta tratativa?</p>
            <div class="delete-confirm__actions">
              <BaseButton
                variant="outline"
                @click="showDeleteConfirm = false"
              >
                Cancelar
              </BaseButton>
              <BaseButton
                variant="danger"
                :loading="deleteLoading"
                @click="handleDelete"
              >
                Confirmar Exclusão
              </BaseButton>
            </div>
          </div>
          <template v-else>
            <BaseButton
              variant="danger"
              @click="showDeleteConfirm = true"
            >
              Excluir
            </BaseButton>
            <BaseButton
              variant="primary"
              @click="isEditing = true"
            >
              Editar
            </BaseButton>
          </template>
        </div>
      </div>
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
  max-width: 600px;
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
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-md);
}

.modal__error,
.modal__loading {
  padding: var(--spacing-lg);
  text-align: center;
  color: var(--danger-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-md);
}

.modal__loading {
  color: var(--text-muted);
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--border-color);
  border-radius: 50%;
  border-top-color: var(--primary-color);
  animation: spin 1s linear infinite;
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

.tratativa-details {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.detail-group h3 {
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--text-muted);
  margin: 0 0 var(--spacing-xs);
}

.detail-group p {
  margin: 0;
  color: var(--text-primary);
}

.status-badge,
.prioridade-badge {
  display: inline-block;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-sm);
  font-weight: 500;
}

.status-badge--pendente {
  background: var(--warning-color-light);
  color: var(--warning-color);
}

.status-badge--em_andamento {
  background: var(--primary-color-light);
  color: var(--primary-color);
}

.status-badge--concluida {
  background: var(--success-color-light);
  color: var(--success-color);
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

.delete-confirm {
  width: 100%;
  text-align: center;
}

.delete-confirm p {
  margin: 0 0 var(--spacing-md);
  color: var(--danger-color);
}

.delete-confirm__actions {
  display: flex;
  justify-content: center;
  gap: var(--spacing-md);
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

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style> 