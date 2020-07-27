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
                maintainAspectRatio: false,
                scaleFontColor: "#FFFFFF",

                legend: {
                    fontColor: '#fff',
                    labels: {
                        // This more specific font property overrides the global property

                        fontColor: "white",
                        fontSize: 24
                    }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            fontColor: "white",
                            stepSize: 1,
                            beginAtZero: true
                        }
                    }]
                }
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



            let colorsArray = ['#FF0000', '#FF7F00', '#FFD400', '#FFFF00', '#BFFF00', '#6AFF00', '#00EAFF', '#0095FF', '#0040FF', '#AA00FF', '#FF00AA', '#EDB9B9', '#E7E9B9', '#B9EDE0', '#B9D7ED', '#DCB9ED', '#8F2323', '#8F6A23', '#4F8F23', '#23628F', '#6B238F', '#000000', '#737373', '#CCCCCC']

            var colors = [];
            while (colors.length < this.chartData.ticketCount.length) {
                let colorIndex = Math.floor(Math.random() * Math.floor(colorsArray.length))
                colors.push(colorsArray[colorIndex])
            }
            this.chartData.colors = colors;
            this.showChart = true;
        }
    },
    components: {
        TicketsPerGroupChart
    }
}
</script>