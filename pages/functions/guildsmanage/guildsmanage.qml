<view class='cu-load load-modal' qq:if="{{loadModal}}">
  <image src='/images/logo.jpeg' class='png' mode='aspectFit'></image>
  <view class='gray-text'>加载中...</view>
</view>


<view class="cu-modal {{modal.show?'show':''}}">
  <view class="cu-dialog">
    <view class="cu-bar bg-white justify-end">
      <view class="content">{{modal.title}}</view>
      <view qq:if='{{modal.cancle.title!=""}}' class="action" bindtap="hideModal" data-url='{{modal.cancle.url}}'>
        <text class="cuIcon-close text-red"></text>
      </view>
    </view>
    <text class="padding-xl text-left">
      {{modal.content}}

    </text>
    <view class="cu-bar bg-white justify-end">
      <view class="action">
        <button qq:if='{{modal.cancle.title!=""}}' class="cu-btn line-green text-green" bindtap="hideModal" data-url='{{modal.cancle.url}}'>{{modal.cancle.title}}</button>
        <button qq:if='{{modal.fine.title!=""}}' class="cu-btn bg-green margin-left" bindtap="hideModal" data-url='{{modal.fine.url}}'>{{modal.fine.title}}</button>
      </view>
    </view>
  </view>
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
      <input type="text" placeholder="搜索 频道名称 | 频道id" confirm-type="search" bindinput="onSearchInput"></input>
    </view>
  </view>

<view class="bg-white" style="position:fixed;top:auto;left:0;right:0;z-index:999;">
  <view class="cu-bar bg-white flex padding justify-between">
  <button class="cu-btn line-blue sm round" catchtap="copyguild">复制id</button>
  <button class="cu-btn bg-red sm round" catchtap="opsome" data-op='not'>封禁频道</button>
  <button class="cu-btn bg-green sm round" catchtap="opsome" data-op='yes'>解禁频道</button>
  <button class="cu-btn line-blue sm round" catchtap="copynick">复制名称</button>
  </view>
</view>

<scroll-view scroll-y style="height:100vh;" bindscrolltolower='fetch_list'>
<view style='height:8vh;'></view>

      <view
        class="cu-list menu sm-border margin-top card-menu"
        style='{{item.select?"border: 1px solid rgba(0,0,255,0.5);":""}}'
        qq:for="{{list}}" 
        qq:key='index' 
        qq:if='{{item.show}}'
        bindtap="change"
        data-item="{{item}}"
      >
        <view class="cu-item sm-border no-border">
          <view style="display: flex; align-items: center">
            <view class="cu-avatar round lg margin-top-sm margin-bottom-sm" style="background-image:url({{item.head}});" catchtap="ViewImage" data-url='{{item.head}}'>
              <text class="badge" style="position: absolute; bottom: -5px; right: -5px; background-color: blue; color: white; font-size: 12px; padding: 2px 6px; border-radius: 100%">#</text>
            </view>
            <text class="text-black text-bold margin-left text-cut text-lg" style="max-width: 60vw;margin-bottom:30rpx;">{{item.name || '暂未获取'}}</text>
            <text class="text-grey text-cut" style="max-width:80vw;position:absolute;bottom:0px; left:140rpx;padding:2px 4px;margin-bottom:20rpx;">过期日：{{item.exptime}}</text>
          </view>
          <view>
          <button class="cuIcon-focus text-blue" open-type="{{item.guildr?'openGuildProfile':''}}" guild-id="{{item.guildr}}" style="font-size: 60rpx" qq:if="{{item.select}}"></button>
          </view>
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

  <view style="height:3vh;"></view>
</scroll-view>
