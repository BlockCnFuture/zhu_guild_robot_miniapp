<view class='cu-load load-modal' qq:if="{{loadModal}}">
  <image src='/images/logo.jpeg' class='png' mode='aspectFit'></image>
  <view class='gray-text'>加载中...</view>
</view>




<view class="cu-modal bottom-modal {{modalD=='show'?'show':''}}" bindtap="hideModalD">
  <view class="cu-dialog" catchtap="stopit">
  <view class='header-view-top'>
  <view class="header-view">
      <view class="header">
        <view></view>
      </view>
      <view class="cu-bar bg-white">
      <view class="action text-black" catchtap="hideModalD">取消</view>
      <text class="text-bold text-black text-lg">选择身份组</text>
      <view class="action text-black"> </view>
      </view>
  </view>
  </view>
  <scroll-view scroll-y catchtap='stopit'>

<view style='height:3vh;'></view>

  <view class="cu-list menu sm-border margin-top">

  <view class="cu-item sm-border" qq:for="{{rolelist}}" qq:key='index' catchtap='fclick' data-index='{{index}}' data-item='{{item}}'>
<view style='display: flex;align-items: center;'>
<text class="cuIcon-title" style='color:{{item.hexcolor}};font-size:50rpx;'></text>
<text class="text-black text-cut" style='max-width:70vw;'>{{item.name}}</text>
</view>
</view>

  </view>
  </scroll-view>
  </view>
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
      <text class="text-bold text-black text-lg">注意保存设置内容</text>
      <view class="action text-black" catchtap="savesets">保存</view>
      </view>
  </view>
  </view>
  <scroll-view scroll-y>
  <view style='height:1vh'></view>
  <view class="cu-bar bg-white flex padding justify-between">
  <button class="cu-btn bg-blue sm" catchtap="selectall">全选</button>
  <button class="cu-btn bg-blue sm" catchtap="cancleall">全不选</button>
  </view>

  <view class="cu-bar bg-white">
    <view class="search-form round">
      <text class="cuIcon-search"></text>
      <input type="text" placeholder="搜索 权限名称" confirm-type="search" bindinput="onSearchInputS" value='{{keywords}}'></input>
    </view>
  </view>

  <view class="cu-list menu sm-border margin-top">
  <view class="cu-item sm-border" qq:for="{{permissionlist_names}}" qq:key='index' data-item='{{item}}' catchtap='pclick' data-index='{{index+2}}' data-has='{{item.has}}' qq:if='{{item.show}}'>
  <text class="text-black text-lg">{{item.name}}</text>
  <text class="cuIcon-{{item.has?'roundcheckfill':'roundclosefill'}} text-{{item.has?'blue':'red'}}"></text>
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
      <input type="text" placeholder="搜索昵称" confirm-type="search" bindinput="onSearchInput"></input>
    </view>
  </view>

<view class="bg-white" style="position:fixed;top:auto;left:0;right:0;z-index:999;">
  <view class="cu-bar bg-white flex padding justify-between">
  <button class="cu-btn bg-blue sm" catchtap="selectsome_">选中所有用户</button>
  <button class="cu-btn bg-red sm" catchtap="opsome">分配选中者权限</button>
  <button class="cu-btn bg-blue sm" catchtap="cancleall_">取消所有选中</button>
  </view>
</view>


<scroll-view scroll-y style="height:100vh;" bindscrolltolower='fetch_list'>

<view style='height:8vh;'></view>

  <view class="cu-list menu sm-border card-menu margin-top" bindtap='choseRole'>
    <view class="cu-item sm-border arrow">
    <text class='text-bold text-black'>操作的身份组</text>
    <view class='text-cut' style='max-width:50vw;'>
    <text class='text-gray'>{{nowgrpname}}</text>
    </view>
    </view>
  </view>

  <view class="cu-list menu sm-border card-menu margin-top">
    <view class="cu-item sm-border arrow" bindtap="navigate" data-url="permission" qq:for="{{userlist}}" qq:key='index' data-item='{{item}}' qq:if='{{item.show}}'>
    <text class="cuIcon-roundcheckfill text-{{item.select?'blue':'gray'}} margin-right-xs"  catchtap='selectone' data-item='{{item}}' data-index='{{index}}'></text>
    <view class="cu-avatar round" style="background-image:url({{item.user.avatar}});" catchtap='selectone' data-item='{{item}}' data-index='{{index}}'></view>
      <view class="content margin-left-sm text-cut">
        <text class="text-black" catchtap='selectone' data-item='{{item}}' data-index='{{index}}'>{{item.user.username}}</text>
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

  <view class="cu-tabbar-height"></view>
</scroll-view>
