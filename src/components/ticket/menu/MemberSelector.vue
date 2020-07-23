<template>
    <div class="member-selector">
        <h2>Members</h2>
        <input type="search" v-model="userFilterBy.txt" @input="filterUsers" />
        <h4>BOARD MEMBERS</h4>
        <ul>
            <li v-for="user in filteredUsers" :key="user._id">
                <pre>{{user}}</pre>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'MemberSelector',
    props: {
        boardUsers: {
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
    computed: {
        filteredUsers() {
            return this.boardUserd.filter(user=>user.name===userFilterBy.txt)
        }
    },
    methods: {
        addTicketUser() {
            console.log(this.userFilterBy);
            this.$emit('addTicketUser', this.userFilterBy)
        }
    }

}
</script>

<style>
</style>