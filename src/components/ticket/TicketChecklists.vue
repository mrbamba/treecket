<template>
    <div class="ticket-checklists">
        <checklist
            v-for="(checklist, checklistIdx) in ticket.checklists"
            :key="checklist.id"
            :checklist="checklist"
            :checklistIdx="checklistIdx"
            @updateChecklist="updateTicket"
            @deleteChecklist="deleteChecklist"
            @addItem="addItem"
        />
    </div>
</template>

<script>
import checklist from './checklist'
export default {
    props: ['ticket'],
    methods: {
        updateTicket(checklist) {
            const checklistIdx = this.ticket.checklists.findIndex(currChecklist => currChecklist.id === checklist.id) 
            this.ticket.checklists.splice(checklistIdx, 1, checklist)
            this.$emit('updateTicket', this.ticket);
        },
        deleteChecklist(checklistIdx) {
            this.ticket.checklists.splice(checklistIdx, 1)
            this.$emit('updateTicket', this.ticket);
        },
        addItem({itemTxt, checklistId}) {
            this.$emit('addItem', { itemTxt, checklistId });
        }
    },
    components: {
        checklist
    }
}

// emitAddItem(ev, checklistId) {
//     this.$emit('addItem', { itemTxt: this.itemTxt, checklistId });
//     if (ev && ev.key === 'enter') {
//         this.itemTxt = '';
//     } else {
//         this.toggleAddItem();
//     }
// },
</script>

<style>
</style>