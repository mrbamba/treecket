<template>
  <div>
    {{ getBoard.title }}
    <ticket-group
      v-for="group in getBoard.groups"
      :key="group._id"
      :group="group"
      @openTicket="openTicket"
    />
    <ticket-details v-if="openingTicket" :ticket="openingTicket" @ticketSaved="saveBoard" />
  </div>
</template>

<script>
import TicketGroup from "@/components/board/TicketGroup.vue";
import TicketDetails from "@/views/TicketDetails.vue";
export default {
  data() {
    return {
      openingTicket: null
    };
  },

  computed: {
    getBoard() {
      const board = this.$store.getters.currBoard;
      return board;
    }
  },

  created() {
    this.$store.dispatch("loadBoard", this.$route.params.id);
  },

  methods: {
    openTicket(ticket) {
      this.openingTicket = ticket;
    },
    saveBoard(ticket){
        // console.log(this.);
    }
  },
  components: {
    TicketGroup,
    TicketDetails
  }
};
</script>

<style>
</style>