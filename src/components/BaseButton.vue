<script setup lang="ts">
defineProps<{
    variant?: 'primary' | 'outline';
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
        <span v-else-if="icon" class="material-icons">{{ icon }}</span>
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
    padding: var(--spacing-sm) var(--spacing-lg);
    border: none;
    border-radius: var(--border-radius-sm);
    font-size: var(--font-size-sm);
    font-weight: 500;
    line-height: 1.5;
    text-align: center;
    cursor: pointer;
    background-color: var(--primary-color);
    color: #FFFFFF;
    height: 32px;
}

.base-button:hover:not(:disabled) {
    opacity: 0.9;
}

.base-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

/* Variants */
.base-button-outline {
    background-color: transparent;
    border: 1px solid var(--primary-color);
    color: var(--primary-color);
}

/* Sizes */
.base-button-sm {
    height: 28px;
    padding: var(--spacing-xs) var(--spacing-md);
    font-size: var(--font-size-xs);
}

.base-button-lg {
    height: 40px;
    padding: var(--spacing-md) var(--spacing-xl);
    font-size: var(--font-size-md);
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

.material-icons {
    font-size: 18px;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.button-content {
    display: inline-flex;
    align-items: center;
}
</style>