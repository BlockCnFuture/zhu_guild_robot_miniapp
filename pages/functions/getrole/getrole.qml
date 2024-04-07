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
  
<template name="role-item">
  <view class="cu-item sm-border {{item.desc!=''?'no-border':''}}">
    <view style="display: flex; align-items: center">
      <text class="cuIcon-title" style="color:{{item.hexcolor}};font-size:50rpx;"></text>
      <text class="text-black text-cut" style="max-width:50vw">{{item.rolename}}</text>
    </view>
    <button qq:if="{{!item.select}}" class="cu-btn round line-blue shadow" data-item="{{item}}" catchtap="newrole" style='height:54rpx;'>领取</button>
    <button qq:if="{{item.select && !item.canexit}}" class="cu-btn round line-gray" style='height:54rpx;'>卸下</button>
    <button qq:if="{{item.select && item.canexit}}" class="cu-btn round line-red shadow" data-item="{{item}}" catchtap="canclerole" style='height:54rpx;'>卸下</button>
  </view>
  <view class="bg-white sm-border" style="padding: 0 30rpx" qq:if='{{item.desc!=""}}'>
    <view style="border-left: 2px solid #ccc; padding: 10px; margin: 0; border-bottom: 1rpx solid #ddd; border-t: 1rpx solid #ddd">
      <text class="text-gray" style="white-space: pre-wrap; overflow-wrap: break-word">{{item.desc}}</text>
    </view>
  </view>
</template>

<view class="margin-sm radius-lg" style="min-height: 90vh" qq:if="{{uinfo}}">
  <view style="height: 10rpx"></view>

  <view class="cu-list menu sm-border card-menu margin-top bg-white" qq:if="{{nowrolec.image}}">
    <view class="cu-card case margin">
      <view class="image">
        <image src="{{nowrolec.image}}" mode="aspectFit" bindload="loaded" style="max-height:{{height}}px;"></image>
      </view>
    </view>

    <view class="bg-white sm-border" style="padding: 0 30rpx" qq:if='{{nowrolec.desc!=""}}'>
      <text class="text-black" style="white-space: pre-wrap; overflow-wrap: break-word">{{nowrolec.desc}}</text>
    </view>

    <view class="bg-white sm-border" style="padding: 0 30rpx">
    <text class='text-gray' qq:if="{{nowrolec.multigain}}">✅可选{{nowrolec.maxcnt}}个</text>
    <text class="text-gray" qq:if="{{!nowrolec.multigain}}">✅仅单选</text>
    </view>

    <template is="role-item" qq:for="{{nowrolec.roles}}" qq:key="{{index}}" data="{{item}}" />

    <view style="height: 30rpx"></view>
  </view>
</view>

<view style="height: 18vh"></view>

<navigator open-type="exit" target="miniProgram">
<view class="bg-white" style="position:fixed;z-index:1024;bottom: 0;top:auto;left:0;right:0;">
<view class="padding">
<button class="cu-btn block bg-blue margin-tb-sm lg">返回频道</button>
</view>
</view>
</navigator>