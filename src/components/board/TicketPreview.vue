<template>
    <section @click="TicketClick(ticket)" class="ticket-preview">
        <div :style="{backgroundColor: ticket.color}">{{ ticket.title }}</div>
        <!-- <button @click.stop="onTicketOptions(ticket.id)">/</button> -->
    </section>
</template>

<script>
export default {
    props: ['ticket'],
    methods: {
        TicketClick(ticket) {
            this.$emit('openTicket', ticket);
        },

        onTicketOptions(id) {
            console.log('ticket id', id);
            console.log('show ticket editing options');
        }
    },
    created() {
    }
}
</script>

<style>
</style>