import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    uid: '',
    uname: '',
    upower: '',
    power: [true, true, true, true, true, true, true, true, true],
    editableTabsValue: '0',
    editableTabs: [],
    updateUserFlag: false,
    deleteUserFlag: false,
    updateRecruitFlag: false,
    updateRecruitFlag1: false,
    updateRecruitFlag2: false,
    deleteRecruitFlag1: false,
    deleteRecruitFlag2: false,
    deleteRecruitFlag3: false,
    updateActivityFlag1: false,
    updateActivityFlag2: false,
    updateActivityFlag3: false,
    updateBaseFlag: false
  },
  mutations: {
    inist(state, dataInfo) {
      state.uid = dataInfo.id
      state.uname = dataInfo.name
      state.upower = dataInfo.power
      for (let char of dataInfo.power) {
        state.power[parseInt(char)] = false
      }
      state.editableTabsValue = '0'
      state.editableTabs = []
      state.updateUserFlag = false
      state.deleteUserFlag = false
      state.updateRecruitFlag = false
      state.updateRecruitFlag1 = false
      state.updateRecruitFlag2 = false
      state.deleteRecruitFlag1 = false
      state.deleteRecruitFlag2 = false
      state.deleteRecruitFlag3 = false
      state.updateActivityFlag1 = false
      state.updateActivityFlag2 = false
      state.updateActivityFlag3 = false
      state.updateBaseFlag = false
    },
    logOut(state) {
      state.uid = ''
      state.uname = ''
      state.power = [true, true, true, true, true, true, true, true, true]
      state.editableTabsValue = '0'
      state.editableTabs = []
      state.updateUserFlag = false
      state.deleteUserFlag = false
      state.updateRecruitFlag = false
      state.updateRecruitFlag1 = false
      state.updateRecruitFlag2 = false
      state.deleteRecruitFlag1 = false
      state.deleteRecruitFlag2 = false
      state.deleteRecruitFlag3 = false
      state.updateActivityFlag1 = false
      state.updateActivityFlag2 = false
      state.updateActivityFlag3 = false
      state.updateBaseFlag = false
    },
    goToTabs(state, value) {
      state.editableTabsValue = value
    },
    updateUser(state, flag) {
      state.updateUserFlag = flag
    },
    deleteUser(state, flag) {
      state.deleteUserFlag = flag
    },
    updateRecruiting(state, flag) {
      state.updateRecruitFlag1 = flag
    },
    updateRecruited(state, flag) {
      state.updateRecruitFlag2 = flag
    },
    updateRecruit(state, flag) {
      state.updateRecruitFlag = flag
    },
    deleteRecruiting(state, flag) {
      state.deleteRecruitFlag1 = flag
    },
    deleteRecruited(state, flag) {
      state.deleteRecruitFlag2 = flag
    },
    deleteRecruit(state, flag) {
      state.deleteRecruitFlag3 = flag
    },
    updateActivityList(state, flag) {
      state.updateActivityFlag1 = flag
    },
    updateActivity(state, flag) {
      state.updateActivityFlag2 = flag
    },
    updateActivityApproval(state, flag) {
      state.updateActivityFlag3 = flag
    },
    updateBase(state, flag) {
      state.updateBaseFlag = flag
    },
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
