<script setup lang="ts">
interface Props {
    title: string;
    value: number | string;
    subtitle: string;
    variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
    icon?: string;
    loading?: boolean;
}

withDefaults(defineProps<Props>(), {
    variant: 'default',
    icon: '📊',
    loading: false
});
</script>

<template>
    <div class="stats-card" :class="[`stats-card--${variant}`, { 'stats-card--loading': loading }]">
        <div class="stats-card__icon">{{ icon }}</div>
        <div class="stats-card__content">
            <h3 class="stats-card__title">{{ title }}</h3>
            <div class="stats-card__value">
                <div v-if="loading" class="stats-card__loading-value"></div>
                <template v-else>{{ value }}</template>
            </div>
            <div class="stats-card__subtitle">{{ subtitle }}</div>
        </div>
    </div>
</template>

<style scoped>
.stats-card {
    background: var(--card-bg);
    border-radius: var(--border-radius-md);
    padding: var(--spacing-lg);
    display: flex;
    gap: var(--spacing-md);
    box-shadow: var(--shadow-sm);
    transition: all 0.2s ease;
}

.stats-card:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
}

.stats-card__icon {
    font-size: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    border-radius: var(--border-radius-sm);
    background: var(--bg-light);
}

.stats-card__content {
    flex: 1;
}

.stats-card__title {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-muted);
    margin: 0;
}

.stats-card__value {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0.25rem 0;
}

.stats-card__subtitle {
    font-size: 0.75rem;
    color: var(--text-muted);
}

.stats-card--loading .stats-card__value {
    height: 1.5rem;
}

.stats-card__loading-value {
    height: 100%;
    width: 60%;
    background: linear-gradient(90deg, var(--bg-light) 25%, var(--bg-lighter) 50%, var(--bg-light) 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
    border-radius: var(--border-radius-sm);
}

.stats-card--primary .stats-card__icon {
    background: var(--primary-color-light);
    color: var(--primary-color);
}

.stats-card--success .stats-card__icon {
    background: var(--success-color-light);
    color: var(--success-color);
}

.stats-card--warning .stats-card__icon {
    background: var(--warning-color-light);
    color: var(--warning-color);
}

.stats-card--danger .stats-card__icon {
    background: var(--danger-color-light);
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