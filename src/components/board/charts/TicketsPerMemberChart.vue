<script>
import { Pie, Doughnut } from 'vue-chartjs'
export default {
    name:'TicketsPerMemberChart',
    extends: Doughnut,
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
        const members = this.chartData.fullName
        const ticketCount = this.chartData.ticketCount

        this.renderChart({
            labels: members,
            datasets: [{
                label: this.label,
                data: ticketCount,
                backgroundColor:this.chartData.colors,
                borderColor:this.chartData.colors,
            }]
        }, this.options)
    }
}

</script>