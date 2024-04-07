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
  
<view class="cu-modal bottom-modal {{modalA=='show'?'show':''}}" bindtap="hideModalA">
  <view class="cu-dialog" catchtap="stopit">
    <view class="header-view-top">
      <view class="header-view">
        <view class="header">
          <view></view>
        </view>
        <view class="cu-bar bg-white" catchtap="stopit">
          <view class="action text-black" catchtap="hideModalA">取消</view>
          <text class="text-bold text-black text-lg">选择收货地址</text>
          <view class="action text-black"> </view>
        </view>
      </view>
    </view>
    <scroll-view scroll-y catchtap="stopit">
      <view style="height: 40rpx"></view>

      <view class="bg-white margin-sm radius-lg">
        <block qq:for="{{addresslist}}" qq:key="index" data-item="{{item}}" data-index="{{index}}">
          <view class="flex padding-top-xs" data-item="{{item}}" bindtap="gainbyaddr">
            <view class="flex-treble">
              <view class="flex padding-lr-xs">
                <view class="padding-xs text-black">
                  <view class="text-cut">
                    <view style="display: flex; align-items: center">
                      <text class="text-bold">{{item.name}}</text>
                      <text class="text-sm padding-left">{{item.phone}}</text>
                    </view>
                  </view>
                  <view class="text-gray text-sm padding-tb-sm text-cut" style="max-width: 80vw"> {{item.address}} </view>
                </view>
              </view>
            </view>
            <view class="flex-sub">
              <view class="flex justify-end text-black text-xl"> </view>
            </view>
          </view>
        </block>
      </view>

      <view class="margin">
        <text class="text-blue" bindtap="jumptolocation">>>创建新的收货地址</text>
      </view>
      <view style="height: 100rpx"></view>
    </scroll-view>
  </view>
</view>

<view class="" style="margin: 16rpx; border-radius:30rpx;">
  <image src="{{item.image}}" mode="widthFix" bindtap="ViewImage" data-url="{{item.image}}" style="border-radius:30rpx;width:100%"></image>
</view>

<view class="margin" style="text-align: left">
  <view class="margin-top bg-white padding radius-lg">
    <view style="max-width: 80vw">
      <view class="text-red" style="font-size: 38rpx; font-weight: bold">{{item.pointcnt}}<text class="text-red text-df" style="font-weight: 400">{{item.point_name}}</text></view>
    </view>
    <view class="margin-top-sm" style="max-width: 80vw">
      <view class="text-black" style="font-size: 34rpx; font-weight: bold">{{item.name}}</view>
    </view>
  </view>
</view>

<view class="margin">
  <view class="margin-top bg-white padding radius-lg">
    <view class="margin-bottom" style="text-align: center">
      <text class="text-orange" style="font-size: 26rpx; width: 100%">- 礼品介绍 -</text>
    </view>
    <text class="text-black" style="font-size: 26rpx; width: 100%; word-wrap: break-word; text-align: left" bindtap="CopyText" data-link="{{item.goodsdesc}}">{{item.goodsdesc}}</text>
    <view class="radius-lg bg-white" style="margin-top: 16rpx" qq:if="{{item.descimg}}">
      <image src="{{item.descimg}}" bindtap="ViewImage" data-url="{{item.descimg}}" mode="widthFix" style="width: 100%; border-radius: 20rpx"></image>
    </view>
  </view>
</view>

<view class="margin">
  <view class="margin-top bg-white padding radius-lg">
    <view class="margin-bottom" style="text-align: center">
      <text class="text-orange" style="font-size: 26rpx; width: 100%">- 责任声明 -</text>
    </view>
    <text class="text-black" style="font-size: 26rpx; width: 100%; word-wrap: break-word; text-align: left"
      >1、该礼品由当前频道提供，与《初遇小竹》无关
      2、对活动或礼品有任何疑问请联系频道主
      3、活动或礼品最终解释权归当前频道所有
      4、若礼品涉嫌侵权、虚假、违规，请点击 </text
    ><button class="cu-btn round line-red sm margin-right" open-type="openGuildProfile" guild-id="{{adminguildid}}">举报</button>
    <text class="text-black" style="font-size: 26rpx; width: 100%; word-wrap: break-word; text-align: left">
    进入我的服务频道进行反馈</text>
    <text class="text-blue" style="font-size: 26rpx; width: 100%; word-wrap: break-word; text-align: left">
    我们将积极处理任何违规内容并处罚对应频道主</text>
  </view>
</view>

<view style="height: 240rpx"></view>

<view class="bg-white" style="position: fixed; z-index: 1024; bottom: 0; top: auto; left: 0; right: 0">
  <view class="padding">
    <view style="max-width: 80vw">
      <view class="text-red" style="font-size: 38rpx; font-weight: bold"
        ><text class="text-red text-df" style="font-weight: 400">消耗</text> {{item.pointcnt}} <text class="text-red text-df" style="font-weight: 400">{{item.point_name}}</text></view
      >
    </view>
    <button class="cu-btn block bg-red round margin-tb-sm lg" bindtap="gaingoods">兑换礼品</button>
  </view>
</view>
