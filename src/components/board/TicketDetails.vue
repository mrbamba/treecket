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
                    @makeCover="makeCover"
                />
                <!-- <section
                    class="ticket-attachments"
                    v-for="attachment in ticket.attacments"
                    :key="attachment.id"
                >{{ attachment }}</section>-->

                <ticket-checklists :ticket="ticket" @updateTicket="saveTicket" @addItem="addItem" />
                <div class="log-selector">
                    <h4>Activity</h4>
                    <div class="ticket-activity-selector">
                        <h4>Show:</h4>
                        <button @click="logView='Comments'">
                            <font-awesome-icon class="comments-icon" far icon="comment" />Comments
                        </button>
                        <button @click="logView='History'">
                            <font-awesome-icon class="history-icon" fas icon="history" />History
                        </button>
                    </div>
                </div>
                <ticket-comments
                    v-if="logView==='Comments'"
                    :comments="ticket.comments"
                    :user="user"
                    @addComment="addComment"
                    @updateTicket="saveTicket"
                />
                <div v-if="logView==='History'">
                    <ticket-history
                        v-for="activity in ticketActivities"
                        :key="activity.id"
                        :activity="activity"
                    />
                </div>
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
import TicketHistory from '@/components/ticket/TicketHistory.vue';
import AddAttachment from "@/components/ticket/AddAttachment.vue";
import { boardService } from "@/services/board.service.js";
export default {
    props: {
        ticket: Object,
        groupId: String,
        user: Object,
        labels: Array,
        ticketActivities: Array
    },
    // ['ticket', 'groupId', 'user', 'labels', 'ticketActivities'],
    data() {
        return {
            showAddAttachment: false,
            logView: 'Comments',

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
        },
    },
    created() {
        console.log('LOAD');
        this.$store.commit("showOverlay");
        this.$nextTick(() => this.$refs.ticketDetails.focus());
        console.log('Ticket activities', this.ticketActivities);
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
            this.addActivity(`Deleted ticket ${this.ticket.id}`)
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
            this.addActivity(`Added a checklist to ticket: ${this.ticket.id}`)

        },
        addItem({ itemTxt, checklistId }) {
            const newItem = boardService.getNewChecklistItem(itemTxt);
            const checklistIdx = this.ticket.checklists.findIndex(
                checklist => checklist.id === checklistId
            );
            this.ticket.checklists[checklistIdx].items.push(newItem);
            this.saveTicket();
            this.addActivity(`Added checklist item: \"${itemTxt}\" to ticket: ${this.ticket.id}`)

        },
        addComment(commentText) {
            console.log(commentText);
            let newComment = boardService.getNewComment(commentText);
            this.ticket.comments.push(newComment);
            this.saveTicket();
            this.addActivity(`Added comment: \"${commentText}\" to ticket: ${this.ticket.id}`)


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
        toggleAddAttachment() {
            this.showAddAttachment = !this.showAddAttachment;
        },
        addAttachment(src) {
            const newAttachment = boardService.getNewAttachment(src)
            this.ticket.attachments.push(newAttachment)
            this.toggleAddAttachment()
            this.saveTicket();
            this.addActivity(`Added attachment: ${src} to ticket: ${this.ticket.id}`)

        },
        deleteAttachment(id) {
            this.addActivity(`Deleted attachment: ${this.ticket.attachments[attachmentIdx].src} to ticket: ${this.ticket.id}`)
            const attachmentIdx = this.ticket.attachments.findIndex(attachment => attachment.id === id)
            if (attachmentIdx >= 0) {
                this.ticket.attachments.splice(attachmentIdx, 1)
                this.$store.commit('setUserMessage', { msg: 'Attachment deleted' });
            }
            this.saveTicket();

        },
        addActivity(text) {
            this.$nextTick(() => {
                let newActivity = {};
                newActivity.text = text;
                newActivity.ticketId = this.ticket.id;
                this.$emit('addActivity', newActivity)
            })
        },
        makeCover(id) {
            const attachmentIdx = this.ticket.attachments.findIndex(attachment => attachment.id === id)
            if (attachmentIdx >= 0) {
                const attachment = this.ticket.attachments.splice(attachmentIdx, 1)
                this.ticket.attachments.unshift(attachment[0])
                this.saveTicket()
            }
        }
    },
    components: {
        TicketMenu,
        TicketChecklists,
        TicketComments,
        TicketAttachments,
        AddAttachment,
        TicketHistory,
    }
};
</script>

<style>
</style>