<template>
  <div>
    <header>
      <div class="header-left">
        <h1 class="logo">共创云</h1>
        <ul>
          <li>服务产品</li>
          <li>科创需求</li>
          <li>专利论文</li>
          <li>交易大数据</li>
        </ul>
      </div>
      <div class="header-right">
        <el-button type="primary">登录</el-button>
        <el-button>注册</el-button>
      </div>
    </header>
    <main>
      <div class="main-box">
        <div class="main-top">
          <p>资源大厅</p>
          <searchFile :data="axiosData.keywords" @handleSearch="handleSearch" />
        </div>
        <div class="main-table">
          <div class="tabbar">
            <nav>
              <p class="navActive">服务</p>
              <p>需求</p>
              <p>科创资源</p>
            </nav>
          </div>

          <searchTable
            :tableState="tableState"
            :tableData="tableData"
            @handleClickOther="handleClickOther"
            @handleClickState="handleClickState"
          ></searchTable>
          <searchTableShow
            :data="(axiosResultData as searchTableShowDataDI) "
            :title="tableShowTitle"
            @pageChange="pageChange"
          ></searchTableShow>
        </div>
      </div>
    </main>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import searchFile from "../../components/SearcgFile/index.vue";
import searchTable from "../../components/SearcgTable/index.vue";
import searchTableShow from "../../components/searcgTableShow/index.vue";
import rquest from "axios";
// import { ladderlistItem } from "./index";
import {
  searchTableShowI,
  searchTableShowDataDI,
} from "../../components/searcgTableShow/index";
import { clearOtherChildren, classification } from "../../utils";

onMounted(async () => {
  const { data } = await rquest.get(
    "https://service.test.nttcc.com.cn/admin/api/v1/service_type/ladderlist"
  );
  clearOtherChildren(data.data);
  let { table1, table2 } = classification(data.data);
  tableData[0] = table1;
  tableData[1] = table2;
  getData();
});

const handleSearch = (newData: string) => {
  axiosData.value.keywords = newData;
  //ajax操作
  getData();
};

const tableData = reactive({
  0: [] as string[],
  1: [] as string[][],
  2: [
    {
      name: "现代农业",
      id: "29056a0eee037b4dd9b1c59b1bab8aff",
    },
    {
      name: "电子信息",
      id: "5e79b1151fb70242bd5d3f85b3ef1f90",
    },
    { name: "资源与环境", id: "66f8ee9b8d7b87ccc2f52378803239d2" },
    { name: "生物与新医药", id: "853f8b238a01b01811a3cb0871290284" },
    { name: "新材料", id: "c2b1d0591cd01ebfac3f0cf4ddcbc42a" },
    { name: "高技术服务", id: "cc02ad4ab5bc099f3b3c68a493f0ec22" },
    { name: "航空航天", id: "cf1acd5f304d09a20ea1003f48dd338e" },
    { name: "新能源与节能", id: "d14cf608d101f2ccb256a2fee9091436" },
    { name: "建筑业", id: "d58a6dc233fd1d3d751ca7d3eba1690c" },
    { name: "先进制造与自动化", id: "d6277b61b9aab493e532fd4790126a04" },
    { name: "其他", id: "6254a2cf3348ff21ad6c86b6d67471db" },
  ],
  3: [
    { name: "共创云", id: "nttcc" },
    { name: "科惠网", id: "51kehui" },
    { name: "江西省网上常设技术市场", id: "jxstc" },
    { name: "潇湘科技要素大市场", id: "hntpe" },
  ],
  4: [
    "湖北省",
    "湖南省",
    "江西省",
    "北京市",
    "天津市",
    "河北省",
    "山西省",
    "内蒙古自治区",
    "辽宁省",
    "吉林省",
    "黑龙江省",
    "上海市",
    "江苏省",
    "浙江省",
    "安徽省",
    "福建省",
    "山东省",
    "河南省",
    "广东省",
    "广西壮族自治区",
    "海南省",
    "重庆市",
    "四川省",
    "贵州省",
    "云南省",
    "西藏自治区",
    "陕西省",
    "甘肃省",
    "青海省",
    "宁夏回族自治区",
    "新疆维吾尔自治区",
    "台湾省",
    "香港特别行政区",
    "澳门特别行政区",
  ],
});
const tableState = reactive([
  {
    label: "服务类型",
    active: 0,
    other: false,
  },
  {
    label: "二级分类",
    active: 0,
    other: false,
  },
  {
    label: "技术领域",
    active: 0,
    other: false,
  },
  {
    label: "数据来源",
    active: 0,
    other: false,
  },
  {
    label: "地区",
    active: 0,
    other: false,
  },
]);

const axiosData = ref({
  keywords: "", //搜索内容
  serviceTypeId: "", //服务类型
  serviceTypeId2: "", //二级分类
  technicalld: "", //技术领域
  province: "", //地区
  dataOrigin: "", //数据来源
  logicStatus: 1, //默认为1
  pageNum: 1,
});

const axiosResultData = ref<searchTableShowI>({});

const Objmap = new Map([
  ["0", "serviceTypeId"],
  ["1", "serviceTypeId2"],
  ["2", "technicalld"],
  ["3", "dataOrigin"],
  ["4", "province"],
  ["9", "ceshi"],
]);

// 更改更多状态
const handleClickOther = (index: number) => {
  tableState[index].other = !tableState[index].other;
};
// 更改active状态
const handleClickState = (
  parIndex: number,
  index: number,
  itemData: string,
  key: string
) => {
  tableState[parIndex].active = index;
  let DataKey = Objmap.get(key as string);
  //@ts-ignore
  axiosData.value[DataKey] = itemData;
  axiosData.value.pageNum = 1;
  getData();
};

const getData = async () => {
  const { data } = await rquest.get(
    `https://service.test.nttcc.com.cn/api/v1/service/list?pageNum=${axiosData.value.pageNum}&pageSize=10&keywords=${axiosData.value.keywords}&serviceTypeId=${axiosData.value.serviceTypeId}&serviceTypeId2=${axiosData.value.serviceTypeId2}&technicalId=${axiosData.value.technicalld}&province=${axiosData.value.province}&dataOrigin=${axiosData.value.dataOrigin}&logicStatus=${axiosData.value.logicStatus}`
  );
  axiosResultData.value = data.data;
};

let tableShowTitle = ref([
  "服务名称",
  "发布用户",
  "服务类型",
  "成交数量",
  "信用评价",
]);

const pageChange = (index: number) => {
  axiosData.value.pageNum = index;
  getData();
};
</script>
<style scoped lang="scss">
nav {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 100%;
  height: 48px;
  padding: 0 30px;
  margin-bottom: 10px;
  background: #f7f8f9;
  border-radius: 4px;

  p {
    position: relative;
    cursor: pointer;
    line-height: 20px;
    padding: 14px 6px;
    color: #303133;

    margin-right: 120px;
    font-weight: bolder;
    font-size: 14px;
    position: relative;
  }
}
.navActive {
  color: #3473e6;
  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #3473e6;
  }
}
main {
  background-color: #f6f7f8;
  padding-top: 30px;
  .main-top {
    p {
      padding: 0 0 0 35px;
      font-size: 16px;
      font-weight: 700;
      line-height: 22px;
      color: #303133;
      background: url("../../assets/logo_2.png") no-repeat;
    }
  }
}
.main-box {
  background-color: #fff;
  width: 1200px;
  margin: 0 auto;
  padding: 30px;
  box-sizing: border-box;
  .main-top {
    display: flex;
    justify-content: space-between;
  }
}
header {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding: 0 10px 0 10px;
}
.header-right {
  display: flex;
  align-items: center;
}
.header-left {
  display: flex;
  align-items: center;
  ul {
    li {
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      color: #606266;
      cursor: pointer;
      margin-left: 24px;
    }
  }
}
.logo {
  font-size: 16px;
  font-weight: 700;
  line-height: 22px;
  color: #3473e6;
  padding: 10px 0 10px 50px;
  background: url("../../assets/logo_1.e54ae31.png") no-repeat;
}
.header-left ul {
  display: flex;
}
</style>
