<template>
    <div class="ticket-menu">
        <h3>ADD TO CARD</h3>
        <!-- <member-selector
            v-if="show.memberSelector"
            @click="show.memberSelector=!show.memberSelector"
        >Members</member-selector>-->
        <button @click="toggleLabelsPalet">
            <font-awesome-icon class="labels-icon fa-button" fas icon="tag" />Labels
        </button>
        <labels v-show="isPaleltShow" @labelClicked="labelClicked" :labels="labels" />
        <button @click="onAddChecklist">
            <font-awesome-icon class="checklist-icon fa-button" fas icon="tasks" />Checklist
        </button>
        <button>
            <font-awesome-icon class="due-date-icon fa-button" fas icon="stopwatch" />Due Date
        </button>
        <button @click="showAddAttachment">
            <font-awesome-icon class="attachment-icon fa-button" fas icon="paperclip" />Attachment
        </button>
        <button @click.stop="changeCoverStatus">Cover</button>

        <h3>ACTIONS</h3>
        <button>Move</button>
        <button>Copy</button>
        <button>Watch</button>
        <button>Share</button>
        <button @click.stop="onTicketDelete(ticket.id)">&#128465; Delete</button>
    </div>
</template>

<script>
import MemberSelector from "@/components/ticket/menu/MemberSelector.vue";
import LabelSelector from "@/components/ticket/menu/LabelSelector.vue";
import ChecklistCreator from "@/components/ticket/menu/ChecklistCreator.vue";
import DateSelector from "@/components/ticket/menu/DateSelector.vue";
import AttachmentTool from "@/components/ticket/menu/AttachmentTool.vue";
import CoverTool from "@/components/ticket/menu/CoverTool.vue";
import labels from "@/components/board/labels.vue";
export default {
    name: "TicketMenu",
    props: {
        ticket: {
            type: Object,
            required: true
        },
        labels: {
            type: Array,
            required: true
        }
        // users: {
        //     type: Array,
        //     require: true
        // },
        // show: {
        //     memberSelector: false,
        //     labelSelector: false,
        //     checklistCreator: false,
        //     dateSelector: false,
        //     attachmentTool: false,
        //     coverTool: false
        // }
    },
    data() {
        return {
            isPaleltShow: false
        }
    },
    methods: {
        onTicketDelete(ticketId) {
            this.$emit("deleteTicket", ticketId);
        },
        onAddChecklist() {
            this.$emit("addChecklist");
        },
        toggleLabelsPalet() {
            this.isPaleltShow = !this.isPaleltShow
        },
        labelClicked(labelId) {
            this.$emit('updateTicketLabel', labelId)
        },
        showAddAttachment() {
            this.$emit('showAddAttachment')
        },
        changeCoverStatus() {
            this.$emit('changeCoverStatus')
        }
    },
    components: {
        MemberSelector,
        LabelSelector,
        ChecklistCreator,
        DateSelector,
        AttachmentTool,
        CoverTool,
        labels
    }
};
</script>

<style>
</style>