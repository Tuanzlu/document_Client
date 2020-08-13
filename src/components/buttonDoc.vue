<template>
  <button type="button" class="btn">
           
        <div class="more">
           <a-dropdown>
                <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                 <a-icon type="unordered-list" />
                </a>
                <a-menu slot="overlay">
                <a-menu-item>
                    <a href="javascript:;">协作</a>
                </a-menu-item>
                <a-menu-item>
                    <a href="javascript:;">分享</a>
                </a-menu-item>
                <a-menu-item>
                    <a href="javascript:;">删除</a>
                </a-menu-item>
                </a-menu>
            </a-dropdown>
            获取文字，时间和作者
        </div>
        
    </button>
</template>

<script>
export default {

}
</script>

<style>
.btn{
    height: 80px;
    width: 350px;
    -webkit-border-radius: 6;
    -moz-border-radius: 6;
    border-radius: 6px;
    text-shadow: 0px -1px 0px #5b6178;
    -webkit-box-shadow: 0px 1px 0px 0px #f0f7fa;
    -moz-box-shadow: 0px 1px 0px 0px #f0f7fa;
    box-shadow: 0px 1px 0px 0px #f0f7fa;
    font-family: Arial;
    color: #000;
    font-size: 16px;
    background: #f1f2f3;
    padding: 12px 30px 12px 30px;
    border: solid #487491 1px;
    text-decoration: none;
    margin: 10px;
}
.btn:hover {
  color: #000;
  background: #e1e9ed;
  text-decoration: none;
}
</style>