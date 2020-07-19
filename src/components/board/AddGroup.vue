<template>
    <div class="add-group ticket-group" @click.stop="openAddGroupArea">
        <span v-if="addNewGroup === false"> + Add another list</span>
        <div v-else >
            <input
                type="text"
                v-model="newGroupName"
                v-if="addNewGroup"
                @blur="addNewGroup = false"
                ref="newGroupTitle"
                placeholder="Enter new list name"
            />
            <div>
                <button @click="addGroup">Add Section</button>
                <button @click.stop="addNewGroup = false">X</button>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
export default {
    name: "AddGroup",
    data() {
        return {
            addNewGroup: false,
            newGroupName: ""
        };
    },
    methods: {
        addGroup() {
            if (!this.newGroupName) return;
            this.$emit("addGroup", this.newGroupName);
        },
        openAddGroupArea() {
            this.addNewGroup = true;
            setTimeout(()=>{
            this.$refs.newGroupTitle.focus();
                 }, 0);

            // this.Vue.nextTick(function() {
            //     this.$refs.newGroupTitle.focus();
            // });
            // this.focusOnInput();
        },
        // focusOnInput(){
        //     this.$refs.newGroupTitle.focus();

        // }
    }
};
</script>

<style>
</style>