<template class="add-attachment">
    <form @submit.prevent="addAttachment">
        <button type="button" @click.stop="hideForm">X</button>
        <input type="url" v-model="attachmentSrc">
        <button type="submit">Attach</button>
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
        hideForm() {
            this.$emit('hideAddAttachment')
        }
    }
}
</script>

<style>

</style>