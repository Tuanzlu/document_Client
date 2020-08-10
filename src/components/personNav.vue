<template>
  <div>
      <div id="components-layout-demo-basic">
        <a-layout>
         <a-layout-header>
             <a-row>
                 <a-col :span="4">
                    logo图标（待补）
                </a-col>
                <a-col :span="10">
                    
                </a-col>
                <a-col :span="2">
                    <a-input-search placeholder="输入搜索内容" style="width: 200px" @search="onSearch" />
                </a-col>
                <a-col :span="6">
                    
                </a-col>
                <a-col :span="1">
                    <a-dropdown :placement="bottomCenter">
                    <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                            <a-avatar size="32" style="backgroundColor:#87d068" icon="bell" />
                        </a>
                        <a-menu slot="overlay">
                        <a-menu-item>
                            <a target="_blank" rel="noopener noreferrer" href="#"
                            >全 部 通 知</a
                            >
                        </a-menu-item>
                        <a-menu-item>
                            <a target="_blank" rel="noopener noreferrer" href="#"
                            >未 读 通 知</a
                            >
                        </a-menu-item>
                        </a-menu>
                    </a-dropdown>
                </a-col>
                <a-col :span="1">
                    <a-dropdown :placement="bottomCenter">
                        <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                            <a-avatar size="32" style="backgroundColor:#87d068" icon="user" />
                        </a>
                        <a-menu slot="overlay">
                        <a-menu-item>
                            <a target="_blank" rel="noopener noreferrer" href="#"
                            >个 人 中 心</a
                            >
                        </a-menu-item>
                        <a-menu-item>
                            <a target="_blank" rel="noopener noreferrer" href="#"
                            >使 用 说 明</a
                            >
                        </a-menu-item>
                        <a-menu-item>
                            <a target="_blank" rel="noopener noreferrer" href="#"
                            >退 出 登 录</a
                            >
                        </a-menu-item>
                        </a-menu>
                    </a-dropdown>
                   
                </a-col>
            </a-row>
         </a-layout-header>
        </a-layout>
      </div>

  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
#components-layout-demo-basic {
  text-align: left;
  
  font-weight: bold;  
  margin: 0px;
}
#components-layout-demo-basic .ant-layout-header{
  background: #7dbcea;
  color: #fff;
}

</style>