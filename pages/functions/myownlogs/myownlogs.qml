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
      <input type="text" placeholder="搜索 时间|日志内容" confirm-type="search" bindinput="onSearchInput"></input>
    </view>
  </view>

<scroll-view scroll-y style="height:100vh;" bindscrolltolower='loadmore'>
<view style='height:8vh;'></view>

  <view class="cu-list menu sm-border card-menu margin-top" qq:for="{{logs}}" qq:key='index' data-item='{{item}}' qq:if='{{item.show}}'>
      <view class="cu-bar bg-white">
      <view class="action text-green" bindtap='copytime' data-item='{{item}}'>{{item.time}}</view>
    </view>
    <view class="cu-item sm-border">
    <view class="cu-avatar round" style="background-image:url({{item.userhead}});" bindtap='copyid' data-item='{{item}}'></view>
      <view class="content margin-left-sm">
        <text class="text-black" bindtap='copynick' data-item='{{item}}'>{{item.usernick}}</text>
        <view class="cu-tag radius sm bg-red" qq:if='{{item.userrole==2}}'>频道主</view>
        <view class="cu-tag radius sm bg-blue" qq:if='{{item.userrole==1}}'>超级管理员</view>
        <view class="cu-tag radius sm bg-grey" qq:if='{{item.userrole==0}}'>其他成员</view>
      </view>
    </view>
    <view class="cu-item sm-border" bindtap="copylog" data-item='{{item}}'>
    <view style='width: 100%;word-wrap: break-word;'>
      <text class="text-blue">{{item.logs}}</text>
      </view>
    </view>
  </view>

  <view class="cu-list menu sm-border card-menu margin-top" qq:if='{{!complete}}'>
    <view class="text-center">
      <button class="cu-btn line-blue sm round" bindtap="loadmore">加载更多</button>
    </view>
  </view>
  
  <view class="cu-list menu sm-border card-menu margin-top" qq:if='{{complete}}'>
    <view class="text-center">
      <text class="text-gray">没有更多数据</text>
    </view>
  </view>

  <view class="cu-tabbar-height"></view>

</scroll-view>