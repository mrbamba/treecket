<template>
    <div class="add-group">
        <transition name="slide-fade" mode="out-in">
            <button
                v-if="!addNewGroup"
                @click.stop="toggleAddGroup"
                class="add-group-btn"
            >+ Add another list</button>
            <div v-else :class="groupClass">
                <input
                    class="minimal-input"
                    type="text"
                    v-model="newGroupTitle"
                    @keyup.enter="addGroup()"
                    @blur="onBlur"
                    ref="newGroupTitle"
                    placeholder="Enter new list title"
                />
                <div>
                    <button
                        @click.stop="addGroup"
                        data-prevent-blur="add"
                        class="add-button"
                    >Add list</button>
                    <button class="cancel-button">Cancel</button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: "AddGroup",
    data() {
        return {
            addNewGroup: false,
            newGroupTitle: ''
        };
    },
    computed: {
        groupClass() {
            return (this.addNewGroup) ? 'add-group-selected' : ''
        }
    },
    methods: {
        addGroup() {
            // if (this.addNewGroup) {
                if (!this.newGroupTitle) return;
                this.$emit("addGroup", this.newGroupTitle);
                // this.addNewGroup = false
                this.newGroupTitle = '';
            // }
        },
        toggleAddGroup() {
            this.addNewGroup = !this.addNewGroup;
            this.newGroupTitle = '';
            // if (this.addNewGroup) this.$nextTick(() => this.$refs.newGroupTitle.focus());
            if (this.addNewGroup) setTimeout(() => this.$refs.newGroupTitle.focus(), 300);
        },
        onBlur(ev) {
            if (ev.relatedTarget) {
                if (ev.relatedTarget.dataset.preventBlur === 'add') {
                    return;
                }
            }
            this.toggleAddGroup()
        }
    }
};
</script>

<style>
</style>