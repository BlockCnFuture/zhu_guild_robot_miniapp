<view class='cu-load load-modal' qq:if="{{loadModal}}">
  <image src='/images/logo.jpeg' class='png' mode='aspectFit'></image>
  <view class='gray-text'>加载中...</view>
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
      <input type="text" placeholder="搜索昵称" confirm-type="search" bindinput="onSearchInput"></input>
    </view>
  </view>


<scroll-view scroll-y style="height:100vh;" bindscrolltolower='fetch_list'>

  <view class="cu-list menu sm-border card-menu margin-top">
    <view class="cu-item sm-border" qq:for="{{userlist}}" qq:key='index' data-item='{{item}}' qq:if='{{item.show}}'>
    <view class="cu-avatar round" style="background-image:url({{item.userhead}});" catchtap='ViewImage' data-url='{{item.userhead}}'></view>
      <view class="content margin-left-sm text-cut" catchtap='copyid' data-id='{{item.userid}}'>
        <text class="text-black">{{item.username}}</text>
      </view>
      <text class="text-black">{{item.entertime}}</text>
    </view>
  </view>

    <view class="cu-list menu sm-border card-menu margin-top" qq:if='{{!complete}}'>
    <view class="text-center">
      <button class="cu-btn line-blue sm round" bindtap="fetch_list">加载更多</button>
    </view>
  </view>
  
  <view class="cu-list menu sm-border card-menu margin-top" qq:if='{{complete}}'>
    <view class="text-center">
      <text class="text-gray">没有更多数据</text>
    </view>
  </view>

  <view class="cu-tabbar-height"></view>
</scroll-view>
