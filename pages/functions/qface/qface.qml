<view class="cu-load load-modal" qq:if="{{loadModalS}}">
  <image src="/images/logo.jpeg" class="png" mode="aspectFit"></image>
  <view class="gray-text">下载表情...</view>
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
      <input type="text" placeholder="搜索 小黄豆表情id" confirm-type="search" bindinput="onSearchInput"></input>
    </view>
  </view>


<view class="container_index">

  <view class="cu-list menu sm-border card-menu margin-top">
    <view class="cu-item sm-border">
      <view class="content">
        <text class="text-black text-bold">文本形式</text>
      </view>
      <button class="cu-btn round" data-c="{{content}}" bindtap="copystr">复制</button>
    </view>
    <view class="cu-item sm-border">
      <view class="content">
        <text class="text-black">{{content}}</text>
      </view>
    </view>
  </view>

  <view class='margin bg-white padding-sm radius shadow-lg' style="max-height: 60vh;">
    <scroll-view class="pro_list" scroll-y style="height: 50vh;">

      <view class="cu-list grid col-7 no-border">

        <view class="cu-item text-xxxl" qq:for="{{qface_ls}}" qq:key="index" bindtap="{{item.id=='9999'?'':'qfaceadd'}}" data-value="{{item}}" style='text-align:center;'>
          <image class='margin-left-sm' src='{{item.id=="9999"?"":item.link}}' style='height:70rpx;width:70rpx;' qq:if='{{!item.hiden}}'></image>
        </view>

        <view class="cu-item text-xxxl" qq:for="{{emoji_ls}}" qq:key="index" bindtap="qfaceadd" data-value="{{item}}" style='text-align:center;'>
          <image class='margin-left-sm' src='{{item.link}}' style='height:70rpx;width:70rpx;' qq:if='{{!item.hiden}}'></image>
        </view>

      </view>
    </scroll-view>
  </view>

</view>

<view style='height:3vh;'></view>

<view class='margin-top-sm' style='{{showad?"":"display:none;"}}'>
<ad unit-id="9588eccae9ffee72b88d1688ab72cf91" type="card" binderror='aderr' bindload='adsucc'></ad>
</view>

<view style='height:3vh;'></view>