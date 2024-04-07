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
            <text class="text-df"> 请填写申请解除禁言的理由</text>
          </view>
        </view>
      </swiper-item>
    </block>

</swiper>


<view class="margin" style="text-align: left;">
  <view class="margin-top bg-white padding radius-lg">
    <text class="text-bold text-black">提交申请后，将通知值班人员处理\r\n若理由不正当，解禁申请将被拒绝\r\n值班人员处理后，将在值班室通知，请耐心等待</text>
    <text class="text-bold text-gray" qq:if='{{rolesets.dep.able}}'>\r\n\r\n单次申请消耗<text class="text-bold text-black"> {{rolesets.dep.name}} </text><text class="text-bold text-black"> {{rolesets.dep.number}} </text>点</text>
  </view>
</view>

<view class="margin" style="text-align: left;">
  <view class="margin-top bg-white padding radius-lg">
    <input placeholder="输入您的理由" bindinput='onInput'></input>
  </view>
</view>



<view class="padding">
<button class="cu-btn block bg-blue lg" bindtap='saveall'>提交</button>
</view>

</view>

<view class='margin-top-sm' style='{{showad?"":"display:none;"}}'>
<ad unit-id="d058336e9ac992d615e8362967d7ddf0" binderror='aderr' bindload='adsucc'></ad>
</view>