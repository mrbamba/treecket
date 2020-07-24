<template>
    <div class="member-selector">
        <h2>Members</h2>
        <input type="search" v-model="userFilterBy.txt" @input="loadUsers"/>
        <h4>BOARD MEMBERS</h4>
        <ul>
            <li v-for="user in users" :key="user._id">
                <pre>{{user}}</pre>
            </li>
        </ul>

    </div>
</template>

<script>
export default {
    name: 'MemberSelector',
    props: {
        users: {
            type: Array,
            require: true
        }
    },
    data(){
        return{
            userFilterBy:{
                txt:''
            }
        }
    },
    created(){
        this.loadUsers()
    },
    // computed:{
    //     users(){
    //         return this.$store.getters.users
    //     }
    // },
    methods:{
        loadUsers(){
            console.log(this.userFilterBy);
            this.$emit('loadUsers',this.userFilterBy)
        }
    }

}
</script>

<style>
</style>