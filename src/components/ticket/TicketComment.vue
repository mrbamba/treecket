<template>
    <div class="ticket-comment">
        <div class="comment-img">
            <avatar :username="comment.by.fullName" :src="comment.by.imgSrc" :size="32" />
        </div>
        <div>
            <p class="comment-by">
                <span>{{ comment.by.fullName | capitalize }}</span>
                {{ comment.createdAt | formatTime }}
            </p>
            <p class="comment-text" v-if="!editing">{{ comment.txt }}</p>
            <div v-else class="editing-comment">
                <input type="text" v-model="commentEditText" ref="editText" />
                <div>

                <button @click="editComment" class="save-button">Save</button>
                <button @click="editing=false" class="cancel-button">Cancel</button>
                </div>
            </div>
            <div v-if="!editing">
                <button @click="openEdit" class="underline-button">Edit</button>
                <span class="dot-seperator"></span>
                <button @click="deleteComment(comment.id)" class="underline-button">Delete</button>
            </div>
        </div>
    </div>
</template>

<script>
import Avatar from 'vue-avatar'

export default {
    name: "TicketComment",
    props: ['comment'],
    data() {
        return {
            commentEditText: '',
            editing: false,
        }
    },
    created() {
        this.commentEditText = _.cloneDeep(this.comment.txt)
    },
    methods: {
        openEdit() {
            this.editing = true;
            this.$nextTick(() => {
                this.$refs.editText.focus()
            })
        },
        editComment() {
            this.editing = false
            this.comment.txt = this.commentEditText
            this.$emit('updateTicket',this.comment.txt)
        },
        deleteComment(commentId) {
            this.$emit('deleteComment',commentId)
        }
    },
    components: {
        Avatar
    }

}
</script>

<style>
</style>