<view class='cu-load load-modal' qq:if="{{loadModal}}">
  <image src='/images/logo.jpeg' class='png' mode='aspectFit'></image>
  <view class='gray-text'>加载中...</view>
</view>

<view class="cu-modal bottom-modal {{modal=='show'?'show':''}}" bindtap="hideModal">
  <view class="cu-dialog" catchtap="stopit">
  <view class='header-view-top'>
  <view class="header-view">
      <view class="header">
        <view></view>
      </view>
      <view class="cu-bar bg-white" catchtap='stopit'>
      <view class="action text-black" catchtap="hideModal">取消</view>
      <text class="text-bold text-black text-lg margin-right-sm">选择目标 (只对已加载列有效)</text>
      <view class="action text-black">  </view>
      </view>
  </view>
  </view>
  <scroll-view scroll-y catchtap='stopit'>
  <view class="padding">
  <button class="cu-btn block bg-black margin-tb-sm lg" catchtap='selectallblack'>选中已拉黑用户</button>
  <button class="cu-btn block bg-green margin-tb-sm lg" catchtap='selectallwhite'>选中未拉黑用户</button>
  <button class="cu-btn block bg-blue margin-tb-sm lg" catchtap='selectall'>选中现有全部用户</button>
</view>
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
      <view class="cu-bar bg-white" catchtap='stopit'>
      <view class="action text-black" catchtap="hideModalA">取消</view>
      <text class="text-bold text-black text-lg margin-right-sm">选择操作</text>
      <view class="action text-black">  </view>
      </view>
  </view>
  </view>
  <scroll-view scroll-y catchtap='stopit'>
<view style='height:3vh;' qq:if='{{nowtarget!=""}}'></view>
<view class="bg-white margin-sm" style="border-radius:10px;" qq:if='{{nowtarget!=""}}'>
  <view class="flex padding-sm justify-between solid-bottom">
    <view class="flex">
      <view class="padding-lr-xs">
      <view class="cu-avatar lg round" style="background-image:url({{nowtarget.userhead}});">
        </view>
      </view>
      <view class="padding-xs text-xl text-black text-cut">
        <text bindtap='copynick' data-item="{{nowtarget}}">{{nowtarget.usernick}}</text>
        <view class="text-sm text-{{nowtarget.is_black?'red':'gray'}} padding-top-xs">{{nowtarget.is_black?'已拉黑':'未拉黑'}}</view>
      </view>
    </view>
    <view class="text-gray text-sm padding-right padding-top-sm" bindtap='copyid' data-item="{{nowtarget}}">id：{{nowtarget.user_id}}</view>
  </view>

  <view class="margin-sm margin-top">
    <view class="text-gray padding-bottom" style="text-align: left;">历史信息：</view>
    <view class="cu-timeline">
      <view class="cu-item cur cuIcon-noticefill">
        <view class="content bg-blue light shadow-blur" style="text-align: left;">
          <text class="cuIcon-time">{{nowtarget.last_black_time}}</text>
          <view class="cuIcon-form padding-top-xs">操作：上黑</view>
        <view class="cuIcon-people padding-top-xs">操作人：{{nowtarget.black_admin}}</view>
        <view style='width: 100%;word-wrap: break-word;'>
         <view class="cuIcon-info padding-top-xs">原因：{{nowtarget.black_reason}}</view>
        </view>
        </view>
      </view>
      <view class="cu-item cur cuIcon-noticefill" qq:if="{{nowtarget.deblack_reason!=''}}">
        <view class="content bg-blue light shadow-blur" style="text-align: left;">
          <view class="cuIcon-form padding-top-xs">操作：下黑</view>
        <view class="cuIcon-people padding-top-xs">操作人：{{nowtarget.deblack_admin}}</view>
        <view style='width: 100%;word-wrap: break-word;'>
         <view class="cuIcon-info padding-top-xs">原因：{{nowtarget.deblack_reason}}</view>
         </view>
        </view>
      </view>
    </view>
  </view>
</view>
<view style='height:3vh;' qq:if='{{nowtarget==""}}'></view>
  <view class="padding bg-white">

<view style='display: flex;justify-content: center;align-items: center;'>
  <textarea qq:if="{{modalA=='show'}}" maxlength='100' style="text-align: left;border: 1px solid gray;border-radius: 5px;height:80rpx;width:100%;" bindinput="onInput" placeholder='上黑/下黑 理由' cursor-spacing='20' show-confirm-bar='{{false}}'></textarea>
  </view>

<view class="cu-bar bg-white flex padding justify-between">
  <button class="cu-btn bg-black margin-tb-sm sm" catchtap='do_operation' data-op='black'>上黑</button>
  <button class="cu-btn bg-red margin-tb-sm sm" catchtap='do_operation' data-op='del'>删除用户</button>
  <button class="cu-btn bg-blue margin-tb-sm sm" catchtap='do_operation' data-op='white'>下黑</button>
</view>
</view>
<view class='bg-white' style='height:100vh;'></view>
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
      <input type="text" placeholder="搜索 昵称|用户id|拉黑状态" confirm-type="search" bindinput="onSearchInput"></input>
    </view>

  </view>

<view class="bg-white" style="position:fixed;top:auto;left:0;right:0;z-index:999;">
  <view class="cu-bar bg-white flex padding justify-between">
  <button class="cu-btn bg-blue sm" catchtap="selectsome">批量选中</button>
  <button class="cu-btn bg-red sm" catchtap="opsome">批量操作选中项</button>
  <button class="cu-btn bg-blue sm" catchtap="cancleall">取消所有选中</button>
  </view>
</view>

<scroll-view scroll-y style="height:100vh;" bindscrolltolower='fetch_list'>
<view style='height:8vh;'></view>

  <view class="cu-list menu sm-border card-menu margin-top">

    <view class="cu-item sm-border arrow" qq:for="{{blacklist}}" qq:key='index' data-item='{{item}}' data-index='{{index}}' bindtap='showinfo' qq:if='{{item.show}}'>
<text class="cuIcon-roundcheckfill text-{{item.select?'blue':'gray'}} margin-right-xs"  catchtap='selectone' data-item='{{item}}' data-index='{{index}}'></text>
    <view class="cu-avatar round" style="background-image:url({{item.userhead}});" catchtap='selectone' data-item='{{item}}' data-index='{{index}}'></view>
    <view class="content margin-left-sm text-cut">
        <text class="text-black" catchtap='selectone' data-item='{{item}}' data-index='{{index}}'>{{item.usernick}}</text>
      </view>
        <view class="sm text-gray" qq:if='{{item.is_black==0}}'>状态：未拉黑</view>
        <view class="sm text-gray" qq:if='{{item.is_black==1}}'>状态：已拉黑</view>
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

  <view class="cu-tabbar-height"></view>
</scroll-view>
