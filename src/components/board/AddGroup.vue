<template>
    <div class="add-group">
        <button
            v-if="!addNewGroup"
            @click.stop="toggleAddGroup"
            class="add-group-btn"
        >+ Add another list</button>
        <div v-else>
            <input
                type="text"
                v-model="newGroupName"
                @keyup.enter="addGroup()"
                @blur="onBlur"
                ref="newGroupTitle"
                placeholder="Enter new list name"
            />
            <div>
                <button @click="addGroup" data-prevent-blur="add" class="add-button">Add list</button>
                <button class="cancel-button">
                    Cancel
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "AddGroup",
    data() {
        return {
            addNewGroup: false,
            newGroupName: ''
        };
    },
    methods: {
        addGroup() {
            if (this.addNewGroup) {
                if (!this.newGroupName) return;
                this.$emit("addGroup", this.newGroupName);
                this.toggleAddGroup()
            }
        },
        toggleAddGroup() {
            this.addNewGroup = !this.addNewGroup;
            this.newGroupName = '';
            if (this.addNewGroup) this.$nextTick(() => this.$refs.newGroupTitle.focus());
        },
        onBlur(ev) {
            if (ev.relatedTarget) {
                if (ev.relatedTarget.dataset.preventBlur === 'add') {
                    this.addGroup();
                }
            }
            this.toggleAddGroup()
        }
    }
};
</script>

<style>
</style>