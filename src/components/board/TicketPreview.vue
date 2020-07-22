<template>
    <section @click="openTicket(ticket)" class="ticket-preview">
        <div :style="{backgroundColor: ticket.color}">
            <span>{{ ticket.title }}</span>
            <section class="badges-container">
                <div v-if="itemsCount.itemsCount > 0" :class="{complete: itemsCount.doneItemsCount === itemsCount.itemsCount}">
                <img src="" alt="">
                <span>{{ itemsCount.doneItemsCount }} / {{ itemsCount.itemsCount }}</span>
                </div>
            </section>
        </div>
    </section>
</template>

<script>
export default {
    props: ['ticket'],
    methods: {
        openTicket(ticket) {
            const newPath = `/board/${this.$route.params.boardId}/ticket/${ticket.id}`;
            if (this.$route.path !== newPath) {
                this.$router.push(newPath);
            }
        },
    },
    computed: {
        itemsCount() {
            if (this.ticket.checklists.length === 0) return {'itemsCount': 0, 'doneItemsCount': 0}
            let doneItemsCount = 0 ;
            const itemsCount = this.ticket.checklists.reduce((acc, checklist) => {
                if (checklist){
                    checklist.items.forEach(item => {
                        if (item.isDone) doneItemsCount++;
                })
                }
                return acc + checklist.items.length;
            }, 0)
            return { itemsCount, doneItemsCount };
        } 
    }
}
</script>

<style>
</style>