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
            <div v-for="comment in comments" :key="comment.id" class="ticket-comment">
                <div class="comment-img">
                    <avatar :username="comment.by.fullName" :image="comment.by.imgSrc" :size="32" />
                </div>
                <div>
                    <p class="comment-by">
                        <span>{{ comment.by.fullName | capitalize }}</span>
                        {{ comment.createdAt | formatTime }}
                    </p>
                    <p class="comment-text">{{ comment.txt }}</p>
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            </div>
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
                    <button @click.prevent="addComment">Save</button>
                    <button>Cancel</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import Avatar from 'vue-avatar'

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
            this.newCommentText = ''
            this.$emit("addComment", this.newCommentText);
        }
    },
    components: {
        Avatar,
    }
};
</script>

<style>
</style>