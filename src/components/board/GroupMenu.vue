<template>
    <div class="group-menu" ref="groupMenu">
            <header>
                <button class="close-button close-menu-btn" @click="closeMenu">
                    <i class="fas fa-times" />
                </button>
                <h5>Group Menu</h5>
            </header>
            <button
                class="group-menu-btn"
                @click="onAddTicket"
                :data-prevent-blur="group.id"
            >Add ticket</button>
            <button class="group-menu-btn" @click="onCloneGroup">Clone group</button>
            <button class="group-menu-btn" @click="onDeleteGroup">Delete group</button>
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