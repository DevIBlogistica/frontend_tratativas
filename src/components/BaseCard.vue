<script setup lang="ts">
defineProps<{
    title?: string;
    subtitle?: string;
    variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
}>();
</script>

<template>
    <div :class="['base-card', variant && `base-card-${variant}`]">
        <div v-if="title || subtitle" class="base-card-header">
            <h3 v-if="title" class="base-card-title">{{ title }}</h3>
            <p v-if="subtitle" class="base-card-subtitle">{{ subtitle }}</p>
        </div>
        <div class="base-card-content">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
.base-card {
    background: var(--white);
    border-radius: var(--border-radius-md);
    box-shadow: var(--shadow-sm);
    padding: var(--spacing-lg);
    height: 100%;
}

.base-card-header {
    margin-bottom: var(--spacing-md);
}

.base-card-title {
    font-size: var(--font-size-lg);
    font-weight: 500;
    margin: 0;
    margin-bottom: var(--spacing-xs);
}

.base-card-subtitle {
    color: var(--text-light);
    font-size: var(--font-size-sm);
    margin: 0;
}

.base-card-content {
    height: 100%;
}

/* Variants */
.base-card-primary {
    border-left: 4px solid var(--primary-color);
}

.base-card-success {
    border-left: 4px solid var(--success-color);
}

.base-card-warning {
    border-left: 4px solid var(--warning-color);
}

.base-card-danger {
    border-left: 4px solid var(--danger-color);
}
</style>