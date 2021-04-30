<template>
  <div>
    <el-container>
      <el-header>
        杭州师范大学VMS系统
        <el-dropdown @command="addTab">
          <span style="color: #ffffef">
            <i class="el-icon-user-solid" style="margin-left: 2px;color: #ffffef"></i>
            {{ uname }}
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="26">个人信息</el-dropdown-item>
            <el-dropdown-item command="27">修改密码</el-dropdown-item>
            <el-dropdown-item command="28">关于系统</el-dropdown-item>
            <el-dropdown-item>退出系统</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container>
        <el-aside width="220px">
          <el-menu>
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-s-promotion"></i>招募管理</template>
              <el-menu-item index="1-1" @click="addTab('1')">新建招募</el-menu-item>
              <el-menu-item index="1-2" @click="addTab('2')">进行中的招募</el-menu-item>
              <el-menu-item index="1-3" @click="addTab('3')">已完成的招募</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-s-order"></i>活动管理</template>
              <el-menu-item index="2-1" @click="addTab('4')">新建活动</el-menu-item>
              <el-menu-item index="2-2" @click="addTab('5')">查询活动</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"><i class="el-icon-s-order"></i>活动高级管理</template>
              <el-menu-item index="3-1" @click="addTab('6')">活动审批</el-menu-item>
              <el-submenu index="3-2">
                <template slot="title">共建基地管理</template>
                <el-menu-item index="3-2-1" @click="addTab('7')">新建共建基地</el-menu-item>
                <el-menu-item index="3-2-2" @click="addTab('8')">共建基地管理</el-menu-item>
                <el-menu-item index="3-2-3" @click="addTab('9')">共建基地概况</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title"><i class="el-icon-search"></i>志愿时数查询</template>
              <el-menu-item index="4-1" @click="addTab('10')">一般查询</el-menu-item>
              <el-menu-item index="4-2" @click="addTab('11')">批量查询</el-menu-item>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title"><i class="el-icon-edit-outline"></i>志愿时数管理</template>
              <el-menu-item index="5-1" @click="addTab('12')">志愿时数导入</el-menu-item>
              <el-menu-item index="5-2" @click="addTab('13')">志愿时数审核</el-menu-item>
              <el-menu-item index="5-3" @click="addTab('14')">志愿时数删除</el-menu-item>
              <el-menu-item index="5-3" @click="addTab('15')">志愿活动时数总览</el-menu-item>
            </el-submenu>
            <el-submenu index="6">
              <template slot="title"><i class="el-icon-document"></i>志愿者信用名单管理</template>
              <el-menu-item index="6-1" @click="addTab('16')">黑名单</el-menu-item>
              <el-menu-item index="6-2" @click="addTab('17')">志愿者信用积分管理</el-menu-item>
              <el-menu-item index="6-3" @click="addTab('18')">志愿者信用积分查询</el-menu-item>
              <el-menu-item index="6-4" @click="addTab('19')">志愿者信用积分管理条例</el-menu-item>
            </el-submenu>
            <el-menu-item index="7" @click="addTab('20')">
              <i class="el-icon-chat-line-square"></i>
              <span slot="title">志愿者反馈管理</span>
            </el-menu-item>
            <el-submenu index="8">
              <template slot="title"><i class="el-icon-menu"></i>系统管理</template>
              <el-menu-item index="8-1" @click="addTab('21')">用户管理</el-menu-item>
              <el-menu-item index="8-2" @click="addTab('22')">新建公告</el-menu-item>
              <el-menu-item index="8-3" @click="addTab('23')">系统日志</el-menu-item>
              <el-menu-item index="8-4" @click="addTab('24')">系统更新</el-menu-item>
              <el-menu-item index="8-5" @click="addTab('25')">志愿者征信管理条例</el-menu-item>
            </el-submenu>
          </el-menu>
          <div style="height:59px"></div>
        </el-aside>
        <el-main>
          <el-tabs v-model="editableTabsValue" type="border-card" @tab-remove="removeTab">
            <el-tab-pane label="主页" name="0">主页</el-tab-pane>
            <el-tab-pane v-for="item in editableTabs" :key="item.name" :label="item.title" :name="item.name" closable>
              <component :is="item.content"></component>
            </el-tab-pane>
          </el-tabs>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import RecruitNew from '@/components/RecruitNew'
import Recruiting from '@/components/Recruiting'
import Recruited from '@/components/Recruited'
import ActivityNew from '@/components/ActivityNew'
import ActivityQuery from '@/components/ActivityQuery'
import ActivityApproval from '@/components/ActivityApproval'
import BaseNew from '@/components/BaseNew'
import BaseManage from '@/components/BaseManage'
import BaseSurvey from '@/components/BaseSurvey'
import QueryNormal from '@/components/QueryNormal'
import QueryMore from '@/components/QueryMore'
import HoursImport from '@/components/HoursImport'
import HoursExamine from '@/components/HoursExamine'
import HoursDelete from '@/components/HoursDelete'
import HoursOverview from '@/components/HoursOverview'
import Blacklist from '@/components/Blacklist'
import CreditManage from '@/components/CreditManage'
import CreditQuery from '@/components/CreditQuery'
import CreditRules from '@/components/CreditRules'
import Feedback from '@/components/Feedback'
import Users from '@/components/Users'
import Notice from '@/components/Notice'
import Log from '@/components/Log'
import Update from '@/components/Update'
import Rules from '@/components/Rules'
import Information from '@/components/Information'
import Password from '@/components/Password'
import About from '@/components/About'
export default {
  data() {
    return {
      uname: 'ppKritt',
      editableTabsValue: '0',
      tab: [
        {
          title: '新建招募',
          name: '1',
          content: RecruitNew
        },
        {
          title: '进行中的招募',
          name: '2',
          content: Recruiting
        },
        {
          title: '已完成的招募',
          name: '3',
          content: Recruited
        },
        {
          title: '新建活动',
          name: '4',
          content: ActivityNew
        },
        {
          title: '查询活动',
          name: '5',
          content: ActivityQuery
        },
        {
          title: '活动审批',
          name: '6',
          content: ActivityApproval
        },
        {
          title: '新建共建基地',
          name: '7',
          content: BaseNew
        },
        {
          title: '共建基地管理',
          name: '8',
          content: BaseManage
        },
        {
          title: '共建基地概况',
          name: '9',
          content: BaseSurvey
        },
        {
          title: '一般查询',
          name: '10',
          content: QueryNormal
        },
        {
          title: '批量查询',
          name: '11',
          content: QueryMore
        },
        {
          title: '志愿时数导入',
          name: '12',
          content: HoursImport
        },
        {
          title: '志愿时数审核',
          name: '13',
          content: HoursExamine
        },
        {
          title: '志愿时数删除',
          name: '14',
          content: HoursDelete
        },
        {
          title: '志愿活动时数总览',
          name: '15',
          content: HoursOverview
        },
        {
          title: '黑名单',
          name: '16',
          content: Blacklist
        },
        {
          title: '志愿者信用积分管理',
          name: '17',
          content: CreditManage
        },
        {
          title: '志愿者信用积分查询',
          name: '18',
          content: CreditQuery
        },
        {
          title: '志愿者信用积分管理条例',
          name: '19',
          content: CreditRules
        },
        {
          title: '志愿者反馈管理',
          name: '20',
          content: Feedback
        },
        {
          title: '用户管理',
          name: '21',
          content: Users
        },
        {
          title: '新建公告',
          name: '22',
          content: Notice
        },
        {
          title: '系统日志',
          name: '23',
          content: Log
        },
        {
          title: '系统更新',
          name: '24',
          content: Update
        },
        {
          title: '志愿者征信管理条例',
          name: '25',
          content: Rules
        },
        {
          title: '个人信息',
          name: '26',
          content: Information
        },
        {
          title: '修改密码',
          name: '27',
          content: Password
        },
        {
          title: '关于系统',
          name: '28',
          content: About
        }
      ],
      editableTabs: []
    }
  },
  methods: {
    addTab(targetName) {
      // console.log(targetName)
      let iflag = true
      let tabs = this.editableTabs
      tabs.forEach(tab => {
        if (tab.name === targetName) {
          // console.log(tab.name)
          this.editableTabsValue = tab.name
          iflag = false
        }
      })
      if (iflag) {
        this.tab.forEach(tab => {
          if (tab.name === targetName) {
            this.editableTabs.push(tab)
          }
        })
        // console.log(e.$slots.default[0].text)
        this.editableTabsValue = targetName
      }
    },
    removeTab(targetName) {
      let tabs = this.editableTabs
      let activeName = this.editableTabsValue
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

      this.editableTabsValue = activeName

      this.editableTabs = tabs.filter(tab => tab.name !== targetName)
      if (this.editableTabs.length === 0) {
        this.editableTabsValue = '0'
      }
    }
  },
  components: {
    RecruitNew,
    Recruiting,
    Recruited,
    ActivityNew,
    ActivityQuery,
    ActivityApproval,
    BaseNew,
    BaseManage,
    BaseSurvey,
    QueryNormal,
    QueryMore,
    HoursImport,
    HoursExamine,
    HoursDelete,
    HoursOverview,
    Blacklist,
    CreditManage,
    CreditQuery,
    CreditRules,
    Feedback,
    Users,
    Notice,
    Log,
    Update,
    Rules,
    Information,
    Password,
    About
  }
}
</script>
<style scoped>
.el-header {
  background-color: #409eff;
  color: rgb(255, 255, 255);
  text-align: center;
  line-height: 60px;
  font-size: 18px;
}

.el-aside {
  background-color: white;
  width: 200px;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.el-aside::-webkit-scrollbar {
  display: none;
}
.el-main {
  background-color: rgb(238, 241, 246);
  color: #333;
  text-align: center;
}
.el-container {
  height: 100vh;
}
.el-dropdown {
  float: right;
  padding: 0 10px;
}
.el-main {
  padding: 0;
  height: 100%;
}
.el-tabs.el-tabs--top.el-tabs--border-card {
  height: 100%;
  border: none;
  overflow: hidden;
}
.el-tab-pane{
  height: 80vh;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.el-tab-pane::-webkit-scrollbar {
  display: none;
}
</style>
