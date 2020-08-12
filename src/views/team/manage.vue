<template>
  <div>
      <div class="header">
        <div class="top" @click="toIndex"><span class="name">金刚石文档</span></div>
        <div class="topRight">
             <a-dropdown>
                <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                <img class="avatar" style="width:30px;height:30px" src="../../assets/bg.jpeg" />
                </a>
                <a-menu slot="overlay">
                <a-menu-item>
                    <a href="#/personInfo">个 人 主 页</a>
                </a-menu-item>
                <a-menu-item>
                    <a href="javascript:;">帮 助 事 项</a>
                </a-menu-item>
                <a-menu-item>
                    <a href="#/">退 出 登 录</a>
                </a-menu-item>
                </a-menu>
            </a-dropdown>
        </div>
        <div class="topRight">
            <a-dropdown>
                <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                <a-icon type="bell" style="font-size:25px;margin-top:3px;" />
                </a>
                <a-menu slot="overlay">
                <a-menu-item>
                    <a href="#/personInfo">全 部 通 知</a>
                </a-menu-item>
                <a-menu-item>
                    <a href="javascript:;">未 读 消 息</a>
                </a-menu-item>
                </a-menu>
            </a-dropdown>
        </div>
        <div class="topRight">
            <a-input-search placeholder="搜索文件" style="width: 200px" @search="onSearch" />
        </div>
      </div>
      <div class="toleft">
            <a-menu mode="inline" :open-keys="openKeys" style="width: 230px" @openChange="onOpenChange" @click="handleClick">
                    <a-sub-menu key="sub1">
                        <span slot="title"><a-icon type="team" />
                        <span>团队 1</span></span>
                        <a-menu-item key="1">
                        <a-icon type="file" />文档 1
                        </a-menu-item>
                        <a-menu-item key="2">
                        <a-icon type="file" />文档 2
                        </a-menu-item>
                        <a-menu-item key="3">
                        <a-icon type="file" />文档 3
                        </a-menu-item>
                    </a-sub-menu>
                    <a-sub-menu key="sub2">
                        <span slot="title"><a-icon type="team" />
                        <span>团队 2</span></span>
                        <a-menu-item key="4">
                        <a-icon type="file" />文档 4
                        </a-menu-item>
                        <a-menu-item key="5">
                        <a-icon type="file" />文档 5
                        </a-menu-item>
                    </a-sub-menu>
                    
                </a-menu>   
    </div>
    <div class='body'>
      <a-layout style="padding: 24px 50px 24px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>主页</a-breadcrumb-item>
          <a-breadcrumb-item>团队空间</a-breadcrumb-item>
          <a-breadcrumb-item>团队 1</a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content
          :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
        >
          <h3>团队1</h3>
          <a-icon type="team" /> 协作！
          <a-card title="协作者" style="width: 600px">
          <a slot="extra" href="#">添加协作者</a>
          <a-table :columns="columns" :data-source="data">
            <a slot="name" slot-scope="text">{{ text }}</a>
           <span slot="customTitle">Name</span>
           <span slot="action">
             <a>Delete</a>
            <a-divider type="vertical" />
             <a class="ant-dropdown-link"> More actions <a-icon type="down" /> </a>
             </span>
          </a-table>
          </a-card>
        </a-layout-content>
      </a-layout>
    </div>
    <div class="footer">
      <div class="aboutUs" @click="toAbout">关于我们</div>
      <span class="bottomTitle">Copyright © 2020 summer-project</span>
    </div>
  </div>
</template>

<script>
const columns = [
  {
    dataIndex: 'name',
    key: 'name',
    slots: { title: 'customTitle' },
    scopedSlots: { customRender: 'name' },
  },
  {
    title: 'Action',
    key: 'action',
    scopedSlots: { customRender: 'action' },
  },
];

const data = [
  {
    key: '1',
    name: '协作者1',
  },
  {
    key: '2',
    name: '协作者2',
  },
  {
    key: '3',
    name: '协作者3',
  },
];

export default {
    data() {
        return {
            columns,data,
            rootSubmenuKeys: ['sub1', 'sub2'],
            openKeys: ['sub1', 'sub2'],
            //current: ['mail'],
        };
    },
        watch: {
    openKeys(val) {
      console.log('openKeys', val);
      },
    },
    
    methods: {
        handleClick(e) {
      console.log('click', e);
      },
        titleClick(e) {
      console.log('titleClick', e);
      },
    },
};
</script>
<style lang="scss" scoped>
.top {
  float: left;
  margin: 15px 10px 0 10px;
}
.topRight {
  float: right;
  margin: 15px 10px 0 20px;
}
.toleft{
  position:fixed;
  width:230px;
  top:60px;
  bottom:0;
  /*background-color: #7f7f7f;*/
}
.body{
  position:relative;
  background-color: white;
  margin: auto auto auto auto;
  top: 60px;
  width: 816px;
  height: 1323px;
}
.footer {
  // border: 2px red solid;
  height: 200px;
  background-color: rgb(99, 109, 160);
}
.aboutUs {
  cursor: pointer;
  width: 100px;
  display: block;
  margin: 0 auto;
  padding-top: 30px;
  font-size: 20px;
  color: white;
  // border: 1px solid blue;
}
.bottomTitle {
  // border: 1px solid blue;
  width: 230px;
  margin: 80px auto 0 auto;
  display: block;
}
</style>
