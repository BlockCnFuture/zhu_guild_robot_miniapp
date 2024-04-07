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





<view class="cu-list menu sm-border card-menu margin-top">
    <view class="cu-item text-cut">
     <text class="text-yellow cuIcon-recharge text-bold"><text class="text-black text-bold"> 我的资产</text></text>
    </view>
    <view class="cu-item text-cut no-border" qq:for='{{pointlist}}' qq:key='{{index}}' data-item='{{item}}' bindtap='showpointinfo' data-info='{{item.point_desc}}'>
     <text class="text-black text-bold">{{item.point_name}} <text class="cuIcon-info text-blue"></text></text>
     <text class="text-black text-bold" style='max-width:60vw;'>{{item.point_cnt}}</text>
    </view>
</view>

<navigator open-type='navigate' url='/pages/functions/upointslist/upointslist'>
<view class="cu-list menu sm-border card-menu margin-top">
    <view class="cu-item sm-border arrow text-cut">
    <text class="text-black text-bold">查看资产排行及变动明细</text>
    </view>
</view>
</navigator>

<view class='text-gray margin-left margin-top'>资产转换</view>
<view class="cu-list menu sm-border card-menu margin-top" bindtap='selectpoint' data-type='from'>
    <view class="cu-item sm-border arrow text-cut">
    <text class="text-black text-bold">选择来源积分类型</text>
    <text class='text-gray' style='max-width:70vw;' qq:if='{{fromp.point_name}}'>{{fromp.point_name}}</text>
    <text class='text-gray' style='max-width:70vw;' qq:else>必选</text>
    </view>
</view>
<view class='cuIcon-refresharrow text-blue text-bold' style='text-align:center;font-size:50rpx;'></view>
<view class="cu-list menu sm-border card-menu" bindtap='selectpoint' data-type='to'>
    <view class="cu-item sm-border arrow text-cut">
    <text class="text-black text-bold">选择目标积分类型</text>
    <text class='text-gray' style='max-width:70vw;' qq:if='{{top.point_name}}'>{{top.point_name}}</text>
    <text class='text-gray' style='max-width:70vw;' qq:else>必选</text>
    </view>
</view>

<view class="margin" style="text-align: left;">
  <view class="margin-top bg-white padding radius-lg">
    <input type='number' placeholder="输入积分数量" maxlength='9' bindinput='onInput' value='{{tmpc}}'></input>
  </view>
</view>

<view class='text-gray margin-left'>积分转换手续费由各频道自行设置，无固定值</view>
<view class='text-gray text-bold margin-left margin-top'>‱ 万分符 不足1点的部分将采用银行家舍入法</view>
<view class='text-gray text-bold margin-left'>来源积分转换转出手续费：{{fromrate}}‱</view>
<view class='text-gray text-bold margin-left'>目标积分转换转入手续费：{{torate}}‱</view>

<view class="padding">
<button class="cu-btn block bg-blue lg" bindtap='saveall'>积分转换</button>
</view>

<view class='margin-top-sm' style='{{showad?"":"display:none;"}}'>
<ad unit-id="d058336e9ac992d615e8362967d7ddf0" binderror='aderr' bindload='adsucc'></ad>
</view>