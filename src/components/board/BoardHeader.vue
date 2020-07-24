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
            </div>
            <button>
                <i class="fas fa-user-lock" /> Team
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
        </div>

        <button>
            <i class="fas fa-ellipsis-h" /> Show Menu
        </button>
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
            this.$nextTick(() => {
                this.resizeInput();
                this.$refs.updatedBoardTitle.focus()
            });
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