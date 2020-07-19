<template>
    <section class="ticket-group">
        <header>
            <div class="group-header">
                <h3>{{ group.title }}</h3>
                <h4>{{ group.tickets.length }}</h4>
                <button>☰</button>
            </div>
        </header>

        <container
            group-name="col"
            @drop="onTicketDrop"
            :get-child-payload="getTicketPayload"
            drag-class="card-ghost"
            drop-class="card-ghost-drop"
            :drop-placeholder="dropPlaceholderOptions"
        >
            <Draggable v-for="ticket in group.tickets" :key="ticket.id">
                <ticket-preview :ticket="ticket" />
            </Draggable>
        </container>
        <add-ticket :group="group" @emitAddTicket="addTicket" />
    </section>
</template>

<script>
import TicketPreview from "./TicketPreview.vue";
import AddTicket from "./AddTicket.vue";
import { boardService } from "@/services/board.service.js";

import { Container, Draggable } from 'vue-smooth-dnd'
import { applyDrag, generateItems } from '@/services/dnd.service.js'

export default {
    name: 'TicketGroup',
    props: ["group"],
    data() {
        return {
            newGroup: this.group,

            upperDropPlaceholderOptions: {
                className: "cards-drop-preview",
                animationDuration: "150",
                showOnTop: true
            },
            dropPlaceholderOptions: {
                className: "drop-preview",
                animationDuration: "150",
                showOnTop: true
            }
        };
    },
    methods: {
        emitOpenTicket(ticket) {
            this.$emit('openTicket', { ticket, groupId: this.group.id });
        },

        onTicketDrop(dropResult) {
            const newTickets = applyDrag(this.group.tickets, dropResult);
            if (
                (dropResult.removedIndex >= 0 && dropResult.removedIndex !== null) ||
                (dropResult.addedIndex >= 0 && dropResult.addedIndex !== null)
            ) {
                this.$emit('updateTickets', { newTickets, groupId: this.group.id })
            }
        },
        addTicket({ticket, groupId}) {
            this.$emit('addTicket', {
                ticket,
                groupId
            });
        },
        getTicketPayload(idx) {
            return this.group.tickets[idx];
        }
    },
    components: {
        TicketPreview,
        Container,
        Draggable,
        AddTicket
    }
};
</script>