import base from './index'
let axios = base.axios
let baseUrl = base.baseUrl

export const getConversationList = params => {
  return axios({
    method: 'get',
    url: `https://zwlpda.azurewebsites.net/getConversationList`
  }).then(res => res.data.answer)
}

  // 获取聊天信息
export const getHistories = conversationId => {
  return axios({
    method: 'get',
      url: `https://zwlpda.azurewebsites.net/getHistories/${conversationId}`,
      params: {},
      headers: {
        'Content-Type': 'application/json',
        'charset': 'UTF-8',
        //'Authorization': `Bearer xxxxx`,
      }
  }).then(res => res.data)
}

export const updateHistory = params => {
  return axios({
    method: 'post',
    url: `https://zwlpda.azurewebsites.net/updateHistory`,
    data: params,
    headers: {
      'Content-Type': 'application/json',
      'charset': 'UTF-8',
      //'Authorization': `Bearer xxxxx`,
    }
  }).then(res => res.data)
}

  export const chat = params => {
    return axios({
      method: 'post',
      url: `https://zwlpda.azurewebsites.net/chat/question`,
      data: params,
      headers: {
        'Content-Type': 'application/json',
        'charset': 'UTF-8',
        //'Authorization': `Bearer xxxxx`,
      }
    }).then(res => res.data)
  }

  export const readanswer = conversationId => {
    return axios({
      method: 'get',
      url: `https://zwlpda.azurewebsites.net/readAnswer/${conversationId}`,
      params: {},
      headers: {
        'Content-Type': 'application/json',
        'charset': 'UTF-8',
        //'Authorization': `Bearer xxxxx`,
      }
    }).then(res => res.data)
  }