<template>
    <div class="ticket-comments">
        <h4>Activity</h4>
        <div class="ticket-activity-selector">
            <h4>Show:</h4>
            <button>
                <font-awesome-icon class="comments-icon" far icon="comment" />Comments
            </button>
            <button>
                <font-awesome-icon class="history-icon" fas icon="history" />History
            </button>
        </div>
        <div v-if="comments">
            <ticket-comment
                v-for="comment in comments"
                :key="comment.id"
                :comment="comment"
                class="ticket-comment"
                @deleteComment="deleteComment"
                @updateTicket="updateTicket"
            />
        </div>
        <div class="add-comment-input">
            <div class="create-comment-avatar">
                <avatar :username="user.fullName" :image="user.imgSrc" :size="32" />
            </div>
            <form class="input-wrapper">
                <input
                    type="text"
                    placeholder="Add a comment..."
                    @click="enteringComment = true"
                    v-model="newCommentText"
                />
                <div>
                    <button @click.prevent="addComment" class="save-button">Save</button>
                    <button class="cancel-button">Cancel</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import Avatar from 'vue-avatar'
import TicketComment from '@/components/ticket/TicketComment.vue'

export default {
    name: "TicketComments",
    props: ['comments', 'user'],
    data() {
        return {
            enteringComment: false,
            newCommentText: ""
        };
    },
    methods: {
        addComment() {
            if (!this.newCommentText) return

            this.$emit("addComment", this.newCommentText);
            this.newCommentText = ''
        },
        deleteComment(commentId) {
            let commentIdx = this.comments.findIndex((comment) => {
                comment.id === commentId;
            })
            this.comments.splice(commentIdx, 1)
            this.$emit('updateTicket')
        },
        deleteComment(commentId) {
            let commentIdx = this.comments.findIndex((comment) => {
                comment.id === commentId;
            })
            this.comments.splice(commentIdx, 1)
            this.$emit('updateTicket')
        },
        updateTicket() {
            this.$emit('updateTicket')
        }
    },
    components: {
        Avatar,
        TicketComment,
    }
};
</script>

<style>
</style>