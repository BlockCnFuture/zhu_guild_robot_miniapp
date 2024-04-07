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
      <input type="text" placeholder="搜索指令名" confirm-type="search" bindinput="onSearchInput"></input>
    </view>
  </view>

<scroll-view scroll-y>

<view style='height:8vh;'></view>

<swiper class="tips-swiperitem margin" autoplay="true" vertical="true" circular="true" interval="4000" duration="1000" style='height:60rpx;'>
    <block wx:for="{{Headlines}}" wx:key="index">
      <swiper-item catchtouchmove='false'>
        <view class="radius-lg bg-orange light">
          <view class='padding-xs text-xl'>
            <text class='cuIcon-notice text-orange'></text>
            <text class="text-df"> {{item.title}}</text>
          </view>
        </view>
      </swiper-item>
    </block>
  </swiper>

  <view class="cu-list menu sm-border card-menu margin-top">
    <text>无权限要求的指令列表</text>
  </view>

  <view class="cu-list menu sm-border card-menu margin-top" qq:for="{{oclist}}" qq:key="{{index}}" data-item="{{item}}" qq:if='{{item.show}}'>
    <view class="cu-item sm-border">
      <view class="content">
        <text class="text-blue text-bold">@机器人 </text>
        <text class="text-black text-bold">/{{item.c}}</text>
      </view>
      <button class="cu-btn round" data-c="{{item.c}}" bindtap="copycommand">复制</button>
    </view>
    <view class="cu-item sm-border">
      <text class="text-gray">{{item.d}} </text>
    </view>
  </view>

  <view class="cu-list menu sm-border card-menu margin-top">
    <text>有权限要求的指令列表</text>
  </view>

  <view class="cu-list menu sm-border card-menu margin-top" qq:for="{{clist}}" qq:key="{{index}}" data-item="{{item}}" qq:if='{{item.show}}'>
    <view class="cu-item sm-border">
      <view class="content">
        <text class="text-blue text-bold">@机器人 </text>
        <text class="text-black text-bold">/{{item.c}}</text>
      </view>
      <button class="cu-btn round" data-c="{{item.c}}" bindtap="copycommand">复制</button>
    </view>
    <view class="cu-item sm-border">
      <text class="text-gray">{{item.d}} </text>
    </view>
  </view>

  <view style='height:3vh;'></view>
</scroll-view>
