if(!window.postfunc)
	window.postfunc = {}
/**
 *版面bit
 */
postfunc._bit = {
'allow_lesser_nuke_and_no_adj':2, //可以lesser nuke并使用默认的声望对威望的比值扣除威望
'high_allowvisit':4, //未验证的用户或用户在禁言期间不能查看
'if_auto_translate':8, //版主设置了同义词翻译表
'free_edit':16, //编辑主题不受时限限制
'if_filter_key':32, //是否有设置监视
'if_topic_key_color':64, //是否有设置分类颜色
'if_custom_level':128, //是否有设置声望级别
'if_force_topickey':256 //是否有设置强制分类
}

/**
*代码帮助数据容器
 */
postfunc.hintTable = []

/**
 *帖子bit
 */
postfunc.postBit = {
_POST_IF_COMMENT:1,//是否是评论
_POST_IF_HIDDEN:2,//是否隐藏
_POST_IF_HAVE_COMMENT:4,//是否有评论
_POST_IF_HAVE_DELAY_ACTION:8,//是否有延时操作

_POST_IF_LOG:32,//是否被标记了
_POST_IF_NO_HINT:64,//是否阻止回复提示
_POST_IF_FREE_EDIT:128,//是否超期可编辑
_POST_IF_SELF_REPLY:256,//是否只能自己回复

_POST_IF_LOCK:1024,//是否锁定
_POST_IF_HIDE_TITLE:2048,//是否显示被处罚的标记
_POST_IF_HAS_AUTO_TRANSLATE:4096,//是否有可以自动翻译的内容
_POST_IF_HAS_UPLOAD:8192,//是否有上传文件

_POST_IF_SET:32768,
_POST_IF_SET_ELM:65536,
_POST_IF_UNION_HIDDEN:131072//是否不在合并版面中显示
}

/**
 *发帖操作（action
 */
postfunc.__NEW = 'new'
postfunc.__REPLY = 'reply'
postfunc.__REPLY_BLANK = 'replyblank'
postfunc.__QUOTE = 'quote'
postfunc.__MODIFY = 'modify'



/**
 *文件上传使用到的变量
postfunc.fileSelector=null //文件选择input
postfunc.waitAttachList =null //等待上传的文件信息容器
postfunc.attachList=null //已经上传的文件信息容器
postfunc.album=null //相册信息容器
postfunc.attachBtn
postfunc.albumImgCount=null//相册计数
postfunc.uploadedAttach=[]//已经上传的文件信息数据

this.o_attachBtn
this.o_attachList
this.o_waitAttachList
this.o_attachForm
this.o_fileSelector
*/


/**
postfunc.currentFid		//当前发帖的fid
postfunc.contentBak //编辑时备份的内容
postfunc.titleBak //编辑时备份的主题 (用以确定是否修改

//this.form

this.o_subject	//input标题
this.o_content	//input内容
this.o_selfReply	//checkbox只有作者和版主可回复
this.o_hidden	//checkbox隐藏帖子
this.o_vote		//textarea投票内容
this.o_voteType	//select 0投票 1投注铜币
this.o_voteMax	//input每人最多可投 0不限
this.o_voteEnd	//input小时后结束
this.o_attach	//input附件数据
this.o_attachChk	//input附件校验
this.o_voteBetMin	//input投注最大值
this.o_voteBetMax	//input投注最小值
this.o_modifyAppend
this.o_comment
this.o_anony

this.o_pvwindow	//预览窗口

this.o_f_content	//快速发帖input内容
*/



/*几个发帖按钮*/
//commonui.topicBtn.d[11]
//commonui.postBtn.d[6]
//commonui.postBtn.d[7]
//commonui.postBtn.d[8]
//commonui.forumBtns[6]

/**
 *是否支持多文件上传
 */
postfunc.ifMultiple= (window.XMLHttpRequest!==undefined && ('withCredentials' in new XMLHttpRequest()) && window.FormData !== undefined) ? true : false



/**
 *在光标位置插入文字
 */
postfunc.addText = function (txt){
var o = this.o_content
if (o.setSelectionRange){
	var s = o.selectionStart;
	o.value = o.value.substring(0,s) + txt + o.value.substring(o.selectionEnd,o.value.length)
	s += txt.length;
	o.setSelectionRange(s,s)
	}
else{
	if (!this._selection){
		o.value+=txt
		return
		}
	this._selection.text=txt
	this._selection.collapse(true);
	this._selection.select();
	}
}//fe

/**
 *获取选中的文字
 */
postfunc.getSelectText = function(){
if(document.selection && document.selection.createRange)
	return document.selection.createRange().text;
else
	return this.o_content.value.substring(this.o_content.selectionStart,this.o_content.selectionEnd)
return '';
}
//fe

/***
*内容focus
*/
postfunc.setFocus = function(){
this.o_content.focus();
}

/**
*光标位置插入tag
*/
postfunc.addTag = function(tag,value){
if(value) this.addText("["+tag+"="+value+"]"+this.getSelectText()+"[/"+tag+"]");
else this.addText("["+tag+"]"+this.getSelectText()+"[/"+tag+"]");
}
/*
postfunc.stripsomebbscode = function(v){
v = v.replace(/\[\/?lessernuke\]/gim,'');
return v;
}
//fe

postfunc.getCursorPos = function (o){
var s,e
if(document.selection){
	this._selection = document.selection.createRange.duplicate();
	}
else{
	s = o.selectionStart
	e = o.selectionEnd
	}
this._selectionStart = s
this._selectionEnd = e
}//fe
*/
postfunc.inputchar = function(e,o)
{
if (e.keyCode == 9)
	return this.addText('	');

if(document.selection)
	{
	var rng = document.selection.createRange();
	rng.moveStart("character",-1)
	var c= rng.text.charCodeAt(0)
	}
else
	{
	var c = o.value.charCodeAt(o.selectionStart-1)
	var rng = false;
	}
if (c==12304)
	{
	if (rng)
		{
		rng.text='['
		}
	else
		{
		rng = o.selectionStart
		o.value=o.value.substring(0,rng-1)+'['+o.value.substr(rng)
		o.selectionStart= o.selectionEnd = rng
		}
	}
else if (c==12305)
	{
	if (rng)
		{
		rng.text=']'
		}
	else
		{
		rng = o.selectionStart
		o.value=o.value.substring(0,rng-1)+']'+o.value.substr(rng)
		o.selectionStart= o.selectionEnd = rng
		}
	}
else if (c==65309)
	{
	if (rng)
		{
		rng.text='='
		}
	else
		{
		rng = o.selectionStart
		o.value=o.value.substring(0,rng-1)+'='+o.value.substr(rng)
		o.selectionStart= o.selectionEnd = rng
		}
	}
else if (c==12289)
	{
	if (rng)
		{
		rng.moveStart("character",-1)
		if (rng.text.charAt(0)=='[')
			{
			rng.text='[/'
			}
		}
	else
		{
		if (o.value.charAt(o.selectionStart-2)=='[')
			{
			rng = o.selectionStart
			o.value=o.value.substring(0,rng-1)+'/'+o.value.substr(rng)
			o.selectionStart= o.selectionEnd = rng
			}
		}
	}
}
//fe


/**
 *增加一条隐藏内容
 */
postfunc.addHiddenInfo=function(txt){
if (!this.hiddenInfo)this.hiddenInfo=[]
this.hiddenInfo.push(txt)
}//fe


/**
 *系统检测
 * @return [设备名+系统, 浏览器] 100:未知android浏览器 101:ios未知ios浏览器 102:BlackBerry未知bb浏览器 103:未知WP浏览器
 */
postfunc.deviceDetect = function(){
var z = window.navigator.userAgent.match(/(.+?)\((.+?)\)/) , u = function(z){return z.replace(/(?:\s+Build)?\/.+?$/i,'')}

if(!z || z[1].match(/Android/i)){
	if(z)
		z=z[1]
	else
		z = window.navigator.userAgent
	var x = z.match(/^(.+?) (?:Linux\/[^ ]+ )?Android\/[^ ]+/)
	if(x)
		return [u(x[1]),100]
	return
	}

z=z[2].replace(/ (?:U|I|N)(?:;|$)/,'').replace(/ [a-z]{2}-[a-z]{2}(?:;|$)/i,'')//去掉加密和语言 (Linux; U; Android 4.1.2; zh-CN; GT-I9300)

var y = z.match(/Android|iPhone|iPod|iPad|BlackBerry|Windows Phone|IEMobile/i)
if(!y)return

z = z.split(/\s*;\s*/)
y = y[0].toLowerCase()

if(y=='android'){
	if(z[1].match(/Android/i)){
		if(z[0]=='Linux')
			z = z[2]
		else
			z = z[0]
		}

	if(typeof(z)=='string')
		return [u(z),100]

	return ['[AD]',100]
	}
else if(y=='iphone' || y=='ipad' || y=='ipod'){
	if(z[1].match(/OS [\d\w]+ like Mac OS/))
		z = z[2]?z[2]:z[0]
	
	if(typeof(z)=='string')
		return [u(z),101]
	
	return ['[iOS]',101]
	}
else if(y=='windows phone' || y=='iemobile'){
	if(z[z.length-2]=='NOKIA')
		z = z[z.length-1]
	
	if(typeof z =='string')
		return [u(z),103]

	return ['[WP]',103]
	}
else if(y=='blackberry'){
	if(z[0]=='BlackBerry')
		z = z[1]
	
	if(typeof(z)=='string')
		return [u(z),102]

	return ['[BB]',102]
	}
}//fe

/**
*178 相册
*/
postfunc.listAlbum = function(o){
o.innerHTML = ''
window.tmp=undefined
httpDataGetter.script_muti_get("http://i.178.com/?&_app=album&_controller=category&_action=getAlbumInfo&random="+Math.random(),
	function(r){
		if(window.tmp)r=window.tmp
		else return false;
		if (r.error)
			{
			if(r.error=='not login')r.error = '未登录'
			o.innerHTML = r.error;
			return true
			}
		var list=''
		for (var i=0;i<r.length;i++)
			{
			if(r[i].preview)r[i].preview='<img src="'+r[i].preview+'"/>'
			list+='<a href="javascript:void(0)" onclick="postfunc.openAlbum(this.parentNode,'+r[i].id+')" style="display:block;width:136px;height:130px;overflow:hidden;text-align:center;float:left;border:1px solid #aaa;margin:3px"><div style="width:130px;height:98px;border:1px solid #000;background:#444;margin:2px auto">'+r[i].preview+'</div>'+r[i].title+' ('+r[i].count+')</a>'
			}
		if (list)
			o.innerHTML = list
		else
			o.innerHTML = '没有相册'
		return true

	},
	function(){
		o.innerHTML = '读取错误'
	},
	'gbk'
	);
}//fe

/**
*178 相册
*/
postfunc.openAlbum = function (o,id,page){
o.innerHTML = ''
if(!page)page=''
window.tmp=undefined
httpDataGetter.script_muti_get("http://i.178.com/?id="+id+"&pagesize=20&page="+page+"&_app=album&_controller=category&_action=getPicByCategory",
	function(r){
		if(window.tmp)r=window.tmp
		else return false;
		if (r.error)
			{
			if(r.error=='not login')r.error = '未登录'
			o.innerHTML = r.error;
			return true
			}
		var info = '';
		if (r.info)
			{
			if (r.info.PAGECOUNT>1)
				{
				for (var i=1;i<r.info.PAGECOUNT;i++)
					info+'<a href="javascript:void(0)" onclick="postfunc.openAlbum(this.parentNode,'+id+','+i+')">['+i+']</a>';
				}
			}
		if(info)info='<div style="clear:both">'+info+'</div>'
		var list=''
		for (var i=0;i<r.ROWS.length;i++)
			{
			if(r.ROWS[i].url)r.ROWS[i].urls='<img src="'+r.ROWS[i].thumb+'"/>'
			list+='<a title="点击插入图片代码" href="javascript:void(0)" onclick="postfunc.addText(\'[img]'+r.ROWS[i].url+'[/img]\');" style="display:block;width:136px;height:130px;overflow:hidden;text-align:center;float:left;border:1px solid #aaa;margin:3px"><div style="width:130px;height:98px;border:1px solid #000;background:#444;margin:2px auto">'+r.ROWS[i].urls+'</div>'+r.ROWS[i].title+'</a>'
			}
		if (list)
			o.innerHTML = info+list+info
		else
			o.innerHTML = '没有图片'
		return true

	},
	function(){
		o.innerHTML = '读取错误'
	},
	'gbk'
	);
}//fe


/**
 *代码帮助专用对话框 
 */
postfunc.dialog = {
createWindow : function (id){
if (this.w)return
this.w = commonui.createCommmonWindow()
document.body.appendChild(this.w);
this.w.id = id;
this.w.style.width = 'auto';
},

returnVal:function(o)
{
var rr = []
var r = o.getElementsByTagName('input')
for (var i=0;i<r.length;i++)
	rr[r[i].name] = r[i].value

r = o.getElementsByTagName('select')
for (var i=0;i<r.length;i++)
	rr[r[i].name] = r[i].options[r[i].selectedIndex].value

r = o.getElementsByTagName('textarea')
for (var i=0;i<r.length;i++)
	rr[r[i].name] = r[i].value

if (this.func){
	rr = this.func(rr)
	if (rr===false)
		return;
	}
return rr
},

genDialog:function(a){
//var a = window.dialogArguments
if (typeof(a) == 'string'){
	a = {0:a}
	this.func = function (v){
		return v[0]
		}//fe
	}

var c = _$('<div/>')
for (var k in a)
	{
	if(isNaN(parseInt(k)))continue;
	if (typeof(a[k]) == 'string'){
		c._.aC( _$('<span/>')._.attr('innerHTML',a[k].replace(/(<select|<input|<textarea)/i,function($0,$1){return $1+' name="'+k+'"'}) ,1) )._.aC(_$('<br/>'))._.aC(_$('<br/>'))
		}
	else if (typeof(a[k]) == 'object')
		{
		c._.aC( _$('<b>'+a[k].hint+'</b>') )._.aC( _$('<br/>') )
		if(a[k].opts){
			var y = _$('<select/>')._.attr('name',k)
			for (var kk in a[k].opts){
				if(typeof(a[k].opts[kk])!='object')continue
				y._.aC( _$('<option/>')._.attr('innerHTML',a[k].opts[kk][0],1)._.attr('value',a[k].opts[kk][1]) )
				}
			}
		else if(a[k].cols)
			var y = _$('<textarea/>')._.attr('name',k)._.attr('cols',a[k].cols)._.attr('rows',a[k].rows)
		else
			var y = _$('<input/>')._.attr('name',k)._.attr('type','text')
		c._.aC( y )._.aC( _$('<br/>') )._.aC( _$('<br/>') )
		}
	else if (typeof(a[k]) == 'function')
		this.func = a[k]
	}
this.arg = a
return c
}//fe
}//ce




/**
 *文件上传使用到的变量
postfunc.fileSelector=null //文件选择input
postfunc.waitAttachList =null //等待上传的文件信息容器
postfunc.attachList=null //已经上传的文件信息容器
postfunc.album=null //相册信息容器
postfunc.attachBtn
postfunc.albumImgCount=null//相册计数
 */


/**
 *绘制上传文件表单

postfunc.fileUpload=function(p,url){
var $ = _$, f = this.attachForm
p.innerHTML=''
this.ifMultiple= (window.XMLHttpRequest!==undefined && ('withCredentials' in new XMLHttpRequest()) && window.FormData !== undefined) ? true : false
this.o_attachList = $('/span').$0('id','uploadedattach')
this.o_waitAttachList = $('/span').$0('id','waituploadattach')
this.fileSelector = this.attachNewFileSelect()
this.o_attachForm = $('/form').$0('method','post','id','attachform','target','upload_iframe','name','attachform','action',url,'encoding','multipart/form-data','enctype','multipart/form-data','style',{clear:'both'})
this.attachBtn = $('/button').$0('type','button','innerHTML','上传','onclick',function(){this.disabled=true;postfunc.attachUpload()} )
this.uploadedAttach=[]

$(p)._.add(
	this.o_attachList,
	this.o_attachForm,
	this.o_waitAttachList,
	$('/div').$0('style',{clear:'both'}),
	this.fileSelector,
	this.o_attachBtn,
	this.ifMultiple ? ' (可以一次选择多个附件)' : null
	)
}//fe
*/

/**
 *选择上传文件callback
 */
postfunc.attachNewFileSelect=function(){
var x =	_$('/input').$0('type','file', 'name','attachment_file1', 'onchange',function(){
	var $=_$,p = postfunc.o_waitAttachList
	if(!p.__xooxoxx){
		p.parentNode.insertBefore($('/div').$0('innerHTML','待上传的附件','style',{clear:'both'}) ,p)
		p.__xooxoxx = true
		}
	p.innerHTML=''

	if(this.files){//多选文件时
		var fs = this.files
		if(!fs.length)return
		for(var i =0; i<fs.length; i++)
			p.insertBefore(postfunc.attachNewFile(fs[i]),p.firstChild)
		}
	else{//单选文件时
		if(!this.value)return
		var f = this.value.match(/[^\/\\]+$/)
		var fo = {name:f[0],__noimg:true}
		f=f[0].split('.')[1]
		if(f=='jpg' || f=='jpeg' || f=='gif' || f=='png')
			fo.type='image/'+f
		p.insertBefore(postfunc.attachNewFile(fo),p.firstChild)
		}


	} )//fe
if(this.ifMultiple)
	x.multiple=1
return x
}//fe

/**
 *上传一个待上传的附件
 * 老式方法 将<input type=file>移进表单 只在单选文件时用
 */
postfunc.attachUploadSingle=function(){
var $=_$, f = $(this.o_attachForm), z = this.o_waitAttachList.firstChild, x = this.attachNewFileSelect()
this.o_fileSelector.parentNode.replaceChild(x,this.o_fileSelector)
this.o_fileSelector.style.display='none'
f._.add(
	z,
	$('/input').$0('name','attachment_file1_url_utf8_name','type','hidden','value',encodeURIComponent(z.__file.name.replace(/([^\/\\]+)$/,'$1'))),
	$('/input').$0('name','func','type','hidden','value','upload'),
	$('/input').$0('name','v2','type','hidden','value','1'),
	$('/input').$0('name','auth','type','hidden','value',this.currentAuth),
	$('/input').$0('name','fid','type','hidden','value',this.currentFid),
	this.o_fileSelector
	)
this.o_fileSelector = x
f.submit()
this.o_attachBtn.disabled=null
}

/**
 *上传一个待上传的附件
 * 新式方法 在多选文件时用 将<input type=file>中多个文件中的一个通过XHR上传
 */
postfunc.attachUpload=function(){
var f = this.o_attachForm
f.innerHTML=''
var z = this.o_waitAttachList.firstChild
if(!z){
	this.o_attachBtn.disabled=null
	return
	}
if(!this.ifMultiple)//单选文件用老方法
	return postfunc.attachUploadSingle();


//获取当前页面编码
if(typeof this.attachUpload.mt!='string' && this.attachUpload.mt!==false){
	var mt = document.getElementsByTagName('head')[0].getElementsByTagName('meta')
	for(var i=0;i<mt.length;i++){
		if(mt[i].httpEquiv=="Content-Type"){
			mt = mt[i].content.match(/charset\s*=\s*(.+?)\s*(?:;|$)/)
			this.attachUpload.mt = mt ? mt[1].toLowerCase() : false
			break
			}
		}
	}
if(this.attachUpload.mt && this.attachUpload.mt!='utf-8'){//如果页面编码不是utf8
	var dd = z.getElementsByTagName('input')
	for(var i = 0;i<dd.length;i++){
		if(dd[i].name=='attachment_file1_dscp' && dd[i].value){//如果有写文件说明则用服务器生成说明文字的rawurlencode以保持编码不转为utf8
			var dd = dd[i]
			break;
			}
		}
	if(dd.value){
		__NUKE.doRequest({u:__API.phpRawurlencode(dd.value),
			f:function(d){
				d = d.data[0]
				dd.value = d? d:'';
				dd.name='attachment_file1_dscp_phprawurlencode'
				postfunc.attachUpload()//改值和名后重新提交
				}
			})
		return;//返回重来
		}
	}

f.appendChild(z)
var x = new FormData(f), self=this
x.append('attachment_file1_url_utf8_name',encodeURIComponent(z.__file.name.replace(/([^\/\\]+)$/,'$1')))
x.append('func','upload')
x.append('v2','1')
x.append('origin_domain',window.location.hostname )
x.append('lite','js')
x.append('auth',this.currentAuth)
x.append('fid',this.currentFid)
x.append('attachment_file1',z.__file)
var xhr =  new XMLHttpRequest()//new XDomainRequest()
xhr.onload = function(e) {
	var xhr = e.target
	self.o_attachBtn.innerHTML = self.o_attachBtn.innerHTML.substr(0,2)
	if (xhr.readyState !== 4 && xhr.status !== 200){
		self.o_attachBtn.disabled=null
		return alert('request error')
		}
	eval( xhr.responseText)
	var y = window.script_muti_get_var_store
	if(y.error){
		self.o_attachBtn.disabled=null
		return alert(y.error)
		}
	postfunc.add1Attach(y.data.attachments, y.data.attachments_check, y.data.url,  y.data.isImg,  y.data.thumb)
	}
if(xhr.upload)
	xhr.upload.onprogress = function(e){
		if (e.lengthComputable)
			self.o_attachBtn.innerHTML = self.o_attachBtn.innerHTML.substr(0,2) + ' ' + Math.round(e.loaded * 100 / e.total).toString() + '% ('+(self.o_waitAttachList.childNodes.length+1)+')';
		}
xhr.open("POST", f.action); // Boooom!	
xhr.withCredentials=true //must after open
xhr.send(x);
 
}//fe


/**
 *生成一个空附件dom obj
 *isimg 是否是图片
 *return {__imgC:缩略图dom容器, __infoC:信息dom容器}
 */
postfunc.attachFileC = function(isimg){
var $=_$,z = $('/table')._.cls('c1')._.css({'float':'left',margin:'0 0.416em 0.416em 0'})._.add(
	$('/tbody')._.add(
		$('/tr')._.add(
			isimg ? $('/td') :null,
			$('/td')				
			)
		)
	)
if(isimg)
	z.__imgC = z.firstChild.firstChild.firstChild
z.__infoC = z.firstChild.firstChild.lastChild
return z
}


/**
 *生成一个待上传附件dom obj
 *fileO <input type=file>的files中的一个文件object 或 一个虚假的文件object(包含name type __fake 三个属性)
 */
postfunc.attachNewFile = function(fileO){
var $=_$
if(fileO.type.indexOf('image/')===0){
	var wm = fileO.type.match(/\/jpe?g/) ? true : false, z = this.attachFileC(true)
	
	if(!fileO.__fake &&  window.FileReader){
		var tmpImg = $("/img")._.css({'float':'left',border:'0.25em solid #551200',visibility:'hidden'})
		tmpImg.__r = new FileReader()
		tmpImg.__r.__p = tmpImg
		tmpImg.__r.onload = function(e) {this.__p.src = e.target.result}
		tmpImg.onload = function(){this.onload=null;commonui.resizeImg(this,160,90),this.style.visibility=''}
		tmpImg.__r.readAsDataURL(fileO);
		z.__imgC._.add(tmpImg)
		}
	
	z.__infoC._.add(
		fileO.name+' '+'('+fileO.type+')',
		$('/br'),
		wm ? $('/select').$0('name','attachment_file1_watermark',
			$('/option').$0('value','br','innerHTML','右下水印'),
			$('/option').$0('value','bl','innerHTML','左下水印'),
			$('/option').$0('value','tl','innerHTML','左上水印'),
			$('/option').$0('value','tr','innerHTML','右上水印'),
			$('/option').$0('value','','innerHTML','无水印')
			) : null,
		wm ? $('/br') : null,
		$('/input').$0('name','attachment_file1_dscp', 'type','text', 'onfocus',function(){this.nextSibling.style.display='none'}),
		$('/span').$0('innerHTML','附件说明','className','silver', 'style',{marginLeft:'-5em',marginRight:'1em'}),
		$('/input').$0('name','attachment_file1_img','type','hidden','value',1)
		)
	}
else{
	var z = this.attachFileC()
	z.__infoC._.add(
		fileO.name+' '+'('+fileO.type+')',
		$('/br'),
		$('/input').$0('name','attachment_file1_dscp','type','text', 'onfocus',function(){this.nextSibling.style.display='none'}),
		$('/span').$0('innerHTML','附件说明','className','silver', 'style',{marginLeft:'-5em',marginRight:'1em'})
		)

	}
z.__fileName = fileO.name
z.__file = fileO
return z
}


/**
 * 增加一个已上传的附件 或 附件上传成功callback
 * attach 附件信息
 * checkSum 附件信息校验
 * 有以上两个参数时为 附件上传成功callback
 * 
 * url 附件的地址
 * isimg 附件是否是图片
 * thumb 附件是否有缩略图 3小 2中小 1大中小 0无
 */
postfunc.add1Attach=function (attach,checkSum,url,isimg,thumb,utf8oname){

if(!this.o_attachList.firstChild)
	this.o_attachList.parentNode.insertBefore( _$('/div').$0('innerHTML','已有附件','style',{clear:'both'}), this.o_attachList)


var z= this.o_attachForm.firstChild

if(isimg)
	thumb = this.add1Attach.getDispThumb(thumb)

if(!z){
	z = this.attachFileC(isimg ? true :false)
	if(isimg){
		z.__imgC._.add(
			_$('/img').$0('src',commonui.getAttachBase(url)+'/'+url+thumb.def,'style',{'float':'left',border:'0.25em solid #551200'})
			)
		}
	}

z.__infoC.innerHTML=''
if(isimg){
	if(z.__fileName)
		z.__infoC.innerHTML += z.__fileName+'<br/>'
	for(var i = 0;i<thumb.length;i++)
		z.__infoC.innerHTML+=this.add1Attach.sub(thumb[i][1],url+thumb[i][0])
	z.__infoC.innerHTML+=this.add1Attach.sub('全图',url)
	
	//图片超过5个显示使用相册的提示
	if(!this.album)this.album=_$('<div>在有大量图片的时候建议使用相册<span class="silver">([album])</span><br/><span class="orange">[album=查看全部附件][/album]</span><br/><br/></div>')
	this.album.innerHTML=this.album.innerHTML.replace('[/album]','<br/>./'+url+'[/album]')
	this.albumImgCount++
	if(this.albumImgCount==5)
		this.o_attachList.parentNode.insertBefore(this.album,this.o_attachList)
	}
else{
	if(z.__fileName)
		z.__infoC.innerHTML += z.__fileName+'<br/>'
	if(!utf8oname && typeof(attach)=='string')
		var utf8oname = __NUKE.scDe(attach).url_utf8_org_name
		
	z.__infoC.innerHTML='<span class=gray>文件</span> <span class=orange>[attach]./'+url+(utf8oname?'?filename='+utf8oname:'')+'[/attach]</span>'

	}

this.o_attachList.appendChild(z)

this.uploadedAttach.push({0:url,1:isimg})

if (!attach || !checkSum)return

this.o_attach.value+=attach+'\t';//tab 分隔多个附件信息
this.o_attachChk.value+=checkSum+'\t';

window.setTimeout(function(){postfunc.attachUpload()},200)
}//fe

postfunc.add1Attach.sub=function(t,u){return '<button class=gray type=button onclick="postfunc.addText(this.nextSibling.innerHTML.substr(1))" title="点击在光标的位置插入图片">'+t+'</button><span class="orange xtxt en_font"> [img]./'+u+'[/img]</span><br/>'}//fe

postfunc.add1Attach.getDispThumb = function(thumb){
var t = [],thumb = parseInt(thumb,10)
t.def = '';
if(!thumb)
	return t
if(thumb & 64)
	t.def = '.medium.jpg', t.push(['.medium.jpg','缩略图640x?']);
if((thumb & 32) || thumb==1)
	t.def = '.thumb.jpg', t.push(['.thumb.jpg','缩略图320x240']);
if((thumb & 16) || thumb==2)
	t.def = '.thumb_s.jpg', t.push(['.thumb_s.jpg','缩略图130x97']);
if((thumb & 8) || thumb==3)
	t.push(['.thumb_ss.jpg','缩略图60x45']);

return t;

}//fe

/**
* 生成发帖输入窗口
* @param mode (str) 新帖new 回复reply 引用quote 修改modify
* @param fid (int) 发帖的版面id
* @param tid (int) 回复或引用的主题id
* @param pid (int) 回复或引用的回复id
* @param stid (int)
* @param fbit (int) 版面的bit位
* @param bit (int) 帖子的bit位 仅编辑时有效
* @param title (str) 帖子的主题内容 仅编辑时有效
* @param content (str) 帖子的内容 仅编辑或引用或回复时有效
* @param attach (obj)  帖子的附件  仅编辑时有效
*/
postfunc.genForm = function(mode,fid,tid,pid,stid,fbit,bit,subject,content,attach,auth,modifyAppend,if_mod){
var self=this,
_GP = __GP,
$ = _$,
t =function(x){return window.document.createTextNode(x)}, 
i=1, 
s = function(y,o,f,i){
	var x = $('/select').$0('onchange',function(){if(this.options[this.selectedIndex].value)f.call(this); this.selectedIndex=0},$('/option').$0('value','','innerHTML','默认'),'style',{width:'5em',marginRight:'1em'})
	for(var k in o)
		x._.add(
			$('/option').$0('value',k,'innerHTML', o[k]?o[k]:'' , 'style', o[k] ? {} :{backgroundColor:k} )
			)
	return $('/span').$0(t(y+' '), x )
	},
ss = function(){
	return $('button')
	}

//备份内容
content = ubbcode.unSecureText(content).replace(/\s*$/,'')
subject = ubbcode.unSecureText(subject)
this.contentBak = content
this.titleBak = subject

//初始化变量
this.currentAuth = auth
this.currentFid = fid
this.o_subject//标题
this.o_content//内容
this.o_selfReply = {}//只有作者和版主可回复
this.o_hidden//隐藏帖子
this.o_vote = {}//投票内容
this.o_voteType = {}// 0投票 1投注铜币
this.o_voteMax = {}//每人最多可投 0不限
this.o_voteEnd = {}//小时后结束
this.o_attach
this.o_attachChk
this.o_voteBetMin = {}//投注最大值
this.o_voteBetMax = {}//投注最小值
this.o_pvwindow
this.o_anony={}

this.o_attachBtn
this.o_attachList
this.o_waitAttachList
this.o_attachForm
this.o_fileSelector
this.album
this.albumImgCount=0
this.ifMultiple
this.uploadedAttach=[]
this.o_setTopic={}
this.o_liveTopic={}
this.o_replyAnony={}

var f_post = function(ob){
			commonui.newPost(
				ob,
				mode,//操作
				fbit,//版面bit type
				fid,//版面id
				tid,//主题id
				pid,//回复id
				mode==self.__NEW ? (self.o_setTopic.checked ? -1 : stid ) : null,//o_setTopic
				self.o_subject.value,//标题
				self.o_content.value,//内容
				self.o_hidden.checked ? 1 : 0,//隐藏帖子 仅版主可见
				self.o_selfReply.checked ? 1 : 0,//只有作者和版主可回复
				self.o_attach.value,//附件
				self.o_attachChk.value,//附件校验
				self.o_vote.value,//投票内容
				self.o_voteType.value,// 0投票 1投注铜币
				self.o_voteMax.value,//每人最多可投 0不限
				self.o_voteEnd.value,//小时后结束
				self.o_voteBetMax.value,//投注最大值
				self.o_voteBetMin.value,//投注最小值
				self.o_modifyAppend ? self.o_modifyAppend.value : null,
				null,//self.o_comment ? (self.o_comment.checked ? 1 :0) : null
				self.o_anony.checked ? 1 : 0,//匿名
				self.o_liveTopic.checked ? 1 : 0,//live
				self.o_replyAnony.checked ? 1 : 0//匿名huifu
				)
			}

var o_main = $('/span').$0(
	
	$('/table').$0(
		'className','forumbox',
		'cellspacing',1,
		'cellSpacing',1,
		'style',{borderWidth:'0',background:'#fff'},

		//$('/caption').$0(
		//	$('/h2').$0(t(':: 发布/编辑 ::'))
		//	),
			
		//$('/thead').$0(
		//	$('/tr').$0(
		//		$('/td').$0(t('&nbsp; &nbsp;'))
		//		)
		//	),		
		this.o_attach = $('/input').$0('name','attachments','type','hidden','id','attachments','value',''),
		this.o_attachChk = $('/input').$0('name','attachments_check','type','hidden','id','attachments_check','value',''),
		$('/tbody').$0(

			$('/tr').$0(
				'className','row'+(((i++)&1)+1),
				$('/td').$0(
					'className','c2',

					this.o_subject = $('/input').$0(
						'classNmae','title',
						'maxLength','100',
						'name','post_subject',
						'id','post_subject',
						'title','标题',
						'style',{width:'65%',marginRight:'0.5em'},
						'value',subject
						),
					
					mode==this.__NEW || mode==this.__MODIFY ? $('/span').$0(
						'name','tk',
						commonui.createTopicKeySelector(fid,function(k){self.o_subject.value = k+' '+self.o_subject.value})
						) : null,
					
					commonui.prePostHintAfterSubject ? commonui.prePostHintAfterSubject(mode, fid, tid, pid, stid) : null
					
					)//td
				),//tr__SETTING.bit & 4
					
			$('/tr').$0('className','row'+(((i++)&1)+1),
				$('/td').$0('className','c2',
					this.codeHelp()
					)
				),//tr

			$('/tr').$0('className','row'+(((i++)&1)+1),
				$('/td').$0('className','c2',
					s('字体',ubbcode.fonts,function(){self.addTag('font',this.value)}),
					s('字号',ubbcode.fontSize,function(){self.addTag('size',this.value)}),
					s('颜色',ubbcode.fontColor,function(){self.addTag('color',this.value)}),
					t(' '),
					$('/button').$0('innerHTML','<b>B</b>','title','粗体','type','button','onclick',function(){self.addTag("b")}),
					t(' '),
					$('/button').$0('innerHTML','<u>U</u>','title','下横线','type','button','onclick',function(){self.addTag("u")}),
					t(' '),
					$('/button').$0('innerHTML','<span style="font-style:italic"> I </span>','title','斜体','type','button','onclick',function(){self.addTag("i")}),
					t(' '),
					$('/button').$0('innerHTML','<del class="gray">DEL</del>','title','删除线','type','button','onclick',function(){self.addTag("del")}),
					t(' '),
					$('/button').$0('innerHTML','<b>&#8220;</b>','title','引用','type','button','onclick',function(){self.addTag("quote")}),
					t(' '),
					$('/button').$0('innerHTML','<b>&#8212;</b>','title','分隔线','type','button','onclick',function(){self.addText("======")}),
					t(' '),
					$('/button').$0('innerHTML','<b>H</b>','title','段落标题','type','button','onclick',function(){self.addText("==="+self.getSelectText()+"===")}),
					t(' '),
					$('/button').$0('style',{paddingLeft:0,paddingRight:0},'title','引用图片','type','button','onclick',function(e){self.uiAddTag(e,11)},
						'innerHTML','&nbsp;<img src="'+__IMG_STYLE+'/txt_pic.png"/>&nbsp;'
						),
					t(' '),
					$('/button').$0('style',{paddingLeft:0,paddingRight:0},'title','插入超链接','type','button','onclick',function(e){self.uiAddTag(e,13)},
						'innerHTML','&nbsp;<img src="'+__IMG_STYLE+'/txt_url.png"/>&nbsp;'
						),
					t(' '),
					$('/button').$0('style',{paddingLeft:0,paddingRight:0},'title','插入表情','type','button','onclick',function(e){
							var o = ubbcode.smiles
							self.dialog.createWindow('uiAddTag')
							self.dialog.w.style.display='none'
							self.dialog.w._.addContent(null)
							self.dialog.w._.addTitle('插入表情')
							for(var k in o)
								self.dialog.w._.addContent(
									$('/button').$0('innerHTML',ubbcode.smilesN[k], 'name', k , 'onclick' ,function(){
										var oo = ubbcode.smiles[this.name],
											x=this.nextSibling,
											i = __IMGPATH,
											p = this.name==0?'':this.name+':'
										if(x.firstChild)return
										for(var j in oo){
											x._.add(
												$('/img').$0('src',i+'/post/smile/'+oo[j],'name',j,'onclick',function(){self.dialog.w._.hide();self.addText("[s:"+p+this.name+"]")}),
												' '
												)
											}
										}),
									$('/div')
									)
							self.dialog.w._.show(e)
							},
						'innerHTML','&nbsp;<img src="'+__IMG_STYLE+'/txt_smile.png"/>&nbsp;'
						)
					)
				),//tr

			$('/tr').$0('className','row'+(((i++)&1)+1),
				$('/td').$0('className','c2',
					this.o_hidden = $('/input').$0('name','hidden','type','checkbox','value',1,'checked',(bit & this.postBit._POST_IF_HIDDEN) ? 1 : ''),
					t('隐藏内容 仅版主可见 '),
					mode==this.__NEW ? this.o_selfReply = $('/input').$0('name','self_reply','type','checkbox','value',1,'checked',(bit & this.postBit._POST_IF_SELF_REPLY) ? 1 : '') : null,
					mode==this.__NEW ? t('只有作者和版主可回复 ') : null,
					mode==this.__NEW && _GP.lesser ? this.o_setTopic = $('/input').$0('type','checkbox','checked',(bit & this.postBit._POST_IF_SET) ? 1 : '') : null,
					mode==this.__NEW && _GP.lesser ? $('/span').$0('innerHTML','集合主题(alpha) ','title','集合主题如同一个版面 用户可在其下发布子主题 发布集合主题会扣除5金币 版主免费') : null,
					
					mode==this.__NEW && _GP.lesser ? $('/span').$0('title','发布一个直播 可在直播系统中更新内容 (直播系统所有用户均可访问)')._.add(this.o_liveTopic = $('/input').$0('type','checkbox'), '发布直播(alpha) ') : null,
					mode!=this.__MODIFY ? this.o_anony = $('/input').$0('type','checkbox','checked','','onclick',function(){if(this.checked)alert('匿名发布主题需要5000铜币\n\n匿名发布回复需要100铜币\n\n匿名发布的内容如果违反版规将会加重处罚\n\n因为很重要所以再说一次，加 重 处 罚')}) : null,
					mode!=this.__MODIFY ? $('/span').$0('innerHTML','匿名发帖 ','title','匿名发帖，将不显示发帖人的任何信息') : null,

					mode==this.__NEW && if_mod ? $('/span').$0('title','此主题所有的回复自动匿名')._.add(this.o_replyAnony= $('/input').$0('type','checkbox'), '回复自动匿名 ') : null,
					/*
					((mode==this.__REPLY || mode==this.__QUOTE) && _GP.admin) ? 
						$('/span')._.add(
							this.o_comment = $('/input').$0('name','comment','type','checkbox','value',1,'checked',comment? 1 : ''),
							'发布评论/贴条(alpha) '
							)
						 : null,
						 */
					$('/button').$0('innerHTML','预览','title','','type','button','onclick',function(){self.preview()}),
					t(' '),
					$('/button').$0('innerHTML','长度','title','查看帖子长度','type','button','onclick',function(){window.alert('您的信息已经有 '+self.o_content.value.length+' 字节');})
					)
				),//tr
					
			$('/tr').$0('className','row'+(((i++)&1)+1),
				$('/td').$0('className','c2',
					modifyAppend ? t('帖子超过修改时限，在此提交的内容将被增加至原帖') : null,
					modifyAppend ? this.o_modifyAppend = $('/select').$0(
						$('/option').$0('value','1','innerHTML', '末尾'),
						$('/option').$0('value','2','innerHTML', '开头')
						) :null,
					modifyAppend ? t('，如需修改原帖请联系版主') :null,
					this.o_content = $('/textarea').$0(
						'name','post_content',
						'style',{width:'98%',height:'25em',lineHeight:'1.538em'},
						'value',content,
						'onmouseup',function (){
							if(document.selection)
								self._selection = document.selection.createRange().duplicate();
							},//fe
						'onkeyup',function (e){
							this.focus()
							self.inputchar(e,this)
							this.focus()
							if(document.selection)
								self._selection = document.selection.createRange().duplicate();
							},//fe
						'onkeydown',function (e){
							if(e.ctrlKey && e.keyCode == 13)f_post(null)
							}//fe
						)
					)
				),//tr
					
			_GP.vote && mode==this.__NEW ? $('/tr').$0('className','row'+(((i++)&1)+1),
				$('/td').$0('className','c2',
					this.o_voteType = $('/select').$0(
						'name','newvote_type',
						$('/option').$0('value','','innerHTML','投票'),
						_GP.voteBet ? $('/option').$0('value','1','innerHTML','投注铜币') : null
						),
					t(' 每行一个，提交后不能修改，不需投票请留空  每人最多可投'),
					this.o_voteMax = $('/input').$0('name','newvote_max','size','3','value',1),
					t(' 项  于'),
					this.o_voteEnd = $('/input').$0('name','newvote_end','size','3','value','不限'),
					t('小时后结束'),
					_GP.voteBet ? t('  投注最小值') : null,
					_GP.voteBet ? this.o_voteBetMin = $('/input').$0('name','newvote_betmin','size','3','value','') : null,
					_GP.voteBet ? t('  投注最大值') : null,
					_GP.voteBet ? this.o_voteBetMax = $('/input').$0('name','newvote_betmax','size','3','value','') : null,
					this.o_vote = $('/textarea').$0('name','newvote','style',{width:'98%',height:'6em',lineHeight:'1.538em'},'value','')
					)
				) : null,//tr

			$('/tr').$0('className','row'+(((i++)&1)+1),
				$('/td').$0('className','c2',
					t('引用'),
					$('/a').$0('className','b','href','http://i.178.com/?_app=album&_controller=category&_action=view_list&uid='+__CURRENT_UID,'target','_blank','innerHTML','个人空间相册'),
					t('中的图片 '),
					$('/a').$0('className','b','href','javascript:void(0)','innerHTML','打开我的相册列表','onclick',function(){self.listAlbum(this.nextSibling.nextSibling.nextSibling)}),
					$('/span').$0('innerHTML', ' '),
					$('/a').$0('className','b','href','http://i.178.com/~album.photo.send_batch_form/cid/0/uid/'+__CURRENT_UID,'target','_blank','innerHTML','批量上传到相册'),
					$('/div')
					)
				)//tr
			)//tbody

		)
	)

//-----------------------------------------------------
var o_ath = $('/table').$0(
	'className','forumbox',
	'cellspacing',1,
	'cellSpacing',1,
	'style',{borderWidth:'0',background:'#fff',marginTop:'-2px'},
	
	$('/tbody').$0(
		$('/tr').$0('className','row'+(((i++)&1)+1),
			
			$('/td').$0('className','c2','id','attachformC',
			
				this.o_attachList = $('/span').$0('id','uploadedattach'),
				this.o_attachForm = $('/form').$0(
					'method','post',
					'id','attachform',
					'target','upload_iframe',
					'name','attachform',
					'action',__ATTACH_BASE+'/attach.php?',
					'encoding','multipart/form-data',
					'enctype','multipart/form-data',
					'style',{clear:'both'}),
				this.o_waitAttachList =  $('/span').$0('id','waituploadattach'),
				$('/div').$0('style',{clear:'both'}),
				this.o_fileSelector = this.attachNewFileSelect(),
				this.o_attachBtn = $('/button').$0(
					'type','button',
					'innerHTML','上传',
					'onclick',function(){this.disabled=true;postfunc.attachUpload()} ),
				this.ifMultiple ? t(' (可以一次选择多个附件)') : null,
				$('<iframe name="upload_iframe"></iframe>').$0('name','upload_iframe','id','upload_iframe', 'style',{display:'none'})
				)
			)
		)
	
	)
//console.log(attach)
if(attach){
	for(var j in attach){
		var tmp = attach[j]
		this.add1Attach(null,null,tmp.attachurl, tmp.type=='img'?1:0, tmp.thumb,tmp.url_utf8_org_name)
		}
	} 
//-----------------------------------------------------


var o_btn = commonui.stdBtns()

o_btn._.__add(
	$('/a').$0(
	'innerHTML','<span style="font-size:1.23em">提 交(Ctrl+Enter)</span>',
	'href','javascript:void(0)',
	'className','uitxt1',
	'onclick',function(){
			f_post(this)
			}
		)
	)

if (commonui.userCache)
	o_btn._.__add(
		_$('/a').$0(
			'innerHTML','恢复上次输入的内容',
			'href','javascript:void(0)',
			'onclick',function(e){var t = commonui.userCache.get("bbsPostBackup")
				if(t)
					postfunc.o_content.value+=t
				else
					alert('找不到保存的内容')}
			)
		)

o_btn._.css('margin','1em auto auto auto')
if(o_btn._.__vml)
	var tmp = $('/img').$0('src','about:blank','style',{display:'none'},'onerror',function(){o_btn._.__vml(2)})
else
	var tmp = null
//-----------------------------------------------------
//
//兼容
/*
this.title = this.o_subject
this.content = this.o_content
this.attachBtn = this.o_attachBtn
this.attachList = this.o_attachList
this.attachForm = this.o_attachForm
this.waitAttachList = this.o_waitAttachList
this.fileSelector = this.o_fileSelector

this.form = {
	elements:{
		namedItem:function(x){
			switch(x){
				case 'fid':
					return {value:fid}
				case 'attachments':
					return self.o_attach
				case 'attachments_check':
					return self.o_attachChk
				}
			}
		}
	}
*/
//-----------------------------------------------------
return $('/span').$0(

			o_main,o_ath,o_btn,$('/br'),tmp

			)


}

/**
 *发帖预览
 */
postfunc.preview = function(){
if(!this.o_pvwindow)
	this.o_pvwindow = commonui.createCommmonWindow()
var w=window, $=_$,pc = $('/div').$0('className','postcontent ubbcode','innerHTML',
	this.o_content.value.replace(/\n/g,'<br/>').replace(/\r/g,'')
	)
this.o_pvwindow._.addContent(null)
this.o_pvwindow._.addTitle('发帖预览')
this.o_pvwindow._.addContent(			
			$('/div').$0('className','fastViewPost',
				$('/div').$0('className','forumbox',
					$('/div').$0('className','postrow',
						$('/div').$0('className','c2',
							pc
							)
						)
					)
				)
			)
ubbcode.bbsCode({c:pc,
	tId:Math.floor(Math.random*10000),
	pId:Math.floor(Math.random*10000),
	authorId:w.__CURRENT_UID,
	noImg:0,
	rvrc:w.__GP.rvrc,
	isLesser:w.__GP.lesser,
	callBack:function(){postfunc.o_pvwindow._.show()}
	});
}

/**
 * 打开发帖窗口
* @param e (event)
* @param mode (str) 新帖new 回复reply 引用quote 修改modify
* @param fid (int) 当前版面 不用则设''
* @param tid (int) 回复或引用的主题id 不用则设''
* @param pid (int) 回复或引用的回复id 不用则设''
* @param stid (int) 
* @param fids (obj) 多版面检测 勿设置此参数
*/
commonui.openPostWindow = function(e,mode,fid,tid,pid,stid,sfid,pcontent){
var self = this, p = postfunc
if(!commonui.quoteTo)
	loader.script(__SCRIPTS.quoteTo)
/*
if(!sfid && (mode==p.__NEW && !stid)){
	sfid=commonui.selectForum.getCurrent(fid)
	if(!sfid){
		commonui.selectForum.selectWindow(e,fid,
			function(sf,name){
				commonui.openPostWindow(e,mode,sf,tid,pid,stid,sf,name)
				}
			)
		return
		}
	}
*/
var ift=function(x){
	if((typeof x=='string' || typeof x=='number') && x!=='')
		return true
	}

if(!p.pwindow){
	p.pwindow = commonui.createCommmonWindow()
	var o = p.pwindow._.__c.parentNode
	o.style.padding=o.style.margin=0
	/*
	p.pwindow._.show=function (x,y,z){
		var o = this.__c.parentNode
		o.style.padding=o.style.margin=0
		var o = this.self
		o.style.overflow = 'auto'
		o.style.border=0
		var p = __NUKE.position.get()
		document.body.style.width=p.cw+'px'
		document.body.style.height=p.ch+'px'
		document.body.style.overflow='hidden'
		if(!o.parentNode || o.parentNode.nodeType!=1)
			document.body.appendChild(o)
		__NUKE.position.setPos(o,x,y,4)
		return o
		};//fe
	p.pwindow._.hide=function (){
		document.body.style.overflow=''
		document.body.style.width=''
		document.body.style.height=''
		this.self.style.display='none';
		return this.self
		};//fe
	*/
	}
if(mode== p.__REPLY_BLANK)
	mode= p.__REPLY
return __NUKE.doRequest({
	u:__API.postGet(tid,pid,mode,fid,stid),
	f:function(d){
		var e = __NUKE.doRequestIfErr(d)
		if(e)
			return alert(e)
		if(d.data.__MESSAGE)
			return alert(d.data.__MESSAGE[1])
		var d= d.data, til=''

		if(d.subject)
			til = d.subject
		else if(d.__ST)
			til = d.__ST.subject

		if(mode==p.__MODIFY)
			til = '编辑 '+til
		else if(mode==p.__QUOTE)
			til = '引用回复 '+til
		else if(mode==p.__REPLY)
			til = '回复 '+til
		else
			til = '在 '+(til?til:d.__F.name)+' 发新主题'

		var d = postfunc.genForm(//mode,fid,tid,pid,stid,fbit,bit,subject,content,attach
			mode,d.fid,d.tid,d.pid,d.__ST? d.__ST.tid :null,
			__NUKE.toInt(d.__F.bit_data),
			__NUKE.toInt(d.type),
			ift(d.subject) ? d.subject.toString() : '' ,
			ift(pcontent) ? pcontent.toString() : ( ift(d.content) ? d.content.toString() : '' ),
			d.attachs?d.attachs:null,
			d.auth,
			d.modify_append,
			d.if_moderator
			)
		if(__SETTING.uA[0]==1 && __SETTING.uA[1]<=6 && $('fastposttopickeyselector'))
			$('fastposttopickeyselector').style.display='none'
		p.pwindow._.addContent(null)
		p.pwindow._.addTitle(til)
		p.pwindow._.addContent(d)
		p.pwindow._.show(null,null,2)
		}
	})
}

/**
 *打开代码帮助
 *@param e (event
 *@param hid (int 帮助id 见postfunc.hintTable
 */
postfunc.uiAddTag = function(e,hid){
if (!this.hintTable[hid])
	return
var a,c,f
var self = this
this.dialog.createWindow('uiAddTag')
this.dialog.w.style.display='none'
this.dialog.w._.addTitle('BBCODE帮助')
this.dialog.w._.addContent(null)
c = _$('<button>  关闭  </button>')._.attr('type','button')._.on('focus',function(){this.blur()})._.on('click',function(){self.dialog.w.style.display='none'})

if(this.hintTable[hid][0]){
	f = this.dialog.genDialog(this.hintTable[hid])
	a = _$('<button>  添加  </button>')._.attr('type','button')._.on('focus',function(){this.blur()})._.on('click',function(){self.addText(self.dialog.returnVal(this.parentNode));self.dialog.w.style.display='none'})
	f = _$('<table/>')._.aC(
		_$('<tbody/>')._.aC(
			_$('<tr/>')._.aC(
				_$('<td/>')._.cls('ubbcode')._.css('verticalAlign','top')._.attr('innerHTML','<div class=quote>'+this.hintTable[hid].txt+'</div>',true)
				)._.aC(
				_$('<td/>')._.aC(f)._.css('verticalAlign','top')._.aC(a)._.aC(c)
				)
			)
		)
	}
else if(this.hintTable[hid].txt){
	f = _$('<div/>')._.cls('ubbcode')._.attr('innerHTML','<div class=quote>'+this.hintTable[hid].txt+'</div>',true)._.aC(c)
	}

this.dialog.w._.addContent(f)
this.dialog.w._.show(e)
}//fe



/**
 *代码帮助列表
 */
postfunc.codeHelp=function()
{
var x,y,txt
if (ubbcode.codeHelpSpecial){
	x = []
	x=x.concat(ubbcode.codeHelpCommon,ubbcode.codeHelpSpecial);
	}
else
	x = ubbcode.codeHelpCommon

txt=''
for (var i=0;i<x.length;i++){
	var y = x[i]
	if(!y)
		continue
	if(!y[2])
		y[2]={}
	y[2].txt = y[1].replace(/\n|\r/g,'<br/>')
	if(typeof y[0]=='object')
		z=y[0]
	else
		var z = y[0].replace(/<\/?[a-z]+>/g,'').split('<br/>')
	txt +="<a href='javascript:void(0)' title='"+z[1]+"' class='small_colored_text_btn white' onfocus='this.blur()' onclick='postfunc.uiAddTag(event,"+this.hintTable.length+")'><nobr>"+z[0]+"</nobr></a> &nbsp;";
	this.hintTable.push(y[2])
	}

return _$('/span').$0('innerHTML',txt)
}






/**
 *生成联合版面选择窗口
 *@param e(event 事件 用以确定窗口位置
 *@param fid(int 当前版面id
 *@param callback(function 选择后的callback 第一个参数为选择的版面id 第二个参数为选择的版面名 返回true时不阻止链接事件
 */
commonui.selectForum.selectWindow = function(e,fid,callback,txt){
var y=this.get(),x=_$('/span'),c=commonui

if(!txt)
	txt=['/post.php?action=new&_newui&fid=','在','发布主题']

x.__sfs = y.f
x.__xoxooxoxooxox = function(e,sfid,name){
	if(!callback(sfid,name))
		c.cancelEvent(e)
	c.adminwindow._.hide()
	}
	
for(var i in y.f){
	var u ="<a style='font-size:130%;font-weight:bold' href='"+txt[0]+i+"' onclick='this.parentNode.__xoxooxoxooxox(event?event:window.event,"+i+",this.parentNode.__sfs["+i+"][1])' class='"+(i==fid? 'uitxt1' : '')+"'><span class='silver'>"+txt[1]+"</span> "+y.f[i][1]+" <span class='silver'>"+txt[2]+"</span></a><br/>"+(y.f[i][2] ? '<span class=gray>'+y.f[i][2]+"</span><br/>":'')+"<span style='line-height:50%'><br/></span>"
	if(i==fid)
		x.innerHTML= u+x.innerHTML
	else
		x.innerHTML +=u
	}

c.createadminwindow()
c.adminwindow._.addContent(null)
c.adminwindow._.addTitle('选择发布主题的版面')
c.adminwindow._.addContent(x)
c.adminwindow._.show(e)
return
		
}

/**
*获取当前版面联合版面状态
*@param fid(int 当前版面id
*没有联合版面时返回fid 否则返回0
*/
commonui.selectForum.getCurrent = function(fid){
var y=this.get()
if(y.i==0){
	return fid
	}
else if(y.i==1){
	if(typeof(y.f[fid])=='undefined'){
		for(var k in y.f)
			fid=k
		}
	return fid
	}
return 0
}


/**
 *生成快速发帖窗口
 *@param window.__CURRENT_FID(int 版面id
 *@param window.__CURRENT_TID(int 主题id 有主题id时为回复 否则为发新主题
 *@param window.__CURRENT_STID(int 
 */
commonui.fastPostUi = function(fid,tid,stid){
if(!window.__CURRENT_UID || !window.__CURRENT_FID)
	return

var z = _$('fast_post_c')
if(!z)return

var w=window, 
fid = w.__CURRENT_FID,
tid = w.__CURRENT_TID ? w.__CURRENT_TID : 0,
stid = w.__CURRENT_STID ? w.__CURRENT_STID : 0,
sfid = tid ? fid : commonui.selectForum.getCurrent(fid)

var $ = _$,t =function(x){return document.createTextNode(x)},b= commonui.stdBtns(),p,sel=null,subject,content,selector

, fbit=0
, dopost = function(o){
commonui.newPost(
	o,
	tid?postfunc.__REPLY_BLANK:postfunc.__NEW,//操作
	fbit,//版面bit type
	sfid,//版面id
	tid,//主题id
	0,//回复id
	stid,
	subject.value,//标题
	content.value//内容
	)
}, dopost0 = function(o){
if(!sfid)
	return alert('请先选择发帖的版面')
if(sfid==window.__CURRENT_FID)
	fbit = window.__CURRENT_F_BIT
else
	return __NUKE.doRequest({
		u:__API.postGet('','',postfunc.__NEW,sfid),
		f:function(d){
			var e = __NUKE.doRequestIfErr(d)
			if(e)
				return alert(e)
			fbit = __NUKE.toInt(d.data.__F.bit_data)
			dopost(o)
			}
		})
dopost(o)
}
/*
if(tid)
	p = window.__CURRENT_F_ALLOWREPLY
else
	p = window.__CURRENT_F_ALLOWPOST
if(p.indexOf('+u1')!=-1 && __GP.active==0)
	b._.__add($('/a').$0(
				'href',__API.activeHelper(),
				'innerHTML','本版'+(tid?'回复':'发帖')+'需要激活(?)',
				'className','gray',
				'style',{fontSize:'1.23em'}
				),1 )
else*/
	b._.__add($('/a').$0(
			'onclick',function(){
				dopost0(this)
				},
			'href','javascript:void(0)',
			'innerHTML',(tid?'发表回复':'发表新帖')+'(Ctrl+Enter)',
			'className','uitxt1',
			'style',{fontSize:'1.23em'}
			),1 )
b._.css('margin','auto')
if(!sfid)
	var sel = $('/button').$0('style',{marginRight:'0.3em'},
			t('版面选择'),
			'onclick',function(e){
				var self = this
				commonui.selectForum.selectWindow(e,fid,
					function(sf,name){
						sfid=sf
						selector._.setFid(sf)
						self.innerHTML = name
						}
					)
				}
			)

z.$0(
	$('/div').$0('className','module_wrap',
		$('/div').$0('className','w100',
			$('/table').$0('className','forumbox','cellspacing',1,'cellSpacing',1,
				$('/caption').$0(
					$('/h2').$0('innerHTML','..:: 快速发贴 ::..')
					),
				$('/thead').$0(
					$('/tr').$0(
						$('/th').$0(
							'colspan',2,
							$('/span').$0('className','xtxt','innerHTML','FAST POST')
							)
						)
					),
				$('/tbody').$0(
					$('/tr').$0('className','row1',
						$('/td').$0('className','c2','style',{textAlign:'center'},
							$('/div').$0('style',{textAlign:'left',marginBottom:'1em'},
								sel,
							
								subject = $('/input').$0('style',{width:'65%',marginRight:'0.3em'}),

								tid ? null : selector = commonui.createTopicKeySelector(sfid,function(k){subject.value = k+' '+subject.value}),
								
								(commonui.prePostHintAfterSubject ? commonui.prePostHintAfterSubject(tid?postfunc.__REPLY_BLANK:postfunc.__NEW, fid, tid, 0, stid) : null),

								postfunc.o_f_content = $('/textarea').$0('style',{width:'98%',height:'200px'},'onkeydown',function(e){if(e.ctrlKey && e.keyCode == 13)dopost0(null)}	)
								),
							b
							),
						ngaAds.bbs_ads16_gen()
						)
					)
				)
			)
		)
	)

content = postfunc.o_f_content

if(__SETTING.uA[0]==1 && __SETTING.uA[1]<=6 && selector){
	selector.id='fastposttopickeyselector'
	subject.onfocus = function(){selector.style.display=''}
	}


z.style.display='inline'

if(b._.__vml)
	var b = b._.__vml(2)
	
}





/**
 * 生成主题key选择器
 * @param fid(int 版面id 可以不设
 * @param call(function 选择key之后的callback函数 参数为选择的key文字
 */
commonui.createTopicKeySelector = function(fid,call){
var $ = _$, t= function(x){return document.createTextNode(x)}

var s = $('/select').$0('style',{width:'7em',overFlow:'hidden'},
	$('/option').$0(t('主题分类')),
	'onclick',function(e){
		if(!this._.__fid)
			return alert('请先选择版面')
		if(this._.__fidCurrent == this._.__fid)return
		var o = this
		o.innerHTML = ''
		o._.add(_$('/option').$0('innerHTML','加载中...'))
		o._.__fidCurrent =o._.__fid
		o.disabled=true
		__NUKE.doRequest({
			u:__API.topic_key(this._.__fid),
			f:function(d){
				if(!__NUKE.doRequestIfData(d,3600))
					return false
				if(!d.data || d.error)
					return true
				if(typeof d.data[0][0] == 'object')
					d.data = d.data[0]
				o.options[0].innerHTML = '...'
				var r = d.data;
				for (var k in r){
					var x = document.createElement('option');
					x.value=r[k][0]
					x.innerHTML=r[k][0]
					if (r[k][1]) x.style.backgroundColor='#eee'
					o.appendChild(x)
					}
				o.onchange=function(){
					call(this.value)
					o.selectedIndex=0
					}
				o.disabled=false
				//o.onclick = function(){commonui.onloadtopic_key(this)}
				return true
				}
			})//doRequest
		commonui.cancelEvent(e)
		}
	)

s._.setFid = function(f){this.__fid = f}

if(fid)
	s._.setFid(fid)
return s
}//fe






/**
*发布一个帖子
*/
commonui.newPost = function(
btn,
action,//操作
fbit,//版面bit type
fid,//版面id
tid,//主题id
pid,//回复id
stid,
subject,//标题
content,//内容
hidden,//隐藏帖子 仅版主可见
selfReply,//只有作者和版主可回复
attach,//附件
attachChk,//附件校验
vote,//投票内容
voteType,// 0投票 1投注铜币
voteMax,//每人最多可投 0不限
voteEnd,//小时后结束
voteBetMax,//投注最大值
voteBetMin,//投注最小值
modifyAppend,//修改时修改内容添加在原内容之后
comment,//评论/贴条回复
anony,//匿名
live,//直播
replyAnony//回复匿名
){

if(this.newPost.lock)
	return
this.newPost.lock=true

if(!this.newPost.cache)
	this.newPost.cache = {}

var self=this, c = this, argBak = arguments, redo=function(){self.newPost.apply(self,argBak)}, unlock=function(x){if(x)alert(x);self.newPost.lock=false}, toInt = function(x){return __NUKE.toInt(x)}, postfunc = window.postfunc

if(action == postfunc.__REPLY_BLANK)
	action = postfunc.__REPLY

if(action == postfunc.__NEW && !c.quoteTo)
	return loader.script(__SCRIPTS.quoteTo,function(){unlock();redo()})

fid = toInt(fid)
fbit = toInt(fbit)
tid = toInt(tid)
pid = toInt(pid)
stid = toInt(stid)

if(!fid)
	return unlock('FID ERROR');

if((action == postfunc.__REPLY || action == postfunc.__QUOTE || action == postfunc.__MODIFY) && !tid && !pid)
	return unlock('T/PID ERROR');

if(typeof subject == 'number')
	subject = subject.toString()
if(typeof subject != 'string')
	subject = ''

if(typeof content == 'number')
	content = content.toString()
if(typeof content != 'string')
	content = ''

if(typeof vote == 'number')
	vote = vote.toString()
if(typeof vote != 'string')
	vote = ''
if(voteType==1 && !voteEnd)
	return unlock('投注必须有结束时间');
	
if(!this.newPost.cache[fid])
	this.newPost.cache[fid] = {}
var cache = this.newPost.cache[fid]

modifyAppend = modifyAppend ? 1 : ''
comment = comment ? 1 : ''
anony = anony ? 1 : ''
live = live ? 1 : ''
replyAnony = replyAnony ? 1 : ''

//补全
var filterKey , hasAutoTran , hiddenInfo , mention , hideUpload , contentNoMod , subjectNoMod , fromDevice , fromClient 

//标题中的符号
var x = _$('</span>')
x.innerHTML = subject
subject = x.innerHTML.replace('&lt;','<').replace('&gt;','>').replace('&amp;','&')


//内容过短
if(content.length<3)
	return unlock('内容过短');

if(comment && content.length>420)
	return unlock('内容过长');

//标题过短
if(action == postfunc.__NEW && subject.length<1)
	return unlock('标题过短');

//附件确认
if (postfunc.o_attachForm)
	if(postfunc.o_waitAttachList.firstChild)
		if (!window.confirm('确认附件已经全部上传完毕?'))
			return unlock();

//CONTENT Chk
if(content && ubbcode && ubbcode.postContentChk){
	content = ubbcode.postContentChk(content)
	if(content===false)
		return unlock('CONTENT ERROR')
	}

//是否有设置强制分类
if(action == postfunc.__NEW && (fbit & postfunc._bit.if_force_topickey)){
	if (cache._topic_key){
		var x,y,z
		for (var k in cache._topic_key){
			x = cache._topic_key[k]
			if(x[1]){
				y=1
				if(x[0].indexOf('[')==0) x=x[0]
				else x='['+x[0]+']'
				if (subject.indexOf(x)!=-1)
					z=1
				}
			}
		if (y==1 && z!=1)
			return unlock('你必须从版主指定的主题分类(灰色)中选择一个或多个');
		}
	else{
		cache._topic_key={}
		__NUKE.doRequest({
			u:__API.topic_key(fid),
			f:function(d){
				if(!__NUKE.doRequestIfData(d,3600))
					return false
				if(!d.data || d.error)
					cache._topic_key = {}
				else{
					if(typeof d.data[0][0] == 'object')
						d.data = d.data[0]
					cache._topic_key = d.data;
					}
				unlock()
				window.setTimeout(redo,100)
				return true
				}
			})//doRequest
		return false;
		}
	}

//是否有设置监视
if (fid && (fbit & postfunc._bit.if_filter_key)){
	if (cache._filter_key){
		for(var k in cache._filter_key){
			var x = cache._filter_key[k]
			if (subject.indexOf(x)!=-1 || content.indexOf(x)!=-1 ){
				filterKey = 2
				break;
				}
			}
		}
	else{
		cache._filter_key={}
		__NUKE.doRequest({
			u:__API.filter_key(fid),
			f:function(d){
				if(!__NUKE.doRequestIfData(d,86400))
					return false
				if(!d.data)
					return true
				cache._filter_key = (typeof d.data[0]=='object') ? d.data[0] : d.data
				unlock()
				window.setTimeout(redo,100)
				return true
				}
			})//doRequest
		return false;
		}
	}


//自动翻译
if (fid && (fbit & postfunc._bit.if_auto_translate)){
	if(cache._auto_translate_table){
		if( commonui.autoTranslate.test(content) )
			hasAutoTran = 1
		}
	else{
		commonui.autoTranslate.main(null, fid, function(){
			cache._auto_translate_table = true
			unlock()
			window.setTimeout(redo,100)
			})
		return false;
		}
	}

//发送@提醒
var x = content.match(/\[@.{2,30}?\]/g)
if (x){
	var y=[]
	for (var i=0;i<x.length;i++ )
		y[x[i].substr(2,x[i].length-3).replace(/^\s+|\s+$/,'')]=1
	x='',i=0
	for (var k in y){
		x+='\t'+k;
		i++;
		if(i>4)break;
		}
	if(x)
		mention = x.substr(1)

	}

//附件
if (postfunc.uploadedAttach){
	var x = true
	for (var i=0;i<postfunc.uploadedAttach.length;i++){
		if (content.indexOf(postfunc.uploadedAttach[i][0])==-1){
			x=false
			break;
			}
		}
	if (x)
		hideUpload=1
	}


//检测存在引用的强制改为引用 
/*
if (action == postfunc.__REPLY || action == postfunc.__QUOTE){
	if(pid){
		if (content.substr(0,50).indexOf('[pid='+pid+'][b]Post by')==-1)
			action = postfunc.__REPLY
		}
	}
*/

if(this.postPerCheck && this.postPerCheck(argBak))//自定义检查 返回true终止发帖
	return unlock();

//无修改标记
if (action == postfunc.__MODIFY){
	if(postfunc.contentBak == content)
		contentNoMod=1
	if(postfunc.titleBak == subject)
		subjectNoMod=1
	}

//device
if(__SETTING.bit & 32768){
	var x = postfunc.deviceDetect()
	if(x){
		fromDevice=x[0]
		fromClient=x[1]
		}
	}

__NUKE.doRequest({
	u:__API.post(action,//操作
		fid,//版面id
		tid,//主题id
		pid,//回复id
		stid,
		subject,//标题
		content,//内容
		mention,//发送@提醒
		hidden,//隐藏帖子 仅版主可见
		selfReply,//只有作者和版主可回复
		attach,//附件
		attachChk,//附件校验
		hiddenInfo,//隐藏de内容
		filterKey,//have监视word
		hasAutoTran,//have自动翻译word
		hideUpload,//隐藏上传文件
		contentNoMod,//内容无修改
		subjectNoMod,//标题无修改
		fromDevice,//来自设备
		fromClient,//来自系统
		vote,//投票内容
		voteType,// 0投票 1投注铜币
		voteMax,//每人最多可投 0不限
		voteEnd,//小时后结束
		voteBetMax,//投注最大值
		voteBetMin,//投注最小值
		modifyAppend,
		comment,
		anony,
		live,
		replyAnony
		),
	b:btn,
	f:function(d){
		if(d.data && d.data.__MESSAGE && d.data.__MESSAGE[1]=="发贴完毕 ..."){
			if(postfunc.pwindow)
				postfunc.pwindow._.hide()
			c.createadminwindow()
			c.adminwindow._.addContent(null)
			c.adminwindow._.addTitle(d.data.__MESSAGE[1])
			
			var c01,c02,c03=d.data.__MESSAGE[5],c04=5,u = 'http://'+window.location.host+'/read.php?tid='
			
			c.adminwindow._.addContent(
				c01 = _$('/div')._.cls('ltxt b')._.add(
					"发贴完毕 ",
					c02 = _$('/span').$0('innerHTML',c04),
					'秒后跳转 ',
					_$('/a').$0('href',u+(c03?c03:tid)+'&page=e','className','gray','innerHTML','(点此跳转)'),
					' ',
					_$('/a').$0('href','javascript:void(0)','className','gray','innerHTML','(点此取消跳转)'),
					action==postfunc.__NEW ? _$('/span').$0('innerHTML',c.quoteTo.afterPostQuote(true,subject,u+c03)) : ''
					)//c01
				);//addContent
			c.adminwindow._.on(
				'mousedown',function(){
					window.clearInterval(c01._countTimeout)	
					}
				)
			c.adminwindow._.show()
			
			c01._countTimeout = window.setInterval(function(){
				c04--
				c02.innerHTML = c04
				if(c04<1)
					window.location.href=u+(c03?c03:tid)+'&page=e'
				}, 1000)
				
			window.setTimeout(function(){unlock()},1000)
			
			return true
			}//if
			
		alert( (d.data && d.data.__MESSAGE && d.data.__MESSAGE[1]) ? d.data.__MESSAGE[1] : 'DATA ERROR')
		
		unlock()
		
		return true
		},//fe

	ff:function(){
		alert('REQUEST ERROR')
		unlock()
		}//fe
	})

}//fe



postfunc.btnStatOn = function(o,t){
if(!t){
	o.__t0 = window.setTimeout(function(){postfunc.btnStatOn(o,1)},500)
	o.__t1 = window.setTimeout(function(){postfunc.btnStatOff(o)},1200)
	return
	}
o.__t2=true;
if(o.className.substr(0,7)!='invert ')
	o.className='invert '+o.className
}

postfunc.btnStatOff = function(o){
var s = o.__t2
if(o.__t0)window.clearTimeout(o.__t0)
if(o.__t1)window.clearTimeout(o.__t1)
o.__t2=false;
if(o.className.substr(0,7)=='invert ')
	o.className = o.className.substr(7)
return s
}



