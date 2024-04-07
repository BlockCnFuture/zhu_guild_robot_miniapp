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

<view class="cu-modal bottom-modal {{modalF=='show'?'show':''}}" bindtap="hideModalF">
  <view class="cu-dialog" catchtap="stopit">
    <view class="header-view-top">
      <view class="header-view">
        <view class="header">
          <view></view>
        </view>
        <view class="cu-bar bg-white" catchtap="stopit">
          <view class="action text-black" catchtap="hideModalF">取消</view>
          <text class="text-bold text-black text-lg">编辑奖励规则</text>
          <view class="action text-black" catchtap="hideModalF">确定</view>
        </view>
      </view>
    </view>
    <scroll-view scroll-y catchtap="stopit">
    <view style='height:60rpx;'></view>


<text class="text-gray margin-left" qq:if='{{tmptype=="gpa"}}'>由打卡排行确定奖励点数，第一行表第几个打卡</text>
<text class="text-gray margin-left" qq:if='{{tmptype=="gpb"}}'>由连续打卡天数确定奖励点数，第一行表第几天打卡</text>


    <view class="cu-list menu sm-border card-menu margin-top" qq:for='{{tmptype=="gpa"?rolesets.content.gpa.rules:tmptype=="gpd"?rolesets.content.gpd.rules:rolesets.content.gpb.rules}}' qq:key='i' data-index='{{index}}' data-item='{{item}}'>
      <view class="cu-item sm-border no-border">
      <view class="flex justify-center align-center">
      <text class='cuIcon-roundclose text-red text-bold' style='font-size:38rpx;margin-right:16rpx;' data-index="{{index}}" catchtap="delrole"></text>
        <view class="cu-tag round bg-green sm cuIcon-move margin-top-xs" catchtap="inputcnt" data-type="de" data-target='rolesets.content.{{tmptype}}.rules[{{index}}].a' data-cnt='{{item.a}}'></view>
        <view class="margin-lr text-black text-center solids-bottom" style="max-width: 64rpx;">
      <input type="number" value="{{item.a}}" maxlength="8" placeholder-style="color:#000000" bindinput='inputcnts' data-target='rolesets.content.{{tmptype}}.rules[{{index}}].a' data-cnt='{{item.a}}' bindblur='finishinputcnt'></input>
    </view>
        <view class="cu-tag round bg-red sm cuIcon-add margin-top-xs" catchtap="inputcnt" data-type="add" data-target='rolesets.content.{{tmptype}}.rules[{{index}}].a' data-cnt='{{item.a}}'></view>
        <text class="text-bold text-black margin-left">{{tmptype=="gpa"?"个":"天"}}</text>
      </view>
      <view class="flex justify-center align-center">
      <text class="text-bold text-black margin-right">到第</text>
        <view class="cu-tag round bg-green sm cuIcon-move margin-top-xs" catchtap="inputcnt" data-type="de" data-target='rolesets.content.{{tmptype}}.rules[{{index}}].b' data-cnt='{{item.b}}'></view>
        <view class="margin-lr text-black text-center solids-bottom" style="max-width: 64rpx;">
      <input type="number" value="{{item.b}}" maxlength="8" placeholder-style="color:#000000" bindinput='inputcnts' data-target='rolesets.content.{{tmptype}}.rules[{{index}}].b' data-cnt='{{item.b}}' bindblur='finishinputcnt'></input>
    </view>
        <view class="cu-tag round bg-red sm cuIcon-add margin-top-xs" catchtap="inputcnt" data-type="add" data-target='rolesets.content.{{tmptype}}.rules[{{index}}].b' data-cnt='{{item.b}}'></view>
        <text class="text-bold text-black margin-left">{{tmptype=="gpa"?"个":"天"}}</text>
      </view>
      </view>
<view class="cu-item sm-border">
      <view class="flex justify-center align-center">
      <text class="text-bold text-black margin-right">奖</text>
        <view class="cu-tag round bg-green sm cuIcon-move margin-top-xs" catchtap="inputcnt" data-type="de" data-target='rolesets.content.{{tmptype}}.rules[{{index}}].c' data-cnt='{{item.c}}'></view>
        <view class="margin-lr text-black text-center solids-bottom" style="max-width: 64rpx;">
      <input type="number" value="{{item.c}}" maxlength="8" placeholder-style="color:#000000" bindinput='inputcnts' data-target='rolesets.content.{{tmptype}}.rules[{{index}}].c' data-cnt='{{item.c}}' bindblur='finishinputcnt'></input>
    </view>
        <view class="cu-tag round bg-red sm cuIcon-add margin-top-xs" catchtap="inputcnt" data-type="add" data-target='rolesets.content.{{tmptype}}.rules[{{index}}].c' data-cnt='{{item.c}}'></view>
        <text class="text-bold text-black margin-left">点</text>
      </view>
      <view class="flex justify-center align-center">
      <text class="text-bold text-black margin-right">到</text>
        <view class="cu-tag round bg-green sm cuIcon-move margin-top-xs" catchtap="inputcnt" data-type="de" data-target='rolesets.content.{{tmptype}}.rules[{{index}}].d' data-cnt='{{item.d}}'></view>
        <view class="margin-lr text-black text-center solids-bottom" style="max-width: 64rpx;">
      <input type="number" value="{{item.d}}" maxlength="8" placeholder-style="color:#000000" bindinput='inputcnts' data-target='rolesets.content.{{tmptype}}.rules[{{index}}].d' data-cnt='{{item.d}}' bindblur='finishinputcnt'></input>
    </view>
        <view class="cu-tag round bg-red sm cuIcon-add margin-top-xs" catchtap="inputcnt" data-type="add" data-target='rolesets.content.{{tmptype}}.rules[{{index}}].d' data-cnt='{{item.d}}'></view>
        <text class="text-bold text-black margin-left">点</text>
      </view>
      </view>



    </view>



    <view class="cu-list menu sm-border card-menu margin-top" bindtap="addrole">
      <view class="cu-item sm-border">
        <view class="flex-sub text-center">
          <view class="solid-bottom text-xl padding">
            <text class="cuIcon-roundaddfill text-black text-bold"> 添加奖励规则</text>
          </view>
        </view>
      </view>
    </view>
    <view style='height:60vh;'></view>
    </scroll-view>
  </view>
</view>



<view class="cu-modal bottom-modal {{modalA=='show'?'show':''}}" bindtap="hideModalA">
  <view class="cu-dialog" catchtap="stopit">
    <view class="header-view-top">
      <view class="header-view">
        <view class="header">
          <view></view>
        </view>
        <view class="cu-bar bg-white" catchtap="stopit">
          <view class="action text-black" catchtap="hideModalA">取消</view>
          <text class="text-bold text-black text-lg">选择子频道</text>
          <view class="action text-black" catchtap="{{nowtarget==''?'setchannel':''}}">{{nowtarget==''?'确定':''}}</view>
        </view>
      </view>
    </view>
    <scroll-view scroll-y catchtap="stopit">
      <view class="cu-list menu sm-border margin-top">
        <view class="cu-item sm-border" qq:for="{{nowtarget==''?channellist:channellist_}}" qq:key="index" catchtap="{{item.type!=4?'pclick':'stopit'}}" data-index="{{index}}" data-item="{{item}}">
          <text qq:if="{{item.type==4}}" class="cuIcon-triangledownfill"><text class="text-black margin-left-xs">{{item.name}}</text></text>
          <view qq:if="{{item.type!=4}}" class="margin-left">
            <text qq:if="{{item.type==0 && item.sub_type==0}}" class="cuIcon-comment"><text class="text-black margin-left-xs">{{item.name}}</text></text>
            <text qq:if="{{item.type==0 && item.sub_type==1}}" class="cuIcon-notification"><text class="text-black margin-left-xs">{{item.name}}</text></text>
            <text qq:if="{{item.type==2}}" class="cuIcon-voice"><text class="text-black margin-left-xs">{{item.name}}</text></text>
            <text qq:if="{{item.type==10005}}" class="cuIcon-record"><text class="text-black margin-left-xs">{{item.name}}</text></text>
            <text qq:if="{{item.type==10006}}" class="cuIcon-apps"><text class="text-black margin-left-xs">{{item.name}}</text></text>
            <text qq:if="{{item.type==10007}}" class="cuIcon-edit"><text class="text-black margin-left-xs">{{item.name}}</text></text>
          </view>
            <text class="cuIcon-roundcheckfill text-blue" qq:if="{{item.select}}"></text>
        </view>
      </view>
    </scroll-view>
  </view>
</view>

<view class="cu-modal bottom-modal {{modalG=='show'?'show':''}}" bindtap="hideModalG">
  <view class="cu-dialog" catchtap="stopit">
    <view class="header-view-top">
      <view class="header-view">
        <view class="header">
          <view></view>
        </view>
        <view class="cu-bar bg-white">
          <view class="action text-black"> </view>
          <text class="text-bold text-black text-lg">选择积分类型</text>
          <view class="action text-black"> </view>
        </view>
      </view>
    </view>
    <scroll-view scroll-y catchtap="stopit">
      <view style="height: 1vh"></view>

      <view class="cu-list menu sm-border margin-top">
        <view class="cu-item sm-border" qq:for="{{pointlist}}" qq:key="index" catchtap="kclick" data-index="{{index}}" data-item="{{item}}">
          <view style="display: flex; align-items: center">
            <text class="cuIcon-recharge text-blue margin-right-sm"></text>
            <text class="text-black text-cut" style="max-width: 70vw">{{item.point_name}}</text>
          </view>
          <view style="display: flex" catchtap="showpointinfo" data-info="{{item.point_desc}}">
            <text class="cuIcon-info text-black"></text>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</view>

<view class="cu-modal bottom-modal {{modalE=='show'?'show':''}}" bindtap="hideModalE">
  <view class="cu-dialog" catchtap="stopit">
    <view class="header-view-top">
      <view class="header-view">
        <view class="header">
          <view></view>
        </view>
        <view class="cu-bar bg-white" catchtap="stopit">
          <view class="action text-black" catchtap="hideModalE">取消</view>
          <text class="text-bold text-black text-lg">设置封面图</text>
          <view class="action text-black"> </view>
        </view>
      </view>
    </view>
    <scroll-view scroll-y catchtap="stopit">
      <view style="height: 3vh"></view>

      <swiper
        class="card-swiper square-dot bg-white"
        indicator-dots="true"
        circular="true"
        autoplay="true"
        interval="5000"
        duration="500"
        bindchange="cardSwiper"
        indicator-color="#8799a3"
        indicator-active-color="#0081ff"
        bindtap="choseoneimg"
      >
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
        <button class="cu-btn block bg-blue margin-tb-sm lg" bindtap="uploadImage">上传</button>
      </view>
    </scroll-view>
  </view>
</view>

<view class="cu-modal bottom-modal {{modalB=='show'?'show':''}}" bindtap="hideModalB">
  <view class="cu-dialog" catchtap="stopit">
    <view class="header-view-top">
      <view class="header-view">
        <view class="header">
          <view></view>
        </view>
        <view class="cu-bar bg-white" catchtap="stopit">
          <view class="action text-black" catchtap="hideModalB">取消</view>
          <text class="text-bold text-black text-lg">设置内容</text>
          <view class="action text-black" catchtap="setcontent">确定</view>
        </view>
      </view>
    </view>
    <scroll-view scroll-y catchtap="stopit">
      <view style="height: 3vh"></view>
      <view class="cu-list menu sm-border card-menu margin-top">
        <view class="cu-item sm-border bg-white">
          <custom-textarea maxlength="800" style="text-align: left; width: 100%;{{modalB=='show'?'':'display:none;'}}" bindinput="onInput" value="{{tmpct}}" cursor-spacing="80" show-confirm-bar="{{false}}"></custom-textarea>
        </view>
      </view>
      <view style="height: 3vh"></view>
      <view class="text-gray" style="text-align: left; margin-left: 30rpx">支持以下markdown语法，点击插入，其他语法暂不支持</view>
      <view class="text-blue" style="text-align: left; margin-left: 30rpx; font-size: 34rpx" bindtap="addc" data-c="ma">- - - 分割线</view>
      <view class="text-blue" style="text-align: left; margin-left: 30rpx; font-size: 34rpx" bindtap="addc" data-c="mb">> 块引用</view>
      <view class="text-blue" style="text-align: left; margin-left: 30rpx; font-size: 34rpx" bindtap="addc" data-c="mc"># 标题</view>
      <view class="text-blue" style="text-align: left; margin-left: 30rpx; font-size: 34rpx" bindtap="addc" data-c="md">- 无序列表</view>
      <view class="text-blue" style="text-align: left; margin-left: 30rpx; font-size: 34rpx" bindtap="addc" data-c="me">1. 有序列表</view>
      <view style="height: 3vh"></view>

      <view class="text-gray" style="text-align: left; margin-left: 30rpx">输入#可插入子频道，点击以下变量可插入</view>
      <view class="text-blue" style="text-align: left; margin-left: 30rpx; font-size: 34rpx" bindtap="addc" data-c="a">{每日奖励} 每日打卡积分奖励数量</view>
      <view class="text-blue" style="text-align: left; margin-left: 30rpx; font-size: 34rpx" bindtap="addc" data-c="b">{连续奖励} 连续打卡积分奖励数量</view>
      <view class="text-blue" style="text-align: left; margin-left: 30rpx; font-size: 34rpx" bindtap="addc" data-c="h">{累计奖励} 累计打卡积分奖励数量</view>
      <view class="text-blue" style="text-align: left; margin-left: 30rpx; font-size: 34rpx" bindtap="addc" data-c="i">{漏签天数} 连续打卡漏签天数</view>
      <view class="text-blue" style="text-align: left; margin-left: 30rpx; font-size: 34rpx" bindtap="addc" data-c="g">{排名} 当日频道内打卡排名</view>
      <view class="text-blue" style="text-align: left; margin-left: 30rpx; font-size: 34rpx" bindtap="addc" data-c="d">{艾特} 艾特用户</view>
      <view class="text-blue" style="text-align: left; margin-left: 30rpx; font-size: 34rpx" bindtap="addc" data-c="e">{累计} 累计打卡天数</view>
      <view class="text-blue" style="text-align: left; margin-left: 30rpx; font-size: 34rpx" bindtap="addc" data-c="c">{连续} 连续打卡天数</view>
      <view class="text-blue" style="text-align: left; margin-left: 30rpx; font-size: 34rpx" bindtap="addc" data-c="f">{头像} 用户的头像，可选，默认在文本最左边</view>

      <view class="text-gray" style="text-align: left; margin-left: 30rpx">请勿插入链接，否则无法过审</view>
      <view class="text-gray" style="text-align: left; margin-left: 30rpx">请勿插入不良信息，一经发现永久禁止使用</view>
      <view class="text-gray" style="text-align: left; margin-left: 30rpx">并将后台证据提交至官方审查</view>
      <view style="height: 100vh"></view>
    </scroll-view>
  </view>
</view>

<scroll-view scroll-y>

<swiper class="tips-swiperitem margin" autoplay="true" vertical="true" circular="true" interval="4000" duration="1000">

    <block>
      <swiper-item catchtouchmove='false'>
        <view class="radius-lg bg-orange light">
          <view class='padding-xs text-xl' style='display:flex;align-items:center;text-align:center;'>
            <text class="text-df text-red">该功能需要给予子频道主动推送消息权限</text>
            <text class='cuIcon-question text-black text-df margin-left' bindtap='jumpdec'></text>
          </view>
        </view>
      </swiper-item>
    </block>

  </swiper>
  
  <view class="cu-list menu sm-border card-menu margin-top">
    <view class="cu-item sm-border">
      <text class="text-bold text-black">开启成员打卡功能</text>
      <switch class="sm" bindchange="RolesSwitch" checked="{{rolesets.useit}}" data-target="rolesets.useit"></switch>
    </view>
  </view>

  <view qq:if="{{rolesets.useit}}">
    <view class="cu-list menu sm-border card-menu margin-top" bindtap="chosechannel">
      <view class="cu-item sm-border arrow">
        <text class="text-bold text-black">固定打卡子频道</text>
        <text class="text-gray">{{channelname==''?'可选':channelname}}</text>
      </view>
    </view>

    <view class="cu-list menu sm-border card-menu margin-top">
      <view class="cu-item sm-border">
        <text class="text-bold text-black">开启每日打卡积分奖励</text>
        <switch class="sm" bindchange="RolesSwitch" checked="{{rolesets.content.gpa.on}}" data-target="rolesets.content.gpa.on"></switch>
      </view>
      <view class="cu-item sm-border no-border arrow" qq:if="{{rolesets.content.gpa.on}}" bindtap="chosepoint" data-target="gpa">
        <text class="text-bold text-black">奖励积分类型</text>
        <text class="text-gray">{{rolesets.content.gpa.point_name}}</text>
      </view>
      <view class="cu-item sm-border no-border arrow" qq:if="{{rolesets.content.gpa.on}}" bindtap='setprule' data-type='gpa'>
        <text class="text-bold text-black">设置奖励规则</text>
        <text class="text-gray">必须</text>
      </view>
    </view>

    <view class="cu-list menu sm-border card-menu margin-top">
      <view class="cu-item sm-border">
        <text class="text-bold text-black">开启连续打卡积分奖励</text>
        <switch class="sm" bindchange="RolesSwitch" checked="{{rolesets.content.gpb.on}}" data-target="rolesets.content.gpb.on"></switch>
      </view>
      <view class="cu-item sm-border no-border arrow" qq:if="{{rolesets.content.gpb.on}}" bindtap="chosepoint" data-target="gpb">
        <text class="text-bold text-black">奖励积分类型</text>
        <text class="text-gray">{{rolesets.content.gpb.point_name}}</text>
      </view>
      <view class="cu-item sm-border no-border arrow" qq:if="{{rolesets.content.gpb.on}}" bindtap='setprule' data-type='gpb'>
        <text class="text-bold text-black">设置奖励规则</text>
        <text class="text-gray">必须</text>
      </view>
    </view>

    <view class="cu-list menu sm-border card-menu margin-top">
      <view class="cu-item sm-border">
        <text class="text-bold text-black">开启累计打卡积分奖励</text>
        <switch class="sm" bindchange="RolesSwitch" checked="{{rolesets.content.gpd.on}}" data-target="rolesets.content.gpd.on"></switch>
      </view>
      <view class="cu-item sm-border no-border arrow" qq:if="{{rolesets.content.gpd.on}}" bindtap="chosepoint" data-target="gpd">
        <text class="text-bold text-black">奖励积分类型</text>
        <text class="text-gray">{{rolesets.content.gpd.point_name}}</text>
      </view>
      <view class="cu-item sm-border no-border arrow" qq:if="{{rolesets.content.gpd.on}}" bindtap='setprule' data-type='gpd'>
        <text class="text-bold text-black">设置奖励规则</text>
        <text class="text-gray">必须</text>
      </view>
    </view>

    <view class="cu-list menu sm-border card-menu margin-top">
      <view class="cu-item sm-border">
        <text class="text-bold text-black">允许补签</text>
        <switch class="sm" bindchange="RolesSwitch" checked="{{rolesets.content.gpc.on}}" data-target="rolesets.content.gpc.on"></switch>
      </view>
      <view class="cu-item sm-border no-border arrow" qq:if="{{rolesets.content.gpc.on}}" bindtap="chosepoint" data-target="gpc">
        <text class="text-bold text-black">消耗积分类型</text>
        <text class="text-gray">{{rolesets.content.gpc.point_name}}</text>
      </view>
      <view class="cu-item sm-border no-border" qq:if="{{rolesets.content.gpc.on}}">
        <text class="text-bold text-black">消耗积分数量</text>

      <view class="flex justify-center align-center text-lg">
        <view class="cu-tag round bg-green sm cuIcon-move margin-top-xs" catchtap="inputcnt" data-type="de" data-target='rolesets.content.gpc.point_cnt' data-cnt='{{rolesets.content.gpc.point_cnt}}'></view>
        <view class="margin-lr text-black text-center solids-bottom" style="max-width: 64rpx;">
      <input type="number" value="{{rolesets.content.gpc.point_cnt}}" maxlength="8" placeholder-style="color:#000000" bindinput='inputcnts' data-target='rolesets.content.gpc.point_cnt' data-cnt='{{rolesets.content.gpc.point_cnt}}' bindblur='finishinputcnt'></input>
    </view>
        <view class="cu-tag round bg-red sm cuIcon-add margin-top-xs" catchtap="inputcnt" data-type="add" data-target='rolesets.content.gpc.point_cnt' data-cnt='{{rolesets.content.gpc.point_cnt}}'></view>
      </view>

      </view>
    </view>

    <view class="cu-list menu sm-border card-menu margin-top">
      <view class="cu-item sm-border">
        <text class="text-bold text-black">固定打卡时段</text>
        <switch class="sm" bindchange="RolesSwitch" checked="{{rolesets.content.fixtime.on}}" data-target="rolesets.content.fixtime.on"></switch>
      </view>
      <view class="cu-item sm-border no-border" qq:if="{{rolesets.content.fixtime.on}}">
        <text class="text-bold text-black">开始时间（点击灰字修改）</text>
        <picker mode="multiSelector" range="{{daterange}}" bindchange="bindMultiPickerChangeS">
          <text class="text-gray">{{rolesets.content.fixtime.start}}</text>
        </picker>
      </view>
      <view class="cu-item sm-border no-border" qq:if="{{rolesets.content.fixtime.on}}">
        <text class="text-bold text-black">结束时间（点击灰字修改）</text>
        <picker mode="multiSelector" range="{{daterange}}" bindchange="bindMultiPickerChangeE">
          <text class="text-gray">{{rolesets.content.fixtime.end}}</text>
        </picker>
      </view>
    </view>

    <view class="cu-list menu sm-border card-menu margin-top">
      <view class="cu-item sm-border">
        <text class="text-black text-bold">打卡成功预览</text>
      </view>
      <view class="cu-item sm-border">
        <view style="width: 100%; word-wrap: break-word">
          <text class="text-gray">↓ 点击下方的预览可修改数据 </text>
        </view>
      </view>
    </view>

    <view class="margin-sm radius-lg">
      <view class="cu-list menu sm-border card-menu margin-top bg-white">
        <view class="cu-card case margin" bindtap="changeimage" data-type="success">
          <view class="image">
            <image src="{{rolesets.content.success.image}}" mode="aspectFit" bindload="loadeda" style="max-height:{{heighta}}px;"></image>
          </view>
        </view>

        <view class="bg-white sm-border solid-bottom" style="padding: 0 30rpx 20rpx 30rpx" bindtap="setdesc" data-target="rolesets.content.success.content">
          <text class="text-black" style="white-space: pre-wrap; overflow-wrap: break-word">{{rolesets.content.success.content}}</text>
        </view>
      </view>
    </view>

    <view class="cu-list menu sm-border card-menu margin-top">
      <view class="cu-item sm-border">
        <text class="text-black text-bold">今日已打卡预览</text>
      </view>
      <view class="cu-item sm-border">
        <view style="width: 100%; word-wrap: break-word">
          <text class="text-gray">↓ 点击下方的预览可修改数据 </text>
        </view>
      </view>
    </view>

    <view class="margin-sm radius-lg">
      <view class="cu-list menu sm-border card-menu margin-top bg-white">
        <view class="cu-card case margin" bindtap="changeimage" data-type="failed">
          <view class="image">
            <image src="{{rolesets.content.failed.image}}" mode="aspectFit" bindload="loadedb" style="max-height:{{heightb}}px;"></image>
          </view>
        </view>

        <view class="bg-white sm-border solid-bottom" style="padding: 0 30rpx 20rpx 30rpx" bindtap="setdesc" data-target="rolesets.content.failed.content">
          <text class="text-black" style="white-space: pre-wrap; overflow-wrap: break-word">{{rolesets.content.failed.content}}</text>
        </view>
      </view>
    </view>
  </view>
  <view style="height: 16vh"></view>
</scroll-view>

<view class="bg-white" style="position: fixed; z-index: 1024; bottom: 0; top: auto; left: 0; right: 0">
  <view class="padding">
    <button class="cu-btn block bg-blue margin-tb-sm lg" bindtap="saveall">保存</button>
  </view>
</view>
