<template>
    <div>
        <section v-for="checklist in ticket.checklists" :key="checklist.id">
            <ul>
                <li v-for="item in checklist.items" :key="item.id">
                    <input @change="updateTicket" type="checkbox" v-model="item.isDone" />
                    <h4 :class="{done: item.isDone}">{{ item.txt }}</h4>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
export default {
    props:['ticket'],
    methods: {
        updateTicket(){
            console.log(this.ticket);
        }
    }
}
</script>

<style>
</style>