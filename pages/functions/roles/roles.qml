<view class="cu-load load-modal" qq:if="{{loadModal}}">
  <image src="/images/logo.jpeg" class="png" mode="aspectFit"></image>
  <view class="gray-text">加载中...</view>
</view>

  <view class="cu-bar bg-white">
    <view class="action">
    <navigator open-type='navigateBack' delta='1'>
      <text class="cuIcon-back text-gray"></text>
    </navigator>
    <navigator open-type='reLaunch' url='/pages/functions/index/index'>
      <text class="cuIcon-homefill text-gray" style='margin-left:20rpx;'></text>
    </navigator>
    <navigator open-type="exit" target="miniProgram">
      <text class="cuIcon-close text-red" style='margin-left:20rpx;'></text>
    </navigator>
    </view>
  </view>
  
<color-picker show="{{showcolor}}" defaultColor="{{tmprgba}}" bind:close="colorClose" bind:confirm="colorConfirm"></color-picker>

<view class="cu-modal bottom-modal {{modalA=='show'?'show':''}}" bindtap="hideModalA">
  <view class="cu-dialog" catchtap="stopit">
  <view class='header-view-top'>
  <view class="header-view">
      <view class="header">
        <view></view>
      </view>
      <view class="cu-bar bg-white" catchtap='stopit'>
      <view class="action text-black" catchtap="hideModalA">取消</view>
      <text class="text-bold text-black text-lg">选择生效子频道</text>
      <view class="action text-black" catchtap="setchannel">确定</view>
      </view>
  </view>
  </view>
  <scroll-view scroll-y catchtap='stopit'>
  <view class="cu-list menu sm-border margin-top">
  <view class="cu-item sm-border" qq:for="{{channellist}}" qq:key='index' catchtap="{{item.type!=4?'pclick':'stopit'}}" data-index='{{index}}' data-item='{{item}}'>
<text qq:if='{{item.type==4}}' class="cuIcon-triangledownfill"><text class="text-black margin-left-xs">{{item.name}}</text></text>
<view qq:if='{{item.type!=4}}' class="margin-left">
<text qq:if='{{item.type==0 && item.sub_type==0}}' class="cuIcon-comment"><text class="text-black margin-left-xs">{{item.name}}</text></text>
<text qq:if='{{item.type==0 && item.sub_type==1}}' class="cuIcon-notification"><text class="text-black margin-left-xs">{{item.name}}</text></text>
</view>
  <text class="cuIcon-roundcheckfill text-blue" qq:if='{{item.select}}'></text>
  </view>
  </view>
  </scroll-view>
  </view>
</view>





<view class="cu-modal bottom-modal {{shownewrole=='show' && showcolor=='' && modalB=='' ?'show':''}}" bindtap="hideModalnewrole">
  <view class="cu-dialog" catchtap="stopit">
  <view class='header-view-top'>
  <view class="header-view">
      <view class="header">
        <view></view>
      </view>
      <view class="cu-bar bg-white">
      <view class="action text-black" catchtap="hideModalnewrole">取消</view>
      <text class="text-bold text-black text-lg">新建身份组</text>
      <view class="action text-black" catchtap="rolecreat">确定</view>
      </view>
  </view>
  </view>
  <scroll-view scroll-y catchtap='stopit'>

<view style='height:3vh;'></view>

    <view class="cu-list menu sm-border card-menu margin-top" bindtap='setdesc' data-target='tmpnewrolename'>
      <view class="cu-item sm-border arrow">
        <text class="text-bold text-black">身份组名称</text>
        <text class="text-gray">必填</text>
      </view>
      <view class="cu-item sm-border" qq:if="{{tmpnewrolename}}">
            <text class="text-gray">{{tmpnewrolename}}
            </text>
      </view>
    </view>


<view class="cu-list menu sm-border card-menu margin-top" bindtap='changecolor'>
<view class="cu-item sm-border arrow">
<view style='display: flex;align-items: center;'>
<text class="cuIcon-skin" style='color:blue;font-size:50rpx;'></text>
<text class="text-bold text-black margin-left-sm">外显颜色</text>
</view>

<view style='display: flex;align-items: center;'>
<text class="cuIcon-title" style='color:{{tmpcolorhex}};font-size:50rpx;'></text>
<text class="text-bold text-black">{{tmpcolorhex}}</text>
</view>

</view>
</view>


  <view class="cu-list menu sm-border card-menu margin-top">
    <view class="cu-item sm-border">
      <text class="text-bold text-black">成员列表分组展示</text>
      <switch class="sm" catchchange="RoleLsShSwitch" checked="{{tmprolelistshow}}"></switch>
    </view>
  </view>

<view style='height:3vh;'></view>

  </scroll-view>
  </view>
</view>








<view class="cu-modal bottom-modal {{modalD=='show' && shownewrole=='' && showcolor=='' && modalB=='' ?'show':''}}" bindtap="hideModalD">
  <view class="cu-dialog" catchtap="stopit">
  <view class='header-view-top'>
  <view class="header-view">
      <view class="header">
        <view></view>
      </view>
      <view class="cu-bar bg-white">
      <view class="action text-black" catchtap="hideModalD">取消</view>
      <text class="text-bold text-black text-lg">选择身份组</text>
      <view class="action text-black" catchtap="setonerole">确定</view>
      </view>
  </view>
  </view>
  <scroll-view scroll-y catchtap='stopit'>

<view style='height:3vh;'></view>

    <view class="cu-list menu sm-border card-menu margin-top" catchtap='creatnewrole'>
    <view class="cu-item sm-border arrow">
    <view style='display: flex;align-items: center;'>
    <text class="cuIcon-roundadd" style='font-size:40rpx;'></text>
    <text class="text-bold text-black margin-left-sm">新建身份组</text>
    </view>
    </view>
  </view>

  <view class="cu-list menu sm-border margin-top">

  <view class="cu-item sm-border" qq:for="{{rolelist}}" qq:key='index' catchtap='fclick' data-index='{{index}}' data-item='{{item}}'>
<view style='display: flex;align-items: center;'>
<text class="cuIcon-title" style='color:{{item.hexcolor}};font-size:50rpx;'></text>
<text class="{{item.disable?'text-gray':'text-black'}} text-cut" style='max-width:70vw;'>{{item.name}}</text>
</view>
  <text class="cuIcon-roundcheckfill text-blue" qq:if='{{item.select}}'></text>
  <text class="cuIcon-roundcheckfill text-gray" qq:if='{{!item.select}}'></text>
  </view>

  </view>
  </scroll-view>
  </view>
</view>



<view class="cu-modal bottom-modal {{modalC=='show'?'show':''}}" bindtap="hideModalC">
  <view class="cu-dialog" catchtap="stopit">
  <view class='header-view-top'>
  <view class="header-view">
      <view class="header">
        <view></view>
      </view>
      <view class="cu-bar bg-white" catchtap='stopit'>
      <view class="action text-black" catchtap="hideModalC">取消</view>
      <text class="text-bold text-black text-lg">选择等级要求</text>
      <view class="action text-black" catchtap="setlevel">确定</view>
      </view>
  </view>
  </view>
  <scroll-view scroll-y catchtap='stopit'>
  <view class="cu-list menu sm-border margin-top">
  <view class="cu-item sm-border" qq:for="{{levellist}}" qq:key='index' catchtap='lclick' data-index='{{index}}' data-item='{{item}}'>
 <text class="cuIcon-choicenessfill text-blue"><text class="text-black margin-left-xs">{{item.name}}</text></text>
  <text>
   <text class="text-black margin-right-sm">{{item.desc}}</text>
  <text class="cuIcon-roundcheckfill text-blue" qq:if='{{item.select}}'></text>
  </text>
  </view>
  </view>
  </scroll-view>
  </view>
</view>




<view class="cu-modal bottom-modal {{modalE=='show'?'show':''}}" bindtap="hideModalE">
  <view class="cu-dialog" catchtap="stopit">
  <view class='header-view-top'>
  <view class="header-view">
      <view class="header">
        <view></view>
      </view>
      <view class="cu-bar bg-white" catchtap='stopit'>
      <view class="action text-black" catchtap="hideModalE">取消</view>
      <text class="text-bold text-black text-lg">设置封面图</text>
      <view class="action text-black"> </view>
      </view>
  </view>
  </view>
  <scroll-view scroll-y catchtap='stopit'>
<view style="height:3vh;"></view>

<swiper class="card-swiper square-dot bg-white" indicator-dots="true" circular="true" autoplay="true" interval="5000" duration="500" bindchange="cardSwiper" indicator-color="#8799a3" indicator-active-color="#0081ff" bindtap='choseoneimg'>
  <swiper-item class="cur">
    <view class="swiper-item">
      <image src="{{tmpimg}}" mode="aspectFill"></image>
    </view>
  </swiper-item>
</swiper>

<view class="padding bg-white">
<text class="text-gray text-lg bg-white">点击图片进行修改</text>
</view>

<view class="padding bg-white">
<button class="cu-btn block bg-blue margin-tb-sm lg" bindtap='uploadImage'>上传</button>
</view>

  </scroll-view>
  </view>
</view>





<view class="cu-modal bottom-modal {{modalB=='show'?'show':''}}" bindtap="hideModalB">
  <view class="cu-dialog" catchtap="stopit">
  <view class='header-view-top'>
  <view class="header-view">
      <view class="header">
        <view></view>
      </view>
      <view class="cu-bar bg-white" catchtap='stopit'>
      <view class="action text-black" catchtap="hideModalB">取消</view>
      <text class="text-bold text-black text-lg">设置内容</text>
      <view class="action text-black" catchtap="setcontent">确定</view>
      </view>
  </view>
  </view>
  <scroll-view scroll-y catchtap='stopit'>
<view style="height:3vh;"></view>
<view class="cu-list menu sm-border card-menu margin-top">
<view class="cu-item sm-border bg-white">

<custom-textarea maxlength='500' style="text-align: left;width:100%;{{modalB=='show'?'':'display:none;'}}" bindinput="onInput" value="{{tmpct}}" cursor-spacing='80' show-confirm-bar='{{false}}'></custom-textarea>
  </view>
  </view>
<view style="height:3vh;"></view>
  <view class="text-gray" style="text-align: left;margin-left:30rpx;">此处不支持插入子频道</view>
  <view class="text-gray" style="text-align: left;margin-left:30rpx;">请勿插入链接，否则无法过审</view>
  <view class="text-gray" style="text-align: left;margin-left:30rpx;">请勿插入不良信息，一经发现永久禁止使用</view>
  <view class="text-gray" style="text-align: left;margin-left:30rpx;">并将后台证据提交至官方审查</view>
  
<view qq:if="{{isrule}}">
<view style='height:2vh;'></view>
<view class="text-gray" style="text-align: left;margin-left:30rpx;">点击以下变量可插入正则表达式</view>
<view class="text-blue" style="text-align: left;margin-left:30rpx;font-size:34rpx;" bindtap='addc' data-c='g'>| 正则表达式"或"</view>
<view class="text-blue" style="text-align: left;margin-left:30rpx;font-size:34rpx;" bindtap='addc' data-c='h'>^ 匹配文本的开头</view>
<view class="text-blue" style="text-align: left;margin-left:30rpx;font-size:34rpx;" bindtap='addc' data-c='i'>$ 匹配文本的结尾</view>
<view class="text-blue" style="text-align: left;margin-left:30rpx;font-size:34rpx;" bindtap='addc' data-c='j'>? 前元素可选</view>
<view class="text-blue" style="text-align: left;margin-left:30rpx;font-size:34rpx;" bindtap='addc' data-c='k'> * 匹配任意数量空格</view>
<view class="text-blue" style="text-align: left;margin-left:30rpx;font-size:34rpx;" bindtap='addc' data-c='l'>.* 匹配任意数量单行字符</view>
<view class="text-blue" style="text-align: left;margin-left:30rpx;font-size:34rpx;" bindtap='addc' data-c='m'>\d+ 匹配正整数</view>
<view class="text-blue" style="text-align: left;margin-left:30rpx;font-size:34rpx;" bindtap='addc' data-c='n'>([\s\S]*) 匹配多行文本</view>
</view>
  
  
  <view style="height:100vh;"></view>
  </scroll-view>
  </view>
</view>











<view class="cu-modal bottom-modal {{modalK=='show' && shownewrole!='show' && modalA!='show' && modalB!='show' && modalC!='show' && modalD!='show' && modalE!='show'?'show':''}}" bindtap="hideModalK">
  <view class="cu-dialog" style='max-height:90%;' catchtap="stopit">
  <view class='header-view-top'>
  <view class="header-view">
      <view class="header">
        <view></view>
      </view>
      <view class="cu-bar bg-white" catchtap='stopit'>
      <view class="action text-black" catchtap="hideModalK">取消</view>
      <text class="text-bold text-black text-lg">创建|修改 领取规则</text>
      <view class="action text-black" catchtap="newrule">确定</view>
      </view>
  </view>
  </view>
  <scroll-view scroll-y catchtap='stopit'>
  <view style='height:3vh;'></view>
<view style='text-align:left;'>
    <view class="cu-list menu sm-border card-menu margin-top" catchtap='changeimage'>
      <view class="cu-item sm-border arrow">
        <text class="text-bold text-black">顶部封面图设置</text>
        <view style='width:300rpx;height:60rpx;overflow: hidden;'>
        <image src="{{nowrolec.image}}" mode="aspectFill"></image>
        </view>
      </view>
    </view>

    <view class="cu-list menu sm-border card-menu margin-top" catchtap='setdesc' data-target='nowrolec.desc'>
      <view class="cu-item sm-border arrow">
        <text class="text-bold text-black">身份组领取介绍</text>
        <text class="text-gray">可选</text>
      </view>
      <view class="cu-item sm-border" qq:if="{{nowrolec.desc}}">
      <view style='width: 100%;word-wrap: break-word;'>
            <text class="text-gray">{{nowrolec.desc}}
            </text>
      </view>
      </view>
    </view>

        <view class="cu-list menu sm-border card-menu margin-top" catchtap='chosechannel'>
      <view class="cu-item sm-border arrow">
        <text class="text-bold text-black">身份组领取子频道</text>
        <text class="text-gray">{{channelname==''?'用来领取身份组的子频道':channelname}}</text>
      </view>
    </view>

<view qq:for="{{nowrolec.roles}}" qq:key="{{index}}">
    <view class="cu-list menu sm-border card-menu margin-top">

      <view class="cu-item sm-border arrow" catchtap='froles' data-item='{{item}}' data-index='{{index}}'>
        <view style='display: flex;align-items: center;'>
        <text class='cuIcon-roundclose text-red text-bold' style='font-size:38rpx;margin-right:10rpx;' data-index="{{index}}" catchtap="delrole"></text>
        <text class="text-bold text-black">指定身份组</text>
        </view>
        <text class="text-gray text-cut" style='max-width:50vw;'>{{item.rolename}}</text>
      </view>

      <view class="cu-item sm-border">
        <text class="text-bold text-black">身份组时长（点击灰字修改）</text>
        <picker mode="multiSelector" range="{{daterange}}" bindchange="bindMultiPickerChange" bindcancel='canceltime' data-item='{{item}}' data-index='{{index}}' catchtap='setresttime'>
        <text class="text-gray" qq:if='{{item.time<=0}}'>永久</text>
        <text class="text-gray" qq:else>{{item.time+'秒'}}</text>
        </picker>
      </view>

      <view class="cu-item sm-border arrow" catchtap='setdesc' data-target='nowrolec.roles[{{index}}].desc'>
        <text class="text-bold text-black">身份组介绍</text>
        <text class="text-gray">可选</text>
      </view>
      <view class="cu-item sm-border" qq:if="{{item.desc}}" catchtap='setdesc' data-target='nowrolec.roles[{{index}}].desc'>
      <view style='width: 100%;word-wrap: break-word;'>
            <text class="text-gray">{{item.desc}}</text>
      </view>
      </view>
      <view class="cu-item sm-border arrow" catchtap='setlevelli' data-item='{{item}}' data-target='nowrolec.roles[{{index}}].levellimit'>
        <text class="text-bold text-black">领取等级限制</text>
        <text class="text-gray" qq:if='{{item.levellimit<=0}}'>无</text>
        <text class="text-gray" qq:else>{{'>='+item.levellimit+'级'}}</text>
      </view>
    <view class="cu-item sm-border">
      <text class="text-bold text-black">领取昵称格式限制</text>
      <switch class="sm" catchchange="NickLimitSwitch" checked="{{item.nicklimit.on}}" data-item='{{item}}' data-target='nowrolec.roles[{{index}}].nicklimit.on'></switch>
    </view>
        <view class="cu-item sm-border" qq:if="{{item.nicklimit.on}}">
        <text class="text-black text-bold">限制格式 (正则表达式)</text>
    </view>
            <view class="cu-item sm-border" qq:if="{{item.nicklimit.on}}" catchtap='setdesc' data-target='nowrolec.roles[{{index}}].nicklimit.rule'>
            <view style='width: 100%;word-wrap: break-word;'>
            <text class="text-gray">{{item.nicklimit.rule}}</text>
            </view>
      </view>
              <view class="cu-item sm-border" qq:if="{{item.nicklimit.on}}">
        <text class="text-black text-bold">提示内容</text>
    </view>
            <view class="cu-item sm-border" qq:if="{{item.nicklimit.on}}" catchtap='setdesc' data-target='nowrolec.roles[{{index}}].nicklimit.tips'>
            <view style='width: 100%;word-wrap: break-word;'>
            <text class="text-gray">{{item.nicklimit.tips}}
            </text>
            </view>
      </view>
    </view>
</view>

    <view class="cu-list menu sm-border card-menu margin-top" catchtap="addrole">
      <view class="cu-item sm-border">
        <view class="flex-sub text-center">
          <view class="solid-bottom text-xl padding">
            <text class="cuIcon-roundaddfill text-black text-bold"> 添加身份组</text>
          </view>
        </view>
      </view>
    </view>

      <view class="cu-list menu sm-border card-menu margin-top">
    <view class="cu-item sm-border">
      <text class="text-bold text-black">允许多选</text>
      <switch class="sm" catchchange="MultiSwitch" checked="{{nowrolec.multigain}}"></switch>
    </view>
        <view class="cu-item sm-border" qq:if="{{nowrolec.multigain}}">
      <text class="text-black text-bold">最多可领取</text>


<view class="flex justify-center align-center text-lg">
    <view class="cu-tag round bg-green sm cuIcon-move margin-top-xs" catchtap='inputcnt' data-type='de'></view>
    <view class="margin-lr text-black text-center solids-bottom" style="max-width: 64rpx;">
      <input type="number" value="{{nowrolec.maxcnt}}" maxlength="2" placeholder-style="color:#000000" bindinput='inputcnts' bindblur='finishinputcnt'></input>
    </view>
    <view class="cu-tag round bg-red sm cuIcon-add margin-top-xs" catchtap='inputcnt' data-type='add'></view>
    <text class="text-black text-bold margin-left-sm">个</text>
  </view>

      
    </view>
  </view>

  <view class="cu-list menu sm-border card-menu margin-top">
    <view class="cu-item sm-border">
      <text class="text-bold text-black">允许退出身份组</text>
      <switch class="sm" bindchange="QuitSwitch" checked="{{nowrolec.canexit}}"></switch>
    </view>
  </view>

  <view style="height:100vh;"></view>

  </view>
  </scroll-view>
  </view>
</view>








<scroll-view scroll-y>
  <view class="cu-list menu sm-border card-menu margin-top">
    <view class="cu-item sm-border">
      <text class="text-bold text-black">开启自助领取身份组</text>
      <switch class="sm" bindchange="RolesSwitch" checked="{{rolesets.useit}}"></switch>
    </view>
  </view>

<view qq:if='{{rolesets.useit}}'>


<view class="margin-sm radius-lg" qq:for='{{rolesets.content}}' data-item='{{item}}' for-index='index' qq:key='index'>
<view class="cu-list menu sm-border card-menu margin-top bg-white" qq:if='{{item.image}}'>
<view class="cu-card case margin">
    <view class="image">
      <image src="{{item.image}}" mode='aspectFit' bindload='loaded' style="max-height:{{heights[index]}}px;" data-index='{{index}}'></image>
    </view>
</view>

<view class="bg-white sm-border" style='padding: 0 30rpx;' qq:if='{{item.desc!=""}}'>
<text class="text-black" style='white-space:pre-wrap;overflow-wrap:break-word;'>{{item.desc}}</text>
</view>

<view class="bg-white sm-border" style="padding: 0 30rpx">
    <text class='text-gray' qq:if="{{item.multigain}}">✅可选{{item.maxcnt}}个</text>
    <text class="text-gray" qq:if="{{!item.multigain}}">✅仅单选</text>
</view>

<view style='height:20rpx;'></view>

<view class="bg-white sm-border" style='padding: 0 30rpx;'>

<view qq:for='{{item.roles}}' qq:for-item='rr' qq:key="i" qq:for-index='i'>

  <view class='text-cut' style='max-width:70vw;'>
    <text class="text-black">『</text>
  <text class="text-black">{{rr.rolename}}</text>
  <text class="text-black">』</text>
  </view>
<view style='height:20rpx;'></view>


    <view style='border-left:2px solid #ccc;padding:10rpx;margin:0;border-t: 1rpx solid #ddd;background-color:rgba(247,249,250,1);'>
  <text class="text-gray" style='white-space:pre-wrap;overflow-wrap:break-word;' qq:if='{{rr.desc}}'>{{rr.desc}}</text>
<view style='height:10rpx;' qq:if='{{rr.desc}}'></view>
  <view class='text-blue' bindtap='getrole' data-index='{{index}}'>点击领取</view>
    </view>
<view style='height:20rpx;'></view>

</view>

</view>

<view class='flex flex-wrap justify-between align-center bg-white margin-sm'>
<button class="cu-btn line-blue" bindtap='changei' data-index='{{index}}' data-item='{{item}}'>修改</button>
<button class="cu-btn line-black" bindtap='sendmd' data-index='{{index}}'>发送入口</button>
<button class="cu-btn line-black" bindtap='copyi' data-index='{{index}}'>复制链接</button>
<button class="cu-btn line-red" bindtap='deli' data-index='{{index}}'>删除</button>
</view>

</view>
</view>

      <view class="cu-list menu sm-border card-menu margin-top" bindtap="creatrolerule">
      <view class="cu-item sm-border">
        <view class="flex-sub text-center">
          <view class="solid-bottom text-xl padding">
            <text class="cuIcon-roundaddfill text-black text-bold"> 新增身份组领取规则</text>
          </view>
        </view>
      </view>
    </view>

<view style='height:18vh;'></view>

</view>

</scroll-view>


<view class="bg-white" style="position:fixed;z-index:1024;bottom: 0;top:auto;left:0;right:0;">
<view class="padding">
<button class="cu-btn block bg-blue margin-tb-sm lg" bindtap='saveall'>保存</button>
</view>
</view>