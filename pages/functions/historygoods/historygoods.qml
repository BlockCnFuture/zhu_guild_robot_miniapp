<view class='cu-load load-modal' qq:if="{{loadModal}}">
  <image src='/images/logo.jpeg' class='png' mode='aspectFit'></image>
  <view class='gray-text'>加载中...</view>
</view>

<view class="cu-bar bg-white fixed">
      <view class="cu-bar bg-white" style='max-width:140rpx;'>
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
    <view class="search-form round">
      <text class="cuIcon-search"></text>
      <input type="text" placeholder="搜索 礼品名称 | 用户昵称" confirm-type="search" bindinput="onSearchInput"></input>
    </view>
  </view>

<scroll-view scroll-y style="height:100vh;" bindscrolltolower='loadmore'>
<view style='height:100rpx;'></view>

<view class='text-gray margin' style='text-align:center;' qq:if='{{logs.length>0}}'>
<text>Tips: 单击头像可复制用户id，单击内容可复制内容</text>
</view>

<view class="cu-list menu-avatar bg-white" style='border-radius:20rpx;' qq:for="{{logs}}" qq:key='index'>
   <view class="cu-item">
     <view class="cu-avatar radius lg" style="background-image:url({{item.image}});border-radius:20rpx;width:150rpx;height:120rpx;"></view>
        <view class="content" style='margin-left:60rpx;'>
           <view class="text-black text-bold text-cut" style="max-width:80vw;font-size:26rpx;">{{item.name}}</view>
           <view style="max-width:80vw;">
           <view class='text-red' style='font-size:38rpx;font-weight:bold;'>{{item.pointcnt}} <text class='text-gray text-df' style='font-weight:400;'>{{item.point_name}}</text></view>
           </view>
           <view class="text-gray text-sm" qq:if='{{item.type=="0"}}'>自定义礼品</view>
           <view class="text-gray text-sm" qq:if='{{item.type=="1"}}'>身份组礼品</view>
           <view class="text-gray text-sm" qq:if='{{item.type=="2"}}'>兑换码礼品</view>
           <view class="text-gray text-sm" qq:if='{{item.type=="3"}}'>补签卡礼品</view>
        </view>
        <view class="action" style='min-width:120rpx;' qq:if='{{pc=="1" && pa=="1" && pb=="0"}}'>
         <button class="cu-btn bg-red round" catchtap="hassend" data-item="{{item}}">核销</button>
        </view>
    </view>
   <view class="cu-item">
     <view class="cu-avatar round lg" style="background-image:url({{item.userhead}});" bindtap='copyText' data-name='id' data-link='{{item.userid}}'></view>
        <view class="content" style='margin-left:10rpx;'>
           <view style="max-width:70vw;">
           <view class='text-black text-cut' style='font-size:26rpx;font-weight:bold;' bindtap='copyText' data-name='昵称' data-link='{{item.usernick}}'>{{item.usernick}} <text class="cu-tag radius sm bg-red" qq:if='{{item.userrole=="2"}}'>频道主</text><text class="cu-tag radius sm bg-blue" qq:if='{{item.userrole=="1"}}'>超级管理员</text><text class="cu-tag radius sm bg-grey" qq:if='{{item.userrole=="0"}}'>其他成员</text></view>
           </view>
           <view class="text-gray text-sm" qq:if='{{!item.content}}'>获得礼品</view>
           <view class="text-gray text-sm text-cut" qq:else bindtap='copyText' data-name='信息' data-link='{{item.content}}'>{{item.content}}</view>
        </view>
    </view>
    </view>

  <view class="cu-list menu sm-border card-menu margin-top" qq:if='{{!complete}}'>
    <view class="text-center">
      <button class="cu-btn line-blue sm round" bindtap="loadmore">加载更多</button>
    </view>
  </view>
  
  <view class="cu-list menu sm-border card-menu margin-top" qq:if='{{complete}}'>
    <view class="text-center">
      <text class="text-gray">没有更多数据</text>
    </view>
  </view>

  <view class="cu-tabbar-height"></view>

</scroll-view>