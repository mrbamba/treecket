<template>
    <div class="ticket-checklists">
        <Checklist
            v-for="(checklist, checklistIdx) in ticket.checklists"
            :key="checklist.id"
            :checklist="checklist"
            :checklistIdx="checklistIdx"
            @updateChecklist="updateTicket"
            @deleteChecklist="deleteChecklist"
            @addItem="addItem"
            @confetti="confetti"
        />
        <canvas id="confetti" @click.self="hideOverlay" ref="confetti"></canvas>
    </div>
</template>

<script>
import Checklist from '@/components/ticket/Checklist.vue';
export default {
    props: ['ticket'],
    methods: {
        updateTicket(checklist) {
            const checklistIdx = this.ticket.checklists.findIndex(currChecklist => currChecklist.id === checklist.id) 
            this.ticket.checklists.splice(checklistIdx, 1, checklist)
            this.$emit('updateTicket', this.ticket);
        },
        deleteChecklist(checklistIdx, checklistId) {
            this.ticket.checklists.splice(checklistIdx, 1)
            this.$emit('updateTicket', this.ticket);
            this.$emit('checklistDeleted', checklistId)
        },
        addItem({itemTxt, checklistId}) {
            this.$emit('addItem', { itemTxt, checklistId });
        },
        confetti() {
            this.$refs.confetti.style.display = 'block';
            this.$confetti.start({
                particles: [
                    {
                        type: 'image',
                        url: 'https://res.cloudinary.com/dfhfhz5le/image/upload/v1595372019/treecket_hmoifu.png',
                        size: 20
                    },
                    {
                        type: 'rect',
                    },
                ],
                defaultDropRate: 16,
                canvasId: 'confetti'
            });
            setTimeout(() => {
                this.$confetti.stop();
            }, 2500);
        }
    },
    components: {
        Checklist
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