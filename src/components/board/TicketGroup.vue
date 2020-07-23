<template>
    <div class="ticket-group">
        <header>
            <div class="group-header">
                <div v-if="!editTitle" @click="onEditTitle">
                    <h3>{{ group.title }}</h3>
                    {{ ticketsInGroupCount }}
                </div>
                <div v-else>
                    <input
                        @blur="updateGroupTitle"
                        type="text"
                        v-model="group.title"
                        v-on:keyup.enter="updateGroupTitle"
                        class="minimal-input"
                        ref="updatedGroupTitle"
                    />
                </div>
                <button>
                    <font-awesome-icon fas icon="ellipsis-h" />
                    <group-menu :group="group" @cloneGroup="cloneGroup" />
                </button>
            </div>
        </header>

        <div class="tickets-container">
            <container
                group-name="col"
                @drop="onTicketDrop"
                :get-child-payload="getTicketPayload"
                drag-class="card-ghost"
                drop-class="card-ghost-drop"
                :drop-placeholder="dropPlaceholderOptions"
            >
                <Draggable v-for="ticket in group.tickets" :key="ticket.id">
                    <ticket-preview
                        @changeLabelsDisplay="changeLabelsDisplay"
                        :ticket="ticket"
                        :labels="labels"
                        :showFullLabel="showFullLabels"
                    />
                </Draggable>
            </container>
        </div>

        <footer>
            <add-ticket :group="group" @emitAddTicket="addTicket" class="add-ticket" />
        </footer>
    </div>
</template>

<script>
import TicketPreview from "./TicketPreview.vue";
import AddTicket from "./AddTicket.vue";
import GroupMenu from '@/components/GroupMenu.vue'
import { boardService } from "@/services/board.service.js";
import { Container, Draggable } from 'vue-smooth-dnd'
import { applyDrag, generateItems } from '@/services/dnd.service.js'

export default {
    name: 'TicketGroup',
    props: ['group', 'labels', 'showFullLabels', 'groupIdx'],
    data() {
        return {
            newGroup: this.group,
            editTitle: false,

            dropPlaceholderOptions: {
                className: "drop-preview",
                animationDuration: "150",
                showOnTop: true
            }
        };
    },
    methods: {
        onEditTitle() {
            this.editTitle = true;
            this.$nextTick(() => this.$refs.updatedGroupTitle.focus());

        },
        updateGroupTitle() {
            this.editTitle = false
            this.$emit('updateGroup', this.group)
        },
        changeLabelsDisplay() {
            this.$emit('changeLabelsDisplay')
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
        
        cloneGroup(group) {
            this.$emit('cloneGroup', group, this.groupIdx)

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
        },
        // doDrag(ev) {
        //     console.log(ev)
        // }
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
        AddTicket,
        GroupMenu
    }
};
</script>