<template>
    <section class="tickets-by-week">
        <tickets-by-week-chart
            :options="options"
            label="New tickets by week"
            :chartData="chartData"
            v-if="chartData.weeks.length>0"
        />
    </section>
</template>

<script>
// import VueCharts from 'vue-chartjs'
// import { Line } from 'vue-chartjs'
import moment from 'moment'
import TicketsByWeekChart from '@/components/board/charts/TicketsByWeekChart.vue'



export default {
    props: {
        board: {
            type: Object,
            require: true
        }
    },
    name: "TicketsByWeek",
    // extends: Line,
    data() {
        return {
            chartData: {},
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },
    created() {
        this.calculateData()

    },
    methods: {
        calculateData() {
            console.log(this.board);
            let board = _.cloneDeep(this.board)
            //Create array on all board tickets
            let tickets = []
            board.groups.forEach(group => {
                group.tickets.forEach(ticket => {
                    tickets.push(ticket)
                });
            });
            // Sort the tickets by date to preserve chronological order
            tickets.sort((ticket1, ticket2) => {
                return ticket1.createdAt - ticket2.createdAt
            })
            // Create map of all tickets by week of creation
            let ticketMap = {};
            tickets.forEach(ticket => {
                if (Date.now() - ticket.createdAt > 1000 * 60 * 60 * 24 * 365) return
                let weeknumber = moment(ticket.createdAt).isoWeek();
                ticketMap[weeknumber] = ticketMap[weeknumber] || 0
                ticketMap[weeknumber]++
            });
            this.chartData.weeks = Object.keys(ticketMap)
            this.chartData.ticketCount = Object.values(ticketMap)

        }
    },
    components: {
        TicketsByWeekChart
    }
}
</script>