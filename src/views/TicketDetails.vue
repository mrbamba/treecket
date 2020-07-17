<template>
    <div>
        <button @click="toggleTicketDetails">X</button>
        <h3>{{ ticket.title }}</h3>
        <section>
            <h3>Description:</h3>
            <textarea v-model="description" @blur="saveDescription" name="" id="" cols="30" rows="10">
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
        <ticket-menu @deleteTicket="emitDeleteTicket" :ticket="ticket" :groupId="groupId"/>
    </div>
</template>

<script>
import TicketMenu from "@/components/ticket/TicketMenu.vue";
export default {
    props: ['ticket', 'groupId'],
    data(){
        return {
            description: this.ticket.description
        }
    },
    components: {
        TicketMenu
    },
    methods: {
        saveDescription(){
            this.ticket.description = this.description
            this.$emit('ticketSaved', this.ticket)
        },

        toggleTicketDetails(){
            this.$emit('closeTicket', {ticket: null, groupId: ''})
        },

        emitDeleteTicket(id){
            this.$emit('deleteTicket', id)
        }
    },

    created(){
    }
}
</script>

<style>
    .done{
        text-decoration: line-through;
    }
</style>