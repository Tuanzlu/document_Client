<template>
  <div>
      <personNav></personNav>
<<<<<<< HEAD
      <a-layout>
        <!--左边控制台-->
        <a-layout-sider>
            <div>
                <a-menu mode="inline" :open-keys="openKeys" style="width: 256px" @openChange="onOpenChange">
                    <a-menu-item key="1">
                        <a-icon type="edit" />工作台
                    </a-menu-item>
                    <a-menu-item key="2">
                        <a-icon type="mail" />收件箱
                    </a-menu-item>
                    <a-menu-item key="3">
                        <a-icon type="appstore" />我的桌面
                    </a-menu-item>
                    <a-sub-menu key="sub1">
                        <span slot="title"><a-icon type="team" />
                        <span>团队空间</span></span>
                        <a-menu-item key="1">
                        Option 1
                        </a-menu-item>
                    </a-sub-menu>
                    <a-menu-item key="4">
                        <a-icon type="delete" />回收站
                    </a-menu-item>
                    <a-menu-item key="5">
                        <a-icon type="question" />帮助中心
                    </a-menu-item>
                </a-menu>
            </div>
        </a-layout-sider>
        <a-layout-content>
             
                        
            
        </a-layout-content>
      
    </a-layout>

=======
      <siderNav></siderNav>
>>>>>>> personWorkspace
  </div>
</template>

<script>
import personNav from '@/components/personNav';
<<<<<<< HEAD
export default {
    components: {
        personNav,
    },
    data() {
        return {
            rootSubmenuKeys: ['sub1', 'sub2', 'sub4'],
            openKeys: ['sub1'],
            current: ['mail'],
        };
    },
    methods: {
        onOpenChange(openKeys) {
        const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.openKeys = openKeys;
        } else {
            this.openKeys = latestOpenKey ? [latestOpenKey] : [];
        }
        },
=======
import siderNav from '@/components/siderNav';
export default {
    components: {
        personNav,
        siderNav,
    },
    data() {
        
    },
    methods: {
>>>>>>> personWorkspace
    },
}
</script>

<style>
<<<<<<< HEAD
#components-layout-demo-basic {
  text-align: center;
}
#components-layout-demo-basic .ant-layout-header,
#components-layout-demo-basic .ant-layout-footer {
  background: #7dbcea;
  color: #fff;
}
#components-layout-demo-basic .ant-layout-footer {
  line-height: 1.5;
}
#components-layout-demo-basic .ant-layout-sider {
  background: #3ba0e9;
  color: #fff;
  line-height: 120px;
}
#components-layout-demo-basic .ant-layout-content {
  background: rgba(16, 142, 233, 1);
  color: #fff;
  min-height: 120px;
  line-height: 120px;
}
#components-layout-demo-basic > .ant-layout {
  margin-bottom: 48px;
}
#components-layout-demo-basic > .ant-layout:last-child {
  margin: 0;
}
=======

>>>>>>> personWorkspace
</style>