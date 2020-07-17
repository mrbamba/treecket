<template>
    <div>
        <button @click="closeCompnenet">X</button>
        <h3>{{ ticket.title }}</h3>
        <section>
            <h3>Description:</h3>
            <textarea v-model="description" @blur="saveDescription" name="" id="" cols="30" rows="10">
            </textarea>
            <section v-for="attachment in ticket.attacments" :key="attachment.id">
                {{ attachment }}
            </section>
            <section v-for="checklist in ticket.checklists" :key="checklist.id">
                Checklist id: {{ checklist.id }}
                <ul>
                    <li v-for="(item, idx) in checklist.items" :key="idx">
                        <input type="checkbox" v-model="item.isDone" />
                        <h4 :class="{done: item.isDone}">{{ item.txt }}</h4>
                    </li>
                </ul>
            </section>
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
        },

        closeCompnenet(){
            this.$emit('closeTicket')
        }
    }
}
</script>

<style>
    .done{
        text-decoration: line-through;
    }
</style>