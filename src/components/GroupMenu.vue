<template>
  <div>
      <button @click="onAddTicket" :data-prevent-blur="group.id">Add ticket</button>
      <button @click="onCloneGroup">Clone group</button>
      <button @click="onDeleteGroup">Delete group</button>
      <!-- <button>Sort by</button> -->
      <button></button>
  </div>
</template>

<script>
import { eventBus } from '@/services/event-bus.service.js';
export default {
    props:['group'],
    methods: {
        onAddTicket() {
            eventBus.$emit('onAddTicket', this.group.id)
        },
        onCloneGroup() {
            this.$emit('cloneGroup', this.group)
        },
        onDeleteGroup() {
    
        }
    }
}
</script>

<style>

</style>