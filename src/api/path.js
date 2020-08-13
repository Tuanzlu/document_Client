var LOADIP = "http://123.56.145.79:8090";
let Ip = {
  productIP: LOADIP + "/",
};
let path = {
  website: {
    login: Ip.productIP + "login",
    register: Ip.productIP + "register",
    addDoc: Ip.productIP + "addDoc",
    readDoc: Ip.productIP + "readDoc",
    writeDoc: Ip.productIP + "writeDoc",
    getUserInfo: Ip.productIP + "getUserInfo",
    getComment: Ip.productIP + "getCommentList",
    addComment: Ip.productIP + "addComment",
    deleteDoc: Ip.productIP + "deleteDoc",
    getUserByUsername: Ip.productIP + "getUserByUsername",
    getPermsList: Ip.productIP + "getPermsList",
    deletePerms: Ip.productIP + "deletePerms",
    collectDoc: Ip.productIP + "collectDoc",
    deleteCollection: Ip.productIP + "deleteCollection",
    updateSharePerms: Ip.productIP + "updateSharePerms",
    addTeamDoc: Ip.productIP + "addTeamDoc",
    getMyJoinedTeam: Ip.productIP + "getMyJoinedTeam",
    updateUserInfo: Ip.productIP + "updateUserInfo",
    alterPassword: Ip.productIP + "alterPassword",
    uploadUserImage: Ip.productIP + "uploadUserImage",
    updateUserImgPath: Ip.productIP + "updateUserImgPath",
  },
};
export default path;
