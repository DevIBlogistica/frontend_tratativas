<script setup lang="ts">
defineProps<{
    variant?: 'primary' | 'secondary' | 'outline' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    icon?: string;
    disabled?: boolean;
    loading?: boolean;
    type?: 'button' | 'submit' | 'reset';
}>();
</script>

<template>
    <button :class="[
        'base-button',
        variant && `base-button-${variant}`,
        size && `base-button-${size}`,
        { 'base-button-loading': loading }
    ]" :disabled="disabled || loading" :type="type || 'button'">
        <span v-if="loading" class="loading-spinner"></span>
        <span v-else-if="icon" class="button-icon">{{ icon }}</span>
        <span class="button-content">
            <slot></slot>
        </span>
    </button>
</template>

<style scoped>
.base-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-xs);
    padding: var(--spacing-sm) var(--spacing-md);
    border: 1px solid transparent;
    border-radius: var(--border-radius-sm);
    font-size: var(--font-size-md);
    font-weight: 500;
    line-height: 1.5;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s;
    background-color: var(--primary-color);
    color: var(--white);
}

.base-button:hover:not(:disabled) {
    opacity: 0.9;
}

.base-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

/* Variants */
.base-button-secondary {
    background-color: var(--secondary-color);
}

.base-button-outline {
    background-color: transparent;
    border-color: var(--primary-color);
    color: var(--primary-color);
}

.base-button-outline:hover:not(:disabled) {
    background-color: var(--primary-color);
    color: var(--white);
}

.base-button-danger {
    background-color: var(--danger-color);
}

/* Sizes */
.base-button-sm {
    padding: var(--spacing-xs) var(--spacing-sm);
    font-size: var(--font-size-sm);
}

.base-button-lg {
    padding: var(--spacing-md) var(--spacing-lg);
    font-size: var(--font-size-lg);
}

/* Loading state */
.base-button-loading {
    position: relative;
    color: transparent;
}

.loading-spinner {
    position: absolute;
    width: 16px;
    height: 16px;
    border: 2px solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    animation: spin 0.75s linear infinite;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.button-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

.button-content {
    display: inline-flex;
    align-items: center;
}
</style>