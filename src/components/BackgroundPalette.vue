<template>
    <ul class="background-palette clean-list" >
        <li v-for="item in backgrounds[type]" :key="item">
            <div :style="{background: item}"></div>
        </li>
    </ul>
</template>

<script>
export default {
    props: ['type'],
    data() {
        return {
            backgrounds: {
                colors: ['rgb(255, 191, 175)', 'rgb(229, 152, 155)', 'rgb(203, 119, 148)', 'rgb(226, 158, 182)',
                        'rgb(211, 173, 215)', 'rgb(131, 197, 190)', 'rgb(56, 153, 162)'],
                images: ['@/assets/backgrounds/mountains-1.jpg' ,
                        '@/assets/backgrounds/mountains-2.jpg','@/assets/images/backgrounds/mountains-3.jpg',
                        '@/assets/backgrounds/sunset-1.jpg']
            }
        }
    }
}
</script>

<style>
</style>