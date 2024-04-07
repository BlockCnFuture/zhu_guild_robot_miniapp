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
    <view class='text-center margin-bottom text-xl text-bold text-black'>添加说明</view>
    <view class='text-content'>
      <view class="margin-top-lg">我是私域机器人，因此无法直接添加，需要添加请加入我的官方频道，在频道内发起申请</view>
      <view class='margin-top-sm'>首先，为了将我添加到您的频道，需要您将对应的管理人员拉入频道，而后，请将此管理员设置为您频道的超管</view>
      <view class='margin-top-sm'>该过程是必须的，目的是给您的频道添加白名单，只有在频道内是超管才能给频道加白</view>
      <view class='margin-top-sm'>给管理人员设置为超管后，提醒其加白，而后管理人员便会给您的频道添加我</view>
      <view class='margin-top-sm'>为使我的各项管理功能正常运行，请您赋予我超管权限以及所有接口权限</view>
    </view>
  </view>
</scroll-view>