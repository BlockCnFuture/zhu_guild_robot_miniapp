<canvas style="width: 100%; height: 100%; position: fixed; top: 0; left: 0; z-index: 99999; pointer-events: none" canvas-id="watermarkCanvas"></canvas>

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
    <image src="{{content.author.avatar}}" class="head" bindtap="viewhead" data-url="{{content.author.avatar}}" />
    <view class="nick text-cut" bindtap="CopyText" data-cc="{{content.author.username}}">{{content.author.username}}</view>
    <view class="time text-cut" bindtap="CopyText" data-cc="{{content.author.id}}"> {{content.author.id}} </view>
  </view>

  <view class="roles_box" qq:if="{{level}}">
    <text class="cu-tag radius sm bg-red" qq:if='{{admin=="频道主"}}'>{{admin}}</text>
    <text class="cu-tag radius sm bg-blue light" qq:if='{{admin && admin!="频道主"}}'>{{admin}}</text>
    <text class="cu-tag radius sm bg-blue light text-blue"><text class="cuIcon-choicenessfill"></text> LV.{{level}}</text>
    <text class="cu-tag radius sm bg-grey text-white"><text class="cuIcon-timefill"></text> {{enterAt}} 加入</text>
    <text class="cu-tag radius sm bg-black text-white"><text class="cuIcon-countdownfill"></text> 入频{{enterDays}}</text>
  </view>

  <view class="reason_box" bindtap="CopyText" data-cc="{{content.reason}}" qq:if="{{content.reason}}">
    <text>{{content.reason}}</text>
  </view>

  <view>
    <view class="text_box" bindtap="CopyText" data-cc="{{content.text}}" qq:if="{{content.text}}">
      <text>{{content.text}}</text>
    </view>
    <image qq:for="{{content.imgs}}" src="{{item}}" qq:key="{{index}}" class="img_box" bindtap="ViewImage" mode="widthFix" data-url="{{item}}" data-item="{{content}}" />
  </view>

    <view>

    <view style='margin-bottom:40rpx;' qq:if='{{content.logs}}'>处理日志：</view>
    <view class="log_box" qq:if='{{content.logs}}' qq:for='{{content.logs}}' qq:key='index'>
      <view>处理人：<image src="{{item.avatar}}" bindtap="ViewImage" style='width:40rpx;height:40rpx;border-radius:50%;' data-url="{{item.avatar}}"/> {{item.username}} [{{item.id}}]</view>
      <view style='margin-top:10rpx;'>处理结果：{{item.deal}}</view>
      <view style='margin-top:10rpx;'>处理时间：{{item.time}}</view>
    </view>
  </view>

  <view class="logo">此为用户发言，不代表《初遇小竹》官方立场</view>
</view>

<view class="margin-top-sm" style='{{showad?"":"display:none;"}}'>
  <ad unit-id="d058336e9ac992d615e8362967d7ddf0" binderror="aderr" bindload="adsucc"></ad>
</view>