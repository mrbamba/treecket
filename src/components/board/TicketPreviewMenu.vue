<template>
    <div class="ticket-preview-menu">
        <button @click="openLabelsModal">Edit labels</button>
        <button>Change members</button>
        <button>Clone ticket</button>
        <button>Change due date</button>
        <button>Delete</button>
    </div>
</template>

<script>
export default {
    props:['ticket']

}
</script>

<style>

</style>