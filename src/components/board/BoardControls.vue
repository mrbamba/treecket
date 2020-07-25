<template>
    <section class="board-controls">
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
                    maxlength="36"
                />
            </div>
            <button>
                <!-- <i class="fas fa-user-lock" />
                <span class="hidden show-normal">Team</span> -->
                <i class="fas fa-globe-americas" />
                <span class="hidden show-normal">Public</span>
            </button>
            <section class="board-member-list">
                <avatar
                class="board-member-avatar"
                    v-for="member in boardMembers"
                    :key="member._id"
                    :username="member.fullName"
                    :src="member.imgSrc"
                    :size="32"
                />
            </section>

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
        <div class="end-of-board-controls">
            <button @click="showDashboard">
                <i class="dashboard-icon fas fa-chart-area"></i>
                <span class="hidden show-normal">Dashboard</span>
            </button>

            <button @click="showMenu">
                <i class="fas fa-ellipsis-h" />
                <span class="hidden show-normal">Show Menu</span>
            </button>
        </div>
    </section>
</template>

<script>
import BoardMemberSelector from "@/components/board/BoardMemberSelector.vue";
import Avatar from 'vue-avatar'

export default {
    name: "BoardControls",
    props: ['boardTitle', 'boardMembers', 'systemUsers', 'board'],
    data() {
        return {
            editTitle: false,
            newTitle: this.boardTitle,
            show: {
                boardMembers: false,
                dashboard: false
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
        resizeInput() {
            const input = this.$refs.updatedBoardTitle;
            const hide = input.previousElementSibling;

            hide.textContent = input.value;
            input.style.width = hide.offsetWidth + 29 + "px";
        },
        showDashboard() {
            this.$emit('showDashboard')
        },
        showMenu() {
            this.$emit('showMenu')
        }
    },
    components: {
        BoardMemberSelector,
        Avatar,
    }
}
</script>

<style>
</style>