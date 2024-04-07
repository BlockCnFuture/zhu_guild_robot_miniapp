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

<view class="bg-white margin-sm radius-lg" style="min-height: 90vh">
  <view style="height: 10rpx"></view>

  <view class="margin-top padding-lr">
    <view class="flex justify-between">
      <view class="text-black text-bold">系统日志数据存储说明</view>
    </view>
    <view class="padding-tb">
      <view class="text-sm">1、频道主或被授予权限的用户修改设置时，会产生日志</view>
      <view class="text-sm">2、用户触发违禁词、被踢出等，会产生日志</view>
      <view class="text-sm">3、日志数据无法由任何人主动删除</view>
      <view class="text-sm">4、系统只会保留3日内的数据，有自动删除机制</view>
    </view>
  </view>

  <view class="margin-top padding-lr">
    <view class="flex justify-between">
      <view class="text-black text-bold">值班室任务数据存储说明</view>
    </view>
    <view class="padding-tb">
      <view class="text-sm">1、需要及时处理值班任务，否则将被系统清理</view>
      <view class="text-sm">2、系统只会保留1日内的任务，超时任务无法恢复</view>
    </view>
  </view>

  <view class="margin-top padding-lr">
    <view class="flex justify-between">
      <view class="text-black text-bold">礼品兑换数据存储说明</view>
    </view>
    <view class="padding-tb">
      <view class="text-sm">1、需要及时核销礼品记录，否则将被系统清理</view>
      <view class="text-sm">2、系统只保留30日内待发货记录，超时记录无法恢复</view>
      <view class="text-sm">3、系统只保留7日内已发货记录，超时记录无法恢复</view>
    </view>
  </view>

  <view class="margin-top padding-lr">
    <view class="flex justify-between">
      <view class="text-black text-bold">黑名单数据存储说明</view>
    </view>
    <view class="padding-tb">
      <view class="text-sm">1、系统只会保留7日内的数据，有自动删除机制</view>
      <view class="text-sm">2、人为或系统添加的黑名单数据都会自动失效</view>
      <view class="text-sm">3、系统踢黑用户时，会将用户自动添加到频道黑名单</view>
      <view class="text-sm">4、无需担心黑名单数据失效问题，因为频道黑名单是永久的</view>
      <view class="text-sm">5、虽然退频自动拉黑无法将用户添加到频道黑名单</view>
      <view class="text-sm">但只要其7日内再度尝试加入频道，便会被移入频道黑名单</view>
      <view class="text-sm">而7日后再度加入，就相当于给予赦免权了</view>
    </view>
  </view>

  <view class="margin-top padding-lr">
    <view class="flex justify-between">
      <view class="text-black text-bold">警告记录存储说明</view>
    </view>
    <view class="padding-tb">
      <view class="text-sm">1、用户被警告时，将刷新数据活跃时间</view>
      <view class="text-sm">2、若用户超过30天未被再次警告，警告次数清零</view>
      <view class="text-sm">3、用户被拉黑时，自动删除警告记录</view>
    </view>
  </view>

    <view class="margin-top padding-lr">
    <view class="flex justify-between">
      <view class="text-black text-bold">用户打卡记录存储说明</view>
    </view>
    <view class="padding-tb">
      <view class="text-sm">1、用户打卡，将刷新数据活跃时间</view>
      <view class="text-sm">2、若用户超过180天未打卡，打卡数据清空</view>
      <view class="text-sm">3、用户被拉黑时，自动清空打卡数据</view>
    </view>
  </view>

      <view class="margin-top padding-lr">
    <view class="flex justify-between">
      <view class="text-black text-bold">用户赞助记录存储说明</view>
    </view>
    <view class="padding-tb">
      <view class="text-sm">1、用户成功赞助，将刷新数据活跃时间</view>
      <view class="text-sm">2、若用户超过180天未重新赞助，赞助数据清空</view>
    </view>
  </view>
<!--
  <view class="margin-top padding-lr">
    <view class="flex justify-between">
      <view class="text-black text-bold">成员活跃数据存储说明</view>
    </view>
    <view class="padding-tb">
      <view class="text-sm">1、用户发言、评论、语音房互动等都会产生活跃数据</view>
      <view class="text-sm">2、活跃数据用于系统自动分发身份组奖励、积分奖励</view>
      <view class="text-sm">3、用户活跃数据静态有效期为3天</view>
      <view class="text-sm">4、用户超过3天未活跃，连续活跃数据将被清空</view>
    </view>
  </view>
  -->

  <view class="margin-top padding-lr">
    <view class="flex justify-between">
      <view class="text-black text-bold">积分数据存储说明</view>
    </view>
    <view class="padding-tb">
      <view class="text-sm">1、用户需要积极对积分数据进行变动（游戏、兑换等）</view>
      <view class="text-sm">2、若用户积分超过指定时间没有变动，积分将被清零</view>
      <view class="text-sm">3、管理人员对用户积分产生的变动，也能保持数据活性</view>
      <view class="text-sm">4、积分活性检查周期由管理人员设置，最大为30天</view>
    </view>
  </view>

  <view class="margin-top padding-lr">
    <view class="flex justify-between">
      <view class="text-black text-bold">图片文件存储说明</view>
    </view>
    <view class="padding-tb">
      <view class="text-sm">1、向本系统上传的图片默认有效期60天</view>
      <view class="text-sm">2、在60天以内，再次请求图片资源，即可延后有效期</view>
      <view class="text-sm">3、该机制是为了清理无用图片资源</view>
      <view class="text-sm">4、图片使用越频繁，越不会过期</view>
    </view>
  </view>
</view>

<view style="height: 10rpx"></view>
