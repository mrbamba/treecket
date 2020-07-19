<template>
    <div class="ticket-details">
        <button class="close-btn" @click="closeTicketDetails">X</button>
        <div>
        <textarea @input="expandTextareaEl()" ref="title" v-model="ticket.title" @blur="saveTicket" maxlength="140" />
        <section>
            <h3>Description:</h3>
            <textarea v-model="ticket.description" @blur="saveTicket" placeholder="Enter your ticket description"
            cols="30" rows="10"/>
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
        </div>
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
        },
        expandTextareaEl(){
            const el = this.$refs.title;
            el.style.height = ""; el.style.height = el.scrollHeight + "px"
        }
    }
}
</script>

<style>
    .done{
        text-decoration: line-through;
    }
</style>