<template>
  <div>
    <div style="float: left;margin-left:30px">
      <a-menu v-model="mail" mode="horizontal" style="margin-left: 250px; ">
        <a-menu-item key="mail">
          <a-icon type="question" />帮助中心
        </a-menu-item>
      </a-menu>
      <div class="btn_box" style="margin-left: 250px; margin-top: 30px;">
        <div style="text-indent:2em; line-height:2.4">
          <h1>一、热点问题</h1>
          <h2>1、 什么是陨石文档？</h2>
          <p>“陨石文档”是一个PC端的在线文档协作平台，可以实现doc文档的云存储以及团队成员的协作编辑。</p>
          <h2>2、 如何修改密码？</h2>
          <p>登录后在个人信息页面按提示修改密码，如忘记密码，可在登录页面点击“忘记密码”链接，通过回答安全问题找回密码。</p>
          <br />
          <h1>二、使用帮助</h1>
          <h2>1、 基础功能</h2>
          <p>
            <strong>登录、注册</strong>
          </p>
          <p>在初始页面点击“开始使用”登录。填写用户名密码，点击“登录”进行登录。若用户尚未注册，点击“去注册！”填写表单，填写完信息后，点击“注册”。之后可以登录。</p>
          <p>
            <strong>个人信息的查看、完善与修改</strong>
          </p>
          <p>在个人工作台页面，在顶部导航栏右侧头像-下拉菜单中点击“个人主页”即可。</p>
          <h2>2、个人工作台</h2>
          <p>
            <strong>浏览最近浏览的文档、收藏的文档和自己创建的文档</strong>
          </p>
          <p>点击左侧导航栏-“工作台”，即可在页面顶部找到对应标签查看并浏览文档。若文件较多，可以通过顶部导航栏-“搜索文件”输入文件名快速找到需要的文件。</p>
          <p>
            <strong>访问自己加入的团队</strong>
          </p>
          <p>点击左侧导航栏-“团队空间”，即可在下拉菜单中点击对应团队名称，查看并访问自己加入的团队。完成后可以看到团队文档和信息等内容。</p>
          <p>“团队空间”下拉菜单中有“创建团队”入口。若没有团队，可以选择创建或加入团队。</p>
          <h2>3、 文档有关处理</h2>
          <p>
            <strong>创建文档</strong>
          </p>
          <p>在个人主页，点击右侧悬浮按钮“新建文档”即可创建。</p>
          <p>在团队空间，点击右侧悬浮按钮“新建团队文档”即可创建文档，该文档对团队内全体成员可见。</p>
          <p>
            <strong>基于模板创建文档</strong>
          </p>
          <p>在个人主页，点击右侧悬浮按钮“模板库”即可创建。</p>
          <p>在团队空间，点击右侧悬浮按钮“团队模板库”即可创建文档，该文档对团队内全体成员可见。</p>
          <p>
            <strong>修改</strong>
          </p>
          <p>点击文档右上角的下拉菜单图标，点击“编辑”即可修改文档。</p>
          <p>若有其他用户正在编辑当前文档，您会收到通知。</p>
          <p>完成后请在顶部点击“保存”完成修改。用户也可以点击“保存为模板”将其加入自己的模板库。</p>
          <p>
            <strong>收藏文档</strong>
          </p>
          <p>在文档页面，点击顶部“星形”按钮即可收藏文档。之后可在个人工作台浏览已收藏的文档。</p>
          <p>
            <strong>评论</strong>
          </p>
          <p>在文档页面，可进入下方评论区发送评论。可通过评论区访问其他用户的个人主页。</p>
          <p>
            <strong>分享</strong>
          </p>
          <p>可在文件夹页面或文档页面顶部，在对应菜单中以二维码和链接形式分享文档。</p>
          <p>
            <strong>协作</strong>
          </p>
          <p>可在文件夹页面或文档页面顶部，在对应菜单中邀请用户协作文档，同时可以管理协作用户的权限。邀请用户协作需要等待对方同意。</p>
          <p>
            <strong>删除和恢复文档</strong>
          </p>
          <p>可在文件夹或文档浏览页面，在对应下拉菜单中选择删除文档。</p>
          <p>被删除的文档会出现在左侧导航栏-“回收站”中。在文件图标下拉菜单中可选择“恢复文档”或者“彻底删除”。</p>
          <h2>4、团队协作</h2>
          <p>
            <strong>创建团队</strong>
          </p>
          <p>在个人主页，点击左侧导航栏-“团队空间”，即可在下拉菜单中点击“新的团队”，输入团队名称和介绍，点击“提交”完成创建。</p>
          <p>
            <strong>查看团队文档、基本信息</strong>
          </p>
          <p>在个人主页，点击左侧导航栏-“团队空间”，即可在下拉菜单中点击对应团队名称，查看并访问自己加入的团队。完成后可以看到团队文档和信息等内容。</p>
          <p>
            <strong>查看团队成员</strong>
          </p>
          <p>在团队页面中点击“成员列表”，即可查看团队成员。</p>
          <p>
            <strong>邀请其他用户加入团队</strong>
          </p>
          <p>本功能通过邀请实现。在团队页面中点击“成员列表”-“邀请成员”，即可模糊搜索用户名并邀请用户加入团队。被邀请人可以在消息通知系统中回应邀请。</p>
          <p>
            <strong>权限管理</strong>
          </p>
          <p>创建者在团队页面中点击“成员列表”，即可独立管理每个成员的权限。成员权限分为“只能阅读”、“可以评论”、“可以编辑”三级。</p>
          <p>
            <strong>退出团队</strong>
          </p>
          <p>成员在团队页面右侧点击“退出团队”即可退出当前团队。</p>
          <p>
            <strong>解散团队</strong>
          </p>
          <p>团队创建者在团队页面右侧点击“解散团队”即可解散当前团队，解散团队时将会彻底删除所有团队文档。</p>
          <h2>5、通知系统</h2>
          <p>通知系统组件在顶部导航栏的头像旁，当用户收到协作邀请、团队邀请、或者自己的文档被评论、删除文档和恢复文档时，会收到来自后台的通知消息。</p>
        </div>
      </div>
    </div>

    <a-back-top />
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {};
  },
  methods: {}
};
</script>

<style>
p {
  margin-left: 2em;
}
</style>
