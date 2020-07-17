<template>
    <section @click="TicketClick(ticket)" class="ticket-preview">
        <div :style="{backgroundColor: ticket.color}">{{ ticket.title }}</div>
    </section>
</template>

<script>
export default {
    props: ['ticket'],
    methods: {
        TicketClick(ticket) {
            this.$emit('openTicket', ticket);
        },
    },
    created() {
    }
}
</script>

<style>
</style>