<template>
    <div class="ticket-preview-menu">
        <header>
            <!-- <h5>Ticket Menu</h5> -->
        </header>
        <button @click.stop="openLabelsModal = !openLabelsModal">
            Edit labels
            <labels-modal v-if="openLabelsModal" />
            </button>
        <button>Change members</button>
        <button>Clone ticket</button>
        <button>Change due date</button>
        <button @click.stop="onDeleteTicket">Delete</button>
    </div>
</template>

<script>
import LabelsModal from '@/components/LabelsModal'
export default {
    props:['ticket'],
    data() {
        return {
            openLabelsModal: false,
        }
    },
    methods: {
        onDeleteTicket() {
            this.$emit('deleteTicket', this.ticket)
        }
    },
    componenets: {
        LabelsModal
    }

}
</script>

<style>

</style>