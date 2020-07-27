<template>
    <ul class="labels clean-list">
        <li v-for="label in labels" :key="label.id">
            <form @submit.prevent="saveLabel(label)" v-if="isEditLabel && labelInEdit.id === label.id">
                <input type="text" v-model="labelInEdit.title" maxlength="16">
                <input type="color" value="#000000" v-model="labelInEdit.color">
                <button>save</button>
            </form>
            <div v-else>
            <div @click="onLabelClick(label.id)" :style="{backgroundColor: label.color}">
            <span>{{label.title}}</span>
            </div>
            <button @click.stop="openLabelEdit(label)">
                 <i class="fas fa-pencil-alt"></i>
            </button>
            </div>
        </li>
        <form v-if="isOnAddLabel" @submit.prevent="saveLabel">
            <input type="text" v-model="labelInEdit.title">
            <input type="color" v-model="labelInEdit.color">
            <button>Save</button>
        </form>
        <button class="add-button" v-else @click="onAddLabel"> + Add label</button>
    </ul>
</template>

<script>
import { eventBus } from '@/services/event-bus.service.js'
export default {
    props: ['labels'],
    data() {
        return {
            isEditLabel: false,
            labelInEdit: null,
            isOnAddLabel: false
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
        saveLabel() {
            console.log(this.labelInEdit);
            eventBus.$emit('updateLabels', this.labelInEdit);
            this.isEditLabel = false;
            this.labelInEdit = null;
            this.isOnAddLabel = false;
        },
        onAddLabel() {
            this.isEditLabel = false;
            this.labelInEdit = {};
            this.isOnAddLabel = true;
        }
    }
}
</script>

<style>
</style>