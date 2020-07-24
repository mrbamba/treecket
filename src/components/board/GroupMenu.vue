<template>
    <div class="group-menu" tabindex="0" ref="groupMenu">
        <button class="close-menu-btn close-button" @click="closeMenu">
            <i class="fas fa-times" />
        </button>
        <button @click="onAddTicket" :data-prevent-blur="group.id">Add ticket</button>
        <button @click="onCloneGroup">Clone group</button>
        <button @click="onDeleteGroup">Delete group</button>
        <!-- <button>Sort by</button> -->
    </div>
</template>

<script>
import { eventBus } from '@/services/event-bus.service.js';
export default {
    props: ['group'],
    methods: {
        onAddTicket() {
            eventBus.$emit('onAddTicket', this.group.id);
        },
        onCloneGroup() {
            this.$emit('cloneGroup', this.group);
        },
        onDeleteGroup() {
            this.$emit('deleteGroup');
        },
        closeMenu() {
            this.$emit('closeGroupMenu');
        }
    }
}
</script>

<style>
</style>