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
  
<scroll-view scroll-y>
  <view class='margin-xl bg-white padding-xl radius-lg shadow-lg'>
    <view class='text-center margin-bottom text-xl text-bold text-black'>推送权限说明</view>
    <view class='text-content'>
      <view class="margin-top-lg">部分功能可能需要用到主动推送消息权限</view>
      <view class='margin-top-sm'>为确保功能正常使用，请给予我消息推送权限</view>
      <view class='margin-top-sm'>点击我的头像往下翻，有"机器人推送设置"</view>
      <view class='margin-top-sm'>开启"接收机器人推送"、"文字消息"场景</view>
      <view class='margin-top-sm'>指定好子频道（需与功能所需的子频道一致）</view>
      <view class='margin-top-sm text-red'>请勿更改推送上限（不可逆）</view>
    </view>
  </view>

  <view class='margin-xl bg-white padding-xl radius-lg shadow-lg' style='height:1300rpx;'>
    <view class='text-center margin-bottom text-xl text-bold text-black'>正确设置示意图</view>
    <image src='https://feng.7yan.top/img/help3' style='height:1100rpx;'></image>
  </view>

</scroll-view>