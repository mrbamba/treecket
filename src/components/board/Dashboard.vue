<template>
    <section class="dashboard">
        <button @click="closeDashboard" class="close-dashboard-btn">
            <i class="fas fa-times" />
        </button>
        <h2>Dashboard</h2>
        <tickets-by-week :board="board" />
        <tickets-per-group :board="board" />
    </section>
</template>

<script>
import TicketsPerGroup from '@/components/board/charts/TicketsPerGroup.vue';
import TicketsByWeek from '@/components/board/charts/TicketsByWeek';

export default {
    name: "Dashboard",
    props: {
        board: {
            type: Object,
            require: true
        },
    },
    methods: {
        closeDashboard() {
            this.$emit('closeDashboard')
        }
    },
    components: {
        TicketsPerGroup,
        TicketsByWeek
    }
}
</script>

<style>
</style>