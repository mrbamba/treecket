<template>
    <section class="ticket-group">
        <header>
            <div class="group-header">
                <div><h3>{{ group.title }}</h3> {{ ticketsInGroupCount }}</div>
                <button><font-awesome-icon fas icon="ellipsis-h" /></button>
            </div>
        </header>

        <container
            group-name="col"
            @drop="onTicketDrop"
            :get-child-payload="getTicketPayload"
            drag-class="card-ghost"
            drop-class="card-ghost-drop"
            :drop-placeholder="dropPlaceholderOptions">

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

            dropPlaceholderOptions: {
                className: "drop-preview",
                animationDuration: "150",
                showOnTop: false
            }
        };
    },
    methods: {
        toggleAddTicket() {
            this.showAddTicket = !this.showAddTicket;
            this.ticketTitle = '';
            if (this.showAddTicket) setTimeout(() => { this.$refs.newTicketTitle.focus() }, 0)
        },
        addTicket() {
            if (!this.ticketTitle) return;
            const ticket = boardService.getNewTicket(this.ticketTitle);
            this.$emit('addTicket', {
                ticket,
                groupId: this.group.id
            });
            this.ticketTitle = '';
        },
        onBlur(ev) {
            if (ev.relatedTarget) {
                if (ev.relatedTarget.dataset.preventBlur === 'close') {
                    this.toggleAddTicket();
                    return;
                } else if (ev.relatedTarget.dataset.preventBlur === 'add') {
                    this.addTicket();
                    this.$refs.newTicketTitle.focus()
                    return;
                }
            };
            if (!this.ticketTitle) {
                this.ticketTitle = '';
            } else {
                this.addTicket();
            }
            this.toggleAddTicket();
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
        addTicket({ ticket, groupId }) {
            this.$emit('addTicket', { ticket, groupId });
        },
        getTicketPayload(idx) {
            return this.group.tickets[idx];
        }
    },
    computed: {
        ticketsInGroupCount() {
            return (this.group.tickets.length) ? this.group.tickets.length : '';
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