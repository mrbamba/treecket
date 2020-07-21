<template>
    <div>
    <div v-if="showAddTicket">
        <textarea
            @blur="onBlur"
            @keyup.enter="addTicket"
            v-model="ticketTitle"
            ref="newTicketTitle"
            cols="30"
            rows="5"
            placeholder="Enter a title for this ticket..."
        />
        <button @click.stop="addTicket" data-prevent-blur="add" class="add-button">Add Ticket</button>
        <button @click.stop="toggleAddTicket" data-prevent-blur="close" class="cancel-button">Cancel</button>
    </div>
    <button class="add-ticket-btn" @click.stop="toggleAddTicket" v-else>
        <span>+</span> <span>Add another ticket</span></button>
    </div>
</template>

<script>
import { boardService } from "@/services/board.service.js";
export default {
    props: ['group'],
    data() {
        return {
            ticketTitle: '',
            showAddTicket: false,
        }
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
            this.$emit('emitAddTicket', {
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
    }

}
</script>

<style>
</style>