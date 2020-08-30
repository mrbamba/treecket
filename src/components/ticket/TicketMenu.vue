<template>
    <div class="ticket-menu">
        <!-- <ticket-group-selector
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
        ></date-picker> -->
        <!-- <button class="clear-due-date-btn" v-if="ticket.dueDate" @click="clearDueDate">Clear Due Date</button> -->

        <h3 class="add-to-card-title">ADD TO CARD</h3>

        <button data-txt="Member" class="member-selector-btn content-after" @click="show.memberSelector=!show.memberSelector">
            <i class="far fa-user" />
        </button>
        <MemberSelector
            v-if="show.memberSelector"
            :boardMembers="boardMembers"
            :ticketMembers="ticket.members"
            @toggleMember="toggleMember"
            @closeMemberSelect="show.memberSelector=false"
        />
        <button data-txt="Label" class="label-selector content-after" @click="show.labelSelector=!show.labelSelector">
            <i class="fas fa-tag" />
        </button>
        <label-selector
            v-show="show.labelSelector"
            @labelClicked="labelClicked"
            @closeLabelSelector="show.labelSelector=false"
            :labels="labels"
        />
        <button data-txt="Checklist" class="add-checklist-btn content-after" @click="onAddChecklist">
            <i class="far fa-check-square" />
        </button>

        <button data-txt="Attachment" class="add-attachment-btn content-after" @click="show.addAttachment=!show.addAttachment">
            <i class="fas fa-paperclip" />
        </button>
        <add-attachment
            v-if="show.addAttachment"
            @addAttachment="addAttachment"
            @closeAddAttachment="show.addAttachment=false"
        />
        <button data-txt="Background" class="background-btn content-after">
            <i class="fas fa-palette" />
        </button>

        <h3 class="actions-title">ACTIONS</h3>
        <button data-txt="Clone" class="clone-btn content-after" @click="onClone">
            <i class="far fa-clone"></i>
        </button>
        <button data-txt="Share" class="share-btn content-after">
            <i class="fas fa-share-alt" />
        </button>
        <button data-txt="Delete" class="delete-btn content-after" @click.stop="onTicketDelete(ticket.id)">
            <i class="far fa-trash-alt" />
        </button>
    </div>
</template>

<script>
import MemberSelector from "@/components/ticket/menu/MemberSelector.vue";
import LabelSelector from "@/components/ticket/menu/LabelSelector.vue";
// import ChecklistCreator from "@/components/ticket/menu/ChecklistCreator.vue";
import BackgroundPalette from '@/components/BackgroundPalette'
// import AttachmentTool from "@/components/ticket/menu/AttachmentTool.vue";
// import CoverTool from "@/components/ticket/menu/CoverTool.vue";
// import labels from "@/components/board/labels.vue";
import AddAttachment from "@/components/ticket/AddAttachment.vue";
import TicketGroupSelector from '@/components/ticket/menu/TicketGroupSelector';
import DatePicker from 'element-ui/lib/date-picker'



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
        },
        boardMembers: {
            type: Array,
            require: true
        },
        currTicketGroup: {
            type: String,
            require: true
        },
        groupsSummary: {
            type: Array,
            require: true
        },
        boardGroupsSummary: {
            type: Array,
            require: true
        },
        currGroupSummary: {
            type: Object,
            require: true
        }

    },
    data() {
        return {
            show: {
                memberSelector: false,
                labelSelector: false,
                checklistCreator: false,
                dateSelector: false,
                addAttachment: false,
                coverTool: false,
                dueDate: false,
            }
        }
    },
    methods: {
        onTicketDelete(ticketId) {
            this.$emit("deleteTicket", ticketId);
        },
        onAddChecklist() {
            this.$emit("addChecklist");
        },
        labelClicked(labelId) {
            this.$emit('updateTicketLabel', labelId)
        },
        loadUsers(userFilterBy) {
            this.$emit('loadUsers', userFilterBy)
        },
        toggleMember(member) {
            this.$emit('toggleMember', member)
        },
        changeCoverStatus() {
            this.$emit('changeCoverStatus')
        },
        onClone() {
            this.$emit('cloneTicket', this.ticket)
        },
        saveTicket() {
            this.$emit('saveTicket')
        },
        addAttachment(src) {
            this.$emit('addAttachment', src)
        },
        moveTicket(newGroupId) {
            this.$emit('moveTicket', newGroupId)
        },
        clearDueDate() {
            this.$emit('clearDueDate')
        }
    },
    components: {
        MemberSelector,
        LabelSelector,
        // ChecklistCreator,
        BackgroundPalette,
        // AttachmentTool,
        // CoverTool,
        // labels,
        AddAttachment,
        TicketGroupSelector,
        DatePicker,

    }
};
</script>

<style>
.el-date-editor.el-input {
    max-width: 160px;
    margin-bottom: 0px;
}
</style>