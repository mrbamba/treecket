<template>
    <section class="dashboard">
        <button @click="closeDashboard" class="close-dashboard-btn">
            <img src="@/assets/icons/close-medium-eee.png" alt />
        </button>
        <h2>
            <i class="fas fa-chart-area" /> Dashboard
        </h2>
        <div class="top-data">
            <div class="data-container">
                <div class="total-tickets-count">
                    <i class="fas fa-align-left"></i>
                </div>
                <div class="dashboard-data">
                    <span>{{ticketsCount}}</span> Tickets
                </div>
            </div>
            <div class="data-container">
                <div class="total-board-members-count">
                    <i class="far fa-user-circle"></i>
                </div>
                <div class="dashboard-data">
                    <span>{{board.members.length}}</span> Members
                </div>
            </div>
            <!-- <div  class="data-container">
                <div class="board-created-at">
                    <i class="far fa-clock"></i>
                </div>
                <div class="dashboard-data">
                    <span>{{board.createdAt|formatTime}}</span> Created
                </div>
            </div>-->
            <div class="data-container">
                <div class="total-board-activities">
                    <i class="fas fa-history"></i>
                </div>
                <div class="dashboard-data">
                    <span>{{board.activities.length}}</span> Activities
                </div>
            </div>
            <div class="data-container">
                <div class="total-comments">
                    <i class="far fa-comments"></i>
                </div>
                <div class="dashboard-data">
                    <span>{{commentCount}}</span> Comments
                </div>
            </div>
        </div>
        <tickets-by-week :board="board" />
        <div class="chart-section-one">
            <tickets-per-member class="tickets-per-member-chart" :board="board" />
            <tickets-per-group class="tickets-per-group-chart" :board="board" />
        </div>
    </section>
</template>

<script>
import TicketsPerGroup from '@/components/board/charts/TicketsPerGroup.vue';
import TicketsByWeek from '@/components/board/charts/TicketsByWeek';
import TicketsPerMember from '@/components/board/charts/TicketsPerMember';

export default {
    name: "Dashboard",
    props: {
        board: {
            type: Object,
            require: true
        },
    },
    created() {
        this.$store.commit("toggleOverlay", true);
    },
    mounted() {
        this.$watch("overlay", function (newValue, oldValue) {
            this.closeDashboard();
            console.log('closing')
        });
    },
    destroyed() {
        this.$store.commit("toggleOverlay", false);
    },
    methods: {
        closeDashboard() {
            this.$emit('closeDashboard')
        },
    },
    computed: {
        overlay() {
            return this.$store.getters.overlay;
        },
        ticketsCount() {
            let tickets = 0
            this.board.groups.forEach(group => {
                group.tickets.forEach(ticket => {
                    tickets++
                });
            });
            return tickets
        },
        commentCount() {
            let commentsCount = 0
            this.board.groups.forEach(group => {
                group.tickets.forEach(ticket => {
                    ticket.comments.forEach(comment => {
                        commentsCount++
                    })

                });
            });
            return commentsCount;
        }
    },
    components: {
        TicketsPerGroup,
        TicketsByWeek,
        TicketsPerMember,
    }
}
</script>

<style>
</style>