<template>
    <div>
        <section v-for="checklist in ticket.checklists" :key="checklist.id">
            <h4>Checklist:</h4>
            <ul>
                <li v-for="item in checklist.items" :key="item.id">
                    <div v-if="onEditItemId !== item.id">
                        <input @change.stop="emitUpdateTicket" type="checkbox" v-model="item.isDone" />
                        <span :class="{done: item.isDone}"  @click="toggleEditItem(item)">{{ item.txt }}</span>
                    </div>
                    <div v-else>
                        <textarea
                            @keyup.enter="saveUpdateChanges(item)"
                            @blur="onBlurEditItem($event, item)"
                            v-model="item.txt"
                            cols="30"
                            rows="3"
                        />
                        <button data-prevent-blur="save">Save</button>
                        <button>X</button>
                    </div>
                </li>
                <div v-if="showNewItem && checklist.id === onEditChecklistId">
                    <input
                        @keyup.enter="emitAddItem($event, checklist.id)"
                        @blur="onBlurAddItem($event, checklist.id)"
                        v-model="itemTxt"
                        type="text"
                        placeholder="Add an item"
                    />
                    <button data-prevent-blur="add">Add</button>
                    <button @click="toggleAddItem">X</button>
                </div>
                <button v-else @click="toggleAddItem(checklist.id)">Add an item</button>
            </ul>
        </section>
    </div>
</template>

<script>
export default {
    props: ['ticket'],
    data() {
        return {
            showNewItem: false,
            onEditChecklistId: null,
            onEditItemId: null,
            itemTxt: '',
            onEditItemTxt: ''
        }
    },

    methods: {
        emitUpdateTicket() {
            this.$emit('updateTicket', this.ticket);
        },

        toggleAddItem(checklistId) {
            this.showNewItem = !this.showNewItem;
            this.itemTxt = '';
            this.onEditChecklistId = (this.showNewItem) ? checklistId : null;
        },

        toggleEditItem(item) {
            if (this.onEditItemId) {
                this.onEditItemId = null
                this.onEditItemTxt = ''
            } else {
                this.onEditItemId = item.id
                this.onEditItemTxt = item.txt
            }
        },

        emitAddItem(ev, checklistId) {
            this.$emit('addItem', { itemTxt: this.itemTxt, checklistId });
            if (ev && ev.key === 'enter') {
                this.itemTxt = '';
            } else {
                this.toggleAddItem()
            }
        },

        onBlurAddItem(ev, checklistId) {
            if (ev.relatedTarget && ev.relatedTarget.dataset.preventBlur === "add") {
                this.emitAddItem(ev, checklistId);
            } else {
                this.toggleAddItem()
            }
        },

        onBlurEditItem(ev ,item) {
            if (ev.relatedTarget && ev.relatedTarget.dataset.preventBlur === "save") {
                this.saveUpdateChanges(item)
            } else {
                this.toggleEditItem(item)
            }
        },

        saveUpdateChanges(item) {
            this.emitUpdateTicket()
            this.toggleEditItem(item)
        }


        //         onBlur(ev, checklistId, item) {

        //             if (ev.relatedTarget.dataset.preventBlur === "add") {
        //                 this.emitAddItem(ev, checklistId);
        //             } else if (ev.relatedTarget.dataset.preventBlur === "save") {

        //             } else {
        //                 console.log('close');
        //                 item.txt = this.onEditItemTxt
        //                 this.toggleAddItem()
        //                 this.toggleEditItem(item)
        //                 this.showNewItem = false;
        //                 this.onEditChecklistId = null;
        //                 this.onEditItemId = null;
        //                 this.itemTxt = '';
        //                 this.onEditItemTxt = '';

        //             }

        //         } else {
        //             if(this.showNewItem) {
        //     this.toggleAddItem()
        // } else {

        // }
        //             }
        //         }
    }
}
</script>

<style>
</style>