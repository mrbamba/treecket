<template>
    <section class="dashboard">
        <tickets-by-week :board="board"/>
        <group-map :board="board" />
    </section>
</template>

<script>
import GroupMap from '@/components/board/charts/GroupMap.vue';
import TicketsByWeek from '@/components/board/charts/TicketsByWeek';

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
        TicketsByWeek
    }
}
</script>

<style>
</style>