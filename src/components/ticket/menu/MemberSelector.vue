<template>
    <div class="member-selector">
        <h2>Members</h2>
        <button @click="closeMemberSelect">
            <i class="fas fa-times close-btn-fa" />
        </button>

        <input
            type="search"
            v-model="userFilterBy.txt"
            placeholder="Search members"
            class="minimal-input"
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
                <span>{{member | isMember(ticketMembers)}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
import Avatar from 'vue-avatar'

export default {
    name: 'MemberSelector',
    props: {
        boardMembers: {
            type: Array,
            require: true
        },
        ticketMembers: {
            type: Array,
            require: false
        }
    },
    data() {
        return {
            userFilterBy: {
                txt: ''
            }
        }
    },
    computed: {
        filteredUsers() {
            // Filters for search string
            let filtered = _.cloneDeep(this.boardMembers).filter(user => user.fullName.toLowerCase().includes(this.userFilterBy.txt.toLowerCase()))
            // Sorts by fullName
            filtered.sort((memberA, memberB) =>
                memberA.fullName.localeCompare(memberB.fullName)
            );
            // Creates array of only users that are on the ticket
            let ticketMembersList = filtered.filter(user => {
                let temp = this.ticketMembers.filter(member => member._id === user._id)
                return temp.length
            })
            // Creates array of only board users who are not on the ticket
            let boardMembersList = filtered.filter(user => {
                let temp = this.ticketMembers.filter(member => member._id === user._id)
                return !temp.length
            })
            // Merges the two arrays into the first one
            Array.prototype.push.apply(ticketMembersList, boardMembersList);
            return ticketMembersList
        }
    },
    methods: {
        toggleMember(member) {
            this.$emit('toggleMember', member)
        },
        closeMemberSelect() {
            this.$emit('closeMemberSelect')

        }
    },
    components: {
        Avatar,
    }

}
</script>

<style>
</style>