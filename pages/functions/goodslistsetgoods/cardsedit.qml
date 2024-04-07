<view class="cu-load load-modal" qq:if="{{loadModal}}">
  <image src="/images/logo.jpeg" class="png" mode="aspectFit"></image>
  <view class="gray-text">加载中...</view>
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
      <text class="text-bold text-black text-lg">选择操作</text>
      <view class="action text-black"> </view>
      </view>
  </view>
  </view>
  <scroll-view scroll-y catchtap='stopit'>
  <view class="cu-list menu sm-border margin-top">

  <view class="cu-item sm-border" qq:for="{{oplist}}" qq:key='index' catchtap='oclick' data-index='{{index}}' data-item='{{item}}'>
<text class="text-black">{{item}}</text>
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
      <input type="text" placeholder="搜索 兑换码" confirm-type="search" bindinput="onSearchInput"></input>
    </view>
  </view>

<view style='height:20rpx;'></view>
<view class='text-gray' style='text-align:center;'>兑换码需自定义或用工具生成，至多500个，多的自动过滤</view>
<view class='text-gray' style='text-align:center;'>一行一个，重复的自动过滤，被使用后自动删除</view>
<view class='text-gray' style='text-align:center;'>单个长度不得大于76，过长的数据将被过滤</view>
<view class="margin-sm bg-white" style='border-radius:20rpx;'>

<view class="cu-list menu sm-border margin-top" style='border-radius:20rpx;'>
<view class="cu-item sm-border bg-white">
<view class='text-black text-bold'>上传兑换码</view>
</view>
</view>
<view class="cu-list menu sm-border margin-top card-menu">
<view class="cu-item sm-border" style='border-radius:20rpx;border: 1px solid gray;'>
<custom-textarea maxlength='35000' style="text-align:left;width:100%;" bindinput="onInputArea" value="{{precards}}"></custom-textarea>
</view>
<view class="bg-white">
<button class="cu-btn block bg-blue margin-tb-sm lg" bindtap="upload">上传</button>
</view>
</view>

<view style='height:30rpx;'></view>
</view>

<view class='flex align-center justify-center margin-top' qq:if='{{cardslist.length>0}}'>
<button class="cu-btn round line-black shadow sm margin-right" catchtap="pall">下架全部</button>
<button class="cu-btn round line-blue shadow sm" catchtap="oall">上架全部</button>
<button class="cu-btn round line-red shadow sm margin-left" catchtap="dall">删除全部</button>
</view>

<view class="cu-list menu sm-border margin-top card-menu" style='border-radius:20rpx;' qq:for='{{cardslist}}' qq:key='index' data-item='{{item}}' qq:if='{{item.show}}'>
<view class="cu-item sm-border bg-white" bindtap='opone' data-item='{{item}}'>
<view class='text-{{item.onsold=="1"?"black":"gray"}} text-cut' style='max-width:60vw;'>{{item.card}}</view>
<view class='text-{{item.onsold=="1"?"black":"gray"}}'>id：{{item.cardid}}</view>
</view>
</view>

<view style='height:30rpx;'></view>