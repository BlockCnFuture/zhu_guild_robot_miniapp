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
  
<view class="cu-modal bottom-modal {{modalA=='show'?'show':''}}" bindtap="hideModalA">
  <view class="cu-dialog" catchtap="stopit">
  <view class='header-view-top'>
  <view class="header-view">
      <view class="header">
        <view></view>
      </view>
      <view class="cu-bar bg-white" catchtap='stopit'>
      <view class="action text-black" catchtap="hideModalA">取消</view>
      <text class="text-bold text-black text-lg">选择子频道</text>
      <view class="action text-black"></view>
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
<text qq:if='{{item.type==2}}' class="cuIcon-voice"><text class="text-black margin-left-xs">{{item.name}}</text></text>
<text qq:if='{{item.type==10005}}' class="cuIcon-record"><text class="text-black margin-left-xs">{{item.name}}</text></text>
<text qq:if='{{item.type==10006}}' class="cuIcon-apps"><text class="text-black margin-left-xs">{{item.name}}</text></text>
<text qq:if='{{item.type==10007}}' class="cuIcon-edit"><text class="text-black margin-left-xs">{{item.name}}</text></text>
  </view>
  </view>
  </view>
  </scroll-view>
  </view>
</view>



<swiper class="tips-swiperitem margin" autoplay="true" vertical="true" circular="true" interval="4000" duration="1000">
  <block>
    <swiper-item catchtouchmove="false">
      <view class="radius-lg bg-orange light">
        <view class="padding-xs text-xl">
          <text class="cuIcon-warnfill text-red"></text>
          <text class="text-df"> 大频道请勿开启！官方送流量时会误踢送的用户！</text>
        </view>
      </view>
    </swiper-item>
  </block>
</swiper>

<view class="cu-modal bottom-modal {{modalC=='show'?'show':''}}" bindtap="hideModalC">
  <view class="cu-dialog" catchtap="stopit">
    <view class="header-view-top">
      <view class="header-view">
        <view class="header">
          <view></view>
        </view>
        <view class="cu-bar bg-white" catchtap="stopit">
          <view class="action text-black" catchtap="hideModalC">取消</view>
          <text class="text-bold text-black text-lg">选择验证模式</text>
          <view class="action text-black"> </view>
        </view>
      </view>
    </view>
    <scroll-view scroll-y catchtap="stopit">
      <view class="cu-list menu sm-border margin-top">
        <view class="cu-item sm-border" qq:for="{{vefls}}" qq:key="index" catchtap="vefclick" data-item="{{item}}">
          <text class="cuIcon-command"><text class="text-black margin-left-xs">{{item.name}}</text></text>
          <text class="text-gray margin-left-xs">{{item.desc}}</text>
        </view>
      </view>
    </scroll-view>
  </view>
</view>

<view class="cu-modal bottom-modal {{modalB=='show' && modalA==''?'show':''}}" bindtap="hideModalB">
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
          <custom-textarea maxlength="500" style="text-align: left;width:100%;{{modalB=='show' && modalA==''?'':'display:none;'}}" bindinput="onInput" value="{{tmpct}}" cursor-spacing="80" show-confirm-bar="{{false}}"></custom-textarea>
        </view>
      </view>
      <view style="height: 3vh"></view>

      <view qq:if="{{nowtarget=='rolesets.content'}}">
        <view class="text-gray" style="text-align: left; margin-left: 30rpx">此处不支持插入子频道</view>
      </view>

      <view qq:if="{{nowtarget=='rolesets.image'}}">
        <view style="height: 2vh"></view>
        <view class="text-gray" style="text-align: left; margin-left: 30rpx">点击以下变量可插入正则表达式</view>
        <view class="text-blue" style="text-align: left; margin-left: 30rpx; font-size: 34rpx" bindtap="addc" data-c="g">| 正则表达式"或"</view>
        <view class="text-blue" style="text-align: left; margin-left: 30rpx; font-size: 34rpx" bindtap="addc" data-c="h">^ 匹配文本的开头</view>
        <view class="text-blue" style="text-align: left; margin-left: 30rpx; font-size: 34rpx" bindtap="addc" data-c="i">$ 匹配文本的结尾</view>
        <view class="text-blue" style="text-align: left; margin-left: 30rpx; font-size: 34rpx" bindtap="addc" data-c="j">? 前元素可选</view>
        <view class="text-blue" style="text-align: left; margin-left: 30rpx; font-size: 34rpx" bindtap="addc" data-c="k"> * 匹配任意数量空格</view>
        <view class="text-blue" style="text-align: left; margin-left: 30rpx; font-size: 34rpx" bindtap="addc" data-c="l">.* 匹配任意数量单行字符</view>
        <view class="text-blue" style="text-align: left; margin-left: 30rpx; font-size: 34rpx" bindtap="addc" data-c="m">\d+ 匹配正整数</view>
        <view class="text-blue" style="text-align: left; margin-left: 30rpx; font-size: 34rpx" bindtap="addc" data-c="n">([\s\S]*) 匹配多行文本</view>
      </view>

      <view style="height: 100vh"></view>
    </scroll-view>
  </view>
</view>

<scroll-view scroll-y>
  <view class="cu-list menu sm-border card-menu margin-top">
    <view class="cu-item sm-border">
      <text class="text-bold text-black">开启新人验证</text>
      <switch class="sm" bindchange="NickLimitSwitch" checked="{{rolesets.useit}}"></switch>
    </view>

    <view class="cu-item sm-border arrow no-border" qq:if="{{rolesets.useit}}" bindtap="chosevef">
      <text class="text-bold text-black">验证模式</text>
      <text class="text-gray">{{rolesets.fromchannel=='1'?'问答验证':rolesets.fromchannel=='2'?'点阵图案验证':'数学式验证'}}</text>
    </view>

    <view class="cu-item sm-border no-border" qq:if="{{rolesets.useit && rolesets.fromchannel=='1'}}">
      <text class="text-black text-bold">问题内容</text>
      <text class="text-gray">必须</text>
    </view>

    <view class="cu-item sm-border" qq:if="{{rolesets.useit && rolesets.fromchannel=='1'}}" bindtap="setdesc" data-target="rolesets.content">
      <view style="width: 100%; word-wrap: break-word">
        <text class="text-gray">{{rolesets.content}} </text>
      </view>
    </view>

    <view class="cu-item sm-border no-border" qq:if="{{rolesets.useit && rolesets.fromchannel=='1'}}">
      <text class="text-black text-bold">问题答案 (正则表达式)</text>
      <text class="text-gray">必须</text>
    </view>
    <view class="cu-item sm-border" qq:if="{{rolesets.useit && rolesets.fromchannel=='1'}}" bindtap="setdesc" data-target="rolesets.image">
      <view style="width: 100%; word-wrap: break-word">
        <text class="text-gray">{{rolesets.image}}</text>
      </view>
    </view>
  </view>

  <view class="cu-list menu sm-border card-menu margin-top" qq:if="{{rolesets.useit}}" bindtap="chosechannel">
    <view class="cu-item sm-border arrow">
      <text class="text-bold text-black">验证通知子频道</text>
      <text class="text-gray">{{channelname==''?'发送验证通知的子频道':channelname}}</text>
    </view>
  </view>

  <view class="cu-list menu sm-border card-menu margin-top" qq:if="{{rolesets.useit}}" bindtap="preview">
    <view class="cu-item sm-border arrow">
      <text class="text-bold text-black">验证码预览</text>
    </view>
  </view>

  <view class="margin bg-white padding-sm radius shadow-lg" style="max-height: 60vh" qq:if="{{rolesets.useit && rolesets.fromchannel=='2'}}">
    <button class="bg-red sm" bindtap="cancleallc" style="margin-left: -20rpx; margin-top: -20rpx; border: 0; height: 20rpx; width: 40rpx"></button>
    <scroll-view class="pro_list" scroll-y style="height: 50vh">
      <view class="cu-list grid col-9 no-border">
        <view class="cu-item text-xxxl" qq:for="{{points_ls}}" qq:key="index" bindtap="selectoneA" data-index="{{index}}" style="text-align: center">
          <view class="margin-left-sm cu-avatar round" style='height:50rpx;width:50rpx;{{item.select?"background-color:rgba(0,0,255,0.8);":"background-color:rgba(0,0,0,0.1);"}}'></view>
        </view>
      </view>
    </scroll-view>
  </view>

  <view class="margin" style="text-align: left">
    <view class="margin-top bg-white padding radius-lg">
      <view class="text-sm text-black">说明：</view>
      <view class="text-gray text-sm padding-top-xs">用户可不断尝试，在规定时间内成功即可</view>
      <view class="text-gray text-sm padding-top-xs">验证时长均为十分钟，超时踢出(不会拉黑)</view>
      <view class="text-gray text-sm padding-top-xs">用户在完成验证之前，无法自助领取身份组</view>
      <view class="text-gray text-sm padding-top-xs">问答的答案支持正则表达式，可百度学习</view>
    </view>
  </view>

  <view style="height: 18vh"></view>
</scroll-view>

<view class="bg-white" style="position: fixed; z-index: 1024; bottom: 0; top: auto; left: 0; right: 0">
  <view class="padding">
    <button class="cu-btn block bg-blue margin-tb-sm lg" bindtap="saveall">保存</button>
  </view>
</view>
