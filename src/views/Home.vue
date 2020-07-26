<template>
    <div class="home-container">
        <fixed-header />
        <section class="jumbo-white">
            <div>
                <h2>The best tool for agile software development</h2>
                <router-link to="/board" class="save-button">Try it free</router-link>
            </div>
            <img src="@/assets/icons/scrum-board.png" alt />
        </section>
        
        <section class="jumbo-gray">
            <h3>Items are represented visually on a kanban board, allowing team members to see the state of every piece of work at any time.</h3>
        </section>

        <section class="jumbo-white">
            <img src="@/assets/icons/note-list-mobile.png" alt />
            <h2>Real-time communication of capacity and full transparency of work.</h2>
        </section>
    </div>
</template>

<script>
import FixedHeader from '@/components/FixedHeader.vue';
export default {
    name: "Home",
    components: {
        FixedHeader,
    }
};
</script>

<style scoped>
</style>