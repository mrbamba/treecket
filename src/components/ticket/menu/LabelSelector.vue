<template>
    <ul class="labels-modal clean-list">
        <button class="close-menu-btn" @click="closeLabelSelector">
            <i class="fas fa-times" />
        </button>
        <h4>
            Labels
        </h4>
        <labels :labels="labels" @labelClicked="labelClicked"/>
    </ul>
</template>

<script>
import Labels from '@/components/board/Labels'
export default {
    props: ['labels'],
    methods: {
        closeLabelSelector() {
            this.$emit('closeLabelSelector')
        },
        labelClicked(labelId){
            this.$emit('labelClicked', labelId)
        },
    },
    components: {
        Labels
    }
}
</script>

<style>
</style>