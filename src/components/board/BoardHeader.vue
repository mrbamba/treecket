<template>
    <section class="board-header">
       
        <div v-if="!editTitle" @click="onEditTitle" class="board-title">
            <div>{{ newTitle }}</div>
        </div>

            <input v-else
                @blur="updateBoardTitle"
                type="text"
                v-model="newTitle"
                v-on:keyup.enter="updateBoardTitle"
                class="board-header-input"
                ref="updatedBoardTitle"
            /> |
        <button>Public</button> |

        <section class="board-members">
            <ul class="clean-list">
                <li></li>
            </ul>
            <button>+</button>
        </section>

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
            this.$nextTick(() => this.$refs.updatedBoardTitle.focus());
        },
    }
};
</script>

<style>
</style>