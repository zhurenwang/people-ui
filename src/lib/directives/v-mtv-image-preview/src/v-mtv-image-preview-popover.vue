<template>
    <el-popover placement="right-start" trigger="hover" :disabled="!enabled" popper-class="m-v-preview" :reference="reference">
        <a v-if="showBlankOnClick && isReady" :href="imgUrl" target="_blank">
            <img class='m-v-img-preview' :src='imgUrl'>
        </a>
        <img class='m-v-img-preview' v-else-if="isReady" :src='imgUrl'>
        <i class="el-icon-loading" v-else></i>
    </el-popover>
</template>

<script>
    export default {
        name: "VMtvImagePreviewPopover",
        props: {
            reference: {
                required: true
            },
            url: {
                //type: String,
                //required: true
            },
            //是否进行url检测，检测是否可进行预览，默认：true;
            //图片可能上传CDN过程中，当前不能预览;
            detect: {
                type: Boolean,
                default: true
            },
            showBlankOnClick: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                enabled: true,
                isReady: true,   //图片是否已预备,默认: true; 当detect=true时，初始化时isReady=false
                imgUrl: '',     //用于最终显示的图片地址（绑定到组件）
                maxTimes: 10,   //最大轮循次数
                imageLoadTimer: null
            }
        },
        computed: {
            payload() {   //注：计算属性，用于同时监听多个参数。
                const {url, detect, showBlankOnClick} = this;
                return {url, detect, showBlankOnClick}
            }
        },
        created() {

        },
        mounted() {
            this.initAndLoadData();
        },
        methods: {
            initAndLoadData() {
                if (this.imageLoadTimer) {
                    clearTimeout(this.imageLoadTimer);
                }
                if (!this.url) {
                    this.isReady = false;
                    this.imgUrl = this.url;
                    this.enabled = false;
                } else {
                    this.enabled = true;
                    if (this.detect && this.url && this.url.indexOf('pic.tvmore.com.cn') > -1) {
                        this.isReady = false;
                        this.loadImage(this.url, (u) => {
                            this.isReady = true;   //准备就绪
                            this.imgUrl = this.url;
                        }, 0);
                    } else {
                        this.isReady = true;
                        this.imgUrl = this.url;
                    }
                }
            },
            loadImage(url, success, counter = 0) {
                if (this.imageLoadTimer) { clearTimeout(this.imageLoadTimer); }
                this.imageLoadTimer = setTimeout(() => {
                    let img = new Image();
                    img.onload = () => {
                        if (success) { success(url); }
                    };
                    img.onerror = () => {
                        if (counter >= this.maxTimes) {
                            if (success) { success(url); }
                        } else {
                            this.loadImage(url, success, counter ++);
                        }
                    };
                    img.src = url.indexOf('?') > -1 ? (url + '&' + new Date().getTime()) : (url + '?' + new Date().getTime());
                }, counter === 0 ? 1500 : (new Date().getTime() % 2 === 0 ? 1000 : 2000));
            }
        },
        watch: {
            payload: {
                handler: function (val, oldVal) {
                    this.initAndLoadData();
                },
                deep: true,
                immediate: true
            }
        }
    }
</script>

<style scoped>

</style>
