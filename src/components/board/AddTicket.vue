<template>
    <div>
        <form @submit.prevent="addTicket" v-if="showAddTicket">
            <input
                class="minimal-input"
                @blur="onBlur"
                @keyup.enter="addTicket"
                v-model="ticketTitle"
                ref="newTicketTitle"
                rows="2"
                maxlength="75"
                placeholder="Enter a title for this ticket..."
            />
            <button type="submit" data-prevent-blur="add" class="add-button">Add Ticket</button>
            <button
                type="button"
                @click.stop="toggleAddTicket"
                data-prevent-blur="close"
                class="cancel-button"
            >Cancel</button>
        </form>
        <button class="add-ticket-btn" @click.stop="toggleAddTicket" v-else>
            <span>+</span>
            <span>Add another ticket</span>
        </button>
    </div>
</template>

<script>
import { boardService } from "@/services/board.service.js";
import { eventBus } from '@/services/event-bus.service.js';
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
            this.showAddTicket = (this.showAddTicket) ? false : true;
            this.ticketTitle = '';
            if (this.showAddTicket) this.$nextTick(() => this.$refs.newTicketTitle.focus());
        },

        addTicket() {
            if (this.ticketTitle) {
                const ticket = boardService.getNewTicket(this.ticketTitle);
                this.$emit('emitAddTicket', {
                    ticket,
                    groupId: this.group.id
                });
                this.ticketTitle = '';
            }
        },

        onBlur(ev) {
            if (ev.relatedTarget) {
                if (ev.relatedTarget.dataset.preventBlur === this.group.id) return
                else if (ev.relatedTarget.dataset.preventBlur === 'close') {
                    this.toggleAddTicket();
                    return;
                } else if (ev.relatedTarget.dataset.preventBlur === 'add') {
                    this.addTicket();
                    this.$refs.newTicketTitle.focus()
                    return;
                }
            } else {
                if (this.ticketTitle) {
                    this.addTicket();
                }
            }
            this.toggleAddTicket();
        },
    },
    created() {
        eventBus.$on('onAddTicket', (groupId) => {
            if (groupId === this.group.id) this.toggleAddTicket()
        })
    }
}
</script>

<style>
</style>