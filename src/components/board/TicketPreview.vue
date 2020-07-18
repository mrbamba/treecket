<template>
    <section @click="openTicket(ticket)" class="ticket-preview">
        <div :style="{backgroundColor: ticket.color}">{{ ticket.title }}</div>
    </section>
</template>

<script>
export default {
    props: ['ticket'],
    methods: {
        openTicket(ticket) {
            const newPath = `/board/${this.$route.params.boardId}/ticket/${ticket.id}`;
            
            if (this.$route.path !== newPath) {
                this.$router.push(newPath);
            }
        },
    },
    created() {
    }
}
</script>

<style>
</style>