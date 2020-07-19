<template>
    <section class="ticket-group">
        <section>
            <div class="group-header">
                <h3>{{ group.title }}</h3>
                <h4>{{ group.tickets.length }}</h4>
                <button>☰</button>
            </div>
        </section>

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

        <div v-if="showAddTicket">
            <textarea
                ref="addTicket"
                @blur="toggleAddTicket"
                @keyup="addTicket"
                v-model="ticketTitle"
                cols="30"
                rows="5"
                placeholder="Enter a title for this ticket"
            />
            <button @click.stop="addTicket">Add Ticket</button>
            <button @click.stop="toggleAddTicket">X</button>
        </div>
        <button class="add-ticket-btn" @click.stop="toggleAddTicket" v-else> + Add another ticket</button>
    </section>
</template>

<script>
import TicketPreview from "./TicketPreview.vue";
import { boardService } from "@/services/board.service.js";

import { Container, Draggable } from 'vue-smooth-dnd'
import { applyDrag, generateItems } from '@/services/dnd.service.js'

export default {
    name: 'TicketGroup',
    props: ["group"],
    data() {
        return {
            ticketTitle: "",
            showAddTicket: false,
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
            this.$emit("openTicket", { ticket, groupId: this.group.id });
        },
        toggleAddTicket() {
            this.showAddTicket = !this.showAddTicket;
        },
        addTicket(ev) {
            if (ev.key === 'Enter' || !ev.key){
                const newTicket = boardService.getNewTicket(this.ticketTitle);
                this.$emit("addTicket", {
                    ticket: newTicket,
                    groupId: this.group.id
                });
                this.ticketTitle = "";
                this.showAddTicket = false;
            }
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
        getTicketPayload(idx) {
            return this.group.tickets[idx];
        }
    },
    components: {
        TicketPreview,
        Container,
        Draggable
    }
};
</script>