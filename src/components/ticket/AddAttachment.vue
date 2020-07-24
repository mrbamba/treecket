<template >
    <form @submit.prevent="addAttachment" class="add-attachment">
        <input type="url" v-model="attachmentSrc" class="minimal-input" placeholder="Paste any link to attach">
        <button type="submit" class="save-button">Attach</button>
        <button type="button" @click.stop="hideForm" class="cancel-button" @click="closeAddAttachment">Cancel</button>
    </form>
</template>

<script>
export default {
    data() {
        return {
            attachmentSrc: ''
        }
    },
    methods: {
        addAttachment() {
            this.$emit('addAttachment', this.attachmentSrc)
        },
        closeAddAttachment() {
            this.$emit('closeAddAttachment')
        },
    }
}
</script>

<style>

</style>