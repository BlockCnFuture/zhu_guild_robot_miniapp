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
      <text class="text-bold text-black text-lg" qq:if="{{nowtasktype=='0'}}">选择对发送人的操作</text>
      <text class="text-bold text-black text-lg" qq:if="{{nowtasktype=='1'}}">选择对举报内容的操作</text>
      <text class="text-bold text-black text-lg" qq:if="{{nowtasktype=='2'}}">选择对申请人的操作</text>
      <text class="text-bold text-black text-lg" qq:if="{{nowtasktype=='3'}}">选择对被举报者的操作</text>
      <view class="action text-black" catchtap='ensureop'>确定</view>
      </view>
  </view>
  </view>
  <scroll-view scroll-y catchtap='stopit'>
  <view class="cu-list menu sm-border margin-top">

  <view class="cu-item sm-border" qq:for="{{oplist[nowtasktype]}}" qq:key='index' catchtap='oclick' data-index='{{index}}' data-item='{{item}}'>
<text class="text-black margin-left-xs">{{item.name}}</text>
<picker mode="multiSelector" range="{{daterange}}" bindchange="bindMultiPickerChange">
  <view class="text-bold padding text-black" qq:if='{{(item.type=="0" || item.type=="2" || item.type=="8" || item.type=="10") && item.select}}'>{{bantimes}}</view>
  </picker>
  <text class="cuIcon-roundcheckfill text-blue" qq:if='{{item.select}}'></text>
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
      <input type="text" placeholder="搜索 值班任务id" confirm-type="search" bindinput="onSearchInput"></input>
    </view>
  </view>

<scroll-view scroll-y style="height:100vh;" bindscrolltolower='fetch_list'>
<view style='height:8vh;'></view>

<view class="cu-list menu sm-border card-menu margin-top bg-white" qq:for="{{list}}" qq:key='index' data-item='{{item}}' data-index='{{index}}' qq:if='{{item.show}}'>
 <view class="cu-item sm-border">
  <view class='content text-cut' style='max-width:70vw;'>
      <text class="text-blue">{{item.taskid}}</text>
  </view>
  <button class='cu-btn round line-red shadow sm' data-item='{{item}}' data-index='{{index}}' catchtap='delonetask' data-id='{{item.taskid}}' data-isclose='1' qq:if='{{item.closed!="1"}}'>🔒关闭任务</button>
  <button class='cu-btn round line-blue shadow sm margin-left' data-id='{{item.taskid}}' data-mida='{{item.mida}}' data-midb='{{item.midb}}' data-type='{{item.tasktype}}' catchtap='optasks' qq:if='{{item.closed!="1"}}'>处理任务</button>
  <button class='cu-btn round line-blue shadow sm' data-item='{{item}}' data-index='{{index}}' catchtap='delonetask' data-id='{{item.taskid}}' data-isclose='0' qq:if='{{item.closed=="1"}}'>🔓已处理，点击重启任务</button>
 </view>

<view class="flex padding-left-sm margin-bottom-sm margin-top-sm">
      <view class="text-gray text-sm">
        <view qq:if="{{item.tasktype=='0'}}">
          <text class='text-blue' catchtap='show' data-id='{{item.mida}}'>>>查看发送内容</text>
        </view>
        <view qq:if="{{item.tasktype=='1'}}">
          <text class='text-blue' catchtap='show' data-id='{{item.mida}}'>>>查看举报内容</text>
        </view>
        <view qq:if="{{item.tasktype=='2'}}">
          <text class='text-blue' catchtap='show' data-id='{{item.mida}}'>>>查看申请理由</text>
        </view>
        <view qq:if="{{item.tasktype=='3'}}">
          <text class='text-blue' catchtap='show' data-id='{{item.mida}}'>>>查看举报人</text>
          <text class='text-blue margin-left' catchtap='show' data-id='{{item.midb}}'>>>查看被举报消息</text>
        </view>
      </view>
      <view class="text-gray text-sm margin-right-sm" style='flex:1;text-align:right;'>
        <view class="text-gray" qq:if="{{item.tasktype=='0'}}">任务类型：处理违禁词</view>
        <view class="text-gray" qq:if="{{item.tasktype=='1'}}">任务类型：处理举报内容</view>
        <view class="text-gray" qq:if="{{item.tasktype=='2'}}">任务类型：解除禁言申请</view>
        <view class="text-gray" qq:if="{{item.tasktype=='3'}}">任务类型：处理举报消息</view>
      </view>
    </view>
</view>

  <view class="cu-list menu sm-border card-menu margin-top" qq:if='{{!complete}}'>
    <view class="text-center">
      <button class="cu-btn line-blue sm round" bindtap="fetch_list">加载更多</button>
    </view>
  </view>
  
  <view class="cu-list menu sm-border card-menu margin-top" qq:if='{{complete}}'>
    <view class="text-center">
      <text class="text-gray">没有更多数据</text>
    </view>
  </view>

  <view style="height:3vh;"></view>
</scroll-view>
