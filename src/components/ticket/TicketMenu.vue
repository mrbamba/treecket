<template>
    <div class="ticket-menu">
        <ticket-group-selector
            @moveTicket="moveTicket"
            :boardGroupsSummary="boardGroupsSummary"
            :currGroupSummary="currGroupSummary"
        />
        <h3>ADD TO CARD</h3>
        <button @click="show.memberSelector=!show.memberSelector">Members</button>
        <MemberSelector
            v-if="show.memberSelector"
            :boardMembers="boardMembers"
            :ticketMembers="ticket.members"
            @toggleMember="toggleMember"
            @closeMemberSelect="show.memberSelector=false"
        />
        <button @click="show.labelSelector=!show.labelSelector">
            <i class="fas fa-tag" /> Labels
        </button>
        <labels v-show="show.labelSelector" @labelClicked="labelClicked" :labels="labels" />
        <button @click="onAddChecklist">
            <i class="far fa-check-square" /> Checklist
        </button>

        <div class="date-picker-title">
            <i class="far fa-clock" /> Due Date
        </div>
        <el-date-picker
            v-model="ticket.dueDate"
            type="date"
            placeholder="Pick due date"
            format="MMM-dd-yyyy"
            @change="saveTicket"
        ></el-date-picker>

        <button @click="show.addAttachment=!show.addAttachment">
            <i class="fas fa-paperclip" /> Attachment
        </button>
        <add-attachment
            v-if="show.addAttachment"
            @addAttachment="addAttachment"
            @closeAddAttachment="show.addAttachment=false"
        />

        <button @click.stop="changeCoverStatus">Cover</button>

        <h3>ACTIONS</h3>
        <button>Move</button>
        <button @click="onClone">Clone</button>
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
// import AttachmentTool from "@/components/ticket/menu/AttachmentTool.vue";
import CoverTool from "@/components/ticket/menu/CoverTool.vue";
import labels from "@/components/board/labels.vue";
import AddAttachment from "@/components/ticket/AddAttachment.vue";
import TicketGroupSelector from '@/components/ticket/menu/TicketGroupSelector';


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
        currGroupSummary:{
            type:Object,
            require:true
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
            console.log(userFilterBy);
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
        }
    },
    components: {
        MemberSelector,
        LabelSelector,
        ChecklistCreator,
        DateSelector,
        // AttachmentTool,
        CoverTool,
        labels,
        AddAttachment,
        TicketGroupSelector,

    }
};
</script>

<style>
.el-date-editor.el-input {
    max-width: 170px;
    margin-bottom: 14px;
}
</style>