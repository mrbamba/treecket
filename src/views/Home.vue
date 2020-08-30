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

            <section class="jumbo">
                <!-- <div class="container"> -->
                    <div class="img-hero-container">
                        <img src="@/assets/images/note-list-mobile.svg" alt />
                    </div>
                    <div>
                        <h2>Real-Time Communication, Full Transparency</h2>
                        <h3>Items are represented visually on a kanban board, allowing team members to see the state of every piece of work at any time.</h3>
                    </div>
                <!-- </div> -->
            </section>

            <section class="jumbo">
                <!-- <div class="container"> -->
                    <div>
                        <h2>No Brainer Agile Development Mangement Tool</h2>
                    </div>
                    <div class="img-hero-container">
                        <img src="@/assets/images/prototyping-process.svg" alt />
                    </div>
                <!-- </div> -->
            </section>

            <section class="jumbo">
                <!-- <div class="container"> -->
                    <div class="img-hero-container">
                        <img src="@/assets/images/dashboard.svg" alt />
                    </div>
                    <div>
                        <h2>No Brainer Agile Development Mangement Tool</h2>
                    </div>
                <!-- </div> -->
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