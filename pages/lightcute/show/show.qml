  <view class="cu-bar">
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

<view class="container">
  <view class="poster">
    <image src="{{content.editorhead}}" class="head" />
    <view class="nick">{{content.editornick}}</view>
    <view class="time">{{content.edit_time}}</view>
  </view>

  <view qq:for="{{content.replay}}" data-item="{{item}}" qq:key="{{index1}}">
    <view class="text_box" qq:if="{{item.content}}">
    <text>{{item.content}}</text>
    </view>
    <image src="{{si}}" qq:for="{{item.imgs}}" qq:for-item="si" qq:key="{{index2}}" class="img_box" mode="widthFix" bindtap="ViewImage" data-url="{{si}}" data-item="{{item}}" />
  </view>

  <view class="logo">光萌攻略组 & 初遇小竹 © 版权所有</view>
</view>
