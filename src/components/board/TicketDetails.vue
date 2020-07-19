<template>
    <div class="ticket-details">
        <button class="close-btn" @click="closeTicketDetails">X</button>
        <div>
            <textarea
                @input="expandTextareaEl()"
                ref="title"
                v-model="ticket.title"
                @blur="saveTicket"
                maxlength="140"
            />
            <section>
                <h3>Description:</h3>
                <textarea
                    v-model="ticket.description"
                    @blur="saveTicket"
                    placeholder="Enter your ticket description"
                    cols="30"
                    rows="10"
                />
                <section
                    v-for="attachment in ticket.attacments"
                    :key="attachment.id"
                >{{ attachment }}
                </section>
                <ticket-checklists :ticket="ticket" />
            </section>
        </div>
        <ticket-menu @deleteTicket="deleteTicket" :ticket="ticket" />
    </div>
</template>

<script>
import TicketMenu from "@/components/ticket/TicketMenu.vue";
import TicketChecklists from "@/components/ticket/TicketChecklists.vue";
export default {
    props: ['ticket', 'groupId'],
    components: {
        TicketMenu,
        TicketChecklists
    },
    computed: {
        overlay() {
            return this.$store.getters.overlay
        }
    },
    created() {
        this.$store.commit('showOverlay');
    },
    mounted() {
        this.$watch('overlay', function (newValue, oldValue) {
            this.closeTicketDetails();
        });
    },
    destroyed() {
        this.$store.commit('hideOverlay');
    },
    methods: {
        saveTicket() {
            this.$emit('saveTicket', this.ticket)
        },
        closeTicketDetails() {
            this.$emit('closeTicketDetails')
        },
        deleteTicket(ticketId) {
            console.log('TicketDetails params:', ticketId, this.groupId)
            this.$emit('deleteTicket', { ticketId, groupId: this.groupId })
        },
        expandTextareaEl() {
            const el = this.$refs.title;
            el.style.height = ""; el.style.height = el.scrollHeight + "px"
        }
    },
}
</script>

<style>
.done {
    text-decoration: line-through;
}
</style>