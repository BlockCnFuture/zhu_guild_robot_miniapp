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
      <view class="cu-bar bg-white">
      <view class="action text-black"> </view>
      <text class="text-bold text-black text-lg">选择赞助通道</text>
      <view class="action text-black"> </view>
      </view>
  </view>
  </view>
  <scroll-view scroll-y catchtap='stopit'>

<view style='height:1vh;'></view>

  <view class="cu-list menu sm-border margin-top">

  <view class="cu-item sm-border" qq:for="{{paytypels}}" qq:key='index' catchtap='pclick' data-index='{{index}}' data-item='{{item}}' qq:if='{{item.show}}'>
<view style='display: flex;align-items: center;'>
<text class="text-black text-cut" style='max-width:70vw;'>{{item.name}}</text>
</view>
</view>

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
      <view class="cu-bar bg-white">
      <view class="action text-black"> </view>
      <text class="text-bold text-black text-lg">选择积分类型</text>
      <view class="action text-black"> </view>
      </view>
  </view>
  </view>
  <scroll-view scroll-y catchtap='stopit'>

<view style='height:1vh;'></view>

  <view class="cu-list menu sm-border margin-top">

  <view class="cu-item sm-border" qq:for="{{pointlist}}" qq:key='index' catchtap='kclick' data-index='{{index}}' data-item='{{item}}'>
<view style='display: flex;align-items: center;'>
<text class="cuIcon-recharge text-blue margin-right-sm"></text>
<text class="text-black text-cut" style='max-width:70vw;'>{{item.point_name}}</text>
</view>
<view style='display: flex;' catchtap='showpointinfo' data-info='{{item.point_desc}}'>
<text class="cuIcon-info text-black"></text>
</view>
</view>

  </view>
  </scroll-view>
  </view>
</view>


<view class="margin">
  <view class="margin-top bg-white padding radius-lg">
    <view class="margin-bottom" style="text-align: center">
      <text class="text-orange" style="font-size: 26rpx; width: 100%">- 赞助说明 -</text>
    </view>
    <text class="text-black text-bold" style="font-size: 26rpx; width: 100%; word-wrap: break-word; text-align: left"
      >1、赞助通道由《爱发电》提供，与《初遇小竹》无关
      2、任何赞助视为自愿赞助频道主，请用户自行考虑
      3、赞助得到的回礼，为附赠礼品，无商品性质
      4、任何因赞助产生的纠纷，均由频道主担责 </text
    >
  </view>
</view>











<view qq:if='{{showtype==0}}'>
<view class="margin" style="text-align: left;">
  <view class="margin-top bg-white padding radius-lg">
    <input type='number' placeholder="输入赞助金额" maxlength='4' bindinput='onInput' value='{{tmpc}}'></input>
  </view>
</view>

<view class='text-black margin-left margin-top' qq:if='{{isets.s1.userpayfee}}'>* 爱发电收取6%手续费，当前频道设置为由用户承担</view>

<view class="cu-list menu sm-border card-menu margin-top" bindtap='selectpaytype'>
    <view class="cu-item sm-border arrow text-cut">
    <text class="text-black text-bold">选择赞助通道</text>
    <text class='text-gray' style='max-width:70vw;' qq:if='{{nowpaytype.name}}'>{{nowpaytype.name}}</text>
    <text class='text-gray' style='max-width:70vw;' qq:else>必选</text>
    </view>
</view>

    <view class="cu-list menu sm-border card-menu margin-top">
      <view class="cu-item sm-border no-border">
        <text class="text-bold text-black">希望获得频道主回礼</text>
        <switch class="sm" bindchange="RolesSwitch" checked="{{needpoints}}" data-target="needpoints"></switch>
      </view>
      <view class="cu-item sm-border arrow text-cut" qq:if='{{needpoints}}' bindtap='selectpoint'>
    <text class="text-black text-bold">选择回礼积分类型</text>
    <text class='text-gray' style='max-width:60vw;' qq:if='{{nowpoint.point_name}}'>{{nowpoint.point_name}}</text>
    <text class='text-gray' style='max-width:60vw;' qq:else>必选</text>
    </view>
    </view>

<view class='text-gray text-bold margin-left margin-top'>预计获得回礼积分：{{cangainpoints}}点</view>

  <view class="padding">
    <button class="cu-btn block bg-blue margin-tb-sm lg" bindtap="saveall">赞助</button>
  </view>
</view>


<view qq:if='{{showtype==1}}'>




<view class="margin" qq:if='{{iswechat}}'>

<view class='text-black margin-top' style='text-align: center'>请发送code到微信聊天页，进入付款后点击 "我已付款"</view>

<view class="cu-list menu margin-top radius-lg">
      <view class="cu-item sm-border">
      <text class="text-bold text-black">付款code</text>
      <input value="{{isets.s2.payurl}}" style='text-align:right;min-width:68vw;'></input>
    </view>
  </view>

<view style='text-align:right;'>
  <button class="cu-btn bg-blue sm round" style='margin-top:10rpx;' data-link='{{isets.s2.payurl}}' catchtap="CopyText">复制code</button>
</view>

</view>
<!--
<view class='text-black margin-left margin-top' style='text-align: center' qq:if='{{iswechat}}'>请使用微信扫码付款，完成后点击 "我已付款"</view>

<view class="margin" qq:if='{{iswechat}}'>
  <view class="margin-top bg-white padding radius-lg">
    <view class="radius-lg bg-white" style="margin-top: 16rpx">
      <image src="{{isets.s2.payurl}}" bindtap="ViewImage" data-url="{{isets.s2.payurl}}" mode="widthFix" style="width: 100%; border-radius: 20rpx"></image>
    </view>
  </view>
</view>
-->

<view class="margin" qq:if='{{!iswechat}}'>

<view class='text-black margin-left margin-top' style='text-align: center'>请在浏览器打开链接，付款后点击 "我已付款"</view>

<view class="cu-list menu margin-top radius-lg">
      <view class="cu-item sm-border">
      <text class="text-bold text-black">付款地址</text>
      <input value="{{isets.s2.payurl}}" style='text-align:right;min-width:68vw;'></input>
    </view>
  </view>

<view style='text-align:right;'>
  <button class="cu-btn bg-blue sm round" style='margin-top:10rpx;' data-link='{{isets.s2.payurl}}' catchtap="CopyText">复制</button>
</view>

</view>

<view class="cu-bar padding flex justify-between">
<button class="cu-btn round line-blue" bindtap='checka'>我已付款</button>
<button class="cu-btn round line-red" bindtap='checkb'>取消赞助</button>
</view>

</view>





<view class='margin-top-sm' style='{{showad?"":"display:none;"}}'>
<ad unit-id="d058336e9ac992d615e8362967d7ddf0" binderror='aderr' bindload='adsucc'></ad>
</view>