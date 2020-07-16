<template>
    <section>
        <section>
        <h5>{{ group.name }}</h5>
        <button class="optionsButton"></button>
        </section>
        <ticket-preview v-for="ticket in group.tickets" :key="ticket.id" :ticket="ticket" />
        <button>Add another card</button>      
    </section>
</template>

<script>
import ticketPreview from './TicketPreview.vue'
export default {
    props:['group']
}
</script>

<style>
    .optionsButton::before {
        content: "\E94E";
    }
</style>