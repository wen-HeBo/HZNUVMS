<template>
  <div class="recruit">
    <el-divider content-position="left">招募详情</el-divider>
    <el-table :show-header="false" :data="recruitData" style="width: 100%;" stripe border>
      <el-table-column width="180" prop="name" align="center"></el-table-column>
      <el-table-column prop="info"></el-table-column>
    </el-table>
    <br /><br />
    <el-divider content-position="left">招募操作</el-divider>
    <el-row style="text-align: left;margin-left: 30px">
      <el-button type="success" @click="stopRecruit" :plain="true">停止活动招募</el-button>
      <el-button type="primary">修改招募信息</el-button>
      <el-button type="danger">删除本活动招募</el-button>
      <el-button>导出报名信息（Excel）</el-button>
      <el-button type="warning">通过小程序发送录取结果通知</el-button>
    </el-row>
    <br /><br />
    <el-divider content-position="left">志愿时数录入</el-divider>
    <el-row style="text-align: left;margin-left: 30px">
      <el-button>生成志愿时数表</el-button>
    </el-row>
    <br /><br />
    <el-divider content-position="left">报名信息</el-divider>
    <div v-if="timeFlag">
      <el-table :data="timeData" style="width: 100%" border>
        <el-table-column type="index" label="序号" width="100%" :index="indexMethod" align="center"> </el-table-column>
        <el-table-column prop="time" label="时间选项" align="center"> </el-table-column>
        <el-table-column prop="num" label="报名人数" width="200%" align="center"> </el-table-column>
      </el-table>
      <br />
    </div>
    <div v-if="placeFlag">
      <el-table :data="placeData" style="width: 100%" border>
        <el-table-column type="index" label="序号" width="100%" :index="indexMethod" align="center"> </el-table-column>
        <el-table-column prop="place" label="地点选项" align="center"> </el-table-column>
        <el-table-column prop="num" label="报名人数" width="200%" align="center"> </el-table-column>
      </el-table>
      <br />
    </div>
    <el-table :data="peopleData" border style="width: 100%">
      <el-table-column type="index" label="序号" width="100%" :index="indexMethod" align="center"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="200%" align="center"> </el-table-column>
      <el-table-column prop="sex" label="性别" width="100%" align="center"> </el-table-column>
      <el-table-column prop="class" label="学院班级" align="center"> </el-table-column>
      <el-table-column prop="time" label="时间选项" align="center" v-if="timeFlag"> </el-table-column>
      <el-table-column prop="place" label="地点选项" align="center" v-if="placeFlag"> </el-table-column>
      <el-table-column label="查看详情" width="120%" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="btnHandler(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="personData[0].info + '的报名信息'" :visible.sync="dialogTableVisible" width="40%" class="ppK">
      <div style="text-align: center;font-size: 15px;margin-bottom: 10px">基本信息</div>
      <el-table :data="personData" :show-header="false" style="width: 100%;" stripe border>
        <el-table-column width="150" prop="name"></el-table-column>
        <el-table-column prop="info"></el-table-column>
      </el-table>
      <br />
      <div style="text-align: center;font-size: 15px;margin-bottom: 10px">历史志愿活动</div>
      <el-table :data="historyData" style="width: 100%;" stripe border>
        <el-table-column prop="name" label="活动名称" align="center"></el-table-column>
        <el-table-column prop="date" label="活动日期" width="150" align="center"></el-table-column>
        <el-table-column prop="date" label="志愿时数" width="100" align="center"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      timeFlag: false,
      placeFlag: true,
      recruitData: [
        {
          name: '招募校区',
          info: '屏峰校区 '
        },
        {
          name: '活动名称',
          info: '【全天】西溪医院志愿服务活动'
        },
        {
          name: '组织方',
          info: '浙江工业大学青年志愿者协会'
        },
        {
          name: '活动地点',
          info: '浙江省杭州市西湖区横埠路2号西溪医院'
        },
        {
          name: '活动时间',
          info: '2021年05月03日（周一）——2021年05月06日（周四）'
        },
        {
          name: '需求人数',
          info: '20'
        },
        {
          name: '活动详情',
          info:
            '【活动名称】\n西溪医院志愿服务活动\n【活动时间】\n2021年05月03日（周一） ——2021年05月06日（周四）\n上午7:30~11:30\n下午13:30~16:30\n【活动地点】\n浙江省杭州市西湖区横埠路2号西溪医院\n【人数需求】\n5人/天\n【活动内容】\n帮助医院就诊病人操作自动挂号机，帮助医院进行满意度调查\n【报名须知】\n1、请于早上7：00（下午，请于1:00）在生活区门口报刊集合，并乘193、310等路公车至西溪医院横街，再前往西溪医院（也可自行商量选择路线，如果有单独前往的，请务必联系领队），要求7：30（下午为1:30）到达医院。到达之后请前往前台，告诉工作人员“我们是浙江工业大学的志愿者“，然后他们会带志愿者去培训并换服装。工作时间上午为7：30—11：30，下午为1:30—4:30，上午工作结束后，医院会给大家提供午饭。注意着装合适，不要穿拖鞋，女生长发需将头发扎起，切勿披头散发，不要穿高跟鞋或裙子。\n2、若无特殊情况，报名后不得无故退出，请大家谨慎报名。\n3、本活动为全天制，若想担任领队，可在备注中提出，领队可获得适当的工时补偿。\n【工时计算】\n以实际工作时长认定志愿者工时'
        },
        {
          name: '表单收集',
          info: '未设置表单收集'
        },
        {
          name: '报名进度',
          info: '不向志愿者显示实时报名进度'
        },
        {
          name: '时间选项',
          info: '5月6日'
        },
        {
          name: '地点选项',
          info: '西溪医院'
        },
        {
          name: '定向招募',
          info: '未设置定向招募学院'
        },
        {
          name: '联系方式',
          info: '周同学 15067849169'
        }
      ],
      timeData: [{}, {}],
      placeData: [{}],
      peopleData: [{ name: 'ppkritt' }, {}, {}, {}, {}],
      personData: [
        {
          name: '姓名',
          info: ''
        },
        {
          name: '性别',
          info: ''
        },
        {
          name: '学院班级',
          info: ''
        },
        {
          name: '学号',
          info: ''
        },
        {
          name: '注册号',
          info: ''
        },
        {
          name: '联系方式',
          info: ''
        },
        {
          name: '时间选项',
          info: ''
        },
        {
          name: '地点选项',
          info: ''
        },
        {
          name: '备注',
          info: ''
        },
        {
          name: '报名时间',
          info: ''
        }
      ],
      dialogTableVisible: false,
      historyData: [{}, {}, {}, {}]
    }
  },
  methods: {
    indexMethod(index) {
      return index + 1
    },
    btnHandler(row) {
      this.dialogTableVisible = true
      this.personData[0].info = row.name
    },
    stopRecruit() {
      this.$message({
        message: this.$parent.label + '停止招募',
        type: 'success'
      })
    }
  },
  created() {
    // console.log(this.$parent.label)
  }
}
</script>
<style scoped>
.el-divider__text {
  font-size: 20px;
  font-weight: 300;
}
.recruit {
  padding: 0 30px;
}
</style>
