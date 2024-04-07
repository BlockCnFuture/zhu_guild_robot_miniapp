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
     <text class="text-yellow cuIcon-recharge text-bold"><text class="text-black text-bold"> 银行资产</text></text>
    </view>
    <view class="cu-item text-cut no-border" qq:for='{{pointlist}}' qq:key='{{index}}' data-item='{{item}}' bindtap='showpointinfo' data-info='{{item.point_desc}}'>
     <text class="text-black text-bold">{{item.point_name}} <text class="cuIcon-info text-blue"></text></text>
     <view class='flex'>
     <view class="text-black text-bold text-cut" style='max-width:30vw;margin-right:10rpx;margin-top:6rpx;'>{{item.point_cnt}}</view>
     <view class="text-red text-cut" style='max-width:20vw;font-size:32rpx;font-weight:bold;margin-right:10rpx;margin-top:4rpx;' qq:if='{{item.extr>0}}'>+{{item.extr}}</view>
     <view class="text-gray text-cut" style='margin-right:10rpx;margin-top:4rpx;' qq:else>收益低于1</view>
     <button class="cu-btn line-blue round sm" catchtap='gainext' data-item='{{item}}' qq:if='{{item.extr>0}}'>领取</button>
     </view>
    </view>
</view>

<view class='text-black margin-left margin-top'>* 收益由每日0点更新</view>

<navigator open-type='navigate' url='/pages/functions/mypoints/mypoints'>
<view class="cu-list menu sm-border card-menu margin-top">
    <view class="cu-item sm-border arrow text-cut">
    <text class="text-black text-bold">查看我的资产</text>
    </view>
</view>
</navigator>

<navigator open-type='navigate' url='/pages/functions/upointslist/upointslist'>
<view class="cu-list menu sm-border card-menu margin-top">
    <view class="cu-item sm-border arrow text-cut">
    <text class="text-black text-bold">查看资产排行及变动明细</text>
    </view>
</view>
</navigator>

<view class='text-gray margin-left margin-top'>资产变更</view>
<view class="cu-list menu sm-border card-menu margin-top" bindtap='selectpoint'>
    <view class="cu-item sm-border arrow text-cut">
    <text class="text-black text-bold">选择积分类型</text>
    <text class='text-gray' style='max-width:70vw;' qq:if='{{fromp.point_name}}'>{{fromp.point_name}}</text>
    <text class='text-gray' style='max-width:70vw;' qq:else>必选</text>
    </view>
</view>

<view class="margin" style="text-align: left;">
  <view class="margin-top bg-white padding radius-lg">
    <input type='number' placeholder="输入积分数量" maxlength='9' bindinput='onInput' value='{{tmpc}}'></input>
  </view>
</view>

<view class='text-gray margin-left'>积分存取手续费、银行利率由各频道自行设置，无固定值</view>
<view class='text-gray margin-left'>系统不会自动结算，请手动领取收益（扣除转出手续费）</view>
<view class='text-gray margin-left'>收益为浮动收益，取决于上次领取时间和当前银行利率</view>

<view class="cu-bar flex padding justify-between">
<button class="cu-btn block bg-blue" bindtap='inbank'>存入</button>
<button class="cu-btn block bg-blue" bindtap='outbank'>取出</button>
</view>

<view class='text-gray text-bold margin-left margin-top'>‱ 万分符 不足1点的部分将采用银行家舍入法</view>
<view class='text-gray text-bold margin-left'>积分浮动日利率：{{bankrate}}‱</view>
<view class='text-gray text-bold margin-left'>积分取出手续费：{{leaverate}}‱</view>
<view class='text-gray text-bold margin-left'>积分存入手续费：{{enterrate}}‱</view>

<view class='margin-top-sm' style='{{showad?"":"display:none;"}}'>
<ad unit-id="d058336e9ac992d615e8362967d7ddf0" binderror='aderr' bindload='adsucc'></ad>
</view>