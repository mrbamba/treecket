<template>
     <div class="add-comment">
            <!-- <div class="create-comment-avatar">
                <avatar
                    v-if="user"
                    :username="user.fullName"
                    :src="user.imgSrc"
                    :size="32"
                />
            </div> -->
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
        </div>
</template>

<script>
import Avatar from 'vue-avatar'
export default {
    data() {
        return {
            newCommentText: ""
        }
    },
    methods: {
        addComment() {
            if (!this.newCommentText) return;
            this.$emit("addComment", this.newCommentText);
            this.newCommentText = '';
        }
    },
    components: {
        Avatar
    }

}
</script>

<style>

</style>