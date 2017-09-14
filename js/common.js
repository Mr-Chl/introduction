function common(){
   
}
common.prototype={
	constructor:common,
	checkType (str, type)=>{//检查 手机号 邮箱 座机 格式
	    switch (type) {
	        case 'email':
	            return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
	        case 'phone':
	            return /^1[3|4|5|7|8][0-9]{9}$/.test(str);
	        case 'tel':
	            return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
	        case 'number':
	            return /^[0-9]$/.test(str);
	        case 'english':
	            return /^[a-zA-Z]+$/.test(str);
	        case 'chinese':
	            return /^[\u4E00-\u9FA5]+$/.test(str);
	        case 'lower':
	            return /^[a-z]+$/.test(str);
	        case 'upper':
	            return /^[A-Z]+$/.test(str);
	        default :
	            return true;
	    }
    },
    checkPwd(str)=>{// 检测 密码强度
	    var nowLv = 0;
	    if (str.length < 6) {
	        return nowLv
	    }
	    if (/[0-9]/.test(str)) {
	        nowLv++
	    }
	    if (/[a-z]/.test(str)) {
	        nowLv++
	    }
	    if (/[A-Z]/.test(str)) {
	        nowLv++
	    }
	    if (/[\.|-|_]/.test(str)) {
	        nowLv++
	    }
	    return nowLv;
    },
    upDigit(n)=>{   //转换 大写 钱
	    var fraction = ['角', '分','厘'];  
	    var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];  
	    var unit = [ ['元', '万', '亿'], ['', '拾', '佰', '仟']  ];  
	    var head = n  0; i++)  
	    {  
	        var p = '';  
	        for (var j = 0; j  0; j++)  
	        {  
	            p = digit[n % 10] + unit[1][j] + p;
	            n = Math.floor(n / 10);
	        }
	        //s = p.replace(/(零.)*零$/, '').replace(/^$/, '零')+ unit[0][i] + s;
	        s = p+ unit[0][i] + s;
	    }
	    return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
	},
	getUrlPrmt(url)=>{  //将地址栏参数 转换成对象
	    url = url ? url : window.location.href;
	    let _pa = url.substring(url.indexOf('?') + 1), _arrS = _pa.split('&'), _rs = {};
	    for (let i = 0, _len = _arrS.length; i < _len; i++) {
	        let pos = _arrS[i].indexOf('=');
	        if (pos == -1) {
	            continue;
	        }
	        let name = _arrS[i].substring(0, pos), value = window.decodeURIComponent(_arrS[i].substring(pos + 1));
	        _rs[name] = value;
	    }
	    return _rs;
	},
	setUrlPrmt(obj)=>{  //设置地址栏产出
	    let _rs = [];
	    for (let p in obj) {
	        if (obj[p] != null && obj[p] != '') {
	            _rs.push(p + '=' + obj[p])
	        }
	    }
	    return _rs.join('&');
	},
	randomNumber(n1,n2)=>{
	    //randomNumber(5,10)
	    //返回5-10的随机整数，包括5，10
	    if(arguments.length===2){
	        return Math.round(n1+Math.random()*(n2-n1));
	    }
	    //randomNumber(10)
	    //返回0-10的随机整数，包括0，10
	    else if(arguments.length===1){
	        return Math.round(Math.random()*n1)
	    }
	    //randomNumber()
	    //返回0-255的随机整数，包括0，255
	    else{
	        return Math.round(Math.random()*255)
	    }  
	},
	randomColor()=>{
	    //randomNumber是上面定义的函数
	    //写法1
	    return 'rgb(' + this.randomNumber(255) + ',' + this.randomNumber(255) + ',' + this.randomNumber(255) + ')';
	    
	    //写法2
	    //return '#'+Math.random().toString(16).substring(2).substr(0,6);
	    
	    //写法3
	    // var color='#';
	    // for(var i=0;i<6;i++){
	    //     color+='0123456789abcdef'[this.randomNumber(15)];
	    // }
	    // return color;
	},
	getEndTime(endTime)=>{
	    var startDate=new Date();  //开始时间，当前时间
	    var endDate=new Date(endTime); //结束时间，需传入时间参数
	    var t=endDate.getTime()-startDate.getTime();  //时间差的毫秒数
	    var d=0,h=0,m=0,s=0;
	    if(t>=0){
	      d=Math.floor(t/1000/3600/24);
	      h=Math.floor(t/1000/60/60%24);
	      m=Math.floor(t/1000/60%60);
	      s=Math.floor(t/1000%60);
	    }
	    return "剩余时间"+d+"天 "+h+"小时 "+m+" 分钟"+s+" 秒";
	},
	getFontSize()=>{
	    var doc=document,win=window;
	    var docEl = doc.documentElement,
	    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
	    recalc = function () {
	        var clientWidth = docEl.clientWidth;
	        if (!clientWidth) return;
	        //如果屏幕大于750（750是根据我效果图设置的，具体数值参考效果图），
	        //就设置clientWidth=750，防止font-size会超过100px
	        if(clientWidth>750){clientWidth=750}
	        //设置根元素font-size大小
	        docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
	    };
	    //屏幕大小改变，或者横竖屏切换时，触发函数
	    win.addEventListener(resizeEvt, recalc, false);
	    //文档加载完成时，触发函数
	    doc.addEventListener('DOMContentLoaded', recalc, false);
	    //使用方式很简单，比如效果图上，有张图片。宽高都是100px;
		//样式写法就是
		// img{
		//     width:1rem;
		//     height:1rem;
		// }
		//这样的设置，比如在屏幕宽度大于等于750px设备上，1rem=100px；图片显示就是宽高都是100px
		//比如在iphone6(屏幕宽度：375)上，375/750*100=50px;就是1rem=50px;图片显示就是宽高都是50px;
	}
};

export default  new common;