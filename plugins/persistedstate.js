import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({
    key: 'reading-recorder',
    storage: localStorage,
  })(store)
}
