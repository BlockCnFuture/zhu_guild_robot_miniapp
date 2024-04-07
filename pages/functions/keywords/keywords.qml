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
      <text class="text-bold text-black text-lg">设置图片</text>
      <view class="action text-black"> </view>
      </view>
  </view>
  </view>
  <scroll-view scroll-y catchtap='stopit'>
<view style="height:3vh;"></view>

<swiper class="card-swiper square-dot bg-white" indicator-dots="true" circular="true" autoplay="true" interval="5000" duration="500" bindchange="cardSwiper" indicator-color="#8799a3" indicator-active-color="#0081ff" bindtap='choseoneimg'>
  <swiper-item class="cur">
    <view class="swiper-item">
      <image src="{{tmpimg}}" mode="aspectFill"></image>
    </view>
  </swiper-item>
</swiper>

<view class="padding bg-white">
<text class="text-gray text-lg bg-white" qq:if='{{tmpimg!=""}}'>点击图片进行修改</text>
<text class="text-gray text-lg bg-white" qq:if='{{tmpimg==""}}'>点击空白区域选择图片</text>
</view>

<view class="padding bg-white">
<button class="cu-btn block bg-blue margin-tb-sm lg" bindtap='uploadImage'>上传</button>
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
      <text class="text-bold text-black text-lg">设置内容</text>
      <view class="action text-black" catchtap="setcontent">确定</view>
      </view>
  </view>
  </view>
  <scroll-view scroll-y catchtap='stopit'>
<view style="height:3vh;"></view>
<view class="cu-list menu sm-border card-menu margin-top">
<view class="cu-item sm-border bg-white">
<custom-textarea maxlength='{{nowtargetc=="nowtarget.content"?"500":"70"}}' style="text-align: left;width:100%;{{modalB=='show' && modalE=='' && modalD==''?'':'display:none;'}}" bindinput="onInput" value="{{tmpct}}" cursor-spacing='80' show-confirm-bar='{{false}}'></custom-textarea>
</view>
</view>

<view qq:if="{{nowtargetc=='nowtarget.keyword'}}">
<view style="height:3vh;"></view>
<view class="text-gray" style="text-align: left;margin-left:30rpx;">点击以下变量可插入特殊关键词</view>
<view class="text-blue" style="text-align: left;margin-left:30rpx;font-size:34rpx;" bindtap='addc' data-c='a'>{{'<文件>'}} apk等文件</view>
<view class="text-blue" style="text-align: left;margin-left:30rpx;font-size:34rpx;" bindtap='addc' data-c='b'>{{'<分享>'}} 网页、音乐分享</view>
<view class="text-blue" style="text-align: left;margin-left:30rpx;font-size:34rpx;" bindtap='addc' data-c='c'>{{'<QQ小世界>'}} QQ小世界视频</view>
<view class="text-blue" style="text-align: left;margin-left:30rpx;font-size:34rpx;" bindtap='addc' data-c='d'>{{'<QQ小程序>'}} QQ小程序卡片</view>
<view class="text-blue" style="text-align: left;margin-left:30rpx;font-size:34rpx;" bindtap='addc' data-c='e'>{{'<第三方卡片>'}} 第三方音视频平台卡片</view>
<view class="text-blue" style="text-align: left;margin-left:30rpx;font-size:34rpx;" bindtap='addc' data-c='f'>{{'<QQ红包>'}} 用户发送的红包</view>
<view class="text-blue" style="text-align: left;margin-left:30rpx;font-size:34rpx;" bindtap='addc' data-c='w'>{{'<不支持的消息>'}} 短视频、频道邀请ark等</view>
<view class="text-blue" style="text-align: left;margin-left:30rpx;font-size:34rpx;" bindtap='navigate_face'><text class='cuIcon-emojifill text-yellow'></text> 小黄豆表情</view>

<view style='height:2vh;'></view>
<view class="text-gray" style="text-align: left;margin-left:30rpx;">点击以下变量可插入正则表达式</view>
<view class="text-blue" style="text-align: left;margin-left:30rpx;font-size:34rpx;" bindtap='addc' data-c='g'>| 正则表达式"或"</view>
<view class="text-blue" style="text-align: left;margin-left:30rpx;font-size:34rpx;" bindtap='addc' data-c='h'>^ 匹配文本的开头</view>
<view class="text-blue" style="text-align: left;margin-left:30rpx;font-size:34rpx;" bindtap='addc' data-c='i'>$ 匹配文本的结尾</view>
<view class="text-blue" style="text-align: left;margin-left:30rpx;font-size:34rpx;" bindtap='addc' data-c='j'>? 前元素可选</view>
<view class="text-blue" style="text-align: left;margin-left:30rpx;font-size:34rpx;" bindtap='addc' data-c='k'> * 匹配任意数量空格</view>
<view class="text-blue" style="text-align: left;margin-left:30rpx;font-size:34rpx;" bindtap='addc' data-c='l'>.* 匹配任意数量单行字符</view>
<view class="text-blue" style="text-align: left;margin-left:30rpx;font-size:34rpx;" bindtap='addc' data-c='m'>\d+ 匹配正整数</view>
<view class="text-blue" style="text-align: left;margin-left:30rpx;font-size:34rpx;" bindtap='addc' data-c='n'>([\s\S]*) 匹配多行文本</view>

<view class="margin" style="text-align: left;">
  <view class="margin-top bg-white padding radius-lg">
    <view class="text-sm text-black">说明：</view>
    <view class="text-gray text-sm padding-top-xs">可添加多个相同的词汇实现随机回复</view>
    <view class="text-gray text-sm padding-top-xs">可对同一个词汇使用不同的表达式实现多条回复</view>
    <view class="text-red text-sm padding-top-xs">默认模糊匹配，需要精确匹配请使用正则表达式的^和$</view>
    <view class="text-gray text-sm padding-top-xs">关键词内容<text class='text-blue'>支持正则表达式</text>，可百度学习</view>
  </view>
</view>
</view>
<view qq:else>
<view catchtap='changeimage'>

<view class="cu-card case margin" qq:if='{{nowtarget.image!=""}}'>
    <view class="image" style='height:200rpx;width:200rpx;object-fit: cover;overflow:hidden;'>
      <image src="{{nowtarget.image}}" mode='aspectFill'></image>
      <view class="cu-tag bg-black" catchtap='delimg'><text class="cuIcon-delete"></text></view>
    </view>
</view>

<view class='text-xsl' qq:if='{{nowtarget.image==""}}' style='text-align: left;margin-left:28rpx;'>
<text class="cuIcon-picfill"></text>
</view>
</view>
  <view class="text-blue" style="text-align: left;margin-left:30rpx;">输入#可插入子频道</view>
<view style="height:3vh;"></view>
<view class="text-gray" style="text-align: left;margin-left:30rpx;">回复内容支持以下变量，点击插入</view>
<view class="text-blue" style="text-align: left;margin-left:30rpx;font-size:34rpx;" bindtap='addc' data-c='o'>{回复} 引用发送者的消息进行回复</view>
<view class="text-blue" style="text-align: left;margin-left:30rpx;font-size:34rpx;" bindtap='addc' data-c='p'>{艾特} 艾特消息发送者</view>
<view class="text-blue" style="text-align: left;margin-left:30rpx;font-size:34rpx;" bindtap='addc' data-c='q'>@everyone 艾特全体成员</view>
<view class="text-blue" style="text-align: left;margin-left:30rpx;font-size:34rpx;" bindtap='navigate_face'><text class='cuIcon-emojifill text-yellow'></text> 小黄豆表情</view>
<view style="height:3vh;"></view>
  <view class="text-gray" style="text-align: left;margin-left:30rpx;">请勿插入链接，否则无法过审</view>
  <view class="text-gray" style="text-align: left;margin-left:30rpx;">请勿插入不良信息，一经发现永久禁止使用</view>
  <view class="text-gray" style="text-align: left;margin-left:30rpx;">并将后台证据提交至官方审查</view>
</view>

  <view style="height:100vh;"></view>
  </scroll-view>
  </view>
</view>







<view class="cu-modal bottom-modal {{modalC=='show'?'show':''}}" bindtap="hideModalC">
  <view class="cu-dialog" catchtap="stopit">
  <view class='header-view-top'>
  <view class="header-view">
      <view class="header">
        <view></view>
      </view>
      <view class="cu-bar bg-white" catchtap='stopit'>
      <view class="action text-black" catchtap="hideModalC">取消</view>
      <text class="text-bold text-black text-lg">设置启用范围</text>
      <view class="action text-black" catchtap="setchannel">确定</view>
      </view>
  </view>
  </view>
  <scroll-view scroll-y>
  <view style='height:1vh'></view>
  <view class="cu-bar bg-white flex padding justify-between">
  <button class="cu-btn bg-blue sm" catchtap="selectallc">全选</button>
  <button class="cu-btn bg-blue sm" catchtap="cancleallc">全不选</button>
  </view>
  <view class="cu-list menu sm-border margin-top">
  <view class="cu-item sm-border" qq:for="{{tmpchannellist}}" qq:key='index' catchtap="{{item.type!=4?'pclick':'stopit'}}" data-index='{{index}}' data-item='{{item}}'>
<text qq:if='{{item.type==4}}' class="cuIcon-triangledownfill"><text class="text-black margin-left-xs">{{item.name}}</text></text>
<view qq:if='{{item.type!=4}}' class="margin-left">
<text qq:if='{{item.type==0 && item.sub_type==0}}' class="cuIcon-comment"><text class="text-black margin-left-xs">{{item.name}}</text></text>
<text qq:if='{{item.type==0 && item.sub_type==1}}' class="cuIcon-notification"><text class="text-black margin-left-xs">{{item.name}}</text></text>
<text qq:if='{{item.type==2}}' class="cuIcon-voice"><text class="text-black margin-left-xs">{{item.name}}</text></text>
<text qq:if='{{item.type==10005}}' class="cuIcon-record"><text class="text-black margin-left-xs">{{item.name}}</text></text>
<text qq:if='{{item.type==10006}}' class="cuIcon-apps"><text class="text-black margin-left-xs">{{item.name}}</text></text>
<text qq:if='{{item.type==10007}}' class="cuIcon-edit"><text class="text-black margin-left-xs">{{item.name}}</text></text>
  </view>
  <text class="cuIcon-roundcheckfill text-blue" qq:if='{{item.select}}'></text>
  </view>
  </view>
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
      <text class="text-bold text-black text-lg margin-right-sm">{{nowtarget.id==''?'添加':'编辑'}}关键词</text>
      <view class="action text-black" catchtap="save">确定</view>
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
          <view class="padding-top-xs">关键词内容<button class="cu-btn sm margin-left-sm shadow round" catchtap="setdesc" data-target='nowtarget.keyword'>设置</button></view>
          <view style='width: 100%;word-wrap: break-word;'>
          <text style="text-align: left;">{{nowtarget.keyword}}</text>
          </view>
        </view>
      </view>
      <view class="cu-item cur cuIcon-edit">
        <view class="content bg-blue light shadow-blur" style="text-align: left;">
          <view class="padding-top-xs">回复内容<button class="cu-btn sm margin-left-sm shadow round" catchtap="setdesc" data-target='nowtarget.content'>设置</button></view>
          <view style='width: 100%;word-wrap: break-word;'>
          <text style="text-align: left;">{{nowtarget.content}}{{nowtarget.image!=''?'[图片]':''}}</text>
          </view>
        </view>
      </view>
      <view class="cu-item cur cuIcon-settings">
        <view class="content bg-blue light shadow-blur" style="text-align: left;">
        <picker mode="multiSelector" range="{{daterange}}" bindchange="bindMultiPickerChange">
          <view class="padding-top-xs">关键词CD<button class="cu-btn sm margin-left-sm shadow round">设置</button></view>
          </picker>
<view qq:if="{{nowtarget.cd!='0'}}" class="cuIcon padding-top-xs text-black text-bold">{{nowtarget.cd}}秒</view>
<view qq:if="{{nowtarget.cd=='0'}}" class="cuIcon padding-top-xs text-black text-bold">无cd</view>
        </view>
      </view>
      <view class="cu-item cur cuIcon-list">
        <view class="content bg-blue light shadow-blur" style="text-align: left;">
         <view class="padding-top-xs">启用范围<button class="cu-btn sm margin-left-sm shadow round" catchtap='setonchannels'>设置</button></view>
        <view class="cu-tag radius sm text-cut" style='justify-content:left;max-width:50vw;' qq:for='{{channellist}}' qq:key='{{index}}' qq:if='{{item.type!=4}}'>

<text qq:if='{{item.type==0 && item.sub_type==0}}' class="cuIcon-comment"><text>{{item.name}}</text></text>
<text qq:if='{{item.type==0 && item.sub_type==1}}' class="cuIcon-notification"><text>{{item.name}}</text></text>
<text qq:if='{{item.type==2}}' class="cuIcon-voice"><text>{{item.name}}</text></text>
<text qq:if='{{item.type==10005}}' class="cuIcon-record"><text>{{item.name}}</text></text>
<text qq:if='{{item.type==10006}}' class="cuIcon-apps"><text>{{item.name}}</text></text>
<text qq:if='{{item.type==10007}}' class="cuIcon-edit"><text>{{item.name}}</text></text>
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
  <button class="cu-btn bg-red sm" catchtap="opsome">删除选中</button>
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
  <button class='cu-btn round' data-item='{{item}}' data-index='{{index}}' catchtap='showinfo'>编辑</button>
 </view>
    <view class="cu-item flex padding-left-sm margin-bottom-sm margin-top-sm">
      <view class="cu-avatar round" style="background-image:url({{item.editorhead}});"></view>
      <view class="content text-gray text-sm padding-left-sm text-cut">
        <text class="text-lg text-black">{{item.editornick}}</text>
        <view>{{item.edit_time}}</view>
      </view>
      <view class="text-gray text-sm" style='text-align:right;'>
        <view>词汇id：{{item.id}}</view>
        <view class="text-gray" qq:if="{{item.approved=='on'}}">审核中</view>
        <view class="text-blue" qq:if="{{item.approved=='yes'}}">审核通过</view>
        <view class="text-red" qq:if="{{item.approved=='not'}}">审核不通过</view>
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

  <view style="height:18vh;"></view>
</scroll-view>

<view class="bg-white" style="position:fixed;z-index:1024;bottom: 0;top:auto;left:0;right:0;">
<view class="padding">
<button class="cu-btn block bg-blue margin-tb-sm lg" bindtap='addword'>增加关键词</button>
</view>
</view>
