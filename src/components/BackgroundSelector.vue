<template>
<div class="background-selector">
    <header>
        <h3>Background selector</h3>
    </header>
    <Background-Palette :type="type"/>
</div>
</template>

<script>
import BackgroundPalette from '@/components/BackgroundPalette'
export default {
    props:['type'],
    components: {
        BackgroundPalette
    }
}
</script>

<style>

</style>