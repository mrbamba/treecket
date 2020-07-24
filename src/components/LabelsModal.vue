<template>
    <ul class="labels-modal">
        <li v-for="label in boardLabels" :key="label.id"></li>
    </ul>
</template>

<script>
export default {
    props:['boardLabels'],
    
}
</script>

<style>

</style>