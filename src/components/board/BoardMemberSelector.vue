<template>
    <div class="board-member-selector">
        <h2>Members</h2>
        <button @click="closeBoardMemberSelector" class="close-btn-fa">
            <i class="fas fa-times" />
        </button>

        <input
            type="search"
            v-model="userFilterBy.txt"
            placeholder="Search members"
            class="minimal-input"
            @input="loadUsers"
        />
        <h4>BOARD MEMBERS</h4>
        <ul class="clean-list">
            <li
                v-for="member in filteredUsers"
                :key="member._id"
                @click="toggleMember(member)"
                class="member-list-item"
            >
                <div>
                    <avatar
                        :username="member.fullName"
                        :src="member.imgSrc"
                        :size="28"
                        class="member-select-avatar"
                    />
                    {{member.fullName}}
                </div>
                <span>{{member | isMember(boardMembers)}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
import Avatar from 'vue-avatar'
import cloneDeep from 'lodash/cloneDeep';

export default {
    name: 'BoardMemberSelector',
    props: {
        systemUsers: {
            type: Array,
            require: true
        },
        boardMembers: {
            type: Array,
            require: true
        }

    },
    data() {
        return {
            userFilterBy: {
                txt: ''
            }
        }
    },
    created() {
        this.loadUsers()
        // console.log('System users:', this.systemUsers, 'Board users:', this.boardMembers)
    },
    computed: {
        filteredUsers() {
            // let users
            // Array.prototype.push.apply(boardMembersList, systemUsersList);

            // Filters for search string
            let filtered = cloneDeep(this.systemUsers)
            // Sorts by fullName
            filtered.sort((memberA, memberB) =>
                memberA.fullName.localeCompare(memberB.fullName)
            );
            // Creates array of only users that are on the board
            let boardMembersList = filtered.filter(user => {
                let temp = this.boardMembers.filter(member => member._id === user._id)
                return temp.length
            })
            // Creates array of only board users who are not on the board
            let systemUsersList = filtered.filter(user => {
                let temp = this.boardMembers.filter(member => member._id === user._id)
                return !temp.length
            })
            // Merges the two arrays into the first one
            Array.prototype.push.apply(boardMembersList, systemUsersList);
            return boardMembersList
        }
    },
    methods: {
        loadUsers() {
            this.$emit('loadUsers', this.userFilterBy)
        },
        closeBoardMemberSelector() {
            this.$emit('closeBoardMemberSelector', this.userFilterBy)

        },
        toggleMember(member) {
            this.$emit('toggleMember', member)
            this.$emit('closeBoardMemberSelector', this.userFilterBy)
        },
    },
    components: {
        Avatar,
    }

}
</script>

<style>
</style>