<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
    modelValue: string;
    placeholder?: string;
    debounce?: number;
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
    (e: 'search', value: string): void;
}>();

const searchValue = ref(props.modelValue);

let debounceTimeout: number | undefined;

watch(() => props.modelValue, (newValue) => {
    searchValue.value = newValue;
});

const handleInput = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;
    searchValue.value = value;
    emit('update:modelValue', value);

    if (debounceTimeout) {
        clearTimeout(debounceTimeout);
    }

    debounceTimeout = window.setTimeout(() => {
        emit('search', value);
    }, props.debounce || 300);
};

const handleClear = () => {
    searchValue.value = '';
    emit('update:modelValue', '');
    emit('search', '');
};
</script>

<template>
    <div class="search-field">
        <span class="search-icon">🔍</span>
        <input type="text" class="search-input" :value="searchValue" :placeholder="placeholder || 'Buscar...'"
            @input="handleInput">
        <button v-if="searchValue" class="clear-button" @click="handleClear" type="button">
            ✕
        </button>
    </div>
</template>

<style scoped>
.search-field {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
}

.search-icon {
    position: absolute;
    left: var(--spacing-md);
    color: var(--text-muted);
    font-size: 18px;
}

.search-input {
    width: 100%;
    height: 32px;
    padding: 0 var(--spacing-xl) 0 calc(var(--spacing-xl) + var(--spacing-md));
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius-sm);
    font-size: var(--font-size-sm);
    color: var(--text-color);
    background: #FFFFFF;
}

.search-input:focus {
    outline: none;
    border-color: var(--primary-color);
}

.search-input::placeholder {
    color: var(--text-muted);
}

.clear-button {
    position: absolute;
    right: var(--spacing-sm);
    background: none;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    padding: var(--spacing-xs);
    display: flex;
    align-items: center;
    justify-content: center;
}

.clear-button:hover {
    color: var(--text-color);
}
</style>