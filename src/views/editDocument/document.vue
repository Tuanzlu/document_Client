<template>
  <div class="content">
    <div class="header">
       
      <div class="top">
        <a-button class="btn" @click="toLast">
          <a-icon type="left" />
        </a-button>

<a-tooltip>
    <template slot="title">
      创建副本
    </template>
     <a-button class="btn" @click="addNewDoc">
          <a-icon type="plus" />
        </a-button>
  </a-tooltip>

       
      </div>
      <div class="top">
        <span class="name">{{ article.title }}</span>
      </div>
      <div class="top">
        <a-button class="btn" @click="collected">
          <a-icon type="star" theme="filled" v-if="isCollected" />
          <a-icon type="star" theme="outlined" v-else />
        </a-button>
      </div>
      <div class="top" :class="{time:!article.status}">
        <span >上次保存于{{ article.modifytime }}</span>
      </div>
      <div class="topRight">
        <a-button class="btn">
          <a-dropdown class="more-card">
            <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
              <a-icon type="more" />
            </a>
            <a-menu class="more" slot="overlay" @click="onClick">
              <a-menu-item key="1">
                编辑
              </a-menu-item>
              <a-menu-item key="2">
                保存为模版
              </a-menu-item>
              <a-menu-item key="3">
                删除
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </a-button>
      </div>
      <div class="topRight">
        <a-popover trigger="click" class="cooperation" placement="bottomRight">
          <template slot="content">
            <div class="one-content" v-if="isaddShare">
              <div class="search-bar">
                <a-input-search
                  class="search-bar-input"
                  placeholder="输入姓名/邮箱/手机号/部门 添加协作权限"
                  v-model="searchWord"
                  @search="handleSearch"
                />
              </div>
              <div class="co-table-one">
                <a-table
                  class="table-add"
                  :columns="columns"
                  :data-source="searchUser"
                  size="small"
                  :rowKey="(record) => record.userid"
                  :bordered="false"
                  :pagination="false"
                  :showHeader="true"
                >
                  <template slot="avatar" slot-scope="text,record">
                    <a-avatar
                      style="height:30px;width:30px"
                      :src="record.userimgpath"
                    />
                  </template>
                  <template slot="perms" slot-scope="text,record">
                    <a-select 
                     style="width: 120px" defaultValue="修改权限" @change="e=>handleChange(e,record.userid)" >
                      <a-select-option v-for="(item) in items" 
                      :value="item.value" :key="item.value">
                        {{ item.value }}
                      </a-select-option>
                    </a-select-option>
                    </a-select>
                  </template>
                </a-table>
              </div>
            </div>
            <div class="two-content" v-else>
              <div class="search-bar">
                <a-input-search
                  class="search-bar-input"
                  placeholder="输入姓名/邮箱/手机号/部门 添加协作权限"
                  v-model="searchWord"
                  @search="handleSearch"
                />
                 <a-button @click="refreshList" type="default" style="float:right">刷新列表</a-button>
              </div>
              <div class="co-table-two" v-for="(item, i) in userList" :key="i">
                  <span class="type-text">{{ item.type }}</span>
                <a-table
                  class="perm-table"
                  :columns="showColumns"
                  :data-source="item.list"
                  size="small"
                  :rowKey="(record) => record.userid"
                  :bordered="false"
                  :pagination="false"
                  :showHeader="false"
                >
                  <template slot="avatar" slot-scope="text,record">
                    <a-avatar
                      style="height:30px;width:30px"
                      :src="record.userimgpath"
                    />
                  </template>
                  <template slot="perms" slot-scope="text,record">
                    <a-select 
                     style="width: 120px" defaultValue="修改权限" @change="e=>handleChange(e,record.userid)" >
                      <a-select-option v-for="(item) in items" 
                      :value="item.value" :key="item.value">
                        {{ item.value }}
                      </a-select-option>
                    </a-select-option>
                    </a-select>
                  </template>
                </a-table>
              </div>
            </div>
          </template>
          <template slot="title">
            <div class="one-title" v-if="isaddShare">
              <a-button class="btn" @click="backDown">
                <a-icon type="left" />
              </a-button>
              <div class="one-title-text"><span>添加协作者</span></div>
            </div>
            <div class="two-title" v-else>
              <span>文档 {{ article.title }}</span>
            </div>
          </template>
          <a-button class="wordBtn">
            协作
          </a-button>
        </a-popover>
        <a-popover trigger="click" class="share" placement="bottomRight">
          <template slot="content">
            <div class="share-content">
              <div class="switch">
                <span style="float:left">公开链接：</span>
                <a-switch @change="onChange" style="float:left" />
              </div>
              <div class="single-selection" v-show="isOpenShare">
                <a-radio-group v-model="value" @change="onChangeRadio">
                  <a-radio :value="1">
                    只能阅读
                  </a-radio>
                  <a-radio :value="2">
                    只能评论
                  </a-radio>
                  <a-radio :value="3">
                    可以编辑
                  </a-radio>
                </a-radio-group>
              </div>
              <div class="share-code"></div>
              <div class="share-link">链接：{{ href }}</div>
            </div>
          </template>
          <template slot="title">
            <div class="share-title">
              <span>分享链接</span>
            </div>
          </template>
          <a-button class="wordBtn">
            分享
          </a-button>
        </a-popover>
      </div>
      <div class="topRight">
          <a-button class="btn" @click="showDrawer">
            <a-icon type="history" />
          </a-button>
          <a-drawer
            width="350px"
            title="修改记录"
            placement="right"
            :closable="false"
            :visible="visible"
            :after-visible-change="afterVisibleChange"
            @close="onClose"
          >
            <div>
          <a-list  :data-source="modifyList">
            <a-list-item slot="renderItem" slot-scope="item">
              {{ item }}
            </a-list-item>
          </a-list>
            </div>
          </a-drawer>
      </div>
      <div class="topRight">
        <a-dropdown>
          <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
            <span style="font-size: 16px; margin: 10px;text-decoration: none">{{ user.username }}</span>
            <a-avatar class="avatar" style="width: 30px; height: 30px;" :src="user.userimgpath" />
          </a>
          <a-menu class="more" slot="overlay" @click="avatarOnClick">
            <a-menu-item key="1">
              账号设置
            </a-menu-item>
            <a-menu-item key="2">
              使用帮助
            </a-menu-item>
            <a-menu-item key="3">
              退出登录
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
    </div>
    <div class="body">
      <div class="editor-tool" v-show="isEdit">
        <div class="editor-inner">
          <div class="inner-title"><input class="input-title" v-model="article.title" type="text" /></div>
          <editor :content="article.content" @Edit="Edit" style="width:816px;margin-bottom:80px"></editor>
        </div>
      </div>
      <div class="main-read" v-show="!isEdit">
        <div class="inner">
          <div class="inner-title-read">{{ article.title }}</div>
          <a-divider></a-divider>
          <div class="inner-content" v-html="article.content" ></div>
        </div>
      </div>
      <div class="review">
        <div class="review-title">评论区</div>
        <a-divider></a-divider>
        <div class="review-list">
          <a-list style="min-height:380px" item-layout="horizontal" :data-source="commentList">
            <a-list-item slot="renderItem" slot-scope="item">
              <a-button slot="actions" @click="deleteComment(item.commentid)">删除</a-button>
              <a-list-item-meta :description="item.content">
                <a slot="title" >{{ item.username }}</a>
                <a-avatar slot="avatar" :src="item.userimgpath" />
              </a-list-item-meta>
            </a-list-item>
          </a-list>
          <a-divider></a-divider>
        </div>
        <div class="review-input">
          <a-textarea style="resize:none" v-model="review.content" placeholder="输入评论内容" :rows="4" />
          <a-button style="float: right; margin: 10px;" type="default" size="small" @click="addCommentRequest">发表</a-button>
        </div>
      </div>
      <div class="footer">
        <span class="footer-small">编写于</span>
        <span class="footer-big">金刚石文档</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getData } from "@/api/webget";
import { putData } from "@/api/webput";
import { postData } from "@/api/webpost";
import { deleteData } from "@/api/webdelete";
import editor from "@/components/editorTool.vue";
const userList = [
  {
    type: "只能阅读",
    key: "1",
    list: [],
  },
  {
    type: "只能评论",
    key: "2",
    list: [],
  },
  {
    type: "可以编辑",
    key: "3",
    list: [],
  },
];

const columns = [
  {
    title: "头像",
    dataIndex: "avatar",
    align: "right",
    scopedSlots: { customRender: "avatar" },
  },
  {
    title: "用户名",
    dataIndex: "username",
    align: "center",
  },
  {
    title: "微信号",
    dataIndex: "wechat",
    align: "center",
  },
  {
    title: "操作权限",
    dataIndex: "perms",
    align: "center",
    scopedSlots: { customRender: "perms" },
  },
];
const showColumns = [
  {
    title: "头像",
    dataIndex: "avatar",
    align: "right",
    width:"100px",
    scopedSlots: { customRender: "avatar" },
  },
  {
    title: "用户名",
    dataIndex: "username",
    align: "center",
    width:"150px",
  },
  {
    title: "微信号",
    dataIndex: "wechat",
    align: "center",
    width:"200px",
  },{
    title: "操作权限",
    dataIndex: "perms",
    align: "center",
    width:"100px",
    scopedSlots: { customRender: "perms" },
  },
];
const items = [
  {
    key: 0,
    value: "只能阅读",
  },
  {
    key: 1,
    value: "只能评论",
  },
  {
    key: 2,
    value: "可以编辑",
  },
  {
    key: 3,
    value: "删除已有权限",
  },
];
export default {
  components: {
    editor,
  },
  props: ["docidnum"],
  data() {
    return {
      columns,
      items,
      showColumns,
      userList,
      visible: false,
      isOpenShare: false,
      isEdit: false,
      isCollected: false,
      isaddShare: false,
      content: "",
      modifyList:[],
      searchUser:[],
      commentList: [],
      newdocid:0,
      selected:1,
      value: 1,
      searchWord: "",  
      href: "http://123.56.145.79:8100" + window.location.href.substr(21),
      review: {
        title: "user",
        content: "",
      },    
      canEdit:false,
      canComment: false,
      user: {
        userid: parseInt(window.sessionStorage.getItem("UserId")),
        username: "",
      },    
      article: {
        docid: 0,
        userid: "",
        shareperms: "",
        teamid: "",
        status: "",
        deletetime: "",
        title: "无标题",
        content: "",
        modifytime: "",
      },    
    };
  },
  mounted() {
    this.article.docid = this.$route.query.docid;
    this.user.userid = parseInt(window.sessionStorage.getItem("UserId"));
    this.getDocument();
    this.getComment();
    this.getPermsList();
  },
  methods: {
    refreshList(){
      this.getPermsList();
    },
    afterVisibleChange(val) {
      console.log('visible', val);
    },
    showDrawer() {
      this.getModifyList();
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    },
    addNewDoc(){
      this.updateDocument();
      this.createDocument();
    },
    handleSearch() {
      this.isaddShare = true;
      this.getUserByUsername();
    },
    onChangeRadio(e) {
      this.updateSharePerms(e.target.value);
      console.log("radio checked", e.target.value);
    },
    onChange(checked) {
      if (checked == true) {
        this.isOpenShare = true;
        this.updateSharePerms(1);
      } else {
        this.updateSharePerms(0);
        this.isOpenShare = false;
      }
      console.log(`a-switch to ${checked}`);
    },
    Edit(data) {
      this.article.content = data;
      this.isEdit=false;
      this.updateDocument();
      console.log(data);
    },
    handleChange(val,userid) {
      console.log("val="+val);
      console.log("userid="+userid);
      if (val== "只能阅读") {
         this.replacePermsByUserid(userid,1);
      } else if (val== "只能评论") {
        this.replacePermsByUserid(userid,2);
      } else if (val == "可以编辑") {
        this.replacePermsByUserid(userid,3);
      } else if (val== "删除已有权限"){
        this.deletePerms(userid);
      }
      this.getPermsList();
    },
    toLast() {
      if(this.isEdit==true){
        this.$message.error("请先保存文档");
      }else{
        this.updateDocument();
        this.$router.push({
        path:"/used"
      });
      }
     
     
    },
    backDown() {
      this.searchWord="";
      this.isaddShare = false;
      this.getPermsList();
    },
    collected() {
      this.isCollected = !this.isCollected;
      if(this.isCollected==true){
        this.collectDoc();
      }else{
        this.deleteCollection();
      }
      console.log(this.isCollected);
    },
    onClick({ key }) {
      if (key == 1) {
        this.enterEdit();
      } else if (key == 2) {
        if(this.isEdit){
          this.$message.error("请先保存文档!");
        }else{
          if(this.article.teamid==-1){
            this.addTemplate();
          }else{
            this.addTeamTemplate();
          }
        }
      } else if (key == 3) {
        this.deleteDocument();
        this.$router.go(-1);
      }
      console.log(`Click on item ${key}`);
    },
    avatarOnClick({ key }) {
      if (key == 1) {
        this.$router.push("/personInfo");
      } else if (key == 2) {
        this.$router.push("/help");
      } else if (key == 3) {
        console.log("退出登录");  
        window.sessionStorage.removeItem('UserId');
        this.$router.replace({
        path:"/"
        })
      };
      console.log(`Click on item ${key}`);
    },
    //获取修改记录表
    getModifyList(){
      let params = new URLSearchParams();
      params.append("docid", this.article.docid);
      //调用封装的postData函数，获取服务器返回值
      let url = this.$urlPath.website.getModifyList;
      getData(url, params).then((res) => {
        console.log(res.code);
        if (res.code === "0") {
          this.modifyList=res.data.modifyList.map(function(item){
            return item.modifytime+" "+item.username +" 修改了文档"
          });
            
          console.log("获取修改记录成功");
          // this.$message.success("获取修改记录成功");
        } else if (res.code === "1") {
          this.$message.error("没有权限");
        } else {
          console.log(res.code);
          this.$message.error("服务器返回时间间隔过长");
        }
      });
    },
     //进入编辑状态
    enterEdit(){
      let params = new URLSearchParams();
      params.append("userid", this.user.userid);
      params.append("docid", this.article.docid);
      //调用封装的postData函数，获取服务器返回值
      let url = this.$urlPath.website.enterEdit;
      postData(url, params).then((res) => {
        console.log(res.code);
        if (res.code === "0") {
          this.$message.success("进入编辑状态成功");
          this.isEdit=true;
        } else if (res.code === "1") {
          this.$message.error("没有权限");
        } else if (res.code === "2") {
          this.$message.error("有人正在编辑");
        } else {
          console.log(res.code);
          this.$message.error("服务器返回时间间隔过长");
        }
      });
    },
    //创建团队模版
    addTeamTemplate(){
      let params = new URLSearchParams();
      params.append("userid", this.user.userid);
      params.append("title", this.article.title);
      params.append("content", this.article.content);
      params.append("teamid", this.article.teamid);
      //调用封装的postData函数，获取服务器返回值
      let url = this.$urlPath.website.addTeamTemplate;
      postData(url, params).then((res) => {
        console.log(res.code);
        if (res.code === "0") {
          this.$message.success("模版保存成功,可在[团队模版库]-[团队模版]中查看");
        } else if (res.code === "1") {
          this.$message.error("操作失败");
        } else {
          console.log(res.code);
          this.$message.error("服务器返回时间间隔过长");
        }
      });
    },
    //创建个人模版
    addTemplate(){
      let params = new URLSearchParams();
      params.append("userid", this.user.userid);
      params.append("title", this.article.title);
      params.append("content", this.article.content);
      console.log(this.article.content);
      //调用封装的postData函数，获取服务器返回值
      let url = this.$urlPath.website.addTemplate;
      postData(url, params).then((res) => {
        console.log(res.code);
        if (res.code === "0") {
          this.$message.success("模版保存成功,可在[模版库]-[我的模版]中查看");
        } else if (res.code === "1") {
          this.$message.error("操作失败");
        } else {
          console.log(res.code);
          this.$message.error("服务器返回时间间隔过长");
        }
      });
    },
    //收藏文档
    collectDoc() {
      let params = new URLSearchParams();
      params.append("docid", this.article.docid);
      params.append("userid", this.user.userid);
      //调用封装的postData函数，获取服务器返回值
      let url = this.$urlPath.website.collectDoc;
      putData(url, params).then((res) => {
        console.log(res.code);
        if (res.code === "0") {
          this.$message.success("收藏成功");
        } else if (res.code === "1") {
          this.$message.error("操作失败");
        } else {
          console.log(res.code);
          this.$message.error("服务器返回时间间隔过长");
        }
      });
    },
    //取消收藏
     deleteCollection() {
      let params = new URLSearchParams();
      params.append("docid", this.article.docid);
      params.append("userid", this.user.userid);
      //调用封装的postData函数，获取服务器返回值
      let url = this.$urlPath.website.deleteCollection;
      deleteData(url, params).then((res) => {
        console.log(res.code);
        if (res.code === "0") {
          this.$message.success("取消成功");
        } else if (res.code === "1") {
          this.$message.error("操作失败");
        } else {
          console.log(res.code);
          this.$message.error("服务器返回时间间隔过长");
        }
      });
    },
    //获取用户权限列表
    getPermsList() {
      let params = new URLSearchParams();
      params.append("docid", this.article.docid);
      //调用封装的postData函数，获取服务器返回值
      let url = this.$urlPath.website.getPermsList;
      getData(url, params).then((res) => {
        console.log(res.code);
        if (res.code === "0") {
          this.userList[0].list=res.data.onlyCanReadList;
          this.userList[1].list=res.data.onlyCanCommentList;
          this.userList[2].list=res.data.onlyCanWriteList;
          console.log("获取权限列表成功");
          // this.$message.success("操作成功");
        } else if (res.code === "1") {
          this.$message.error("操作失败");
        } else {
          console.log(res.code);
          this.$message.error("服务器返回时间间隔过长");
        }
      });
    },
    //移除权限
     deletePerms(doneid) {
      let params = new URLSearchParams();
      params.append("docid", this.article.docid);
      params.append("doneid",doneid);
      params.append("doid", this.user.userid);
      //调用封装的postData函数，获取服务器返回值
      let url = this.$urlPath.website.deletePerms;
      deleteData(url, params).then((res) => {
        console.log(res.code);
        if (res.code === "0") {
          console.log("删除权限成功");
          // this.$message.success("操作成功");
        } else if (res.code === "1") {
          this.$message.error("操作失败");
        } else {
          console.log(res.code);
          this.$message.error("服务器返回时间间隔过长");
        }
      });
    },
    //通过用户名查找用户
     getUserByUsername() {
      let params = new URLSearchParams();
      params.append("username", this.searchWord);
      //调用封装的postData函数，获取服务器返回值
      let url = this.$urlPath.website.getUserByUsername;
      getData(url, params).then((res) => {
        console.log(res.code);
        if (res.code === "0") {
          this.searchUser= res.data.userList;
          console.log("查询成功");
          // this.$message.success("操作成功");
        } else if (res.code === "1") {
          this.$message.error("没有符合条件的用户");
        } else {
          console.log(res.code);
          this.$message.error("服务器返回时间间隔过长");
        }
      });
    },
    //通过用户id设置权限
     replacePermsByUserid(doneid,key) {
      let params = new URLSearchParams();
      params.append("docid", this.article.docid);
      params.append("doneid", doneid);
      params.append("privateperms",key);
      params.append("doid", this.user.userid);
      //调用封装的postData函数，获取服务器返回值
      let url = this.$urlPath.website.replacePermsByUserid;
      putData(url, params).then((res) => {
        console.log(res.code);
        if (res.code === "0") {
          console.log("权限设置成功");
          // this.$message.success("操作成功");
        } else if (res.code === "1") {
          this.$message.error("没有权限");
        } else {
          console.log(res.code);
          this.$message.error("服务器返回时间间隔过长");
        }
      });
    },
    //更改分享权限
     updateSharePerms(value) {
      let params = new URLSearchParams();
      params.append("docid", this.article.docid);
      params.append("userid", this.user.userid); 
      params.append("shareperms", value);
      //调用封装的postData函数，获取服务器返回值
      let url = this.$urlPath.website.updateSharePerms;
      putData(url, params).then((res) => {
        console.log(res.code);
        if (res.code === "0") {
          console.log("更改分享权限成功");
          // this.$message.success("操作成功");
        } else if (res.code === "1") {
          this.$message.error("没有权限");
        } else {
          console.log(res.code);
          this.$message.error("服务器返回时间间隔过长");
        }
      });
    },
    //团队创建文档接口
     addTeamDoc(teamid) {
      let params = new URLSearchParams();
      params.append("teamid", teamid);
      params.append("userid", this.user.userid);
      //调用封装的postData函数，获取服务器返回值
      let url = this.$urlPath.website.addTeamDoc;
      postData(url, params).then((res) => {
        console.log(res.code);
        if (res.code === "0") {
            this.$router.push({
              path:"/document",
              query:{
                docid:res.data.docid
              }
            })
            console.log("创建团队文档成功");
          // this.$message.success("操作成功");
        } else if (res.code === "1") {
          this.$message.error("操作失败");
        } else {
          console.log(res.code);
          this.$message.error("服务器返回时间间隔过长");
        }
      });
    },
    //获取文档内容
    getDocument() {
      let params = new URLSearchParams();
      params.append("docid", this.article.docid);
      params.append("userid", this.user.userid);
      //调用封装的postData函数，获取服务器返回值
      let url = this.$urlPath.website.readDoc;
      getData(url, params).then((res) => {
        console.log(res.code);
        if (res.code === "0") {
          this.user = res.data.user;
          console.log(this.user);
          this.canComment = res.data.canComment;
          this.canEdit=res.data.canWrite;
          this.article = res.data.doc;
          this.isCollected=res.data.haveCollect;
          if(res.data.isEditing == false && res.data.canWrite==true){
            this.enterEdit();
          }else if(res.data.isEditing==true && res.data.whoIsEditing.username != res.data.user.username){
            this.$message.error(res.data.whoIsEditing.username +" is editing this document! Please wait a minute!");
          }else if(res.data.isEditing==true && res.data.whoIsEditing.username == res.data.user.username){
            this.isEdit=true;
          }
          console.log("获取文档成功");
          // this.$message.success("操作成功");
        } else if (res.code === "1") {
          this.$message.error("没有权限");
        } else if (res.code === "2") {
          this.$message.error("文档已被删除");
          this.$router.go(-1);
        } else {
          console.log(res.code);
          this.$message.error("服务器返回时间间隔过长");
        }
      });
    },
    //删除文档
     deleteDocument() {
      let params = new URLSearchParams();
      params.append("docid", this.article.docid);
      params.append("userid", this.user.userid);
      //调用封装的postData函数，获取服务器返回值
      let url = this.$urlPath.website.deleteDoc;
      deleteData(url, params).then((res) => {
        console.log(res.code);
        if (res.code === "0") {
          this.$message.success("操作成功");
        } else if (res.code === "1") {
          this.$message.error("没有权限");
        } else {
          console.log(res.code);
          this.$message.error("服务器返回时间间隔过长");
        }
      });
    },
    //修改文档
    updateDocument() {
      let params = new URLSearchParams();
      params.append("docid", this.article.docid);
      params.append("title", this.article.title);
      if (this.article.title == "") {
        this.article.title = "无标题";
      }
      console.log(this.article.content);
      params.append("content", this.article.content);
      params.append("userid", this.user.userid);
      //调用封装的putData函数，获取服务器返回值
      let url = this.$urlPath.website.saveDoc;
      putData(url, params).then((res) => {
        console.log(res.code);
        if (res.code === "0") {
          console.log(this.article.content);
          this.$message.success("操作成功");
        } else if (res.code === "1") {
          this.$message.error("用户未登录");
        } else if (res.code === "2") {
          this.$message.error("没有权限");
        } else {
          console.log(res.code);
          this.$message.error("服务器返回时间间隔过长");
        }
      });
    },
    //个人创建文档
    createDocument() {
      let params = new URLSearchParams();
      params.append("userid", this.user.userid);
      //调用封装的postData函数，获取服务器返回值
      let url = this.$urlPath.website.addDoc;
      postData(url, params).then((res) => {
        console.log(res.code);
        if (res.code === "0") {
          this.$router.push({
          path:"/document",
          query:{
            docid:res.data.docid
        }
      });
          this.getDocument();
          console.log(this.article);
          this.getComment();
          console.log("保存成功");
          // this.$message.success("保存成功");
        } else if (res.code === "1") {
          this.$message.error("操作失败");
        } else {
          console.log(res.code);
          this.$message.error("服务器返回时间间隔过长");
        }
      });
    },
    //获取评论列表
    getComment() {
      let params = new URLSearchParams();
      params.append("docid", this.article.docid);
      //调用封装的getData函数，获取服务器返回值
      let url = this.$urlPath.website.getComment;
      getData(url, params).then((res) => {
        console.log(res.code);
        if (res.code === "0") {
          console.log("获取评论列表成功");
          // this.$message.success("操作成功");
          this.commentList = res.data.commentList;
        } else if (res.code === "1") {
          this.$message.error("操作失败");
        } else {
          console.log(res.code);
          this.$message.error("服务器返回时间间隔过长");
        }
      });
    },
    addCommentRequest(){
      if(this.canComment==true){
        this.addComment();
      }else{
        this.$message.error("当前用户没有权限进行评论");    
      }
    },
    //添加评论
    addComment() {
      let params = new URLSearchParams();
      params.append("docid", this.article.docid);
      params.append("content", this.review.content);
      params.append("userid", this.user.userid);
      //调用封装的postData函数，获取服务器返回值
      let url = this.$urlPath.website.addComment;
      postData(url, params).then((res) => {
        console.log(res.code);
        if (res.code === "0") {
          this.review.content = "";
          this.getComment();
          console.log("评论成功");
          this.$message.success("发表评论成功");
        } else if (res.code === "1") {
          this.$message.error("操作失败");
        } else {
          console.log(res.code);
          this.$message.error("服务器返回时间间隔过长");
        }
      });
    },
    //删除评论
     deleteComment(commentid) {
      let params = new URLSearchParams();
      params.append("userid", this.user.userid);
      params.append("commentid", commentid);
      //调用封装的postData函数，获取服务器返回值
      let url = this.$urlPath.website.deleteComment;
      deleteData(url, params).then((res) => {
        console.log(res.code);
        if (res.code === "0") {
          this.getComment();
          this.$message.success("删除成功");
        } else if (res.code === "1") {
          this.$message.error("操作失败");
        } else {
          console.log(res.code);
          this.$message.error("服务器返回时间间隔过长");
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.table-add{
  width:600px;
  margin-left:-40px;
  height:500px
}
.perm-table{
  width:550px;
  margin-top:-90px;
  margin-left:-40px;
  height:100px;
}
.single-selection {
  margin: 0px auto 30px auto;
}
.switch {
  margin: -25px auto 30px auto;
  padding-bottom: 10px;
}
::v-deep .ant-table-tbody > tr > td {
  border-bottom: none;
  transition: all 0.3s, border 0s;
}
::v-deep .ant-table-small {
  border: none;
}

.co-table-one {
  // border: blue 1px solid;
  display: block;
  margin: 20px;
  overflow: scroll;
}
.co-table-two {
  // border: blue 1px solid;
  margin: 10px auto 10px auto;
  overflow: scroll;
  width:550px;
  height:150px;
}
.type-text{
  float:left;
  color:grey;
  font-size:16px;
}
.search-bar-input {
  width: 400px;
}
.search-bar {
  margin: auto;
  width: 500px;
  // border: red 1px solid;
}
.review-title {
  font-size: 18px;
  margin: 20px auto -15px 20px;
  // border: red 1px solid;
}
.review {
  // border: blue 1px solid;
  background-color: white;
  margin: 30px auto 50px auto;
  width: 816px;
  height: 620px;
  -webkit-box-shadow: 0 0 10px #ccc;
  -moz-box-shadow: 0 0 10px #ccc;
  box-shadow: 0 0 10px #ccc;
}
.review-list {
  // border: blue 1px solid;
  margin: 0 auto 20px auto;
  width: 750px;
  height: 380px;
  overflow: scroll;
}
.review-input {
  width: 750px;
  margin: auto;
}
.one-title-text {
  display: inline-block;
  width: 500px;
  font-size: 20px;
  // border: red 1px solid;
  text-align: center;
}
.two-title {
  font-size: 20px;
}
.one-content {
  // border: red 1px solid;
  width: 600px;
  height: 500px;
}
.two-content {
  // border: red 1px solid;
  width: 600px;
  height: 500px;
}
.share {
  z-index: 1000;
}
.share-content {
  // border: red 1px solid;
  width: 350px;
  height: 380px;
  margin: 20px;
}
.share-title {
  // border: red 1px solid;
  font-size: 20px;
  text-align: center;
}
.share-code {
  float: left;
  background-color: green;
  border: red 1px solid;
  width: 200px;
  height: 200px;
  margin: 10px auto 10px auto;
}
.share-link {
  float: left;
  text-align: left;
  // border: red 1px solid;
  width: 350px;
  height: 30px;
  margin: 20px auto 10px auto;
}
.more {
  margin-top: 5px;
}
input,
textarea {
  outline: medium;
}
.input-title,
.input-title:active,
.input-title:hover {
  border: none;
  width: 816px;
  -webkit-box-shadow: 0 0 10px #ccc;
  -moz-box-shadow: 0 0 10px #ccc;
  box-shadow: 0 0 10px #ccc;
}
.input-content,
.input-content:active,
.input-content:hover {
  resize: none;
  border: none;
  width: 100%;
  height: 1120px;
  margin-top: -10px;
  // border: blue 1px solid;
}
.inner {
  // border: red 1px solid;
  width: 616px;
  margin: 80px auto 20px auto;
  min-height: 823px;
  background-color: white;
}
.inner-title-read {
  background-color: white;
  font-size: 24px;
  margin-bottom: 30px;
}
.inner-title {
  background-color: white;
  font-size: 24px;
  margin-top: 50px;
  margin-bottom: -100px;
  width: 816px;
  -webkit-box-shadow: 0 0 10px #ccc;
  -moz-box-shadow: 0 0 10px #ccc;
  box-shadow: 0 0 10px #ccc;
}

.name {
  // border: 1px solid red;
  max-width: 300px;
  font-size: 20px;
  text-overflow: ellipsis;
  display: block;
  overflow: hidden;
  white-space: nowrap;
}
.header {
  overflow: hidden;
  width: 100%;
  height: 60px;
  background-color: white;
}
.content {
  min-height: 823px;
  background-color: #f7f7f7;
}
.wordBtn {
  text-align: center;
  width: 50px;
  height: 30px;
  margin: 0;
  padding: 0 5px 0 5px;
}
.btn {
  text-align: center;
  width: 30px;
  height: 30px;
  margin: 0 5px 0 5px;
  padding: 0 5px 0 5px;
}
.top {
  float: left;
  margin: 15px 10px 0 10px;
}
.topRight {
  float: right;
  margin: 15px 10px 0 10px;
}
.time {
  margin-top: 20px;
  color: rgb(190, 189, 189);
}
.body {
  // border: red 1px solid;
  // padding-top: 130px;
  background-color: #f7f7f7;
}

.main-read {
  border: white 1px solid;
  background-color: white;
  margin: 30px auto 50px auto;
  width: 816px;
  min-height: 823px;
  -webkit-box-shadow: 0 0 10px #ccc;
  -moz-box-shadow: 0 0 10px #ccc;
  box-shadow: 0 0 10px #ccc;
}
.editor-inner {
  // border: red 5px solid;
  margin: 0 auto 30px auto;
  width: 816px;
  background-color: white !important;
  height: 823px;
  padding-bottom: 30px;
}
.editor-tool {
  // border: green 1px solid;
  background-color: #f7f7f7;
  margin: 10px auto 0px auto;
  width: 100%;
  min-height: 823px;
}

.footer-small {
  // border: blue 1px solid;
  width: 50px;
  text-align: center;
  display: inline-block;
  margin: auto;
}
.footer-big {
  // border: blue 1px solid;
  width: 80px;
  font-size: 16px;
  text-align: center;
  display: inline-block;
  margin: auto;
}
.footer {
  // border: red 1px solid;
  width: 200px;
  text-align: center;
  display: block;
  margin: -20px auto 0 auto;
  height: 60px;
}
</style>
