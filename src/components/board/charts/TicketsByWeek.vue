<template>
    <section class="dashboard">
        <LineChart :options="options" label="New tickets by week" :chartData="chartData" v-if="chartData.weeks.length>0"/>
    </section>
</template>

<script>
import VueCharts from 'vue-chartjs'
import { Line } from 'vue-chartjs'
import moment from 'moment'
import LineChart from '@/components/board/charts/LineChart.vue'



export default {
    props: ['board'],
    name: "Dashboard",
    extends: Line,
    data() {
        return {
            chartData: {},
            // chartdata: {
            //     labels: ['TO DO', 'IN PROGRESS', 'DONE'],
            //     datasets: [
            //         {
            //             label: 'Data One',
            //             backgroundColor: '#f87979',
            //             data: [18, 7, 43]
            //         }
            //     ]
            // },
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
                console.log(weeknumber)
                ticketMap[weeknumber] = ticketMap[weeknumber] || 0
                ticketMap[weeknumber]++
            }); 
            // let arr = [ ...ticketMap.keys()]
            this.chartData.weeks = Object.keys(ticketMap)
            this.chartData.ticketCount = Object.values(ticketMap)

            console.log(this.chartData)
            // 
        }
    },
    // props: {
    // board: {
    //     type: Object,
    //     require: true
    // },
    // chartdata: {
    //     type: Object,
    //     default: null
    // },
    // options: {
    //     type: Object,
    //     default: null
    // }
    // },
    // mounted() {
    //     this.renderChart(this.chartdata, this.options)
    // },
    components: {
        LineChart
    }
}
</script>