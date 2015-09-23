# NGA_MK2
Random JS to make NGA a better place.
### 如何加载
1. 得到特殊的debug权限后，在NGA设置面板里点击debug或者控制台打 *commonui._debug.on(1)* 
2. 成功后会自动加载jsDEBUG.js文件。文件默认访问路径为localhost/jsDEBUG.js
3. 编辑jsDEBUG.js，用本地js文件覆盖服务器对应文件，即可使用本地脚本进行调试。

```javascript
__SCRIPTS.commonSpec = 'http://127.0.0.1/nga_img_zeg/ngabbs/nga_classic/js_default.js'
__SCRIPTS.read = 'http://127.0.0.1/nga_img_zeg/common_res/js_read.js'
__SCRIPTS.message = 'http://127.0.0.1/nga_img_zeg/common_res/js_message.js'
__SCRIPTS.lib = 'http://127.0.0.1/nga_img_zeg/common_res/js_commonLib.js'
__SCRIPTS.common = 'http://127.0.0.1/nga_img_zeg/common_res/js_commonui.js'
__SCRIPTS.ucp = 'http://127.0.0.1/nga_img_zeg/common_res/js_ucp.js'
__SCRIPTS.admin = 'http://127.0.0.1/nga_img_zeg/common_res/js_admin.js'
__SCRIPTS.iframeRead2 = 'http://127.0.0.1/nga_img_zeg/common_res/js_iframeRead.js'
__SCRIPTS.armory = 'http://127.0.0.1/nga_img_zeg/ngabbs/nga_classic/js_armory.js'
__SCRIPTS.bbscodeSpec = 'http://127.0.0.1/nga_img_zeg/ngabbs/nga_classic/js_bbscode_smiles.js'
__SCRIPTS.bbscode = 'http://127.0.0.1/nga_img_zeg/common_res/js_bbscode_core.js'
__SCRIPTS.dsList = 'http://127.0.0.1/nga_img_zeg/common_res/js_bbs_adslist.js'
__SCRIPTS.userItem = 'http://127.0.0.1/nga_img_zeg/common_res/js_userItem.js?131048'
__SCRIPTS.post = 'http://127.0.0.1/nga_img_zeg/common_res//js_postfunc_v2.js?140736',
__SCRIPTS.customBg = 'http://127.0.0.1/nga_img_zeg/ngabbs/nga_classic/js_customBg.js?'
```

