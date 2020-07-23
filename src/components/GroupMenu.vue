<template>
  <div>
      <button @click="onAddTicket">Add ticket</button>
      <button @click="onCloneGroup">Clone group</button>
      <button @click="onDeleteGroup">Delete group</button>
      <!-- <button>Sort by</button> -->
      <button></button>
  </div>
</template>

<script>
import { eventBus } from '@/services/event-bus.service.js';
export default {
    props:['groupId'],
    methods: {
        onAddTicket() {
            eventBus.$emit('onAddTicket', this.groupId)
        },
        onCloneGroup() {
    
        },
        onDeleteGroup() {
    
        }
    }
}
</script>

<style>

</style>