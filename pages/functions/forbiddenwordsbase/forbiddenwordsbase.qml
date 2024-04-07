<view class='cu-load load-modal' qq:if="{{loadModal}}">
  <image src='/images/logo.jpeg' class='png' mode='aspectFit'></image>
  <view class='gray-text'>加载中...</view>
</view>

<view class="cu-modal bottom-modal {{modalB=='show'?'show':''}}" bindtap="hideModalB">
  <view class="cu-dialog" catchtap="stopit" style='max-height:100vh;height:100vh;'>
  <view class='header-view-top'>
  <view class="header-view">
      <view class="header">
        <view></view>
      </view>
      <view class="cu-bar bg-white" catchtap='stopit'>
      <view class="action text-black" catchtap="hideModalB">取消</view>
      <text class="text-bold text-black text-lg">编辑词库</text>
      <view class="action text-black" catchtap="setcontent">确定</view>
      </view>
  </view>
  </view>

<view style="height:3vh;"></view>
<view class="text-grey" style="text-align: left;margin-left:30rpx;">不同词汇用|隔开（英文符号）  此处不支持正则表达式</view>
<view class="text-black text-bold" style="text-align: left;margin-left:30rpx;">当前数量：{{nowtarget.wordscnt}}个</view>

<view class="cu-list menu sm-border card-menu margin-top">
<view class="cu-item sm-border bg-white">
<textarea qq:if="{{modalB=='show'}}" maxlength='40000' style="text-align:left;width:100%;height:30vh;" bindinput="onInput" value="{{nowtarget.words}}" cursor-spacing='80' show-confirm-bar='{{false}}'></textarea>
</view>
</view>

<view>
<view style="height:1vh;"></view>

<view class="flex margin-left align-center">
<text class="text-black text-bold margin-right">增删词汇：</text>
<view class="cu-tag round bg-green sm cuIcon-move margin-top-xs" catchtap="inputA" data-type="de"></view>
<view class="margin-lr text-black text-center solids-bottom bg-white" style='width:50vw;'>
<input value="{{tmpcA}}" placeholder-style="color:#000000" bindinput='inputAs'></input>
</view>
<view class="cu-tag round bg-red sm cuIcon-add margin-top-xs" catchtap="inputA" data-type="add"></view>
</view>

<view style="height:1vh;"></view>
<view class="flex margin-left align-center">
<text class="text-black text-bold">词库备注：</text>
<view class="margin-lr text-black text-center solids-bottom bg-white" style='width:60vw;'>
<input value="{{nowtarget.dbdesc}}" placeholder-style="color:#000000" bindinput='inputCs'></input>
</view>
</view>

<view style="height:2vh;"></view>
<view class="text-gray" style="text-align: left;margin-left:30rpx;">词汇支持以下特殊敏感词，点击可置入</view>
<view class="text-blue" style="text-align: left;margin-left:30rpx;font-size:34rpx;" bindtap='addc' data-c='a'>{{'<文件>'}} apk等文件</view>
<view class="text-blue" style="text-align: left;margin-left:30rpx;font-size:34rpx;" bindtap='addc' data-c='b'>{{'<分享>'}} 网页、音乐分享</view>
<view class="text-blue" style="text-align: left;margin-left:30rpx;font-size:34rpx;" bindtap='addc' data-c='c'>{{'<QQ小世界>'}} QQ小世界视频</view>
<view class="text-blue" style="text-align: left;margin-left:30rpx;font-size:34rpx;" bindtap='addc' data-c='d'>{{'<QQ小程序>'}} QQ小程序卡片</view>
<view class="text-blue" style="text-align: left;margin-left:30rpx;font-size:34rpx;" bindtap='addc' data-c='e'>{{'<第三方卡片>'}} 第三方音视频平台卡片</view>
<view class="text-blue" style="text-align: left;margin-left:30rpx;font-size:34rpx;" bindtap='addc' data-c='f'>{{'<QQ红包>'}} 用户发送的红包</view>
<view class="text-blue" style="text-align: left;margin-left:30rpx;font-size:34rpx;" bindtap='addc' data-c='w'>{{'<不支持的消息>'}} 短视频、频道邀请ark等</view>
<view class="text-blue" style="text-align: left;margin-left:30rpx;font-size:34rpx;" bindtap='navigate_face'><text class='cuIcon-emojifill text-yellow'></text> 小黄豆表情</view>
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
      <input type="text" placeholder="搜索 词库id | 作者昵称 | 词库备注" confirm-type="search" bindinput="onSearchInput"></input>
    </view>
  </view>

<scroll-view scroll-y style="height:100vh;">

<view class="margin" style="text-align: left;">
  <view class="margin-top bg-white padding radius-lg">
    <view class="text-sm text-black">说明：</view>
    <view class="text-grey text-sm padding-top-xs">词汇支持检查文图、主题、帖子（评论）、昵称</view>
    <view class="text-grey text-sm padding-top-xs">只有频道主可创建敏感词库</view>
    <view class="text-grey text-sm padding-top-xs">只有词库作者可编辑/删除词库</view>
    <view class="text-grey text-sm padding-top-xs">每人可至多创建10个词库</view>
    <view class="text-blue text-sm padding-top-xs">词库id可分享给其他人使用</view>
  </view>
</view>

<view class="cu-list menu sm-border card-menu margin-top bg-white" bindtap='showbyid'>
 <view class="cu-item sm-border arrow">
  <view class='content text-cut' style='max-width:70vw;'>
      <text class="text-black text-bold">词库id查询词库内容</text>
  </view>
</view>
</view>

<view class="cu-list menu sm-border card-menu margin-top bg-white" bindtap='navigateto'>
 <view class="cu-item sm-border arrow">
  <view class='content text-cut' style='max-width:70vw;'>
      <text class="text-black text-bold">去创建敏感词库处罚策略</text>
  </view>
</view>
</view>

<view class="cu-list menu sm-border card-menu margin-top">
    <text class='text-grey'>词库支持图片，可用此指令取hash粘贴</text>
  </view>
<view class="cu-list menu sm-border card-menu margin-top bg-white">
  <view class="cu-item sm-border">
      <view class="content">
        <text class="text-blue text-bold">@初遇小竹私域 </text>
        <text class="text-black text-bold">/取图片hash</text>
      </view>
      <button class="cu-btn round" bindtap="copycommand">复制</button>
    </view>
  <view class="cu-item sm-border">
      <text class="text-gray">取单张或多张图片的hash码，可用于敏感词库
      
      用法：
      回复欲查询的消息，而后带上 /取图片hash 即可
      /取图片hash [图1][图2]... 可查询本地图hash

      </text>
  </view>
  </view>

<view class="cu-list menu sm-border card-menu margin-top bg-white" qq:for="{{list}}" qq:key='index' data-item='{{item}}' data-index='{{index}}' qq:if='{{item.show}}'>
 <view class="cu-item sm-border">
  <view class='content text-cut' style='max-width:70vw;'>
      <text class="text-blue">{{item.dbdesc}}</text>
  </view>
<view>
  <button class='cu-btn round sm margin-right-sm line-black' data-item='{{item}}' catchtap='copyid'>id</button>
  <button class='cu-btn round sm margin-right-sm line-blue' data-item='{{item}}' catchtap='showinfo'>编辑</button>
  <button class='cu-btn round sm margin-right-sm line-red' data-item='{{item}}' catchtap='dbdel'>删除</button>
</view>
 </view>
    <view class="cu-item flex padding-left-sm margin-bottom-sm margin-top-sm">
      <view class="cu-avatar round" style="background-image:url({{item.head}});"></view>
      <view class="content text-gray text-sm padding-left-sm text-cut">
        <text class="text-lg text-black">{{item.nick}}</text>
        <view class="">{{item.edit_time}}</view>
      </view>
      <view class="text-black text-sm" style='text-align:right;'>
        <view>共{{item.wordscnt}}个词汇</view>
      </view>
    </view>

</view>

  <view style="height:18vh;"></view>
</scroll-view>

<view class="bg-white" style="position:fixed;z-index:1024;bottom: 0;top:auto;left:0;right:0;">
<view class="padding">
<button class="cu-btn block bg-blue margin-tb-sm lg" bindtap='addword'>创建敏感词库</button>
</view>
</view>
