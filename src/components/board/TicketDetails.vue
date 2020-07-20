<template>
    <div
        class="ticket-details"
        @keyup.esc="closeTicketDetails"
        tabindex="0"
        ref="ticketDetails"
    >
        <button class="close-btn" @click="closeTicketDetails">
            <font-awesome-icon class="comments-icon" fas icon="times" />
        </button>
        <div>
            <textarea
                @input="expandTextareaEl()"
                ref="title"
                v-model="ticket.title"
                @blur="saveTicket"
                maxlength="140"
                class="ticket-title"
            />
            <section>
                <h3>Description:</h3>
                <textarea
                    v-model="ticket.description"
                    @blur="saveTicket"
                    placeholder="Add a description..."
                    cols="30"
                    rows="10"
                    class="ticket-description"
                />
                <section
                    v-for="attachment in ticket.attacments"
                    :key="attachment.id"
                >
                    {{ attachment }}
                </section>

                <ticket-checklists
                    :ticket="ticket"
                    @updateTicket="saveTicket"
                    @addItem="addItem"
                />
            </section>
            <h4>Activity</h4>
            <div class="ticket-activity-selector">
                <h4>Show:</h4>

                <button>
                    <font-awesome-icon
                        class="comments-icon"
                        far
                        icon="comment"
                    />Comments
                </button>
                <button>
                    <font-awesome-icon
                        class="history-icon"
                        fas
                        icon="history"
                    />
                    History
                </button>
            </div>
            <ticket-comments
                :comments="ticket.comments"
                :user="user"
                @changeComments="changeComments"
            />
        </div>
        <ticket-menu
            @deleteTicket="deleteTicket"
            :ticket="ticket"
            @addChecklist="addChecklist"
        />
    </div>
</template>

<script>
import TicketMenu from "@/components/ticket/TicketMenu.vue";
import TicketChecklists from "@/components/ticket/TicketChecklists.vue";
import TicketComments from "@/components/ticket/TicketComments.vue";
import { boardService } from "@/services/board.service.js";
export default {
    props: ["ticket", "groupId","user"],
    computed: {
        overlay() {
            return this.$store.getters.overlay;
        }
    },
    created() {
        this.$store.commit("showOverlay");
        this.$nextTick(() => this.$refs.ticketDetails.focus());
    },
    mounted() {
        this.$watch("overlay", function(newValue, oldValue) {
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
            console.log("TicketDetails params:", ticketId, this.groupId);
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
        changeComments(comments) {
            this.ticket.comments = comments;
            this.saveTicket();
        }
    },
    components: {
        TicketMenu,
        TicketChecklists,
        TicketComments
    }
};
</script>

<style>
.done {
    text-decoration: line-through;
}
</style>