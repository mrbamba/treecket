<template>
    <ul class="labels">
        <li v-for="label in labels" :key="label.id">
            <div  @click="onLabelClick(label.id)">
            {{label.title}}
            <button @click.stop="openLabelEdit(label)">Edit Label</button>
            </div>
            <form @submit.prevent="saveLabel(label)" v-if="isEditLabel && labelInEdit.id === label.id">
                <input type="text" v-model="labelInEdit.title">
                <input type="color" v-model="labelInEdit.color">
                <button>save</button>
            </form>
        </li>
    </ul>
</template>

<script>
import { eventBus } from '@/services/event-bus.service.js'
export default {
    props: ['labels'],
    data() {
        return {
            isEditLabel: false,
            labelInEdit: null
        }
    },
    methods: {
        onLabelClick(labelId){
            this.$emit('labelClicked', labelId)
        },
        openLabelEdit(label) {
            this.isEditLabel = true;
            this.labelInEdit = label;
        },
        saveLabel(label) {
            eventBus.$emit('updateLabels', this.labelInEdit)
            this.isEditLabel = false;
            this.labelInEdit = null;
        }
    }
}
</script>

<style>
</style>