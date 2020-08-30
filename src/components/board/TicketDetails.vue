<template>
    <div class="ticket-details" @keyup.esc="closeTicketDetails" tabindex="0" ref="ticketDetails">
        <header>
            <input
                class="ticket-title"
                @input="expandTextareaEl()"
                ref="title"
                v-model="ticket.title"
                @blur="saveTicket"
                maxlength="75"
            />

            <button class="close-btn" @click="closeTicketDetails">
                <!-- <p class="bubble-msg">Press ESC to exit</p> -->
                <i class="fas fa-times" />
            </button>
        </header>

        <main class="ticket-body">
            <ticket-group-selector
            @moveTicket="moveTicket"
            :boardGroupsSummary="boardGroupsSummary"
            :currGroupSummary="currGroupSummary"
        />

        <div class="date-picker-title">
            <i class="far fa-clock" /> Due Date
        </div>
        <date-picker
            class="due-date-input"
            v-model="ticket.dueDate"
            type="date"
            placeholder="Pick due date"
            format="MMM-dd-yyyy"
            @change="saveTicket"
        ></date-picker>
            <section class="ticket-content" ref="ticketContent">
                <div class="ticket-content-top">
                    <ul class="labels-container clean-list" v-if="getTicketLabels.length > 0">
                        <li
                            class="label"
                            v-for="label in getTicketLabels"
                            :key="label.id"
                            :style="{backgroundColor: label.color}"
                        >{{ label.title }}</li>
                    </ul>
                    <div class="ticket-members">
                        <avatar
                            class="ticket-member-avatar"
                            v-for="member in ticket.members"
                            :key="member._id"
                            :username="member.fullName"
                            :src="member.imgSrc"
                            :size="32"
                        />
                    </div>
                </div>
                <section class="ticket-description">
                    <h3>
                        <i class="fas fa-align-left" /> Description
                    </h3>
                    <textarea
                        v-model="ticket.description"
                        @blur="saveTicket"
                        placeholder="Add a description..."
                        class="ticket-description"
                    />
                </section>

                <ticket-attachments
                    :ticket="ticket"
                    @deleteAttachment="deleteAttachment"
                    @makeCover="makeCover"
                    @changeCoverStatus="changeCoverStatus"
                />
                <!-- <section
                    class="ticket-attachments"
                    v-for="attachment in ticket.attacments"
                    :key="attachment.id"
                >{{ attachment }}</section>-->

                <ticket-checklists
                    :ticket="ticket"
                    @checklistDeleted="checklistDeleted"
                    @updateTicket="saveTicket"
                    @addItem="addItem"
                />
                <div class="log-selector">
                    <h3>Activity</h3>
                    <div class="ticket-activity-selector">
                        <span>Show:</span>
                        <button
                            @click="logView='Comments'"
                            :class="{ selected: logView==='Comments' }"
                        >
                            <i class="far fa-comment" /> Comments
                        </button>
                        <button
                            @click="logView='History'"
                            :class="{ selected: logView==='History' }"
                        >
                            <i class="fas fa-history" /> History
                        </button>
                    </div>
                </div>
                <ticket-comments
                    v-if="logView==='Comments'"
                    :comments="ticket.comments"
                    :user="user"
                    @updateTicket="saveTicket"
                />
                    <!-- @addComment="addComment" -->
                <div v-if="logView==='History'">
                    <ticket-history
                        v-for="activity in ticketActivities"
                        :key="activity.id"
                        :activity="activity"
                    />
                </div>
            <add-comment @addComment="addComment" />
            </section>
            <ticket-menu
                :ticket="ticket"
                :labels="labels"
                :boardMembers="boardMembers"
                :boardGroupsSummary="boardGroupsSummary"
                :currGroupSummary="currGroupSummary"
                @changeCoverStatus="changeCoverStatus"
                @moveTicket="moveTicket"
                @saveTicket="saveTicket"
                @toggleMember="toggleMember"
                @updateTicketLabel="updateTicketLabel"
                @addChecklist="addChecklist"
                @addAttachment="addAttachment"
                @cloneTicket="cloneTicket"
                @deleteTicket="deleteTicket"
            />            
        </main>
    </div>
</template>

<script>
import TicketMenu from "@/components/ticket/TicketMenu.vue";
import TicketChecklists from "@/components/ticket/TicketChecklists.vue";
import TicketComments from "@/components/ticket/TicketComments.vue";
import TicketAttachments from "@/components/ticket/TicketAttachments.vue";
import TicketHistory from '@/components/ticket/TicketHistory.vue';
import AddComment from '@/components/ticket/AddComment.vue';
import { boardService } from "@/services/board.service.js";
import { eventBus } from '@/services/event-bus.service.js';
import TicketGroupSelector from '@/components/ticket/menu/TicketGroupSelector';
import DatePicker from 'element-ui/lib/date-picker'
import Avatar from 'vue-avatar'

export default {
    props: {
        ticket: Object,
        ticketIdx: Number,
        groupId: String,
        user: Object,
        labels: Array,
        ticketActivities: Array,
        boardMembers: Array,
        boardGroupsSummary: Array,
        currGroupSummary: Object,
    },
    data() {
        return {
            logView: 'Comments',
            isAddingAllow: true

        }
    },
    computed: {
        overlay() {
            return this.$store.getters.overlay;
        },
        getTicketLabels() {
            const ticketLabels = this.ticket.labels.map(labelId =>
                this.labels.find(currLabel => labelId === currLabel.id));
            return ticketLabels;
        }
    },
    created() {
        this.$store.commit("toggleOverlay", true);
        this.$nextTick(() => this.$refs.ticketDetails.focus());
    },
    mounted() {
        this.$watch("overlay", function (newValue, oldValue) {
            this.closeTicketDetails();
        });
    },
    destroyed() {
        this.$store.commit("toggleOverlay", false);
    },
    methods: {
        saveTicket() {
            this.$emit("saveTicket", this.ticket);
        },
        closeTicketDetails() {
            this.$emit("closeTicketDetails");
        },
        deleteTicket(ticketId) {
            this.$emit('addActivity', `Deleted ticket ${this.ticket.title}`, this.ticket.id)

            this.$emit("deleteTicket", { ticketId, groupId: this.groupId });
            this.$emit("closeTicketDetails");
        },
        expandTextareaEl() {
            const el = this.$refs.title;
            el.style.height = "";
            el.style.height = el.scrollHeight + "px";
        },
        addChecklist() {
            if (!this.isAddingAllow) return
            this.isAddingAllow = false;
            const newChecklist = boardService.getNewChecklist();
            this.ticket.checklists.unshift(newChecklist);
            this.$store.commit('setUserMessage', { msg: 'New checklist added to ticket' });
            this.$emit('addActivity', `Added a checklist to ${this.ticket.title}`, this.ticket.id)

            this.saveTicket();
            eventBus.$emit('checklistAdded', newChecklist)
            this.isAddingAllow = true;
        },
        checklistDeleted(id) {
            this.$emit('addActivity', `Deleted a checklist on ${this.ticket.title}`, this.ticket.id)
        },
        addItem({ itemTxt, checklistId }) {
            const newItem = boardService.getNewChecklistItem(itemTxt);
            const checklistIdx = this.ticket.checklists.findIndex(
                checklist => checklist.id === checklistId
            );
            this.ticket.checklists[checklistIdx].items.push(newItem);
            this.$emit('addActivity', `Added checklist item \"${itemTxt}\" to ${this.ticket.title}`, this.ticket.id)

            this.saveTicket();

        },
        addComment(commentText) {
            let newComment = boardService.getNewComment(commentText);
            this.ticket.comments.push(newComment);
            this.$emit('addActivity', `Added comment \"${commentText}\" to ${this.ticket.title}`, this.ticket.id)

            this.saveTicket();
            this.$nextTick(() => this.$refs.ticketContent.scrollTop = this.$refs.ticketContent.scrollHeight);
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
        addAttachment(src) {
            const newAttachment = boardService.getNewAttachment(src)
            this.ticket.attachments.push(newAttachment)
            this.saveTicket();
            this.$emit('addActivity', `Added attachment ${src} to ${this.ticket.title}`, this.ticket.id)


        },
        deleteAttachment(id) {
            const attachmentIdx = this.ticket.attachments.findIndex(attachment => attachment.id === id)
            if (attachmentIdx >= 0) {
                this.$emit('addActivity', `Deleted attachment ${this.ticket.attachments[attachmentIdx].src} on ${this.ticket.title}`, this.ticket.id)

                this.ticket.attachments.splice(attachmentIdx, 1)
                this.$store.commit('setUserMessage', { msg: 'Attachment deleted' });
            }
            this.saveTicket();

        },
        makeCover(id) {
            this.ticket.cover = true;
            const attachmentIdx = this.ticket.attachments.findIndex(attachment => attachment.id === id);
            if (attachmentIdx >= 0) {
                this.$emit('addActivity', `Changed the cover on ${this.ticket.title}`, this.ticket.id)

                const attachment = this.ticket.attachments.splice(attachmentIdx, 1);
                this.ticket.attachments.unshift(attachment[0]);
                this.saveTicket();
            }
        },
        toggleMember(memberToUpdate) {
            const memberIdx = this.ticket.members.findIndex(member => member._id === memberToUpdate._id)
            if (memberIdx >= 0) {
                this.ticket.members.splice(memberIdx, 1)
                this.$emit('addActivity', `Removed ${memberToUpdate.fullName} from ticket ${this.ticket.title}`, this.ticket.id)
            } else {
                this.ticket.members.push(memberToUpdate)
                this.$emit('addActivity', `Assigned ${memberToUpdate.fullName} to ticket ${this.ticket.title}`, this.ticket.id)
            }

            this.saveTicket();
        },
        changeCoverStatus() {
            this.ticket.cover = !this.ticket.cover
            this.saveTicket();
        },
        cloneTicket(ticket) {
            this.$emit('addActivity', `Cloned ${this.ticket.title}`, this.ticket.id)
            this.$emit('cloneTicket', ticket, this.ticketIdx, this.groupId);
        },
        moveTicket(newGroupId) {
            this.$emit('moveTicket', newGroupId)
        },
    },
    components: {
        TicketMenu,
        TicketChecklists,
        TicketComments,
        TicketAttachments,
        TicketHistory,
        Avatar,
        AddComment,
        TicketGroupSelector,
        DatePicker
    }
};
</script>

<style>
</style>