export const state = () => ({
  // counter: 0
  books: [],
  current: null,
  // 検索結果を保持する
  searchResult: null,
  pageCount: 0,
  keyword: '',
})

export const getters = {
  bookCount(state) {
    return state.books.length
  },
  allBooks(state) {
    return state.books
  },
  getRangeByPage(state) {
    return (page) => {
      const SIZE = 3
      return state.books.slice((page - 1) * SIZE, (page - 1) * SIZE + SIZE)
    }
  },
  getBookById(state) {
    return (id) => {
      return state.books.find((book) => book.id === id)
    }
  },
  current(state) {
    return state.current
  },
  getSearchResult(state) {
    return state.searchResult
  },
  getPageCount(state) {
    return state.pageCount
  },
  getKeyword(state) {
    return state.keyword
  },
}

export const mutations = {
  updateCurrent(state, payload) {
    state.current = payload
  },
  updateBook(state, payload) {
    const b = this.getters.getBookById(payload.id)
    if (b) {
      Object.assign(b, payload)
    } else {
      state.books.push(payload)
    }
  },
  updateSearchResult(state, payload) {
    state.searchResult = payload
  },
  updatePageCount(state, payload) {
    state.pageCount = payload
  },
  updateKeyword(state, payload) {
    state.keyword = payload
  },
  clearSearchData(state, payload) {
    state.searchResult = null
    state.pageCount = 0
    state.keyword = ''
  },
}

export const actions = {
  updateCurrent({ commit }, payload) {
    commit('updateCurrent', payload)
  },
  updateBook({ commit }, payload) {
    commit('updateBook', payload)
  },
  updateSearchResult({ commit }, payload) {
    commit('updateSearchResult', payload)
  },
  updatePageCount({ commit }, payload) {
    commit('updatePageCount', payload)
  },
  updateKeyword({ commit }, payload) {
    commit('updateKeyword', payload)
  },
  clearSearchData({ commit }, payload) {
    commit('clearSearchData', payload)
  },
}
