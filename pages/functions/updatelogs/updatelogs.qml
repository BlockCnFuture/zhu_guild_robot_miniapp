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
  
  <view class="margin" style="text-align: left" qq:for="{{logData}}" qq:key="item">
    <view class="margin-top bg-white padding radius-lg">
      <view class="cu-capsule radius">
        <view class="cu-tag bg-white text-black text-bold">{{item.version}}</view>
        <view class="cu-tag bg-white text-gray text-bold">{{item.data}}</view>
      </view>
      <view class="padding-top-xs" qq:for="{{item.info}}" qq:key="item" style='width: 100%;word-wrap: break-word;'>
          <text class='text-blue light text-bold'>{{item}}</text>
      </view>
    </view>
  </view>

  <view style='height:3vh;'></view>