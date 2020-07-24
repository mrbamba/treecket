<template>
    <section class="board-header">
        <div v-if="!editTitle" @click="onEditTitle" class="board-title">
            <div>{{ newTitle }}</div>
        </div>

        <input
            v-else
            @blur="updateBoardTitle"
            type="text"
            v-model="newTitle"
            v-on:keyup.enter="updateBoardTitle"
            class="board-header-input"
            ref="updatedBoardTitle"
        /> |
        <button>
            <i class="fas fa-user-lock" /> Public
        </button>
 |
        <section class="board-members">
            <button @click="show.boardMembers=!show.boardMembers">+</button>
            <board-member-selector
                v-if="show.boardMembers"
                :boardMembers="boardMembers"
                :systemUsers="systemUsers"
                @loadUsers="loadUsers"
                @closeBoardMemberSelector="show.boardMembers=false"
                @toggleMember="toggleMember"
            />
        </section>
    </section>
</template>

<script>
import BoardMemberSelector from "@/components/board/BoardMemberSelector.vue";

export default {
    name: "BoardHeader",
    props: ['boardTitle', 'boardMembers', 'systemUsers'],
    data() {
        return {
            editTitle: false,
            newTitle: this.boardTitle,
            show: {
                boardMembers: false
            }
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
        loadUsers(userFilterBy) {
            this.$emit('loadUsers', userFilterBy)
        },
        toggleMember(member) {
            this.$emit('toggleMember', member)
        },
    },
    components:{
        BoardMemberSelector,
    }
};
</script>

<style>
</style>