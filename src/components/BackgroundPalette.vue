<template>
    <ul class="background-palette clean-list">
        <li v-for="item in backgrounds[type]" :key="item">
            <div :style="{background: item}" @click="setBackground(item)"></div>
        </li>
    </ul>
</template>

<script>
export default {
    props: ['type'],
    data() {
        return {
            backgrounds: {
                ticketColors: ['rgb(255, 191, 175)', 'rgb(229, 152, 155)', 'rgb(203, 119, 148)', 'rgb(226, 158, 182)',
                    'rgb(211, 173, 215)', 'rgb(131, 197, 190)', 'rgb(56, 153, 162)'],
                backgroundColors: ['rgb(46, 121, 186)', 'rgb(72, 171, 200)', 'rgb(106, 188, 114)', 'rgb(98, 149, 70)', 'rgb(132, 99, 154)',
                                    'rgb(191, 98, 143)', 'rgb(164, 76, 56)', 'rgb(202, 146, 71)'],
                images: ['url(https://images.wallpapersden.com/image/download/fractal-red-mountains_63786_3840x2160.jpg) center / cover'
                    ,'url(https://images.wallpapersden.com/image/download/minimal-mountains_57564_3840x2160.jpg) center / cover',
                    'url(https://images.wallpapersden.com/image/download/digital-sunset-art_70508_3840x2160.jpg) center / cover',
                    'url(https://images.hdqwalls.com/wallpapers/minimal-mountains-landscape-4k-az.jpg) center / cover',
                    'url(https://images.wallpapersden.com/image/download/city-art-5k_68664_3840x2160.jpg) center / cover',
                    'url(https://images.wallpapersden.com/image/download/spill-of-colors_63349_3840x2160.jpg) center / cover',
                    'url(https://images.wallpapersden.com/image/download/scifi-astronaut-space-mars_57674_2560x1440.jpg) center / cover',
                    'url(https://images.wallpapersden.com/image/download/mountains-trees-forest-3d-minimalism_59769_1920x1080.jpg) center / cover',
                    'url(https://res.cloudinary.com/dkdsymsli/image/upload/v1595784408/vlyweeydsdsmvarf2pto.jpg) center / cover',
                    'url(https://wallpapercave.com/wp/wp4093025.jpg) center / cover']
            }
        }
    },
    methods: {
        setBackground(background) {
            this.$emit('setBackground', background);
        }
    }
}
</script>

<style>
</style>