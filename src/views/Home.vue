<template>
    <div class="home-container">
        <fixed-header />
        <main>
            <section class="trial-heading">
                <div>
                    <h2>
                        <span>Everything Starts With</span> 
                        <span>A Great Kanban</span>
                    </h2>
                    <router-link to="/board" class="trial-btn-main">Try it free</router-link>
                </div>
            </section>

            <section class="jumbo-white">
                <div class="img-hero-container">
                    <img src="@/assets/images/note-list-mobile.svg" alt />
                </div>
                <div>
                    <h2>Real-time communication and full transparency</h2>
                </div>
            </section>
            
            <section class="jumbo-gray">
                <div>
                    <h3>Items are represented visually on a kanban board, allowing team members to see the state of every piece of work at any time.</h3>
                </div>
                <div class="img-hero-container" style="display: block">
                    <img src="@/assets/images/dashboard.svg" alt />
                </div>
            </section>

            <section class="jumbo-white">
                <div>
                    <h2>Probably the best tool for agile software development</h2>
                </div>
                <div class="img-hero-container">
                    <img src="@/assets/images/scrum-board.svg" alt />
                </div>
            </section>
        </main>
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