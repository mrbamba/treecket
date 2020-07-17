<template>
    <section>
        <section>
            <h5>{{ group.title }}</h5>
            <button>☰</button>
        </section>
        <ticket-preview
            v-for="ticket in group.tickets"
            :key="ticket.id"
            :ticket="ticket"
            @openTicket="emitOpenTicket"
        />
        <div v-if="isOnAddingTicket">
            <textarea
                v-model="ticketTitle"
                name
                id
                cols="30"
                rows="10"
                placeholder="Enter a title for this ticket"
            />
            <button @click.stop="addTicket">Add Ticket</button>
            <button @click.stop="onCloseTicket">X</button>
        </div>
        <button @click.stop="onAddTicket" v-else>Add another card</button>
    </section>
</template>

<script>
import TicketPreview from './TicketPreview.vue';
import { boardService } from "@/services/board.service.js";
export default {
    data() {
        return {
            ticketTitle: '',
            isOnAddingTicket: false,
            newGroup: this.group
        };
    },

    methods: {
        emitOpenTicket(ticket) {
            this.$emit("openTicket", ticket);
        },

        onAddTicket() {
            this.isOnAddingTicket = true;
        },

        onCloseTicket() {
            this.isOnAddingTicket = false;
        },

        addTicket() {
            const newTicket = boardService.getNewTicket(this.ticketTitle);
            this.$emit('addTicket', { ticket: newTicket, groupId: this.group.id });
            this.ticketTitle = '';
            this.isOnAddingTicket = false;

        }
    },
    props: ["group"],
    components: {
        TicketPreview
    }
};
</script>

<style>
</style>