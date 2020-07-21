<template>
    <div class="ticket-comments">
        <div class="chat-log" v-if="comments">
            <div v-for="comment in comments" :key="comment.id" class="ticket-comment">
                <avatar :username="comment.by.fullName" :image="comment.by.imgSrc" :size="32" />
                <p>
                    {{ comment.by.fullName | capitalize }}
                    {{ comment.createdAt | formatTime }}
                </p>
                <p>{{ comment.txt }}</p>
                <button>Edit</button>
                <button>Delete</button>
            </div>
        </div>
        <div class="add-comment-input">
            <avatar :username="user.fullName" :image="user.imgSrc" :size="32" />
            <form action>
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