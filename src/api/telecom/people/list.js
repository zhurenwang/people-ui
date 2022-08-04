import request from '@/utils/request'

// 查询user列表
export function pageList(data) {
  return request({
    url: '/telecom/people/pageList',
    method: 'post',
    data: data
  })
}

// 查询背景图详情
export function detail(id) {
  return request({
    url: '/telecom/people/detail/' + id,
    method: 'post'
  })
}

// 新增背景图
export function add(data) {
  return request({
    url: '/telecom/people/add',
    method: 'post',
    data: data
  })
}

// 修改字典类型
export function edit(data) {
  return request({
    url: '/telecom/people/edit',
    method: 'post',
    data: data
  })
}

// 删除字典类型
export function del(id) {
  return request({
    url: '/telecom/people/del/' + id,
    method: 'post'
  })
}


