<view class='cu-load load-modal' qq:if="{{loadModal}}">
  <image src='/images/logo.jpeg' class='png' mode='aspectFit'></image>
  <view class='gray-text'>加载中...</view>
</view>


<view class="cu-modal bottom-modal {{modalA=='show'?'show':''}}" bindtap="hideModalA">
  <view class="cu-dialog" catchtap="stopit">
  <view class='header-view-top'>
  <view class="header-view">
      <view class="header">
        <view></view>
      </view>
      <view class="cu-bar bg-white" catchtap='stopit'>
      <view class="action text-black" catchtap="hideModalA">取消</view>
      <text class="text-bold text-black text-lg margin-right-sm">选择禁言时间（0秒解除禁言）</text>
      <view class="action text-black" catchtap="uop">确定</view>
      </view>
  </view>
  </view>
  <scroll-view scroll-y catchtap='stopit' style='text-align:left;'>
<view style='height:3vh;'></view>

<view class="cu-list menu sm-border card-menu margin-top">
<view class="cu-item sm-border">
        <text class="text-bold text-black">禁言时长（点击灰字修改）</text>
        <picker mode="multiSelector" range="{{daterange}}" bindchange="bindMultiPickerChange">
        <text class="text-gray">{{bantime+'秒'}}</text>
        </picker>
      </view>
</view>

  <view style="height:18vh;"></view>


  </scroll-view>
  </view>
</view>






<view class="cu-modal bottom-modal {{modalB=='show' && modalA!='show'?'show':''}}" bindtap="hideModalB">
  <view class="cu-dialog" catchtap="stopit">
  <view class='header-view-top'>
  <view class="header-view">
      <view class="header">
        <view></view>
      </view>
      <view class="cu-bar bg-white" catchtap='stopit'>
      <view class="action text-black" catchtap="hideModalB">取消</view>
      <text class="text-bold text-black text-lg margin-right-sm">选择操作</text>
      <view class="action text-black"> </view>
      </view>
  </view>
  </view>
  <scroll-view scroll-y catchtap='stopit' style='text-align:left;'>
<view style='height:3vh;'></view>

<view class="cu-list menu sm-border card-menu margin-top" data-item='{{tmpitem}}' catchtap='uopa'>
      <view class="cu-item sm-border">
        <text class="text-bold text-black">踢出</text>
        <text class="text-grey">将用户移出频道</text>
      </view>
</view>
<view class="cu-list menu sm-border card-menu margin-top" data-item='{{tmpitem}}' catchtap='uopb'>
      <view class="cu-item sm-border">
        <text class="text-bold text-black">踢黑</text>
        <text class="text-grey">将用户移出频道并拉黑（撤回所有发言）</text>
      </view>
</view>
<view class="cu-list menu sm-border card-menu margin-top" data-item='{{tmpitem}}' catchtap='uopd'>
      <view class="cu-item sm-border">
        <text class="text-bold text-black">禁言</text>
        <text class="text-grey">禁言或解除禁言</text>
      </view>
</view>

  <view style="height:18vh;"></view>


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
      <input type="text" placeholder="搜索 昵称|用户id|时间|日志内容" confirm-type="search" bindinput="onSearchInput"></input>
    </view>
  </view>

<scroll-view scroll-y style="height:100vh;" bindscrolltolower='loadmore'>
<view style='height:8vh;'></view>

  <view class="cu-list menu sm-border card-menu margin-top" qq:for="{{logs}}" qq:key='index' qq:if='{{item.show}}'>
      <view class="cu-bar bg-white">
      <view class="action text-green" bindtap='copytime' data-item='{{item}}'>{{item.time}}</view>
<view>


<button class='cu-btn margin-right-sm round sm' data-item='{{item}}' catchtap='uope'>解禁</button>
<button class='cu-btn round margin-right-sm sm' data-item='{{item}}' catchtap='uopc'>下黑</button>
<button class='cu-btn round margin-right-sm sm' data-item='{{item}}' catchtap='uopf'>重置警告</button>
<button class='cu-btn round margin-right-sm sm' data-item='{{item}}' catchtap='MoreOp'>...</button>

</view>
    </view>
    <view class="cu-item sm-border">
    <view class="cu-avatar round" style="background-image:url({{item.userhead}});" bindtap='copyid' data-item='{{item}}'></view>
      <view class="content margin-left-sm text-cut">
        <text class="text-black" bindtap='copynick' data-item='{{item}}'>{{item.usernick}}</text>
        <view class="cu-tag radius sm bg-red" qq:if='{{item.userrole==2}}'>频道主</view>
        <view class="cu-tag radius sm bg-blue" qq:if='{{item.userrole==1}}'>超级管理员</view>
        <view class="cu-tag radius sm bg-grey" qq:if='{{item.userrole==0}}'>其他成员</view>
      </view>
    </view>
    <view class="cu-item sm-border" bindtap="copylog" data-item='{{item}}'>
    <view style='width: 100%;word-wrap: break-word;'>
      <text class="text-blue">{{item.logs}}</text>
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