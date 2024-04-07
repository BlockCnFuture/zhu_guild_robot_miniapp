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

<view class="margin-sm radius-lg" style="min-height: 90vh" qq:if="{{rolesets.guildrid}}">
  <view style="height: 10rpx"></view>

  <swiper class="margin-lr-lg" autoplay="true" vertical="true" circular="true" interval="3500" duration="500" style='height: 160rpx;'>
    <block>
      <swiper-item catchtouchmove='false'>
        <view class="cu-bar radius-lg bg-white light">
          <view class='margin'>
            <view class='text-blue'>为使您可以正常获得被邀请奖励</view>
            <view class='text-black'><text class='text-red'>IOS</text>用户请在加入后<text class='text-red'>返回小程序页</text></view>
            <view class='text-black'>使按钮显示为<text class='text-red'>"已加入"</text></view>
          </view>
        </view>
      </swiper-item>
    </block>
  </swiper>

  <view class="cu-list menu sm-border card-menu margin-top bg-white">
    <view class="margin">
      <view>
        <view style="display: flex; align-items: center">
          <view class="cu-avatar radius" style="background-image:url({{rolesets.authorhead}});height:16px;width:16px;margin-right:6px;"></view>
          <text class="text-grey text-cut" style="max-width: 70vw">{{rolesets.authorname}}</text>
        </view>
      </view>
    </view>

    <view class="margin" style="margin-top: -10rpx">
      <text class="text-black" style="white-space: pre-wrap; overflow-wrap: break-word">{{rolesets.idesc}}</text>
    </view>

    <view class="margin" style="margin-top: 60rpx">
      <view>
        <view style="text-align: center">
          <view class="cu-avatar radius-df" style="background-image:url({{rolesets.guildhead}});height:120rpx;width:120rpx;"></view>
        </view>
        <view style="margin: 20rpx">
          <view style="text-align: center">
            <text class="text-black text-lg text-bold" style="max-width: 40vw">{{rolesets.guildname}}</text>
          </view>
        </view>
      </view>
    </view>

    <view class="cu-item sm-border">
      <view style="margin: 40rpx; width: 100%">
        <view style="text-align: center">
          <button open-type="{{hasenter?'':'openGuildProfile'}}" guild-id="{{rolesets.guildrid}}" class="cu-btn margin-tb-sm line-{{hasenter?'grey':'blue'}}">{{hasenter?'已加入':'加入频道'}}</button>
        </view>
      </view>
    </view>

    <view class="cu-item sm-border">
      <view>
        <text class="text-blue text-bold">#</text>
        <text class="text-grey"> QQ频道</text>
      </view>
    </view>
  </view>
</view>

<view style="height: 3vh"></view>
