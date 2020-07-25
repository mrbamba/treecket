<template>
    <section class="tickets-per-group">
        <tickets-per-group-chart
            :options="options"
            label="Tickets per group"
            :chartData="chartData"
            v-if="showChart"
        />
    </section>
</template>

<script>
// import VueCharts from 'vue-chartjs'
// import { Line } from 'vue-chartjs'
import TicketsPerGroupChart from '@/components/board/charts/TicketsPerGroupChart.vue'



export default {
    props: {
        board: {
            type: Object,
            require: true
        }
    },
    name: "TicketsPerGroup",
    // extends: Line,
    data() {
        return {
            chartData: {},
            options: {
                responsive: true,
                maintainAspectRatio: false
            },
            showChart: false,
        }
    },
    created() {
        console.log(this.board);
        this.calculateData()

    },
    methods: {
        calculateData() {
            console.log(this.board);

            // let board = _.cloneDeep(this.board)

            // console.log(this.board)
            let groupMap = {};
            this.board.groups.forEach(group => {
                let groupTitle = group.title
                groupMap[groupTitle] = group.tickets.length
                console.log({ groupMap })
            });
            this.chartData.groupTitle = Object.keys(groupMap)
            this.chartData.ticketCount = Object.values(groupMap)


            console.log('CHART DATA', this.chartData)
            this.showChart = true;
        }
    },
    components: {
        TicketsPerGroupChart
    }
}
</script>