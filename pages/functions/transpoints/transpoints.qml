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


<view class="cu-modal bottom-modal {{modalA=='show'?'show':''}}" bindtap="hideModalA">
  <view class="cu-dialog" catchtap="stopit">
    <view class="header-view-top">
      <view class="header-view">
        <view class="header">
          <view></view>
        </view>
        <view class="cu-bar bg-white" catchtap="stopit">
          <view class="action text-black"> </view>
          <text class="text-bold text-black text-lg">选择频道</text>
          <view class="action text-black"> </view>
        </view>
      </view>
    </view>
    <scroll-view scroll-y catchtap="stopit">
      <view style="height: 3vh"></view>

      <view
        class="cu-list menu sm-border margin-top card-menu"
        style='{{item.select?"border: 1px solid rgba(0,0,255,0.5);":""}}'
        qq:for="{{guildlist}}"
        qq:key="{{index}}"
        bindtap="change"
        data-item="{{item}}"
      >
        <view class="cu-item sm-border">
          <view style="display: flex; align-items: center">
            <view class="cu-avatar round lg margin-top-sm margin-bottom-sm" style="background-image:url({{item.guildhead}});">
              <text class="badge" style="position: absolute; bottom: -5px; right: -5px; background-color: blue; color: white; font-size: 12px; padding: 2px 6px; border-radius: 100%">#</text>
            </view>
            <text class="text-black text-bold margin text-cut text-lg" style="max-width: 60vw;">{{item.guildname}}</text>
            <text class="text-grey text-cut" style="max-width:80vw;position:absolute;bottom:0px; left:140rpx;padding:2px 4px;">{{item.guilddesc}}</text>
          </view>
          <view>
            <text class="cuIcon-focus text-blue" style="font-size: 60rpx" qq:if="{{item.select}}"></text>
          </view>
        </view>
      </view>

      <view class="margin">
        <text class="text-blue" bindtap="stips">找不到频道？</text>
      </view>
      <view style="height: 1vh"></view>
    </scroll-view>
  </view>
</view>

<view class="cu-list menu sm-border card-menu margin-top bg-white" bindtap='selectguild' data-type='from'>
    <view class="cu-item flex padding-left-sm margin-bottom-sm margin-top-sm">
      <view class="cu-avatar round" style="background-image:url({{fromg.guildhead}});"></view>
      <view class="content text-gray text-sm padding-left-sm text-cut">
        <text class="text-lg text-black text-bold">{{fromg.guildname}}</text>
        <view class="">{{fromg.guilddesc}}</view>
      </view>
    </view>
</view>
<view class='cuIcon-refresharrow text-blue text-bold' style='text-align:center;font-size:50rpx;'></view>
<view class="cu-list menu sm-border card-menu bg-white" bindtap='selectguild' data-type='to'>
    <view class="cu-item flex padding-left-sm margin-bottom-sm margin-top-sm">
      <view class="cu-avatar round" style="background-image:url({{tog.guildhead}});"></view>
      <view class="content text-gray text-sm padding-left-sm text-cut">
        <text class="text-lg text-black text-bold">{{tog.guildname}}</text>
        <view class="">{{tog.guilddesc}}</view>
      </view>
    </view>
</view>

<view class="cu-list menu sm-border card-menu margin-top" bindtap='selectpoint'>
    <view class="cu-item sm-border arrow text-cut">
    <text class="text-black text-bold">选择积分类型</text>
    <text class='text-gray' style='max-width:70vw;' qq:if='{{pointname}}'>{{pointname}}</text>
    <text class='text-gray' style='max-width:70vw;' qq:else>必选</text>
    </view>
</view>

<view class="margin" style="text-align: left;">
  <view class="margin-top bg-white padding radius-lg">
    <input type='number' placeholder="输入积分数量" maxlength='9' bindinput='onInput' value='{{tmpc}}'></input>
  </view>
</view>

<view class='text-gray margin-left'>跨频转账手续费由各频道自行设置，无固定值</view>
<view class='text-gray margin-left'>转账要求目标频道有同名积分类型</view>
<view class='text-gray text-bold margin-left margin-top'>‱ 万分符 不足1点的部分将采用银行家舍入法</view>
<view class='text-gray text-bold margin-left'>当前来源频道转出手续费：{{fromrate}}‱</view>
<view class='text-gray text-bold margin-left'>当前目标频道转入手续费：{{torate}}‱</view>

<view class="padding">
<button class="cu-btn block bg-blue lg" bindtap='saveall'>跨频转账</button>
</view>

<view class='margin-top-sm' style='{{showad?"":"display:none;"}}'>
<ad unit-id="d058336e9ac992d615e8362967d7ddf0" binderror='aderr' bindload='adsucc'></ad>
</view>