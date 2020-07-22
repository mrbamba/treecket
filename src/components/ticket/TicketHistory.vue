<template>
    <div class="ticket-activity">
        <div class="activity-img">
            <avatar :username="activity.by.fullName" :src="activity.by.imgSrc" :size=32 />
        </div>
        <div>
            <p class="activity-by">
                <span>{{ activity.by.fullName | capitalize }}</span>
                {{ activity.createdAt | formatTime }}
            </p>
            <p class="activity-text">{{ activity.txt }}</p>
        </div>
    </div>
</template>

<script>
import Avatar from 'vue-avatar'

export default {
    name: 'TicketHistory',
    props:['activity'],
    components:{
        Avatar,
    }
}
</script>

<style>
</style>
