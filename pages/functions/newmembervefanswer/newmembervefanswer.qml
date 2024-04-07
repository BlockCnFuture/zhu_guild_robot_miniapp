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
  
<view qq:if='{{rolesets}}'>

<swiper class="tips-swiperitem margin" autoplay="true" vertical="true" circular="true" interval="4000" duration="1000">

    <block>
      <swiper-item catchtouchmove='false'>
        <view class="radius-lg bg-orange light">
          <view class='padding-xs text-xl'>
            <text class='cuIcon-warnfill text-red'></text>
            <text class="text-df"> 请在十分钟内正确回答问题</text>
          </view>
        </view>
      </swiper-item>
    </block>

</swiper>

<view qq:if='{{rolesets.fromchannel=="0"}}'>

<view class="margin" style="text-align: left;">
  <view class="margin-top bg-white padding radius-lg">
    <text class="text-bold text-black">请您正确回答以下问题：</text>
    <text>\r\n</text>
    <text class="text-black text-bold">{{question}}</text>
  </view>
</view>

<view class="margin" style="text-align: left;">
  <view class="margin-top bg-white padding radius-lg">
    <input placeholder="输入您的答案" type='number' bindinput='onInput'></input>
  </view>
</view>

</view>
<view qq:if='{{rolesets.fromchannel=="1"}}'>

<view class="margin" style="text-align: left;">
  <view class="margin-top bg-white padding radius-lg">
    <text class="text-black text-bold">{{question}}</text>
  </view>
</view>

<view class="margin" style="text-align: left;">
  <view class="margin-top bg-white padding radius-lg">
    <input placeholder="输入您的答案" bindinput='onInput'></input>
  </view>
</view>

</view>
<view qq:if='{{rolesets.fromchannel=="2"}}'>

<view class="margin" style="text-align: left;">
  <view class="margin-top bg-white padding radius-lg">
    <view class="text-sm text-black">说明：</view>
    <view class="text-gray text-sm padding-top-xs">请按照上方的参考图完成点阵图</view>
    <view class="text-gray text-sm padding-top-xs">左上角的红条可以取消所有选中</view>
    <view class="text-gray text-sm padding-top-xs">图案可滚动</view>
  </view>
</view>

<view class='margin bg-white padding-sm radius shadow-lg' style="max-height: 60vh;">
    <scroll-view class="pro_list" scroll-y style="height: 50vh;">

      <view class="cu-list grid col-9 no-border">

        <view class="cu-item text-xxxl" qq:for="{{points_ls}}" qq:key="index" style='text-align:center;'>
          <view class='margin-left-sm cu-avatar round' style='height:50rpx;width:50rpx;{{item.select?"background-color:rgba(0,0,255,0.8);":"background-color:rgba(0,0,0,0.0);"}}'></view>
        </view>

      </view>
    </scroll-view>
  </view>

  <view class='margin bg-white padding-sm radius shadow-lg' style="max-height: 60vh;">
  <button class="bg-red sm" bindtap="cancleallc" style='margin-left:-20rpx;margin-top:-20rpx;border:0;height:20rpx;width:40rpx;'></button>
    <scroll-view class="pro_list" scroll-y style="height: 50vh;">

      <view class="cu-list grid col-9 no-border">

        <view class="cu-item text-xxxl" qq:for="{{points_ls_}}" qq:key="index" bindtap="selectoneA" data-index="{{index}}" style='text-align:center;'>
          <view class='margin-left-sm cu-avatar round' style='height:50rpx;width:50rpx;{{item.select?"background-color:rgba(0,0,255,0.8);":"background-color:rgba(0,0,0,0.1);"}}'></view>
        </view>

      </view>
    </scroll-view>
  </view>

</view>

<view class="padding">
<button class="cu-btn block bg-blue lg" bindtap='saveall'>确定</button>
</view>

</view>
<view qq:else>
<view class="margin" style="text-align: left;">
  <view class="margin-top bg-white padding radius-lg">
    <text class="text-bold text-black">已正确回答</text>
  </view>
</view>
</view>

<view class='margin-top-sm' style='{{showad?"":"display:none;"}}'>
<ad unit-id="d058336e9ac992d615e8362967d7ddf0" binderror='aderr' bindload='adsucc'></ad>
</view>