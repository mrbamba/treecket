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
            @drop="e => onCardDrop(group.id, e)"
            :get-child-payload="getTicketPayload"
            :drop-placeholder="dropPlaceholderOptions"
        >
            <Draggable v-for="ticket in group.tickets" :key="ticket.id">
                <ticket-preview :ticket="ticket" />
            </Draggable>
        </container>

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
import TicketPreview from "./TicketPreview.vue";
import { boardService } from "@/services/board.service.js";

import { Container, Draggable } from 'vue-smooth-dnd'
import { applyDrag, generateItems } from '@/services/dnd.service.js'

export default {
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
        onAddTicket() {
            this.showAddTicket = true;
        },
        onCloseTicket() {
            this.showAddTicket = false;
        },
        addTicket() {
            const newTicket = boardService.getNewTicket(this.ticketTitle);
            this.$emit("addTicket", {
                ticket: newTicket,
                groupId: this.group.id
            });
            this.ticketTitle = "";
            this.showAddTicket = false;
        },
        onCardDrop(groupId, dropResult) {
            var newBoard = applyDrag(_.cloneDeep(this.group.tickets), dropResult);
            if (
                dropResult.removedIndex !== null ||
                dropResult.addedIndex !== null
            ) {
                this.$emit("updateBoard", newBoard);
                // const scene = Object.assign({}, this.scene);
                // const column = scene.children.filter(p => p.id === columnId)[0];
                // const columnIndex = scene.children.indexOf(column);
                // const newColumn = Object.assign({}, column);
                // newColumn.children = applyDrag(newColumn.children, dropResult);
                // scene.children.splice(columnIndex, 1, newColumn);
                // this.scene = scene;
            }
        },
        getTicketPayload(idx) {
            console.log({idx})
            return this.group.tickets[idx];
        }
    },
    props: ["group"],
    components: {
        TicketPreview,
        Container, 
        Draggable 
    }
};
</script>