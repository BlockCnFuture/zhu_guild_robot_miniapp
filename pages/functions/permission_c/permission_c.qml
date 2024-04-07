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
      <view class="action text-black" catchtap="setrole">确定</view>
      </view>
  </view>
  </view>
  <scroll-view scroll-y catchtap='stopit'>
<view style='height:1vh'></view>
  <view class="cu-bar bg-white flex padding justify-between">
  <button class="cu-btn bg-blue sm" catchtap="selectall">全选</button>
  <button class="cu-btn bg-blue sm" catchtap="cancleall">全不选</button>
  </view>

  <view class="cu-list menu sm-border margin-top">

  <view class="cu-item sm-border" qq:for="{{rolelist}}" qq:key='index' catchtap='fclick' data-index='{{index}}' data-item='{{item}}'>
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
      <input type="text" placeholder="搜索指令名" confirm-type="search" bindinput="onSearchInput"></input>
    </view>
  </view>

<view class="bg-white" style="position:fixed;top:auto;left:0;right:0;z-index:999;">
  <view class="cu-bar bg-white flex padding justify-between">
  <button class="cu-btn bg-blue sm" catchtap="selectsome_">选中所有指令</button>
  <button class="cu-btn bg-red sm" catchtap="opsome">分配选中指令</button>
  <button class="cu-btn bg-blue sm" catchtap="cancleall_">取消所有选中</button>
  </view>
</view>

<scroll-view scroll-y>

<view style='height:8vh;'></view>

  <view class="cu-list menu sm-border card-menu margin-top">
    <text>需要分配权限的指令列表</text>
  </view>

  <view class="cu-list menu sm-border card-menu margin-top" qq:for="{{clist}}" qq:key="{{index}}" data-item="{{item}}" qq:if='{{item.show}}'>
    <view class="cu-item sm-border" catchtap='selectone' data-item='{{item}}' data-index='{{index}}'>
      <view class="content">
      <text class="cuIcon-roundcheckfill text-{{item.select?'blue':'gray'}} margin-right-xs"  catchtap='selectone' data-item='{{item}}' data-index='{{index}}'></text>
        <text class="text-blue text-bold">@机器人 </text>
        <text class="text-black text-bold">/{{item.c}}</text>
      </view>
      <button class="cu-btn round" data-c="{{item.c}}" catchtap="copycommand">复制</button>
    </view>
    <view class="cu-item sm-border no-border" catchtap='selectone' data-item='{{item}}' data-index='{{index}}'>
      <text class="text-gray">{{item.d}} 
      
      有指令权限的身份组，点击区域可修改↓</text>
    </view>
    <view class="cu-item sm-border no-border" catchtap='changeroles' data-item='{{item}}'>
      <view class="bg-blue margin-sm radius-df light shadow-blur" style="min-height: 10vh;width:100%">
      <view class='padding-top-xs padding-left-xs padding-bottom-xs'>

      <view class="cu-tag radius sm text-cut" style='justify-content:left;max-width:50vw;' qq:for='{{item.roles}}' qq:key='i' qq:for-index='i' qq:for-item="si">

<text class="cuIcon-title" style='color:{{si.hexcolor}};font-size:50rpx;margin-left:-8px;' qq:if='{{si.hexcolor!="n"}}'></text>
<text class="cuIcon-choicenessfill text-blue" style='margin-right:6px;' qq:else></text>
<text style='margin-left:-2px;'>{{si.name}}</text>

      </view>

      </view>
      </view>
    </view>

  </view>

  <view style='height:17vh;'></view>
</scroll-view>

<view class="bg-white" style="position:fixed;z-index:1024;bottom: 0;top:auto;left:0;right:0;">
<view class="padding">
<button class="cu-btn block bg-blue margin-tb-sm lg" bindtap='saveall'>保存</button>
</view>
</view>
