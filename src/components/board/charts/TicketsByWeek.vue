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
import moment from 'moment'
import TicketsByWeekChart from '@/components/board/charts/TicketsByWeekChart.vue'



export default {
    name: "TicketsByWeek",
    props: {
        board: {
            type: Object,
            require: true
        }
    },
    // extends: Line,
    data() {
        return {
            chartData: {},
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]

                }
            }
        }
    },
    created() {
        this.calculateData()

    },
    methods: {
        calculateData() {
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

            // let colorsArray=['#FF0000','#FF7F00','#FFD400','#FFFF00','#BFFF00','#6AFF00','#00EAFF','#0095FF','#0040FF','#AA00FF','#FF00AA','#EDB9B9','#E7E9B9','#B9EDE0','#B9D7ED','#DCB9ED','#8F2323','#8F6A23','#4F8F23','#23628F','#6B238F','#000000','#737373','#CCCCCC']
            let colorsArray=['#77777755'];

            var colors = [];
            while (colors.length < this.chartData.ticketCount.length) {
                let colorIndex = Math.floor(Math.random() * Math.floor(colorsArray.length))
                colors.push(colorsArray[colorIndex])
            }
            this.chartData.colors=colors;
            this.showChart = true;
        }
    },
    components: {
        TicketsByWeekChart
    }
}
</script>