<template>
    <div class="member-selector">
        <h2>Members</h2>
        <input type="search" />
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
    }

}
</script>

<style>
</style>