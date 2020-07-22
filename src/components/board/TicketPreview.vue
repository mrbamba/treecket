<template>
    <section @click="openTicket(ticket)" class="ticket-preview">
        <div :style="{backgroundColor: ticket.color}">
            <section class v-for="label in ticketLabels" :key="label.id">
                <div
                    v-if="showFullLabel"
                    :style="{backgroundColor: label.color}"
                    @click.stop="changeLabelsDisplay"
                >{{ label.title }}</div>
                <div
                    v-else
                    :style="{backgroundColor: label.color}"
                    @click.stop="changeLabelsDisplay"
                ></div>
            </section>
            <span>{{ ticket.title }}</span>
            <section class="badges-container">
                <div
                    v-if="itemsCount.itemsCount > 0"
                    :class="{complete: itemsCount.doneItemsCount === itemsCount.itemsCount}"
                >
                    <img src alt />
                    <span>{{ itemsCount.doneItemsCount }} / {{ itemsCount.itemsCount }}</span>
                </div>
            </section>
        </div>
    </section>
</template>

<script>
export default {
    props: ['ticket', 'labels', 'showFullLabel'],
    methods: {
        openTicket(ticket) {
            const newPath = `/board/${this.$route.params.boardId}/ticket/${ticket.id}`;
            if (this.$route.path !== newPath) {
                this.$router.push(newPath);
            }
        },
        changeLabelsDisplay() {
            this.$emit('changeLabelsDisplay')
        }
    },
    computed: {
        itemsCount() {
            if (this.ticket.checklists.length === 0) return { 'itemsCount': 0, 'doneItemsCount': 0 }
            let doneItemsCount = 0;
            const itemsCount = this.ticket.checklists.reduce((acc, checklist) => {
                if (checklist) {
                    checklist.items.forEach(item => {
                        if (item.isDone) doneItemsCount++;
                    })
                }
                return acc + checklist.items.length;
            }, 0)
            return { itemsCount, doneItemsCount };
        },
        ticketLabels() {
            const ticketLabels = this.ticket.labels.map(labelId =>
                this.labels.find(currLabel => labelId === currLabel.id));
            return { ...ticketLabels };
        }
    }
}
</script>

<style>
</style>