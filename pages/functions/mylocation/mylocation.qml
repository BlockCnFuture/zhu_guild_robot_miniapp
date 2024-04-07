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
          <text class="text-bold text-black text-lg">设置内容</text>
          <view class="action text-black" catchtap="setcontent">确定</view>
        </view>
      </view>
    </view>
    <scroll-view scroll-y catchtap="stopit">
      <view style="height: 3vh"></view>
      <view class="cu-list menu sm-border card-menu margin-top">
        <view class="cu-item sm-border bg-white">
          <custom-textarea maxlength="300" style="text-align: left; width: 100%;{{modalB=='show'?'':'display:none;'}}" bindinput="onInput" value="{{tmpct}}" cursor-spacing="80" show-confirm-bar="{{false}}"></custom-textarea>
        </view>
      </view>
      <view style="height: 3vh"></view>
      <view class="text-gray" style="text-align: left; margin-left: 30rpx">部分商品需要收货人信息</view>
      <view class="text-gray" style="text-align: left; margin-left: 30rpx">请确认信息正确，因信息错误导致的损失概不负责</view>
      <view style="height: 100vh"></view>
    </scroll-view>
  </view>
</view>

<view class="cu-modal bottom-modal {{modalB=='show' && modalA==''?'show':''}}" bindtap="hideModalB">
  <view class="cu-dialog" catchtap="stopit">
    <view class="header-view-top">
      <view class="header-view">
        <view class="header">
          <view></view>
        </view>
        <view class="cu-bar bg-white">
          <view class="action text-black" bindtap="hideModalB">取消</view>
          <text class="text-bold text-black text-lg">编辑收货地址</text>
          <view class="action text-black" bindtap="addinfo">确定</view>
        </view>
      </view>
    </view>
    <scroll-view scroll-y catchtap="stopit">
      <view style="height: 80rpx"></view>

      <view class="cu-list menu sm-border margin-top card-menu">
        <view class="cu-item sm-border no-border arrow" bindtap="setdesc" data-target="nowtargetd.name">
          <text class="text-black">收货人姓名</text>
          <view class="text-bold text-black text-cut" style="max-width: 50vw">{{nowtargetd.name}}</view>
        </view>
        <view class="cu-item sm-border no-border arrow" bindtap="setdesc" data-target="nowtargetd.phone">
          <text class="text-black">收货人电话</text>
          <view class="text-bold text-black text-cut" style="max-width: 50vw">{{nowtargetd.phone}}</view>
        </view>
        <view class="cu-item sm-border no-border arrow" bindtap="setdesc" data-target="nowtargetd.contact">
          <text class="text-black">微信/QQ/邮箱</text>
          <view class="text-bold text-black text-cut" style="max-width: 40vw">{{nowtargetd.contact}}</view>
        </view>
        <view class="cu-item sm-border no-border arrow" bindtap="setdesc" data-target="nowtargetd.address">
          <text class="text-black">收货详细地址</text>
          <view class="text-bold text-black text-cut" style="max-width: 50vw">{{nowtargetd.address}}</view>
        </view>
      </view>

      <view style="height: 100rpx"></view>
    </scroll-view>
  </view>
</view>

<view class="bg-white margin-sm radius-lg">
  <block qq:for="{{addresslist}}" qq:key="index" data-item="{{item}}" data-index="{{index}}">
    <view class="flex padding-top-xs">
      <view class="flex-treble">
        <view class="flex padding-lr-xs">
          <view class="padding-xs text-black">
            <view class="text-cut">
              <view style="display: flex; align-items: center">
                <text class="cuIcon-roundclose text-red text-bold" style="font-size: 34rpx; margin-right: 10rpx" data-index="{{index}}" catchtap="delrole"></text>
                <text class="text-bold">{{item.name}}</text>
                <text class="text-sm padding-left">{{item.phone}}</text>
              </view>
            </view>
            <view class="text-gray text-sm padding-tb-sm text-cut" style="max-width: 80vw"> {{item.address}} </view>
          </view>
        </view>
      </view>
      <view class="flex-sub">
        <view class="flex justify-end text-black text-xl">
          <view class="cuIcon-write padding-sm padding-top-lg" bindtap="showinfo" data-item="{{item}}" data-index="{{index}}"></view>
        </view>
      </view>
    </view>
  </block>
</view>

<view class="cu-list menu sm-border card-menu margin-top" bindtap="addrole">
  <view class="cu-item sm-border">
    <view class="flex-sub text-center">
      <view class="solid-bottom text-xl padding">
        <text class="cuIcon-roundaddfill text-black text-bold"> 添加新地址</text>
      </view>
    </view>
  </view>
</view>

<view class="padding">
  <button class="cu-btn block bg-blue lg" bindtap="saveall">保存数据</button>
</view>