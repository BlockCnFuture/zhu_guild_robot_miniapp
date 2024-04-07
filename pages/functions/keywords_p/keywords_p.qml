<view class='cu-load load-modal' qq:if="{{loadModal}}">
  <image src='/images/logo.jpeg' class='png' mode='aspectFit'></image>
  <view class='gray-text'>加载中...</view>
</view>


<view class="cu-modal {{modal.show?'show':''}}">
  <view class="cu-dialog">
    <view class="cu-bar bg-white justify-end">
      <view class="content">{{modal.title}}</view>
      <view qq:if='{{modal.cancle.title!=""}}' class="action" bindtap="hideModal" data-url='{{modal.cancle.url}}'>
        <text class="cuIcon-close text-red"></text>
      </view>
    </view>
    <text class="padding-xl text-left">
      {{modal.content}}

    </text>
    <view class="cu-bar bg-white justify-end">
      <view class="action">
        <button qq:if='{{modal.cancle.title!=""}}' class="cu-btn line-green text-green" bindtap="hideModal" data-url='{{modal.cancle.url}}'>{{modal.cancle.title}}</button>
        <button qq:if='{{modal.fine.title!=""}}' class="cu-btn bg-green margin-left" bindtap="hideModal" data-url='{{modal.fine.url}}'>{{modal.fine.title}}</button>
      </view>
    </view>
  </view>
</view>

<view class="cu-modal bottom-modal {{modalD=='show'?'show':''}}" bindtap="hideModalD">
  <view class="cu-dialog" catchtap="stopit">
  <view class='header-view-top'>
  <view class="header-view">
      <view class="header">
        <view></view>
      </view>
      <view class="cu-bar bg-white" catchtap='stopit'>
      <view class="action text-black" catchtap="hideModalD">取消</view>
      <text class="text-bold text-black text-lg">选择子频道</text>
      <view class="action text-black"> </view>
      </view>
  </view>
  </view>
  <scroll-view scroll-y catchtap='stopit'>
  <view class="cu-list menu sm-border margin-top">
  <view class="cu-item sm-border" qq:for="{{ochannellist}}" qq:key='index' catchtap="{{item.type!=4?'spclick':'stopit'}}" data-index='{{index}}' data-item='{{item}}'>
<text qq:if='{{item.type==4}}' class="cuIcon-triangledownfill"><text class="text-black margin-left-xs">{{item.name}}</text></text>
<view qq:if='{{item.type!=4}}' class="margin-left">
<text qq:if='{{item.type==0 && item.sub_type==0}}' class="cuIcon-comment"><text class="text-black margin-left-xs">{{item.name}}</text></text>
<text qq:if='{{item.type==0 && item.sub_type==1}}' class="cuIcon-notification"><text class="text-black margin-left-xs">{{item.name}}</text></text>
<text qq:if='{{item.type==2}}' class="cuIcon-voice"><text class="text-black margin-left-xs">{{item.name}}</text></text>
<text qq:if='{{item.type==10005}}' class="cuIcon-record"><text class="text-black margin-left-xs">{{item.name}}</text></text>
<text qq:if='{{item.type==10006}}' class="cuIcon-apps"><text class="text-black margin-left-xs">{{item.name}}</text></text>
<text qq:if='{{item.type==10007}}' class="cuIcon-edit"><text class="text-black margin-left-xs">{{item.name}}</text></text>
  </view>
  </view>
  </view>
  </scroll-view>
  </view>
</view>




<view class="cu-modal bottom-modal {{modalE=='show'?'show':''}}" bindtap="hideModalE">
  <view class="cu-dialog" catchtap="stopit">
  <view class='header-view-top'>
  <view class="header-view">
      <view class="header">
        <view></view>
      </view>
      <view class="cu-bar bg-white" catchtap='stopit'>
      <view class="action text-black" catchtap="hideModalE">取消</view>
      <text class="text-bold text-black text-lg">查看图片</text>
      <view class="action text-black"> </view>
      </view>
  </view>
  </view>
  <scroll-view scroll-y catchtap='stopit'>
<view style="height:3vh;"></view>

<swiper class="card-swiper square-dot bg-white" indicator-dots="true" circular="true" autoplay="true" interval="5000" duration="500" bindchange="cardSwiper" indicator-color="#8799a3" indicator-active-color="#0081ff">
  <swiper-item class="cur">
    <view class="swiper-item">
      <image src="{{tmpimg}}" mode="aspectFill"></image>
    </view>
  </swiper-item>
</swiper>

<view class="padding bg-white">
<text class="text-gray text-lg bg-white" qq:if='{{tmpimg!=""}}'>请检查图片内容是否合规</text>
<text class="text-gray text-lg bg-white" qq:if='{{tmpimg==""}}'>未设置图片</text>
</view>

<view class="padding bg-white">
<button class="cu-btn block bg-blue margin-tb-sm lg" catchtap="ViewImage">查看原图</button>
</view>

  </scroll-view>
  </view>
</view>



<view class="cu-modal bottom-modal {{modalB=='show' && modalE=='' && modalD==''?'show':''}}" bindtap="hideModalB">
  <view class="cu-dialog" catchtap="stopit">
  <view class='header-view-top'>
  <view class="header-view">
      <view class="header">
        <view></view>
      </view>
      <view class="cu-bar bg-white" catchtap='stopit'>
      <view class="action text-black" catchtap="hideModalB">取消</view>
      <text class="text-bold text-black text-lg">查看内容</text>
      <view class="action text-black"> </view>
      </view>
  </view>
  </view>
  <scroll-view scroll-y catchtap='stopit'>
<view style="height:3vh;"></view>
<view class="cu-list menu sm-border card-menu margin-top">
<view class="cu-item sm-border bg-white">
<custom-textarea maxlength='{{nowtargetc=="nowtarget.content"?"500":"70"}}' style="text-align: left;width:100%;{{modalB=='show'?'':'display:none;'}}" value="{{tmpc}}" disabled></custom-textarea>
</view>
</view>

<view qq:if="{{nowtargetc=='nowtarget.keyword'}}"></view>
<view qq:else>
<view catchtap='changeimage'>
<view class="cu-card case margin" qq:if='{{nowtarget.image!=""}}'>
    <view class="image" style='height:200rpx;width:200rpx;object-fit:cover;overflow:hidden;'>
      <image src="{{nowtarget.image}}"></image>
      <view class="cu-tag bg-blue">点击查看</view>
    </view>
</view>
<view class='text-xsl' qq:if='{{nowtarget.image==""}}' style='text-align: left;margin-left:28rpx;'>
<text class="cuIcon-picfill"></text>
</view>
</view>
</view>
<view style="height:3vh;"></view>
  </scroll-view>
  </view>
</view>






<view class="cu-modal bottom-modal {{modalA=='show' && modalB=='' && modalC=='' && modalD==''?'show':''}}" bindtap="hideModalA">
  <view class="cu-dialog" catchtap="stopit">
  <view class='header-view-top'>
  <view class="header-view">
      <view class="header">
        <view></view>
      </view>
      <view class="cu-bar bg-white" catchtap='stopit'>
      <view class="action text-black" catchtap="hideModalA">取消</view>
      <text class="text-bold text-black text-lg margin-right-sm">查看关键词</text>
      <view class="action text-black"> </view>
      </view>
  </view>
  </view>
  <scroll-view scroll-y catchtap='stopit'>
<view style='height:3vh;'></view>
<view class="bg-white margin-sm" style="border-radius:10px;">
  <view class="flex padding-sm justify-between solid-bottom">
    <view class="flex">
      <view class="padding-lr-xs">
      <view class="cu-avatar lg round" style="background-image:url({{nowtarget.editorhead}});">
        </view>
      </view>
      <view class="padding-xs text-xl text-black">
        <view bindtap="copynick" data-item="{{nowtarget}}">{{nowtarget.editornick}}</view>
        <view class="text-sm text-gray padding-top-xs">编辑者</view>
      </view>
    </view>
    <view class="text-gray text-sm padding-right padding-top-sm" bindtap="copyid" data-item="{{nowtarget}}">id：{{nowtarget.editor}}</view>
  </view>

  <view class="margin-sm margin-top">
    <view class="text-gray padding-bottom" style="text-align: left;">关键词信息：</view>
    <view class="cu-timeline">
      <view class="cu-item cur cuIcon-time" qq:if="{{nowtarget.edit_time!=''}}">
        <view class="content bg-blue light shadow-blur" style="text-align: left;">
          <view class="padding-top-xs">上次编辑时间</view>
          <text class="padding-top-xs">{{nowtarget.edit_time}}</text>
        </view>
      </view>
      <view class="cu-item cur cuIcon-form">
        <view class="content bg-blue light shadow-blur" style="text-align: left;">
          <view class="padding-top-xs">关键词内容<button class="cu-btn sm margin-left-sm shadow round" catchtap="setdesc" data-target='nowtarget.keyword'>查看</button></view>
          <view style='width: 100%;word-wrap: break-word;'>
          <text style="text-align: left;">{{nowtarget.keyword}}</text>
          </view>
        </view>
      </view>
      <view class="cu-item cur cuIcon-edit">
        <view class="content bg-blue light shadow-blur" style="text-align: left;">
          <view class="padding-top-xs">回复内容<button class="cu-btn sm margin-left-sm shadow round" catchtap="setdesc" data-target='nowtarget.content'>查看</button></view>
          <view style='width: 100%;word-wrap: break-word;'>
          <text style="text-align: left;">{{nowtarget.content}}{{nowtarget.image!=''?'[图片]':''}}</text>
          </view>
        </view>
      </view>
    </view>
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
      <input type="text" placeholder="搜索 关键词|昵称|用户id|时间|回复内容" confirm-type="search" bindinput="onSearchInput"></input>
    </view>
  </view>

<view class="bg-white" style="position:fixed;top:auto;left:0;right:0;z-index:999;">
  <view class="cu-bar bg-white flex padding justify-between">
  <button class="cu-btn bg-blue sm" catchtap="selectall">全部选中</button>
  <button class="cu-btn bg-green sm" catchtap="opsome" data-op='yes'>过审选中</button>
  <button class="cu-btn bg-red sm" catchtap="opsome" data-op='not'>拒审选中</button>
  <button class="cu-btn bg-blue sm" catchtap="cancleall">取消选中</button>
  </view>
</view>

<scroll-view scroll-y style="height:100vh;" bindscrolltolower='fetch_list'>
<view style='height:8vh;'></view>

<view class="cu-list menu sm-border card-menu margin-top bg-white" qq:for="{{list}}" qq:key='index' bindtap='selectone' data-item='{{item}}' data-index='{{index}}' qq:if='{{item.show}}'>
 <view class="cu-item sm-border">
  <view class='content text-cut' style='max-width:70vw;'>
      <text class="cuIcon-roundcheckfill text-{{item.select?'blue':'gray'}} margin-right-xs"></text>
      <text class="text-blue">{{item.keyword}}</text>
  </view>
    <button class='cu-btn round sm' data-item='{{item}}' catchtap='copyguild'>频道id</button>
  <button class='cu-btn round sm margin-left' data-item='{{item}}' data-index='{{index}}' catchtap='showinfo'>检查</button>
 </view>
    <view class="cu-item flex padding-left-sm margin-bottom-sm margin-top-sm">
      <view class="cu-avatar round" style="background-image:url({{item.editorhead}});"></view>
      <view class="content text-gray text-sm padding-left-sm text-cut">
        <text class="text-lg text-black">{{item.editornick}}</text>
        <view class="">{{item.edit_time}}</view>
      </view>
      <view class="text-gray text-sm" style='text-align:right;'>
        <view>词汇id：{{item.id}}</view>
        <view class="text-red" qq:if="{{item.approved=='on'}}">审核中</view>
        <view class="text-blue" qq:if="{{item.approved=='yes'}}">审核通过</view>
        <view class="text-blue" qq:if="{{item.approved=='not'}}">审核不通过</view>
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
