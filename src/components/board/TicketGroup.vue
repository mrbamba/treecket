<template>
    <section class="ticket-group">
        <section>
            <div class="group-header">
                <h3>{{ group.title }}</h3>
                <h4>{{ group.tickets.length }}</h4>
                <button>☰</button>
            </div>
        </section>
        <ticket-preview
            v-for="ticket in group.tickets"
            :key="ticket.id"
            :ticket="ticket"
        />
        <div v-if="showAddTicket">
            <textarea
                v-model="ticketTitle"
                cols="30"
                rows="5"
                placeholder="Enter a title for this ticket"
            />
            <button @click.stop="addTicket">Add Ticket</button>
            <button @click.stop="onCloseTicket">X</button>
        </div>
        <button @click.stop="onAddTicket" v-else>Add another Ticket</button>
    </section>
</template>

<script>
import TicketPreview from './TicketPreview.vue';
import { boardService } from "@/services/board.service.js";
export default {
    data() {
        return {
            ticketTitle: '',
            showAddTicket: false,
            newGroup: this.group
        };
    },

    methods: {
        emitOpenTicket(ticket) {
            this.$emit("openTicket", { ticket, groupId: this.group.id });
        },
        onAddTicket() {
            this.showAddTicket = true;
        },
        onCloseTicket() {
            this.showAddTicket = false;
        },
        addTicket() {
            const newTicket = boardService.getNewTicket(this.ticketTitle);
            this.$emit('addTicket', { ticket: newTicket, groupId: this.group.id });
            this.ticketTitle = '';
            this.showAddTicket = false;

        }
    },
    props: ["group"],
    components: {
        TicketPreview
    }
};
</script>