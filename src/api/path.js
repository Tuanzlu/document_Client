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
  },
};
export default path;
