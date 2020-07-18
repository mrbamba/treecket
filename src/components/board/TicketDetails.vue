<template>
    <div>
        <button @click="closeTicketDetails">X</button>
        <h3>{{ ticket.title }}</h3>
        <section>
            <h3>Description:</h3>
            <textarea v-model="ticket.description" @blur="saveTicket" name="" id="" cols="30" rows="10">
            </textarea>
            <section v-for="attachment in ticket.attacments" :key="attachment.id">
                {{ attachment }}
            </section>
            <section v-for="checklist in ticket.checklists" :key="checklist.id">
                Checklist id: {{ checklist.id }}
                <ul>
                    <li v-for="(item, idx) in checklist.items" :key="idx">
                        <input type="checkbox" v-model="item.isDone" />
                        <h4 :class="{done: item.isDone}">{{ item.txt }}</h4>
                    </li>
                </ul>
            </section>
        </section>
        <ticket-menu @deleteTicket="deleteTicket" :ticket="ticket" />
    </div>
</template>

<script>
import TicketMenu from "@/components/ticket/TicketMenu.vue";
export default {
    props: ['ticket', 'groupId'],
    // data(){
        // return {
        //     description: this.ticket.description
        // }
    // },
    components: {
        TicketMenu
    },
    methods: {
        saveTicket(){
            this.$emit('saveTicket', this.ticket)
        },
        closeTicketDetails(){
            this.$emit('closeTicketDetails')
        },
        deleteTicket(ticketId){
            console.log('TicketDetails params:', ticketId, this.groupId)
            this.$emit('deleteTicket', { ticketId, groupId: this.groupId })
        }
    }
}
</script>

<style>
    .done{
        text-decoration: line-through;
    }
</style>