<view class="cu-load load-modal" qq:if="{{loadModal}}">
  <image src="/images/logo.jpeg" class="png" mode="aspectFit"></image>
  <view class="gray-text">加载中...</view>
</view>


<view class="cu-modal bottom-modal {{modalB=='show'?'show':''}}" bindtap="hideModalB">
  <view class="cu-dialog" catchtap="stopit">
  <view class='header-view-top'>
  <view class="header-view">
      <view class="header">
        <view></view>
      </view>
      <view class="cu-bar bg-white">
      <view class="action text-black" catchtap="hideModalB">取消</view>
      <text class="text-bold text-black text-lg">设置定时任务</text>
      <view class="action text-black" catchtap="savetaskinfo">保存</view>
      </view>
  </view>
  </view>
  <scroll-view scroll-y catchtap='stopit'>

<view style='height:3vh;'></view>

<view class='text-gray text-bold'>数量设置为0时，将清空并删除所有用户的对应积分</view>

  <view class="cu-list menu sm-border card-menu margin-top">

    <view class="cu-item sm-border">
      <text class="text-bold text-black">开启定时积分任务</text>
      <switch class="sm" bindchange="RolesSwitch" checked="{{taskinfo.useit=='1'}}" data-target="taskinfo.useit"></switch>
    </view>
<view class="cu-item sm-border no-border" qq:if="{{taskinfo.useit=='1'}}">
<view class="flex justify-center align-center bg-white">
      <text class="text-bold text-black margin-right">重至为数量：</text>
        <view class="cu-tag round bg-green sm cuIcon-move margin-top-xs" catchtap="inputcnt" data-type="de" data-target='taskinfo.resetpoint' data-cnt='{{taskinfo.resetpoint}}'></view>
        <view class="margin-lr text-black text-center solids-bottom" style="width:260rpx;">
      <input type="number" value="{{taskinfo.resetpoint}}" maxlength="10" placeholder-style="color:#000000" bindinput='inputcnts' data-target='taskinfo.resetpoint' data-cnt='{{taskinfo.resetpoint}}' bindblur='finishinputcnt'></input>
    </view>
        <view class="cu-tag round bg-red sm cuIcon-add margin-top-xs" catchtap="inputcnt" data-type="add" data-target='taskinfo.resetpoint' data-cnt='{{taskinfo.resetpoint}}'></view>
        <text class="text-bold text-black margin-left">点</text>
      </view>
</view>
  <view class="cu-item sm-border no-border text-cut" qq:if="{{taskinfo.useit=='1'}}">
      <view class="text-bold text-black">定时器设置_小时</view>
      <view class="margin-lr text-black text-center solids-bottom" style="width:360rpx;">
      <input type="text" value="{{tmptaskinfo.hours}}" placeholder-style="color:#000000" bindinput='inputcnts' data-cnt='x' data-target='taskinfo.hours' style='text-align:right;'></input>
      </view>
  </view>
  <view class="cu-item sm-border no-border text-cut" qq:if="{{taskinfo.useit=='1'}}">
      <view class="text-bold text-black">定时器设置_日期</view>
      <view class="margin-lr text-black text-center solids-bottom" style="width:360rpx;">
      <input type="text" value="{{tmptaskinfo.days}}" placeholder-style="color:#000000" bindinput='inputcnts' data-cnt='x' data-target='taskinfo.days' style='text-align:right;'></input>
      </view>
  </view>
  <view class="cu-item sm-border no-border text-cut" qq:if="{{taskinfo.useit=='1'}}">
      <view class="text-bold text-black">定时器设置_月份</view>
      <view class="margin-lr text-black text-center solids-bottom" style="width:360rpx;">
      <input type="text" value="{{tmptaskinfo.moths}}" placeholder-style="color:#000000" bindinput='inputcnts' data-cnt='x' data-target='taskinfo.moths' style='text-align:right;'></input>
      </view>
  </view>
  <view class="cu-item sm-border no-border text-cut" qq:if="{{taskinfo.useit=='1'}}">
      <view class="text-bold text-black">定时器设置_周几</view>
      <view class="margin-lr text-black text-center solids-bottom" style="width:360rpx;">
      <input type="text" value="{{tmptaskinfo.weekdays}}" placeholder-style="color:#000000" bindinput='inputcnts' data-cnt='x' data-target='taskinfo.weekdays' style='text-align:right;'></input>
      </view>
  </view>
  </view>
<view class='text-gray text-bold margin-top'>定时器设置，多个时间点请用,分隔，所有时间点用*</view>
<view style='height:100vh;'></view>
  </scroll-view>
  </view>
</view>


<view class="cu-modal bottom-modal {{modalA=='show'?'show':''}}" bindtap="hideModalA">
  <view class="cu-dialog" catchtap="stopit">
  <view class='header-view-top'>
  <view class="header-view">
      <view class="header">
        <view></view>
      </view>
      <view class="cu-bar bg-white">
      <view class="action text-black"> </view>
      <text class="text-bold text-black text-lg">选择积分类型</text>
      <view class="action text-black"> </view>
      </view>
  </view>
  </view>
  <scroll-view scroll-y catchtap='stopit'>

<view style='height:1vh;'></view>

  <view class="cu-list menu sm-border margin-top">

  <view class="cu-item sm-border" qq:for="{{pointlist}}" qq:key='index' catchtap='kclick' data-index='{{index}}' data-item='{{item}}'>
<view style='display: flex;align-items: center;'>
<text class="cuIcon-recharge text-blue margin-right-sm"></text>
<text class="text-black text-cut" style='max-width:70vw;'>{{item.point_name}}</text>
</view>
<view style='display: flex;' catchtap='showpointinfo' data-info='{{item.point_desc}}'>
<text class="cuIcon-info text-black"></text>
</view>
</view>

  </view>
  </scroll-view>
  </view>
</view>




<view class="cu-modal {{modal.show?'show':''}}">
  <view class="cu-dialog">
    <view class="cu-bar bg-white justify-end">
      <view class="content">{{modal.title}}</view>
      <view qq:if='{{modal.cancle.title!=""}}' class="action" bindtap="hideModal" data-url='{{modal.cancle.url}}'>
        <text class="cuIcon-close text-red"></text>
      </view>
    </view>
      <view class="flex justify-center align-center bg-white">
      <text class="text-bold text-black margin-right">数量：</text>
        <view class="cu-tag round bg-green sm cuIcon-move margin-top-xs" catchtap="inputcnt" data-type="de" data-target='nowitem.points' data-cnt='{{nowitem.points}}'></view>
        <view class="margin-lr text-black text-center solids-bottom" style="width:160rpx;">
      <input type="number" value="{{nowitem.points}}" maxlength="10" placeholder-style="color:#000000" bindinput='inputcnts' data-target='nowitem.points' data-cnt='{{nowitem.points}}' bindblur='finishinputcnt'></input>
    </view>
        <view class="cu-tag round bg-red sm cuIcon-add margin-top-xs" catchtap="inputcnt" data-type="add" data-target='nowitem.points' data-cnt='{{nowitem.points}}'></view>
        <text class="text-bold text-black margin-left">点</text>
      </view>
      
    <view class="cu-bar bg-white justify-end">
      <view class="action">
        <button qq:if='{{modal.cancle.title!=""}}' class="cu-btn line-green text-green" bindtap="hideModal" data-url='{{modal.cancle.url}}' data-type='cancle'>{{modal.cancle.title}}</button>
        <button qq:if='{{modal.fine.title!=""}}' class="cu-btn bg-green margin-left" bindtap="hideModal" data-url='{{modal.fine.url}}' data-type='fine'>{{modal.fine.title}}</button>
      </view>
    </view>
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
      <input type="text" placeholder="搜索 用户昵称 | 用户id" confirm-type="search" bindinput="onSearchInput"></input>
    </view>
  </view>

<scroll-view scroll-y style="height: 100vh" bindscrolltolower="showmore">
  <view style="height: 10rpx"></view>

<navigator open-type='navigate' url='./ubanklist'>
    <view class="cu-list menu sm-border card-menu margin-top">
    <view class="cu-item sm-border arrow">
      <view class="text-black text-bold">查看银行固定资产排行</view>
    </view>
  </view>
</navigator>

  <view class="cu-list menu sm-border card-menu margin-top">
    <view class="cu-item sm-border arrow" bindtap="changepoint">
      <view class="text-black text-bold">积分类型</view>
      <view class="text-gray">{{point_name}}</view>
    </view>
  </view>

    <view class="cu-list menu sm-border card-menu margin-top" qq:if="{{point_id && list.length>0 && isadmin}}">
    <view class="cu-item sm-border arrow" bindtap="setPTasks">
      <view class="text-black text-bold">设置<text class='text-red'>{{point_name}}</text>定时任务</view>
    </view>
  </view>

    <view class="cu-list menu sm-border card-menu margin-top" qq:if="{{point_id && list.length>0}}">
    <view class="cu-item sm-border arrow" bindtap="viewmylog">
      <view class="text-black text-bold">查看我的积分明细</view>
    </view>
  </view>

  <view class="cu-list menu sm-border card-menu margin-top" qq:if="{{point_id && list.length>0}}">
    <view class="text-gray text-bold" style='text-align:center;'>Tips: 列表左滑可修改积分、查看积分明细</view>
  </view>
  <view class="justify-between" style='margin:20rpx;text-align:right;' qq:if="{{point_id && list.length>0}}">
  <button class="cu-btn bg-red sm radius" catchtap="deleteall">清空全员积分</button>
  </view>

  <view class="cu-list menu-avatar">
    <view class="cu-item {{modalName=='move-box-'+ index?'move-cur':''}}" qq:for="{{list}}" qq:key="item" style="border-radius: 20rpx; height: 160rpx" qq:if="{{item.show}}" data-item="{{item}}" bindtouchstart="ListTouchStart" bindtouchmove="ListTouchMove" bindtouchend="ListTouchEnd" data-target="move-box-{{index}}" qq:if='{{item.show}}'>
      <view class='text-{{item.index==1?"red":item.index==2?"purple":item.index==3?"orange":"gray"}} light' style="position: absolute; left: 26rpx; font-size: 60rpx; font-weight: 500">{{item.index}}. </view>
      <view class="cu-avatar round lg" style="background-image:url({{item.head}});margin-left:{{item.left}}rpx;{{item.index<=3?'box-shadow:0 0 0 1px #ff000090':''}}"
        catchtap='ViewImage' data-url='{{item.head}}'><view qq:if="{{item.index==1}}" class="cu-tag badge cuIcon-crownfill bg-yellow"></view><view qq:if="{{item.index==2}}" class="cu-tag badge cuIcon-upstagefill bg-purple"></view><view qq:if="{{item.index==3}}" class="cu-tag badge cuIcon-upstagefill bg-orange"></view></view>
      <view class="content" style="margin-left:{{item.left}}rpx" bindtap='copyText' data-name='id' data-link='{{item.user_id}}'>
        <view class="text-black text-bold text-cut" style="max-width:500rpx">{{item.nick}}</view>
        <view class="text-gray text-sm text-cut"> {{point_name}} <text class='text-black text-bold'>{{item.points}}</text> 点</view>
      </view>
      <view class="move">
        <view class="bg-green" data-item='{{item}}' bindtap='upchange'>修改</view>
        <view class="bg-blue" data-item='{{item}}' bindtap='uplogs'>明细</view>
      </view>
    </view>
  </view>

  <view class="cu-list menu sm-border card-menu margin-top" qq:if="{{!point_id}}">
    <view class="text-gray text-bold" style='text-align:center;'>请先选择积分类型</view>
  </view>

  <view class="cu-list menu sm-border card-menu margin-top" qq:if="{{!complete && point_id}}">
    <view class="text-center">
      <button class="cu-btn line-blue sm round" bindtap="showmore">加载更多</button>
    </view>
  </view>

  <view class="cu-list menu sm-border card-menu margin-top" qq:if="{{complete && point_id}}">
    <view class="text-center">
      <text class="text-gray">没有更多数据</text>
    </view>
  </view>
  <view style="height: 60rpx"></view>
</scroll-view>
