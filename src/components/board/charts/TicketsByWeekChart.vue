<script>
import { Line } from 'vue-chartjs'
export default {
    name:'TicketsByWeekChart',
    extends: Line,
    props: {
        label: {
            type: String,
        },
        chartData: {
            type: Object,
        },
        options: {
            type: Object,
        }
    },
    mounted() {
        const weeks = this.chartData.weeks
        const ticketCount = this.chartData.ticketCount

        this.renderChart({
            labels: weeks,
            datasets: [{
                label: this.label,
                data: this.chartData.ticketCount,
                backgroundColor:this.chartData.colors,
                borderColor:this.chartData.colors,
            }]
        }, this.options)
    }
}

</script>