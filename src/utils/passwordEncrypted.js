/**
 * 加密登录以及注册的密码
 * @author tammy 2019.9.29
 */

 import crypto from 'crypto';

 /**
  * 加盐，sha1产生一个密码
  * @param {number} phone-手机号码
  * @param {string} password-帐号密码
  */
 function passwordEncrypted(key, value){
    const algorithm = crypto.createHash('sha256');    //createHash指定加密的hash算法，如'sha1', 'md5', 'sha256', 'sha512'等
    // const key_encypt= algorithm.update(key).digest('hex'); 最好不用组合哈希，会容易发生碰撞     //update更新hash的内容为指定的data; digest计算所有传入数据的hash摘要可以为'hex', 'binary' 或者'base64'
    const password_encypt = algorithm.update(`${key}${value}`).digest('hex');        //先自己封装一个产生盐值的npm包，CSPRNG,基于加密的伪随机数生成器
    return password_encypt;     //最好客户端用类似域名等特有字符串一次加密，服务端再一次加密，不然如果发送密码的过程被截取或者破解数据库可能会被直接用于服务器认证
}

 export default passwordEncrypted;