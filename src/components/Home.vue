<template>
  <div>
    <el-container>
      <el-header>
        杭州师范大学VMS系统
        <el-dropdown @command="addTab">
          <span style="color: #ffffef">
            <i class="el-icon-user-solid" style="margin-left: 2px;color: #ffffef"></i>
            {{ $store.state.uname }}
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="23">个人信息</el-dropdown-item>
            <el-dropdown-item command="24">修改密码</el-dropdown-item>
            <el-dropdown-item command="25">关于系统</el-dropdown-item>
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
              <template slot="title"><i class="el-icon-s-check"></i>活动高级管理</template>
              <el-menu-item index="3-1" @click="addTab('6')">活动审批</el-menu-item>
              <el-submenu index="3-2">
                <template slot="title"><i class="el-icon-s-home"></i>共建基地管理</template>
                <el-menu-item index="3-2-1" @click="addTab('7')">新建共建基地</el-menu-item>
                <el-menu-item index="3-2-2" @click="addTab('8')">共建基地管理</el-menu-item>
                <el-menu-item index="3-2-3" @click="addTab('9')">共建基地概况</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="4" @click="addTab('10')"> <i class="el-icon-search"></i><span slot="title">志愿时数查询</span> </el-menu-item>
            <el-submenu index="5">
              <template slot="title"><i class="el-icon-edit-outline"></i>志愿时数管理</template>
              <el-menu-item index="5-1" @click="addTab('11')">志愿时数导入</el-menu-item>
              <el-menu-item index="5-2" @click="addTab('12')">志愿时数管理</el-menu-item>
              <el-menu-item index="5-3" @click="addTab('13')">志愿活动时数总览</el-menu-item>
            </el-submenu>
            <el-submenu index="6">
              <template slot="title"><i class="el-icon-document"></i>志愿者信用名单管理</template>
              <el-menu-item index="6-1" @click="addTab('14')">黑名单</el-menu-item>
              <el-menu-item index="6-2" @click="addTab('15')">志愿者信用积分管理</el-menu-item>
              <el-menu-item index="6-3" @click="addTab('16')">志愿者信用积分管理条例</el-menu-item>
            </el-submenu>
            <el-menu-item index="7" @click="addTab('17')">
              <i class="el-icon-chat-line-square"></i>
              <span slot="title">志愿者反馈管理</span>
            </el-menu-item>
            <el-submenu index="8">
              <template slot="title"><i class="el-icon-menu"></i>系统管理</template>
              <el-menu-item index="8-1" @click="addTab('18')">用户管理</el-menu-item>
              <el-menu-item index="8-2" @click="addTab('19')">新建公告</el-menu-item>
              <el-menu-item index="8-3" @click="addTab('20')">系统日志</el-menu-item>
              <el-menu-item index="8-4" @click="addTab('21')">系统更新</el-menu-item>
              <el-menu-item index="8-5" @click="addTab('22')">志愿者征信管理条例</el-menu-item>
            </el-submenu>
          </el-menu>
          <div style="height:59px"></div>
        </el-aside>
        <el-main>
          <el-tabs v-model="$store.state.editableTabsValue" type="border-card" @tab-remove="removeTab">
            <el-tab-pane label="主页" name="0">
              <el-carousel :interval="5000" arrow="always">
                <el-carousel-item v-for="item in 4" :key="item">
                  <h3>{{ item }}</h3>
                </el-carousel-item>
              </el-carousel>
            </el-tab-pane>
            <el-tab-pane v-for="item in $store.state.editableTabs" :key="item.name" :label="item.title" :name="item.name" closable>
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
import HoursImport from '@/components/HoursImport'
import HoursManage from '@/components/HoursManage'
import HoursOverview from '@/components/HoursOverview'
import Blacklist from '@/components/Blacklist'
import CreditManage from '@/components/CreditManage'
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
          title: '志愿时数查询',
          name: '10',
          content: QueryNormal
        },
        {
          title: '志愿时数导入',
          name: '11',
          content: HoursImport
        },
        {
          title: '志愿时数管理',
          name: '12',
          content: HoursManage
        },
        {
          title: '志愿活动时数总览',
          name: '13',
          content: HoursOverview
        },
        {
          title: '黑名单',
          name: '14',
          content: Blacklist
        },
        {
          title: '志愿者信用积分管理',
          name: '15',
          content: CreditManage
        },
        {
          title: '志愿者信用积分管理条例',
          name: '16',
          content: CreditRules
        },
        {
          title: '志愿者反馈管理',
          name: '17',
          content: Feedback
        },
        {
          title: '用户管理',
          name: '18',
          content: Users
        },
        {
          title: '新建公告',
          name: '19',
          content: Notice
        },
        {
          title: '系统日志',
          name: '20',
          content: Log
        },
        {
          title: '系统更新',
          name: '21',
          content: Update
        },
        {
          title: '志愿者征信管理条例',
          name: '22',
          content: Rules
        },
        {
          title: '个人信息',
          name: '23',
          content: Information
        },
        {
          title: '修改密码',
          name: '24',
          content: Password
        },
        {
          title: '关于系统',
          name: '25',
          content: About
        }
      ]
    }
  },
  methods: {
    addTab(targetName) {
      this.$store.commit('addTabs', { targetName: targetName, tab: this.tab })
    },
    removeTab(targetName) {
      this.$store.commit('removeTabs', targetName)
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
    HoursImport,
    HoursManage,
    HoursOverview,
    Blacklist,
    CreditManage,
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
.el-tab-pane {
  height: 80vh;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.el-tab-pane::-webkit-scrollbar {
  display: none;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
