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
  
<scroll-view scroll-y style="height: 100vh" bindscrolltolower="showmore">
  <view style="height: 10rpx"></view>

  <view class="cu-list menu sm-border card-menu margin-top" bindtap="addgood">
    <view class="cu-item sm-border">
      <view class="flex-sub text-center">
        <view class="text-xl">
          <text class="cuIcon-roundaddfill text-black text-bold"> 创建新礼品</text>
        </view>
      </view>
    </view>
  </view>

  <view class="text-gray margin" style="text-align: center">Tips: 按最后修改时间排序，左滑可删除，单击进入编辑</view>
  <view class="cu-list menu-avatar">
    <view
      class="cu-item {{modalName=='move-box-'+ index?'move-cur-half':''}}"
      qq:for="{{list}}"
      qq:key="item"
      bindtouchstart="ListTouchStart"
      bindtouchmove="ListTouchMove"
      bindtouchend="ListTouchEnd"
      data-target="move-box-{{index}}"
      style="border-radius:20rpx;height:160rpx;"
      qq:if="{{item.show}}"
      bindtap="showinfo"
      data-item="{{item}}"
    >
      <view class="cu-avatar radius lg" style="background-image:url({{item.image}});border-radius:20rpx;width:150rpx;height:120rpx;"></view>
      <view class="content" style='margin-left:60rpx;'>
        <view class="text-black text-bold text-cut" style="max-width: 300rpx">{{item.name}}</view>
        <view class="text-gray text-sm" qq:if='{{item.type!="2"}}'> 库存：{{item.rest}} </view>
        <view class="text-gray text-sm" qq:else> 兑换码类型礼品 </view>
      </view>
      <view class="action">
        <view class="text-grey text-xs text-cut" style="max-width: 200rpx">礼品id：{{item.id}}</view>
      </view>
      <view class="move" style="max-width: 130rpx" catchtap="delone" data-id="{{item.id}}">
        <view class="bg-red">删除</view>
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
