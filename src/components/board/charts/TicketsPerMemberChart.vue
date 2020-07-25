<script>
import { Pie } from 'vue-chartjs'
export default {
    name:'TicketsPerMemberChart',
    extends: Pie,
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
                data: ticketCount
            }]
        }, this.options)
    }
}

</script>