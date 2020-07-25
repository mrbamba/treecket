<template>
    <section class="tickets-per-member">
        <tickets-per-member-chart
            :options="options"
            label="Tickets per member"
            :chartData="chartData"
        />
    </section>
</template>

<script>
// import moment from 'moment'
import TicketsPerMemberChart from '@/components/board/charts/TicketsPerMemberChart.vue'



export default {
    name: "TicketsPerMember",
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
            
            let memberMap = {};
            tickets.forEach(ticket => {
                ticket.members.forEach(member => {
                    let memberId = member._id;
                    if (memberMap.hasOwnProperty(memberId)) {

                        memberMap[memberId].ticketCount++
                    } else {
                        memberMap[memberId] = {
                            fullName: member.fullName,
                            imgSrc: member.imgSrc,
                            ticketCount: 1
                        }
                    }

                });
            });
            this.chartData.fullName=[]
            this.chartData.imgSrc=[]
            this.chartData.ticketCount=[]
            for (const member in memberMap) {
                
                this.chartData.fullName.push(memberMap[member].fullName)
                this.chartData.imgSrc.push(memberMap[member].imgSrc)
                this.chartData.ticketCount.push(memberMap[member].ticketCount)
            }
            console.log(this.chartData)
        }
    },
    components: {
        TicketsPerMemberChart
    }
}
</script>