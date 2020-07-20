<template>
    <div class="ticket-footer">
        <div>
            <font-awesome-icon fas icon="history" />
            <h3>Show:</h3>
        </div>
        <button>Comments</button>
        <button>History</button>
    </div>
</template>

<script>
  import Avatar from 'vue-avatar-component'

export default {
    name:'TicketComments',
    data(){
        return{
            showing:'Comments'
        }
    }

};
</script>

<style>
</style>