<template>
    <div class="weui-gallery" @click="close" v-if="isShow" style="display: block;">
        <span class="weui-gallery__img" :style="{backgroundImage: 'url('+img+')'}"></span>
        <div class="weui-gallery__opr">
            <a href="javascript:" class="weui-gallery__del" @click="del">
                <i class="weui-icon-delete weui-icon_gallery-delete"></i>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'gallery',
    props: {
        // img: String
    },
    data () {
        return {
            index: '',
            img: '',
            isShow: false
        }
    },
    methods: {
        close () {
            this.isShow = false
        },
        show (img, index) {
            this.img = img;
            this.index = index;
            this.isShow = true
        },
        del () {
            this.$emit('delAction', this.index)
        }
    }
}
</script>

