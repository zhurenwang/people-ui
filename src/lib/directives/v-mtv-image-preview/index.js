// Copyright @2019 Co. Ltd..  All rights reserved.
// Created by whaley on 2019/8/1 11:01.
//
// index.js
// 指令：v-mtv-image-preview
// 功能说明：用于图片预览，可以在对应组件上显示一个弹出框，预览图片。
//
import Vue from 'vue';
import VMtvImagePreviewPopover from './src/v-mtv-image-preview-popover';

//注：返回一个构造函数
let VComponent = Vue.component(VMtvImagePreviewPopover.name, VMtvImagePreviewPopover);

//注1：注册一个全局自定义指令 `v-mtv-image-preview`
//注2：返回一个构造函数
let VMtvImagePreview =  Vue.directive('mtv-image-preview', {
    //注：当被绑定的元素插入到DOM中时回调
    inserted: function (el, binding) {
        let url = '', showBlankOnClick = false, detect = true;
        if (typeof binding.value === 'string') {
            url = binding.value;
        } else if (typeof binding.value === 'object') {
            url = binding.value['url'];
            showBlankOnClick = !!binding.value['showBlankOnClick'];
            detect = binding.value['detect'] === undefined ? true : !!binding.value['detect'];
        }
        let component = new VComponent({
            propsData: {
                reference: el,
                url: url,
                showBlankOnClick: showBlankOnClick,
                detect: detect
            }
        }).$mount();
        el.parentNode.appendChild(component.$el);
        el["v-mtv-image-preview-popover"] = component;
    },
    //注：指令所在组件的 VNode 及其子 VNode 全部更新后调用
    componentUpdated: function (el, binding) {
        let component = el["v-mtv-image-preview-popover"];
        if (component) {
            let url = '', showBlankOnClick = false;
            if (typeof binding.value === 'string') {
                url = binding.value;
            } else if (typeof binding.value === 'object') {
                url = binding.value['url'];
                showBlankOnClick = !!binding.value['showBlankOnClick'];
            }
            component.$props.url = url;
            component.$props.showBlankOnClick = showBlankOnClick;
        }
    }
});

export default VMtvImagePreview;
