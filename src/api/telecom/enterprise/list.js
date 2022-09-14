import request from '@/utils/request'

export function pageList(data) {
  return request({
    url: '/enterprise/pageList',
    method: 'post',
    data: data
  })
}

export function detail(id) {
  return request({
    url: '/enterprise/detail/' + id,
    method: 'post'
  })
}

export function add(data) {
  return request({
    url: '/enterprise/add',
    method: 'post',
    data: data
  })
}

export function edit(data) {
  return request({
    url: '/enterprise/edit',
    method: 'post',
    data: data
  })
}



