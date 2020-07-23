<template>
    <section @click="openTicket(ticket)" class="ticket-preview">
        <div :style="{backgroundColor: ticket.color}">
            <ul class="label-container clean-list">
                <li class="label" v-for="label in ticketLabels" :key="label.id">
                    <div
                        class="full-label"
                        v-if="showFullLabel"
                        :style="{backgroundColor: label.color}"
                        @click.stop="changeLabelsDisplay"
                    >{{ label.title }}</div>
                    <div
                        v-else
                        :style="{backgroundColor: label.color}"
                        @click.stop="changeLabelsDisplay"
                    ></div>
                </li>
            </ul>
            <span>{{ ticket.title }}</span>
            <div class="bottom-container">
                <section class="badges-container">
                    <div v-if="ticket.description">
                        <span>Desc!!</span>
                        <img src alt />
                    </div>
                    <div v-if="ticket.comments.length > 0">
                        <img src alt />
                        <span>{{ticket.comments.length}}</span>
                    </div>
                    <div v-if="ticket.attachments.length > 0">
                        <span>{{ ticket.attachments.length }}</span>
                        <img src alt />
                    </div>
                    <div
                        v-if="itemsCount.itemsCount > 0"
                        :class="{complete: itemsCount.doneItemsCount === itemsCount.itemsCount}"
                    >
                        <img src alt />
                        <span>{{ itemsCount.doneItemsCount }}/{{ itemsCount.itemsCount }}</span>
                    </div>
                </section>
                <div class="ticket-members-container">
                    <div
                        class="ticket-member-avatar"
                        v-for="member in ticket.members"
                        :key="member._id"
                    >
                        <avatar
                            v-if="ticket.members"
                            :username="member.fullName"
                            :src="member.imgSrc"
                            :size="28"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import Avatar from 'vue-avatar'
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
    },
    components: {
        Avatar
    }
}
</script>

<style>
</style>