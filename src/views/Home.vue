<template>
    <div class="home-container">
        <fixed-header />

        <main class="flex column align-center">
            <section class="heading">
                <div>
                    <h2 class="block">
                        <span class="block">Everything Starts With</span>
                        <span class="block">A Great Kanban</span>
                    </h2>
                    <router-link to="/board" class="main-trial-link">Try it free</router-link>
                </div>
            </section>

            <section class="jumbo full-width">
                <div class="container flex wrap-reverse">
                    <img class="flex1" src="@/assets/images/note-list-mobile.svg" alt />
                    <div class="flex column justify-center flex1">
                        <h2>Real-Time Communication, Full Transparency</h2>
                        <h3>Items are represented visually on a kanban board, allowing team members to see the state of every piece of work at any time.</h3>
                    </div>
                </div>
            </section>

            <section class="jumbo full-width">
                <div class="container flex wrap">
                    <div class="flex column justify-center flex1">
                        <h2>No Brainer Agile Development, Prototyping to Production</h2>
                        <h3>Ease of use is our mission, so you can stay focusd more on creation and less on administration.</h3>
                    </div>
                    <img class="flex1" src="@/assets/images/prototyping-process.svg" alt />
                </div>
            </section>

            <section class="jumbo full-width">
                <div class="container flex wrap-reverse">
                    <img class="flex1" src="@/assets/images/dashboard.svg" alt />
                    <div class="flex column justify-center flex1">
                        <h2>Stay On Track as You Plan</h2>
                        <h3>Achive your goals with our advanced platform including awesome dashboard and lots of customization options.</h3>
                    </div>
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