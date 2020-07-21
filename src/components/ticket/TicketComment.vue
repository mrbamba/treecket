<template>
    <div class="ticket-comment-preview">
        <div class="comment-img">
            <avatar :username="comment.by.fullName" :image="comment.by.imgSrc" :size="32" />
        </div>
        <div>
            <p class="comment-by">
                <span>{{ comment.by.fullName | capitalize }}</span>
                {{ comment.createdAt | formatTime }}
            </p>
            <p class="comment-text" v-if="!editing">{{ comment.txt }}</p>
            <div v-else>
                <input type="text" v-model="commentEditText" ref="editText" />
                <button @click="editComment">Save</button>
                <button @click="editing=false">Cancel</button>
            </div>
            <button @click="openEdit">Edit</button>
            <button @click="deleteComment(comment.id)">Delete</button>
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
            this.editing=false
            this.comment.txt=this.commentEditText
            this.$emit('')
        },
        deleteComment() {
            this.$emit('deleteComment')
        }
    },
    components: {
        Avatar
    }

}
</script>

<style>
</style>