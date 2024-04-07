<view class='cu-load load-modal' qq:if="{{loadModal}}">
  <image src='/images/logo.jpeg' class='png' mode='aspectFit'></image>
  <view class='gray-text'>加载中...</view>
</view>





<view class="cu-modal bottom-modal {{modalB=='show' ?'show':''}}" bindtap="hideModalB">
  <view class="cu-dialog" catchtap="stopit">
  <view class='header-view-top'>
  <view class="header-view">
      <view class="header">
        <view></view>
      </view>
      <view class="cu-bar bg-white">
      <view class="action text-black" catchtap="hideModalB">取消</view>
      <text class="text-bold text-black text-lg">选择身份组</text>
      <view class="action text-black" catchtap="setonerole">确定</view>
      </view>
  </view>
  </view>
  <scroll-view scroll-y catchtap='stopit'>

<view style='height:3vh;'></view>

  <view class="cu-list menu sm-border margin-top">

  <view class="cu-item sm-border" qq:for="{{rolelist}}" qq:key='index' catchtap='fclick' data-index='{{index}}' data-item='{{item}}'>
<view style='display: flex;align-items: center;'>
<text class="cuIcon-title" style='color:{{item.hexcolor}};font-size:50rpx;'></text>
<text class="{{item.disable?'text-gray':'text-black'}} text-cut" style='max-width:70vw;'>{{item.name}}</text>
</view>
           
    <text class="cuIcon-roundcheckfill text-blue" qq:if='{{item.select}}'></text>
    <text class="cuIcon-roundcheckfill text-gray" qq:else></text>
  </view>

  </view>
  </scroll-view>
  </view>
</view>


<view class="cu-modal bottom-modal {{modalA=='show' && modalB==''?'show':''}}" bindtap="hideModalA">
  <view class="cu-dialog" catchtap="stopit">
  <view class='header-view-top'>
  <view class="header-view">
      <view class="header">
        <view></view>
      </view>
      <view class="cu-bar bg-white" catchtap='stopit'>
      <view class="action text-black" catchtap="hideModalA">取消</view>
      <text class="text-bold text-black text-lg margin-right-sm">{{nowtarget.code==''?'创建':'编辑'}}邀请码</text>
      <view class="action text-black" catchtap="save">确定</view>
      </view>
  </view>
  </view>
  <scroll-view scroll-y catchtap='stopit' style='text-align:left;'>
<view style='height:3vh;'></view>

<view class="cu-list menu sm-border card-menu margin-top">
    <text>邀请码有效期设置</text>
</view>
<view class="cu-list menu sm-border card-menu margin-top">
<view class="cu-item sm-border">
        <text class="text-bold text-black">相对当前有效期（点击灰字修改）</text>
        <picker mode="multiSelector" range="{{daterange_}}" bindchange="bindMultiPickerChange__">
        <text class="text-gray">{{nowtarget.rest_time+'秒'}}</text>
        </picker>
      </view>
</view>

<view class="cu-list menu sm-border card-menu margin-top">
    <text>邀请码禁言设置</text>
</view>

<view class="cu-list menu sm-border card-menu margin-top">
<view class="cu-item sm-border">
        <text class="text-bold text-black">加入后禁言（点击灰字修改）</text>
        <picker mode="multiSelector" range="{{daterange}}" bindchange="bindMultiPickerChange">
        <text class="text-gray" qq:if='{{nowtarget.gbantime<=0}}'>未设置</text>
        <text class="text-gray" qq:else>{{nowtarget.gbantime+'秒'}}</text>
        </picker>
      </view>
</view>

<view class="cu-list menu sm-border card-menu margin-top">
    <text>邀请码自动赋予身份组设置</text>
</view>

<view qq:for="{{nowtarget.groles}}" qq:key="{{index}}">
    <view class="cu-list menu sm-border card-menu margin-top">
      <view class="cu-item sm-border arrow" bindtap='froles' data-item='{{item}}' data-index='{{index}}'>
        <view style='display: flex;align-items: center;'>
        <text class='cuIcon-roundclose text-red text-bold' style='font-size:38rpx;margin-right:10rpx;' data-index="{{index}}" catchtap="delrole"></text>
        <text class="text-bold text-black">指定身份组</text>
        </view>
        <text class="text-gray text-cut" style='max-width:50vw;'>{{item.rolename}}</text>
      </view>

      <view class="cu-item sm-border">
        <text class="text-bold text-black">赋予时长（点击灰字修改）</text>
        <picker mode="multiSelector" range="{{daterange}}" bindchange="bindMultiPickerChange_" data-index='{{index}}'>
        <text class="text-gray" qq:if='{{item.time<=0}}'>永久</text>
        <text class="text-gray" qq:else>{{item.time+'秒'}}</text>
        </picker>
      </view>
    </view>
</view>

   <view class="cu-list menu sm-border card-menu margin-top" bindtap="addrole">
      <view class="cu-item sm-border">
        <view class="flex-sub text-center">
          <view class="solid-bottom text-xl padding">
            <text class="cuIcon-roundaddfill text-black text-bold"> 添加身份组</text>
          </view>
        </view>
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
      <input type="text" placeholder="搜索 邀请码 | 创建者昵称 | 创建者id" confirm-type="search" bindinput="onSearchInput"></input>
    </view>
  </view>

<view class="bg-white" style="position:fixed;top:auto;left:0;right:0;z-index:999;">
  <view class="cu-bar bg-white flex padding justify-between">
  <button class="cu-btn bg-blue sm" catchtap="selectall">全部选中</button>
  <button class="cu-btn bg-red sm" catchtap="opsome">删除选中</button>
  <button class="cu-btn bg-blue sm" catchtap="cancleall">取消选中</button>
  </view>
</view>

<scroll-view scroll-y style="height:100vh;" bindscrolltolower='fetch_list'>
<view style='height:8vh;'></view>

    <view class="cu-list menu sm-border card-menu margin-top" bindtap="navigate" data-url="myinvitecodes">
      <view class="cu-item sm-border arrow">
        <text class="text-bold text-black">创建我的邀请码</text>
        <text class="text-bold text-gray">可选</text>
      </view>
    </view>

<view class="cu-list menu sm-border card-menu margin-top bg-white" qq:for="{{list}}" qq:key='index' bindtap='selectone' data-item='{{item}}' data-index='{{index}}' qq:if='{{item.show}}'>
 <view class="cu-item sm-border">
  <view class='content text-cut' style='max-width:70vw;'>
      <text class="cuIcon-roundcheckfill text-{{item.select?'blue':'gray'}} margin-right-xs"></text>
      <text class="text-blue">{{item.code}}</text>
  </view>
  <view>
    <button class='cu-btn margin-right-sm round sm' data-item='{{item}}' catchtap='copylink'>邀请链接</button>
  <button class='cu-btn round margin-right-sm sm' data-item='{{item}}' data-index='{{index}}' catchtap='showus'>加入成员</button>
  <button class='cu-btn round sm' data-item='{{item}}' data-index='{{index}}' catchtap='showinfo'>编辑</button>
  </view>
 </view>
    <view class="cu-item flex padding-left-sm margin-bottom-sm margin-top-sm">
      <view class="cu-avatar round" style="background-image:url({{item.authorhead}});"></view>
      <view class="content text-gray text-sm padding-left-sm text-cut">
        <text class="text-lg text-black">{{item.authorname}}</text>
        <view class="">过期时间：{{item.exp_time}}</view>
      </view>
      <view class="text-gray text-sm" style='text-align:right;'>
        <view>已邀请：{{item.invitecnt}}个</view>
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

</scroll-view>
