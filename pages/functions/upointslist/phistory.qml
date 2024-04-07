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
      <input type="text" placeholder="搜索 操作人昵称 | 变动原因" confirm-type="search" bindinput="onSearchInput"></input>
    </view>
  </view>


<scroll-view scroll-y style="height: 100vh" bindscrolltolower="showmore">
  <view style="height: 10rpx"></view>

  <view class="cu-list menu sm-border card-menu margin-top" qq:if='{{list.length>0}}'>
    <view class="text-gray text-bold" style='text-align:center;'>注意: 系统仅保留3日内的变动数据</view>
  </view>

  <view class="cu-list menu-avatar">
    <view class="cu-item" qq:for="{{list}}" qq:key="item" style="border-radius: 20rpx; height: 160rpx" qq:if="{{item.show}}" data-item="{{item}}" data-target="move-box-{{index}}" qq:if='{{item.show}}'>
      <view class="cu-avatar round lg" style="background-image:url({{item.ophead}});" bindtap='ViewImage' data-url='{{item.ophead}}'></view>
      <view class="content">
        <view class="text-black text-bold text-cut" style="max-width:500rpx">{{item.opnick}}</view>
        <view>
           <view class='text-red text-cut' style='font-size:38rpx;font-weight:bold;'>{{item.changepoint}} <text class='text-gray text-df' style='font-weight:400;'>{{point_name}}</text></view>
        </view>
           <view class="text-gray text-sm text-cut" bindtap='copyText' data-name='原因' data-link='{{item.reason}}'>{{item.reason}}</view>
      </view>
      <view class="action" style='min-width:180rpx;'>
        <view class="text-grey text-xs text-cut">{{item.time}}</view>
      </view>
    </view>
  </view>

  <view class="cu-list menu sm-border card-menu margin-top" qq:if="{{!point_id}}">
    <view class="text-gray text-bold" style='text-align:center;'>请先选择积分类型</view>
  </view>

  <view class="cu-list menu sm-border card-menu margin-top" qq:if="{{!complete && point_id}}">
    <view class="text-center">
      <button class="cu-btn line-blue sm round" bindtap="showmore">加载更多</button>
    </view>
  </view>

  <view class="cu-list menu sm-border card-menu margin-top" qq:if="{{complete && point_id}}">
    <view class="text-center">
      <text class="text-gray">没有更多数据</text>
    </view>
  </view>
  <view style="height: 60rpx"></view>
</scroll-view>
