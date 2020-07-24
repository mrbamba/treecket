<template>
    <section class="board-header">
        <div>
        <div v-if="!editTitle" @click="onEditTitle" class="board-title">
            <div>{{ newTitle }}</div>
        </div>
        <div v-else>
            <span class="input-hider"></span>
            <input
                @blur="updateBoardTitle"
                @input="resizeInput"
                type="text"
                v-model="newTitle"
                v-on:keyup.enter="updateBoardTitle"
                class="board-title-input"
                ref="updatedBoardTitle"
            />
        </div>|
        <button>
            <i class="fas fa-user-lock" /> Public
        </button>
        |
        <section class="board-members">
            <ul class="clean-list">
                <li></li>
            </ul>
            <button>+</button>
        </section>
        </div>

        <button><i class="fas fa-ellipsis-h" /> Show Menu</button>

    </section>
</template>

<script>
export default {
    props: ['boardTitle', 'boardMembers'],
    name: "BoardHeader",
    data() {
        return {
            editTitle: false,
            newTitle: this.boardTitle
        }
    },
    methods: {
        updateBoardTitle() {
            this.editTitle = false;
            this.$emit('updateBoardTitle', this.newTitle)
        },
        onEditTitle() {
            this.editTitle = true;
            this.$nextTick(() => {
                this.resizeInput();
                this.$refs.updatedBoardTitle.focus()
            });
        },
        resizeInput() {
            const input = this.$refs.updatedBoardTitle;
            const hide = input.previousElementSibling;

            hide.textContent = input.value;
            input.style.width = hide.offsetWidth + 16 + "px";
        }
    }
}
</script>

<style>
</style>