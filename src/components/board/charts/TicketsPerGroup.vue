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
import TicketsPerGroupChart from '@/components/board/charts/TicketsPerGroupChart.vue'



export default {
    name: "TicketsPerGroup",
    props: {
        board: {
            type: Object,
            require: true
        }
    },
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
        this.calculateData()

    },
    methods: {
        calculateData() {
            let groupMap = {};
            this.board.groups.forEach(group => {
                let groupTitle = group.title
                groupMap[groupTitle] = group.tickets.length
            });
            this.chartData.groupTitle = Object.keys(groupMap)
            this.chartData.ticketCount = Object.values(groupMap)


            this.showChart = true;
        }
    },
    components: {
        TicketsPerGroupChart
    }
}
</script>