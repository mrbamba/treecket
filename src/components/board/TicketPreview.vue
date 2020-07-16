<template>
    <section @onclick.self="TicketClick(ticket.id)">
        <h4>
            {{ ticket.title }}
        </h4>
        <button @click.self="onTicketOptions(ticket.id)"></button>
    </section>
</template>

<script>
export default {
    props:['ticket'],
    methods: {
        TicketClick(id){
            console.log('show ticket');
        },
        onTicketOptions(id){
            console.log('show ticket editing options');
        }
    }
}
</script>

<style>

</style>