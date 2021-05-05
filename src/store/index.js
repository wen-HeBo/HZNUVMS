import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    uname: 'ppKritt',
    editableTabsValue: '0',
    editableTabs: []
  },
  mutations: {
    addTabs(state, tabInfo) {
      let iflag = true
      let tabs = state.editableTabs
      tabs.forEach(tab => {
        if (tab.name === tabInfo.targetName) {
          state.editableTabsValue = tab.name
          iflag = false
        }
      })
      if (iflag) {
        tabInfo.tab.forEach(item => {
          if (item.name === tabInfo.targetName) {
            state.editableTabs.push(item)
          }
        })
        // console.log(e.$slots.default[0].text)
        state.editableTabsValue = tabInfo.targetName
      }
    },
    addTab(state, tabInfo) {
      let iflag = true
      let tabs = state.editableTabs
      tabs.forEach(tab => {
        if (tab.name === tabInfo.name) {
          state.editableTabsValue = tab.name
          iflag = false
        }
      })
      if (iflag) {
        state.editableTabs.push(tabInfo)
        state.editableTabsValue = tabInfo.name
      }
    },
    removeTabs(state, targetName) {
      let tabs = state.editableTabs
      let activeName = state.editableTabsValue
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            }
          }
        })
      }
      state.editableTabsValue = activeName
      state.editableTabs = tabs.filter(tab => tab.name !== targetName)
      if (state.editableTabs.length === 0) {
        state.editableTabsValue = '0'
      }
    }
  },
  actions: {},
  modules: {}
})
