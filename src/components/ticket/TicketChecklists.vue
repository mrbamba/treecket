<template>
    <div>
        <section v-for="checklist in ticket.checklists" :key="checklist.id">
            <h4>Checklist:</h4>
            <ul>
                <li v-for="item in checklist.items" :key="item.id">
                    <input @change="emitUpdateTicket" type="checkbox" v-model="item.isDone" />
                    <span :class="{done: item.isDone}">{{ item.txt }}</span>
                </li>
                <div v-if="showNewItem && checklist.id === onEditChecklistId">
                <input @keyup.enter="emitAddItem(ev, checklist.id)" @blur="toggleAddItem" v-model="itemText" type="text" placeholder="Add an item">
                <button @click="emitAddItem(checklist.id)">Add</button>
                <button @click="toggleAddItem">X</button>
                </div>
                <button v-else @click="toggleAddItem(checklist.id)">Add an item</button>

            </ul>
        </section>
    </div>
</template>

<script>
export default {
    props:['ticket'],
    data() {
        return {
            showNewItem: false,
            onEditChecklistId: null, 
            itemText: ''
        }
    },

    methods: {
        emitUpdateTicket(){
            this.$emit('updateTicket', this.ticket);
        },

        toggleAddItem(checklistId){
            this.showNewItem = !this.showNewItem;
            this.itemText = '';
            (this.showNewItem) ? this.onEditChecklistId = checklistId : null;
        }, 

        emitAddItem(ev, checklistId){
            console.log(checklistId);
            this.$emit('addItem', {itemText: this.itemText, checklistId});
            if(ev && ev.key === 'enter'){
                this.itemText = '';
            } else {
                this.toggleAddItem()
            }
        }
    }
}
</script>

<style>
</style>