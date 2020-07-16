<template>
    <div>
        <h3>{{ ticket.title }}</h3>
        <section>
            <h3>Description</h3>
            <textarea v-model="description" @blur="saveDescription" name="" id="" cols="30" rows="10">
            </textarea>
        </section>
    </div>
</template>

<script>
export default {
    props: ['ticket'],
    data(){
        return {
            description: this.ticket.description
        }
    },
    methods: {
        saveDescription(){
            this.ticket.description = this.description
            this.$emit('ticketSaved', this.ticket)
        }
    }
}
</script>

<style>

</style>