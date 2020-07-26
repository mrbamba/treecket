<template>
    <section @click="openTicket(ticket)" class="ticket-preview">
        <button
            class="edit-ticket-preview-btn"
            @click.stop="showTicketPreview = !showTicketPreview"
        >
            <i class="fas fa-pencil-alt"></i>
        </button>
        <ticket-preview-menu v-if="showTicketPreview" :ticket="ticket" @deleteTicket="deleteTicket" />
        <div :style="{backgroundColor: ticket.color}">
            <div class="cover-container" v-if="ticket.cover && getCoverSrc">
                <iframe
                    v-if="ticket.attachments[0].type === 'video'"
                    :src="getCoverSrc"
                    frameborder="0"
                ></iframe>
                <img v-else :src="getCoverSrc" />
            </div>
            <ul class="label-container clean-list">
                <li class="ticket-label" v-for="label in ticketLabels" :key="label.id">
                    <div
                        class="full-label"
                        v-if="showFullLabel"
                        :style="{backgroundColor: label.color}"
                        @click.stop="changeLabelsDisplay"
                    ><transition-group name="slide-up-fade">{{ label.title }}</transition-group></div>
                    <div
                        v-else
                        :style="{backgroundColor: label.color}"
                        @click.stop="changeLabelsDisplay"
                    ></div>
                </li>
            </ul>
            <span class="ticket-preview-title">{{ ticket.title }}</span>
            <div class="bottom-container" v-if="bottomContainer">
                <section class="badges-container">
                    <div v-if="ticket.dueDate" class="due-date"
                        :class="{'past-due': timeLeft === 'past-due', 'due-soon': timeLeft === 'due-soon'}"
                    >
                        <i class="far fa-clock"></i>
                        <span>{{ dueDateToShow }}</span>
                    </div>
                    <div v-if="ticket.description">
                        <i class="fas fa-align-left"></i>
                    </div>
                    <div v-if="ticket.comments.length > 0">
                        <i class="far fa-comment"></i>
                        <span>{{ticket.comments.length}}</span>
                    </div>
                    <div class="attachment" v-if="ticket.attachments.length > 0">
                        <i class="fas fa-paperclip"></i>
                        <span>{{ ticket.attachments.length }}</span>
                    </div>
                    <div
                        v-if="itemsCount.itemsCount > 0"
                        :class="{complete: itemsCount.doneItemsCount === itemsCount.itemsCount}"
                    >
                        <i class="far fa-check-square"></i>
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
                            v-show="ticket.members"
                            :username="member.fullName"
                            :src="member.imgSrc"
                            :size="28"
                            color="#fff"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import TicketPreviewMenu from '@/components/board/TicketPreviewMenu'
import Avatar from 'vue-avatar'
export default {
    props: ['ticket', 'labels', 'showFullLabel'],
    data() {
        return {
            showTicketPreview: false
        }
    },
    computed: {
        bottomContainer() {
            if (this.ticket.attachments.length || this.ticket.comments.length
            || this.ticket.description || this.ticket.members.length || this.itemsCount.itemsCount
            || this.ticket.dueDate || this.ticket.comments.length) return true
        },

        getCoverSrc() {

            if (this.ticket.attachments.length > 0) {
                if (this.ticket.attachments[0].type === 'img') {
                    return this.ticket.attachments[0].src;
                } else if (this.ticket.attachments[0].type === 'video') {
                    const src = this.getIframeSrc(this.ticket.attachments[0].src)
                    return src
                }
            }
        },
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
        },
        dueDateToShow() {
            return new Date(this.ticket.dueDate).toLocaleDateString('en-us', { month: 'short', day: 'numeric' })
        },
        timeLeft() {
            if (Date.now() + 1000*60*60*24 > Date.parse(this.ticket.dueDate)) return 'past-due'
            else if (Date.now() + 1000*60*60*48 > Date.parse(this.ticket.dueDate)) return 'due-soon'
        }
    },
    methods: {
        openTicket(ticket) {
            const newPath = `/board/${this.$route.params.boardId}/ticket/${ticket.id}`;
            if (this.$route.path !== newPath) {
                this.$router.push(newPath);
            }
        },
        changeLabelsDisplay() {
            this.$emit('changeLabelsDisplay')
        },
        deleteTicket(ticket) {
            console.log(ticket);
            this.$emit('deleteTicket', ticket)
        },

        getYoutubeId(url) {
            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
            const match = url.match(regExp);

            return (match && match[2].length === 11)
                ? match[2]
                : null;
        },
        getIframeSrc(src) {
            const videoId = this.getYoutubeId(src);
            return `https://www.youtube.com/embed/${videoId}`
        }
    },
    components: {
        Avatar,
        TicketPreviewMenu
    }
}
</script>

<style>
</style>