<template>
    <div class="ticket-preview-menu">
        <header>
            <!-- <h5>Ticket Menu</h5> -->
        </header>
        <button @click.stop="openLabelsModal = !openLabelsModal">
            Edit labels
            <labels-selector v-if="openLabelsModal" />
            </button>
        <button>Change members</button>
        <button @click="onCloneTicket">Clone ticket</button>
        <button>Change due date</button>
        <button @click.stop="onDeleteTicket">Delete</button>
    </div>
</template>

<script>
import LabelsSelector from '@/components/ticket/menu/LabelSelector'
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
        },
        onCloneTicket() {
            this.$emit('cloneTicket', this.ticket)
        }
    },
    componenets: {
        LabelsSelector
    }

}
</script>

<style>

</style>