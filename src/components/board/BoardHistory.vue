<template>
    <div class="board-activity">
        <div class="activity-img">
            <avatar :username="activity.by.fullName" :src="activity.by.imgSrc" :size="32" />
        </div>
        <div>
            <p class="activity-by">
                <span>{{ activity.by.fullName | capitalize }}</span>
                {{ activity.createdAt | formatTime }}
            </p>
            <p class="activity-text">{{ activity.txt }}</p>
            <button v-if="activity.ticketId" @click="openTicket(activity.ticketId)" class="underline-button">View ticket</button>
        </div>
    </div>
</template>

<script>
import Avatar from 'vue-avatar'

export default {
    name: 'BoardHistory',
    props: ['activity', 'boardId'],
    components: {
        Avatar,
    },
    created() {
    },
    methods: {
        openTicket(ticketId) {
            const newPath = `/board/${this.boardId}/ticket/${ticketId}`;
            this.$router.push(newPath);
        }
    }
}
</script>

<style>
</style>
