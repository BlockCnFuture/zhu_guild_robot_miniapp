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
  
<view class="cu-list menu sm-border card-menu margin-top">
        <view class="cu-item text-cut">
                <text class="text-yellow cuIcon-recharge text-bold"><text class="text-black text-bold"> 我的资产</text></text>
        </view>
        <view class="cu-item text-cut no-border" qq:for="{{pointlist}}" qq:key="{{index}}" data-item="{{item}}" bindtap="showpointinfo" data-info="{{item.point_desc}}">
                <text class="text-black text-bold">{{item.point_name}} <text class="cuIcon-info text-blue"></text></text>
                <text class="text-black text-bold" style="max-width: 60vw">{{item.point_cnt}}</text>
        </view>
</view>

<view class="cu-list menu sm-border card-menu margin-top" qq:if='{{isadmin}}' bindtap='navigate'>
        <view class="cu-item text-cut arrow text-bold">礼品商店设置</view>
</view>
<view class="cu-list menu sm-border card-menu margin-top" bindtap='goodsneedsend'>
        <view class="cu-item text-cut arrow text-bold">待发货礼品</view>
</view>

<view class="bg-white margin-sm radius-lg" style="overflow: hidden;height:1100rpx;">
<view class="margin-tb-sm padding-top-lg padding-bottom-xl" qq:if='{{groups.length<=0}}'>
  <view class="flex justify-center text-xsl">
    <view class="cuIcon-present text-red icon"></view>
  </view>
  <view class="flex justify-center padding-top-sm">
    <view class="text-gray text">还没有礼品，去其他地方看看吧~</view>
  </view>
</view>
        <scroll-view scroll-x scroll-with-animation scroll-left="{{scrollLeft}}" qq:if='{{groups.length>0}}'>
                <view class="nav">
                        <view class="cu-item {{index==TabCur?'text-blue cur':''}}" qq:for="{{groups}}" qq:key="index" bindtap="tabSelect" data-id="{{index}}"> {{item}} </view>
                </view>
        </scroll-view>

        <swiper class="tab-box" current="{{TabCur}}" duration="300" bindchange="switchTab">
                <swiper-item qq:for="{{goods}}" qq:key="index" data-item="{{item}}">
                        <scroll-view scroll-y style="height:1000rpx;" bindscrolltolower="showmore">




<view class="cu-bar" qq:if='{{item.length>0 && index==TabCur}}'>
    <view class="search-form round">
      <text class="cuIcon-search"></text>
      <input type="text" placeholder="搜索 礼品名称 | 资产类型" confirm-type="search" bindinput="onSearchInput" value='{{_keyword}}'></input>
    </view>
  </view>

<view class="cu-list menu-avatar" qq:if='{{item.length>0}}'>
   <view class="cu-item" qq:for="{{item}}" qq:key="si" qq:for-item="si" style="border-radius:20rpx;height:160rpx;" bindtap="showinfo" data-item="{{si}}" qq:if='{{si.show}}'>
     <view class="cu-avatar radius lg" style="background-image:url({{si.image}});border-radius:20rpx;width:150rpx;height:120rpx;"></view>
        <view class="content" style='margin-left:60rpx;'>
           <view class="text-black text-bold text-cut" style="max-width:80vw;font-size:26rpx;">{{si.name}}</view>
           <view style="max-width:80vw;">
           <view class='text-red' style='font-size:38rpx;font-weight:bold;'>{{si.pointcnt}} <text class='text-gray text-df' style='font-weight:400;'>{{si.point_name}}</text></view>
           </view>
           <view class="text-gray text-sm" qq:if='{{si.type!="2" && showrest}}'>剩余{{si.rest}}件</view>
           <view class="text-gray text-sm" qq:if='{{si.type=="2"}}'> 兑换码 </view>
        </view>
        <view class="action" style='min-width:120rpx;'>
         <button class="cu-btn bg-red round" catchtap="showinfo" data-item="{{si}}">兑换</button>
        </view>
    </view>
</view>
<view class="margin-tb-sm padding-top-lg padding-bottom-xl" qq:else>
  <view class="flex justify-center text-xsl">
    <view class="cuIcon-present text-red icon"></view>
  </view>
  <view class="flex justify-center padding-top-sm">
    <view class="text-gray text">还没有礼品，去其他地方看看吧~</view>
  </view>
</view>

  <view class="cu-list menu sm-border card-menu margin-top" qq:if="{{!complete && item.length>0}}">
    <view class="text-center">
      <button class="cu-btn round line-blue sm" bindtap="showmore">加载更多</button>
    </view>
  </view>

  <view class="cu-list menu sm-border card-menu margin-top" qq:if="{{complete && item.length>0}}">
    <view class="text-center">
      <text class="text-gray">没有更多数据</text>
    </view>
  </view>
  <view style="height: 60rpx"></view>



                        </scroll-view>
                </swiper-item>
        </swiper>
</view>
