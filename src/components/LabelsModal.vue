<template>
    <ul class="labels-modal clean-list">
        <h4>
            <button >
                <i class="fas fa-times" />
            </button>
            Labels
        </h4>
        <li v-for="label in boardLabels" :key="label.id" :style="{backgroundColor: label.color}">
            <span>{{ label.title }}</span>
        </li>
        <button>Add labels</button>
    </ul>
</template>

<script>
export default {
    props: ['boardLabels'],

}
</script>

<style>
</style>