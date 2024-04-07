<view class="cu-load load-modal" qq:if="{{loadModal}}">
  <image src="/images/logo.jpeg" class="png" mode="aspectFit"></image>
  <view class="gray-text">加载中...</view>
</view>


<view class="cu-modal bottom-modal {{modalE=='show'?'show':''}}" bindtap="hideModalE">
  <view class="cu-dialog" catchtap="stopit">
  <view class='header-view-top'>
  <view class="header-view">
      <view class="header">
        <view></view>
      </view>
      <view class="cu-bar bg-white">
      <view class="action text-black"> </view>
      <text class="text-bold text-black text-lg">选择欲查看的身份组</text>
      <view class="action text-black"> </view>
      </view>
  </view>
  </view>
  <scroll-view scroll-y catchtap='stopit'>
<view style='height:1vh'></view>
  <view class="cu-bar bg-white flex padding justify-between">
  <button class="cu-btn bg-blue sm" catchtap="selectallr">全选</button>
  <button class="cu-btn bg-blue sm" catchtap="cancleallr">全不选</button>
  </view>

  <view class="cu-list menu sm-border margin-top">

  <view class="cu-item sm-border" qq:for="{{rolelist}}" qq:key='index' catchtap='fclick_' data-index='{{index}}' data-item='{{item}}'>
<view style='display: flex;align-items: center;'>
<text class="cuIcon-title" style='color:{{item.hexcolor}};font-size:50rpx;' qq:if='{{item.hexcolor!="n"}}'></text>
<text class="cuIcon-choicenessfill text-blue margin-right-sm" qq:else></text>
<text class="{{item.disable?'text-gray':'text-black'}} text-cut" style='max-width:70vw;'>{{item.name}}</text>
</view>
           
    <text class="cuIcon-roundcheckfill text-blue" qq:if='{{item.select}}'></text>
    <text class="cuIcon-roundcheckfill text-gray" qq:else></text>
  </view>

  </view>
  </scroll-view>
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
          <text class="text-bold text-black text-lg">选择排行榜类型</text>
          <view class="action text-black"> </view>
        </view>
      </view>
    </view>
    <scroll-view scroll-y catchtap="stopit">
      <view class="cu-list menu sm-border margin-top">
        <view class="cu-item sm-border" qq:for="{{oplist}}" qq:key="index" catchtap="oclick" data-item="{{item}}">
          <text class="text-black">{{item.name}}</text>
        </view>
      </view>
    </scroll-view>
  </view>
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
      <input type="text" placeholder="搜索 用户昵称" confirm-type="search" bindinput="onSearchInput"></input>
    </view>
  </view>

<scroll-view scroll-y style="height: 100vh" bindscrolltolower="showmore">
  <view style="height: 10rpx"></view>

  <view class="cu-list menu sm-border card-menu margin-top">
    <view class="cu-item sm-border arrow" bindtap="changeorder">
      <view class="text-black text-bold">排行榜类型</view>
      <view class="text-gray" qq:if='{{order=="0"}}'>每日打卡榜</view>
      <view class="text-gray" qq:if='{{order=="1"}}'>连续打卡榜</view>
      <view class="text-gray" qq:if='{{order=="2"}}'>累计打卡榜</view>
    </view>
  </view>

     <view class="cu-list menu sm-border card-menu margin-top" qq:if="{{list.length>0}}">
    <view class="cu-item sm-border arrow" bindtap="setsaferoles">
      <view class="text-black text-bold">只看特定身份组</view>
      <view class="text-gray">可选</view>
    </view>
  </view>

  <view class="cu-list menu sm-border card-menu margin-top" qq:if='{{list.length>0}}'>
    <view class="text-gray text-bold" style='text-align:center;'>注意: 系统仅保留180日内的变动数据</view>
  </view>

  <view class="cu-list menu-avatar">
    <view class="cu-item" qq:for="{{list}}" qq:key="item" style="border-radius: 20rpx; height: 160rpx" qq:if="{{item.show}}" data-item="{{item}}" qq:if='{{item.show}}'>
      <view class='text-{{item.index==1?"red":item.index==2?"purple":item.index==3?"orange":"gray"}} light' style="position: absolute; left: 26rpx; font-size: 60rpx; font-weight: 500">{{item.index}}. </view>
      <view class="cu-avatar round lg" style="background-image:url({{item.userhead}});margin-left:{{item.left}}rpx;{{item.index<=3?'box-shadow:0 0 0 1px #ff000090':''}}"
        catchtap='ViewImage' data-url='{{item.userhead}}'><view qq:if="{{item.index==1}}" class="cu-tag badge cuIcon-crownfill bg-yellow"></view><view qq:if="{{item.index==2}}" class="cu-tag badge cuIcon-upstagefill bg-purple"></view><view qq:if="{{item.index==3}}" class="cu-tag badge cuIcon-upstagefill bg-orange"></view></view>
      <view class="content" style="margin-left:{{item.left}}rpx" bindtap='copyText' data-name='id' data-link='{{item.user_id}}'>
        <view class="text-black text-bold text-cut" style="max-width:500rpx">{{item.usernick}}</view>
        <view class="text-gray text-sm" qq:if='{{order=="0"}}'> {{item.time}} 打卡</view>
        <view class="text-gray text-sm" qq:if='{{order=="1"}}'> 连续打卡 <text class="text-black text-bold">{{item.cot_workdays}}</text> 天</view>
        <view class="text-gray text-sm" qq:if='{{order=="2"}}'> 累计打卡 <text class="text-black text-bold">{{item.workdays}}</text> 天</view>
      </view>
    </view>
  </view>

  <view class="cu-list menu sm-border card-menu margin-top" qq:if="{{!complete}}">
    <view class="text-center">
      <button class="cu-btn line-blue sm round" bindtap="showmore">加载更多</button>
    </view>
  </view>

  <view class="cu-list menu sm-border card-menu margin-top" qq:if="{{complete}}">
    <view class="text-center">
      <text class="text-gray">没有更多数据</text>
    </view>
  </view>
  <view style="height: 60rpx"></view>
</scroll-view>
