<template>
  <div class="modal-backdrop">
     <div class="modal" :style="mainStyles">
        <div class="modal-header">
          <h3>请输入修改之后的信息</h3>
        </div>
        <div class="modal-body">
            <a-input ref="userNameInput" v-model="userName" placeholder="Basic usage">
            <a-icon slot="prefix" type="wechat" />
            <a-tooltip slot="suffix" title="Extra information">
            </a-tooltip>
            </a-input>
            
        </div>
        <div class="modal-footer">
            <button type="button" class="btn-close" @click="closeSelf">关闭</button>
        </div>
    </div>
 
  </div>
</template>
<script>
export default {
  data() {
    return {    
        sector: 'day',
        mainStyles: '',
    }
  }, 
  methods: {   
    closeSelf() {
        this.$emit("closeme");    
    },
    getChoose() {
        //console.log(this.sector); 
        return this.sector;
    }
   }
}
</script>
<style scoped>
.modal-backdrop { 
    position: fixed; 
    top: 0; 
    right: 0; 
    bottom: 0; 
    left: 0; 
    background-color: rgba(0,0,0,.3); 
    display: flex; 
    justify-content: center; 
    align-items: center; 
}
.modal { 
    background-color: #fff; 
    box-shadow: 2px 2px 20px 1px; 
    overflow-x:auto; 
    display: flex; 
    flex-direction: column;
    border-radius: 16px;
    width: 300px;
} 
.modal-header { 
    border-bottom: 1px solid #eee; 
    color: #313131; 
    justify-content: space-between;
    padding: 15px; 
    display: flex; 
} 
.modal-footer { 
    border-top: 1px solid #eee; 
    justify-content: flex-end;
    padding: 3px; 
    display: flex; 
} 
.modal-body { 
    position: relative; 
    padding: 20px 10px; 
    text-align: center;
    font-size: 18px;
    margin-right: 40px;
}
.btn-close {    
    border-radius: 8px;
    margin-left:16px;
    width:56px;
    height: 36px;
    border:none;
    cursor: pointer;
}
.btn-close {
    color: #fff; 
    background-color: #2d8cf0;

}
</style>
 