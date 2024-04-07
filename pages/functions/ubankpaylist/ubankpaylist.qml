<view class="cu-load load-modal" qq:if="{{loadModal}}">
  <image src="/images/logo.jpeg" class="png" mode="aspectFit"></image>
  <view class="gray-text">加载中...</view>
</view>

<view class="cu-bar bg-white fixed">
      <view class="cu-bar bg-white" style='max-width:140rpx;'>
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
    <view class="search-form round">
      <text class="cuIcon-search"></text>
      <input type="text" placeholder="搜索 用户昵称" confirm-type="search" bindinput="onSearchInput"></input>
    </view>
  </view>

<scroll-view scroll-y style="height: 100vh" bindscrolltolower="showmore">
  <view style="height: 10rpx"></view>

  <view class="cu-list menu sm-border card-menu margin-top" qq:if='{{list.length>0}}'>
    <view class="text-gray text-bold" style='text-align:center;'>注意: 系统仅保留180日内的变动数据</view>
  </view>

  <view class="cu-list menu-avatar">
    <view class="cu-item" qq:for="{{list}}" qq:key="item" style="border-radius: 20rpx; height: 160rpx" qq:if="{{item.show}}" data-item="{{item}}" qq:if='{{item.show}}'>
      <view class='text-{{item.index==1?"red":item.index==2?"purple":item.index==3?"orange":"gray"}} light' style="position: absolute; left: 26rpx; font-size: 60rpx; font-weight: 500">{{item.index}}. </view>
      <view class="cu-avatar round lg" style="background-image:url({{item.head}});margin-left:{{item.left}}rpx;{{item.index<=3?'box-shadow:0 0 0 1px #ff000090':''}}"
        catchtap='ViewImage' data-url='{{item.head}}'><view qq:if="{{item.index==1}}" class="cu-tag badge cuIcon-crownfill bg-yellow"></view><view qq:if="{{item.index==2}}" class="cu-tag badge cuIcon-upstagefill bg-purple"></view><view qq:if="{{item.index==3}}" class="cu-tag badge cuIcon-upstagefill bg-orange"></view></view>
      <view class="content" style="margin-left:{{item.left}}rpx" bindtap='copyText' data-name='id' data-link='{{item.user_id}}'>
        <view class="text-black text-bold text-cut" style="max-width:500rpx">{{item.nick}}</view>
        <view class="text-gray text-sm"> 累计赞助 <text class="text-black text-bold">{{item.totalamount}}</text> ￥</view>
      </view>
    </view>
  </view>

  <view class="cu-list menu sm-border card-menu margin-top" qq:if="{{!complete}}">
    <view class="text-center">
      <button class="cu-btn line-blue sm round" bindtap="showmore">加载更多</button>
    </view>
  </view>

  <view class="cu-list menu sm-border card-menu margin-top" qq:if="{{complete}}">
    <view class="text-center">
      <text class="text-gray">没有更多数据</text>
    </view>
  </view>
  <view style="height: 60rpx"></view>
</scroll-view>
