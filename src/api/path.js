var LOADIP = "http://123.56.145.79:8090";
let Ip = {
  productIP: LOADIP + "/",
};
let path = {
  website: {
    //个人工作台
    login: Ip.productIP + "login",
    register: Ip.productIP + "register",
    getUserInfo: Ip.productIP + "getUserInfo",
    alterPassword: Ip.productIP + "alterPassword",
    uploadUserImage: Ip.productIP + "uploadUserImage",
    updateUserImgPath: Ip.productIP + "updateUserImgPath",
    getMyJoinedTeam: Ip.productIP + "getMyJoinedTeam",
    updateUserInfo: Ip.productIP + "updateUserInfo",
    getRecentRead: Ip.productIP + "getRecentRead",
    getCollected: Ip.productIP + "getCollected",
    getMyDoc: Ip.productIP + "getMyDoc",
    getMyDeleteDoc: Ip.productIP + "getMyDeleteDoc",
    //文档、评论
    addDoc: Ip.productIP + "addDoc",
    readDoc: Ip.productIP + "readDoc",
    saveDoc: Ip.productIP + "saveDoc",
    getComment: Ip.productIP + "getCommentList",
    addComment: Ip.productIP + "addComment",
    deleteComment: Ip.productIP + "deleteComment",
    deleteDoc: Ip.productIP + "deleteDoc",
    getUserByUsername: Ip.productIP + "getUserByUsername",
    getPermsList: Ip.productIP + "getPermsList",
    deletePerms: Ip.productIP + "deletePerms",
    collectDoc: Ip.productIP + "collectDoc",
    deleteCollection: Ip.productIP + "deleteCollection",
    updateSharePerms: Ip.productIP + "updateSharePerms",
    replacePermsByUserid: Ip.productIP + "replacePermsByUserid",
    addTemplate: Ip.productIP + "addTemplate",
    getMyTemplateList: Ip.productIP + "getMyTemplateList",
    deleteTemplate: Ip.productIP + "deleteTemplate",
    getTemplateByTemplateid: Ip.productIP + "getTemplateByTemplateid",
    enterEdit: Ip.productIP + "enterEdit",
    addDocByTemplate: Ip.productIP + "addDocByTemplate",
    getUserByDocid: Ip.productIP + "getUserByDocid",
    getModifyList: Ip.productIP + "getModifyList",
    //团队
    getTeamInfo: Ip.productIP + "getTeamInfo",
    getTeamDocList: Ip.productIP + "getTeamDocList",
    addTeam: Ip.productIP + "addTeam",
    getTeamMemberList: Ip.productIP + "getTeamMemberList",
    alterMemberPerms: Ip.productIP + "alterMemberPerms",
    quitTeam: Ip.productIP + "quitTeam",
    tickTeam: Ip.productIP + "tickTeam",
    inviteTeamMemberByUserId: Ip.productIP + "inviteTeamMemberByUserId",
    addTeamDoc: Ip.productIP + "addTeamDoc",
    deleteTeam: Ip.productIP + "deleteTeam",

    //通知系统
    getReadNoticeByUser: Ip.productIP + "getReadNoticeByUser",
    getUnreadNoticeByUser: Ip.productIP + "getUnreadNoticeByUser",
    readNotice: Ip.productIP + "readNotice",
    deleteNotice: Ip.productIP + "deleteNotice",
    agreeTeamInvitation: Ip.productIP + "agreeTeamInvitation",
    disagreeTeamInvitation: Ip.productIP + "disagreeTeamInvitation",
  },
};
export default path;
