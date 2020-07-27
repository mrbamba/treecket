<template>
    <div class="home-container">
        <fixed-header />
        <main>
            <!-- <section>
                <div>
                    <h2>
                        Forget Everything You Know About Kanban
                    </h2>
                    <router-link to="/board" class="try-free-main">Try it free</router-link>
                </div>
                <div class="img-hero-container">
                    <img src="@/assets/images/scrum-board.png" alt />
                </div>
            </section> -->
            <section class="jumbo-white">
                <div>
                    <h2>Probably the best tool for agile software development</h2>
                    <router-link to="/board" class="try-free-main">Try it free</router-link>
                </div>
                <div class="img-hero-container">
                    <img src="@/assets/images/scrum-board.png" alt />
                </div>
            </section>

            <section class="jumbo-gray">
                <div>
                    <h3>Items are represented visually on a kanban board, allowing team members to see the state of every piece of work at any time.</h3>
                </div>
            </section>

            <section class="jumbo-white">
                <div class="img-hero-container">
                    <img src="@/assets/images/note-list-mobile.png" alt />
                </div>
                <div>
                    <h2>Real-time communication and full transparency</h2>
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