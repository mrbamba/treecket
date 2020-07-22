<template>
    <div>
        <ul class="ticket-attachments clean-list">
            <li v-for="attachment in attachments" :key="attachment.id">
                <div class="file-container">
                    <img class="video-ratio"
                        v-if="srcType(attachment.src) === 'img'"
                        :src="attachment.src"
                        :alt="attachment.type"
                    />
                    <iframe allowfullscreen
                        v-else-if="srcType(attachment.src) === 'video'"
                        :src="getIframeSrc(attachment.src)"
                        :alt="attachment.type"
                    />
                    <a class="video-ratio"
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
                        v-if="attachment.type === 'img'"
                        @click="onMakeCover(attachment.id)"
                    >Make cover</button>
                    <button
                        class="underline-button"
                        @click="onDeleteAttachment(attachment.id)"
                    >Delete</button>
                </div>
            </li>
        </ul>
        <!-- <button class="add-button" @click.stop="showAddAttachment">+ Add attachment</button> -->
    </div>
</template>

<script>
export default {
    props: ['attachments'],
    data() {
        return {
            attachmentEdit: false
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
        }

    }
}
</script>

<style>
</style>