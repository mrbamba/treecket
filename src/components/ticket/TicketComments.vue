<template>
    <div class="ticket-comments">
        <div class="chat-log">
            <div
                v-for="comment in ticket.comments"
                :key="comment.id"
                class="ticket-comment"
            >
                <avatar
                    :fullname="comment.by.fullName"
                    :image="comment.by.imgSrc"
                />
                <p>
                    {{ comment.by.fullName | capitalize }}
                    {{ comment.createdAt | formatTime }}
                </p>
                <p>
                    {{ comment.txt }}
                </p>
                <button>Edit</button>
                <button>Delete</button>
            </div>
        </div>
        <div class="add-comment-input">
            <avatar :fullname="user.fullName" :image="user.imgSrc" />
            <form action="">
                <input
                    type="text"
                    placeholder="Add a comment..."
                    @click="enteringComment = true"
                    v-model="newCommentText"
                />
                <button @click.prevent="addComment"></button>
            </form>
        </div>
    </div>
</template>

<script>
import Avatar from "vue-avatar-component";

export default {
    name: "TicketComments",
    data() {
        return {
            enteringComment: false,
            newCommentText: ""
        };
    },
    methods: {
        addComment() {
            this.$emit("addComment", this.newCommentText);
        }
    }
};
</script>

<style>
</style>