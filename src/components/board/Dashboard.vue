<template>
    <section class="dashboard">
        <group-map :board="board" />
    </section>
</template>

<script>
import GroupMap from '@/components/board/charts/GroupMap.vue';

export default {
    name: "Dashboard",
    props: {
        board: {
            type: Object,
            require: true
        },
    },
    components: {
        GroupMap,
    }
}
</script>

<style>
</style>