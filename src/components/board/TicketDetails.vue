<template>
    <div class="ticket-details" @keyup.esc="closeTicketDetails" tabindex="0" ref="ticketDetails">
        <header>
            <textarea
                class="ticket-title"
                @input="expandTextareaEl()"
                ref="title"
                v-model="ticket.title"
                @blur="saveTicket"
                maxlength="140"
            />

            <button class="close-btn" @click="closeTicketDetails">
                <!-- <p class="bubble-msg">Press ESC to exit</p> -->
                <font-awesome-icon fas icon="times" class="close-btn-fa" />
            </button>
        </header>

        <main class="ticket-body">
            <section class="ticket-content">
                <ul class="labels-container clean-list">
                    <li
                        class="label"
                        v-for="label in ticketLabels"
                        :key="label.id"
                        :style="{backgroundColor: label.color}"
                    >{{ label.title }}</li>
                </ul>
                <section class="ticket-description">
                    <h3>Description</h3>
                    <textarea
                        v-model="ticket.description"
                        @blur="saveTicket"
                        placeholder="Add a description..."
                        class="ticket-description"
                    />
                </section>

                <ticket-attachments
                    :attachments="ticket.attachments"
                    @deleteAttachment="deleteAttachment"
                    @showAddAttachment="toggleAddAttachment()"
                />
                <!-- <section
                    class="ticket-attachments"
                    v-for="attachment in ticket.attacments"
                    :key="attachment.id"
                >{{ attachment }}</section>-->

                <ticket-checklists :ticket="ticket" @updateTicket="saveTicket" @addItem="addItem" />

                <ticket-comments
                    :comments="ticket.comments"
                    :user="user"
                    @addComment="addComment"
                    @updateTicket="saveTicket"
                />
            </section>

            <ticket-menu
                @deleteTicket="deleteTicket"
                :ticket="ticket"
                :labels="labels"
                @addChecklist="addChecklist"
                @updateTicketLabel="updateTicketLabel"
                @showAddAttachment="toggleAddAttachment()"
            />
        </main>
        <add-attachment
            v-if="showAddAttachment"
            @addAttachment="addAttachment"
            @hideAddAttachment="toggleAddAttachment"
        />
    </div>
</template>

<script>
import TicketMenu from "@/components/ticket/TicketMenu.vue";
import TicketChecklists from "@/components/ticket/TicketChecklists.vue";
import TicketComments from "@/components/ticket/TicketComments.vue";
import TicketAttachments from "@/components/ticket/TicketAttachments.vue";
import AddAttachment from "@/components/AddAttachment.vue";
import { boardService } from "@/services/board.service.js";
export default {
    props: ['ticket', 'groupId', 'user', 'labels'],
    data() {
        return {
            showAddAttachment: false,
        }
    },
    computed: {
        overlay() {
            return this.$store.getters.overlay;
        },
        ticketLabels() {
            const ticketLabels = this.ticket.labels.map(labelId =>
                this.labels.find(currLabel => labelId === currLabel.id));
            return { ...ticketLabels };
        }
    },
    created() {
        console.log('LOAD');
        this.$store.commit("showOverlay");
        this.$nextTick(() => this.$refs.ticketDetails.focus());
    },
    mounted() {
        this.$watch("overlay", function (newValue, oldValue) {
            this.closeTicketDetails();
        });
    },
    destroyed() {
        this.$store.commit("hideOverlay");
    },
    methods: {
        saveTicket() {
            this.$emit("saveTicket", this.ticket);
        },
        closeTicketDetails() {
            this.$emit("closeTicketDetails");
        },
        deleteTicket(ticketId) {
            this.$emit("deleteTicket", { ticketId, groupId: this.groupId });
        },
        expandTextareaEl() {
            const el = this.$refs.title;
            el.style.height = "";
            el.style.height = el.scrollHeight + "px";
        },
        addChecklist() {
            const newChecklist = boardService.getNewChecklist();
            this.ticket.checklists.push(newChecklist);
            this.$store.commit('setUserMessage', { msg: 'New checklist added to ticket' });
            this.saveTicket();
        },
        addItem({ itemTxt, checklistId }) {
            const newItem = boardService.getNewChecklistItem(itemTxt);
            const checklistIdx = this.ticket.checklists.findIndex(
                checklist => checklist.id === checklistId
            );
            this.ticket.checklists[checklistIdx].items.push(newItem);
            this.saveTicket();
        },
        addComment(commentText) {
            console.log(commentText);
            let newComment = boardService.getNewComment(commentText);
            this.ticket.comments.push(newComment);
            this.saveTicket();

        },
        changeComments(comments) {
            this.ticket.comments = comments;
            this.saveTicket();
        },
        updateTicketLabel(labelId) {
            const labels = this.ticket.labels;
            const labelIdx = labels.findIndex(label => label === labelId);
            if (labelIdx >= 0) labels.splice(labelIdx, 1);
            else labels.push(labelId);
            this.saveTicket();
        },
        toggleAddAttachment(isClosed) {
            this.showAddAttachment = isClosed;
        },
        addAttachment(src) {
            const newAttachment = boardService.getNewAttachment(src)
            this.ticket.attachments.push(newAttachment)
            this.toggleAddAttachment()
            this.saveTicket();
        },
        deleteAttachment(id) {
            const attachmentIdx = this.ticket.attachments.findIndex(attachment => attachment.id === id)
            if (attachmentIdx >= 0) {
                this.ticket.attachments.splice(attachmentIdx, 1)
                this.$store.commit('setUserMessage', { msg: 'Attachment deleted' });
            }
            this.saveTicket();
        }
    },
    components: {
        TicketMenu,
        TicketChecklists,
        TicketComments,
        TicketAttachments,
        AddAttachment
    }
};
</script>

<style>
</style>