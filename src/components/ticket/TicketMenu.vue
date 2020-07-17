<template>
    <div class="ticket-menu">
        <h3>ADD TO CARD</h3>
        <member-selector v-if="show.memberSelector" @click="show.memberSelector=!show.memberSelector">Members</member-selector>
        <button>Labels</button>
        <button>Checklist</button>
        <button>Due Date</button>
        <button>Attachment</button>
        <button>Cover</button>

        <h3>ACTIONS</h3>
        <button>Move</button>
        <button>Copy</button>
        <button>Watch</button>
        <button>Share</button>
    </div>
</template>

<script>
import MemberSelector from '@/components/ticket/menu/MemberSelector.vue';
import LabelSelector from '@/components/ticket/menu/LabelSelector.vue';
import ChecklistCreator from '@/components/ticket/menu/ChecklistCreator.vue';
import DateSelector from '@/components/ticket/menu/DateSelector.vue';
import AttachmentTool from '@/components/ticket/menu/AttachmentTool.vue';
import CoverTool from '@/components/ticket/menu/CoverTool.vue';
export default {
    name: 'TicketMenu',
    props: {
        ticket: {
            type: Object,
            required: true
        },
        users: {
            type: Array,
            require: true
        },
        show: {
            memberSelector:false,
            labelSelector:false,
            checklistCreator:false,
            dateSelector:false,
            attachmentTool:false,
            coverTool:false
        }
    },
    components: {
        MemberSelector,
        LabelSelector,
        ChecklistCreator,
        DateSelector,
        AttachmentTool,
        CoverTool,
    }
}
</script>

<style>
</style>