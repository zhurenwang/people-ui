// Copyright @2019 Co. Ltd..  All rights reserved.
// Created by whaley on 2019/7/19 16:39.
//
// base.constant.js
// 常量枚举值定义
// 说明：定义方式，参考Status，每项保持如下结构：{text: '', value: }
//

const HorizontalType = {
  0: {text: '第一横图', value: 1},
  1: {text: '第二横图', value: 2},
  2: {text: '第三横图', value: 3},
};

const LibraryType = {
  0: {text: '全国库', value: 1},
  1: {text: '全省库', value: 2},
  2: {text: '全市库', value: 3},
};

const TitleSpecialColumnType = {
  0: {text: '专题栏目', value: 1},
  1: {text: '新闻资讯', value: 2},
};

const NaInnerType = {
  0: {text: '链接', value: 1},
  1: {text: '列表', value: 2},
};

const QueryType = {
  0: {text: '标题', value: 1},
  1: {text: '内容', value: 2},
  2: {text: '标题或内容', value: 3},
};

const SexType = {
  0: {text: '未知', value: 0},
  1: {text: '男性', value: 1},
  2: {text: '女性', value: 2},
};

const AuditType = {
  0: {text: '待审核', value: 1},
  1: {text: '审核通过', value: 2},
  2: {text: '审核未通过', value: 3},
};



/**
 * 格式化常量枚举，用于通过值获取对应的文本
 *
 * @param constantObj
 * @param value
 * @returns {string}
 */
let format = function (constantObj, value) {
  for (let key in constantObj) {
    if (constantObj[key].value == value) {
      return constantObj[key].text;
    }
  }
  return value;
};


export default {
  format,
  HorizontalType,
  LibraryType,
  TitleSpecialColumnType,
  NaInnerType,
  QueryType,
  SexType,
  AuditType,
}
