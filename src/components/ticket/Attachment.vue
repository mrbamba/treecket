<template>
    <div>
        <div class="file-container">
            <img
                class="video-ratio"
                v-if="srcType(attachment.src) === 'img'"
                :src="attachment.src"
                :alt="attachment.type"
            />
            <iframe
                allowfullscreen
                v-else-if="srcType(attachment.src) === 'video'"
                :src="getIframeSrc(attachment.src)"
                :alt="attachment.type"
            />
            <a
                class="video-ratio"
                v-else
                :style="{background: `url(${attachment.src})`}"
                :href="attachment.src"
                :alt="attachment.type + ' ' + attachment.title"
            />
        </div>
        <form v-if="attachmentEdit" @submit.prevent="updateChanges">
            <input v-model="attachment.title" type="text" />
            <button type="submit">Save</button>
            <button type="button" @click.stop="closeEdit">X</button>
        </form>
        <h5 v-else @click="showAttachmentEdit">{{ attachment.title }}</h5>
        <div class="btn-container">
            <button class="underline-button" icon="fa-clipboard">Copy</button>
            <button
                class="underline-button"
                v-if="attachment.type === 'img' || attachment.type === 'video'"
            >
                <span v-if="isCover" @click="onRemoveCover">Remove cover</span>
                <span v-else @click="onMakeCover(attachment.id)">Make a cover</span>
            </button>
            <button class="underline-button" @click="onDeleteAttachment(attachment.id)">Delete</button>
        </div>
    </div>
</template>

<script>
export default {
    props: ['attachment', 'idx', 'ticket'],
    data() {
        return {
            attachmentEdit: false
        }
    },
    computed: {
        isCover() {
            if (this.idx === 0 && this.ticket.cover) return true;
            return false;
        }
    },
    methods: {
        onDeleteAttachment(id) {
            this.$emit('deleteAttachment', id)
        },
        srcType(src) {
            if (src.includes('jpg') || src.includes('png')
                || src.includes('gif') || src.includes('scg')) return 'img'
            else if (src.includes('embed') || src.includes('watch')) return 'video'
        },
        getYoutubeId(url) {
            const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
            const match = url.match(regExp);

            return (match && match[2].length === 11)
                ? match[2]
                : null;
        },
        getIframeSrc(src) {
            const videoId = this.getYoutubeId(src);
            return `https://www.youtube.com/embed/${videoId}`
        },
        showAddAttachment() {
            this.$emit('showAddAttachment')
        },
        showAttachmentEdit() {
            this.attachmentEdit = !this.attachmentEdit
        },
        onMakeCover(id) {
            this.$emit('makeCover', id)
        },
        onRemoveCover() {
            this.$emit('removeCover')
        }
    }
}
</script>

<style>
</style>