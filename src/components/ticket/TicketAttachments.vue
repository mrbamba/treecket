<template>
    <div>
        <ul class="ticket-attachments clean-list">
            <li v-for="(attachment, idx) in ticket.attachments" :key="attachment.id">
                <Attachment
                    :attachment="attachment"
                    :idx="idx"
                    :ticket="ticket"
                    @deleteAttachment="deleteAttachment"
                    @showAddAttachment="showAddAttachment"
                    @makeCover="makeCover"
                    @removeCover="removeCover"
                />
            </li>
        </ul>
        <!-- <button class="add-button" @click.stop="showAddAttachment">+ Add attachment</button> -->
    </div>
</template>

<script>
import Attachment from '@/components/ticket/Attachment.vue'
export default {
    props: ['ticket'],
    methods: {
        deleteAttachment(id) {
            this.$emit('deleteAttachment', id)
        },
        showAddAttachment() {
            this.$emit('showAddAttachment')
        },
        makeCover(id) {
            this.$emit('makeCover', id)
        },
        removeCover() {
            this.$emit('changeCoverStatus')
        }
    },
    components: {
        Attachment
    }
}
</script>

<style>
</style>