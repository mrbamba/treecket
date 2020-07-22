<template>
    <div class="user-message">
        <h3>{{userMessage}}</h3>
    </div>
</template>

<script>
export default {
    name: 'UserMessage',
    props: ['userMessage'],
    created() {
        setTimeout(() => {
            this.$store.commit('setUserMessage', '')
        }, 3000);
    },

}
</script>

<style>
</style>