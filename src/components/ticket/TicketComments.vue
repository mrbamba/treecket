<template>
    <div class="ticket-comments">
        <div v-if="comments" class="comment-previews">
            <transition-group name="slide-up-fade-right">
                <ticket-comment
                    v-for="comment in comments"
                    :key="comment.id"
                    :comment="comment"
                    class="ticket-comment"
                    @deleteComment="deleteComment"
                    @updateTicket="updateTicket"
                />
            </transition-group>
        </div>
        <!-- <div class="add-comment-input">
            <div class="create-comment-avatar">
                <avatar
                    v-if="user"
                    :username="user.fullName"
                    :src="user.imgSrc"
                    :size="32"
                />
            </div>
            <form class="input-wrapper">
                <input
                    class="minimal-input"
                    type="text"
                    placeholder="Add a comment..."
                    @click.prevent="enteringComment = true"
                    v-model="newCommentText"
                />
                <div>
                    <button @click.prevent="addComment" class="save-button">Save</button>
                    <button class="cancel-button">Cancel</button>
                </div>
            </form>
        </div> -->
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
            if (!this.newCommentText) return;
            this.$emit("addComment", this.newCommentText);
            this.newCommentText = '';
        },
        deleteComment(commentId) {
            let commentIdx = this.comments.findIndex((comment) => comment.id === commentId);
            if (commentIdx < 0) return;
            this.comments.splice(commentIdx, 1);
            this.$emit('updateTicket');
        },
        updateTicket() {
            this.$emit('updateTicket');
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