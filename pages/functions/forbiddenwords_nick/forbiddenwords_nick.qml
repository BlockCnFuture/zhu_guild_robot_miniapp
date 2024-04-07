<view class='cu-load load-modal' qq:if="{{loadModal}}">
  <image src='/images/logo.jpeg' class='png' mode='aspectFit'></image>
  <view class='gray-text'>加载中...</view>
</view>

<view class="cu-modal bottom-modal {{modalB=='show'?'show':''}}" bindtap="hideModalB">
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
<custom-textarea maxlength='70' style="text-align: left;width:100%;{{modalB=='show'?'':'display:none;'}}" bindinput="onInput" value="{{tmpct}}" cursor-spacing='80' show-confirm-bar='{{false}}'></custom-textarea>
</view>
</view>

<view style="height:3vh;"></view>
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
    <view class="text-black text-sm padding-top-xs">用户加入、发言时会触发检查</view>
    <view class="text-gray text-sm padding-top-xs">若用户名片内含敏感词则触发惩罚</view>
    <view class="text-gray text-sm padding-top-xs">新内容将视为新敏感词，并增加到记录</view>
    <view class="text-red text-sm padding-top-xs">因此请不要忘记删除旧敏感词</view>
    <view class="text-gray text-sm padding-top-xs">敏感词内容<text class='text-blue'>支持正则表达式</text>，可百度学习</view>
  </view>
</view>

  <view style="height:100vh;"></view>
  </scroll-view>
  </view>
</view>



<view class="cu-modal bottom-modal {{modalD=='show' && modalB==''?'show':''}}" bindtap="hideModalD">
  <view class="cu-dialog" catchtap="stopit">
  <view class='header-view-top'>
  <view class="header-view">
      <view class="header">
        <view></view>
      </view>
      <view class="cu-bar bg-white" catchtap='stopit'>
      <view class="action text-black" catchtap="hideModalD">取消</view>
      <text class="text-bold text-black text-lg">选择名片敏感词效果</text>
      <view class="action text-black" catchtap='changent'>确定</view>
      </view>
  </view>
  </view>
  <scroll-view scroll-y catchtap='stopit'>
  <view class="cu-list menu sm-border margin-top">

  <view class="cu-item sm-border" qq:for="{{oplist}}" qq:key='index' catchtap='oclick' data-index='{{index}}' data-item='{{item}}'>
<text class="text-black margin-left">{{item.name}}</text>

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
      <text class="text-bold text-black text-lg margin-right-sm">编辑|添加 名片敏感词</text>
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
    <view class="text-gray padding-bottom" style="text-align: left;">敏感词信息：</view>
    <view class="cu-timeline">
      <view class="cu-item cur cuIcon-time" qq:if="{{nowtarget.edit_time!=''}}">
        <view class="content bg-blue light shadow-blur" style="text-align: left;">
          <view class="padding-top-xs">上次编辑时间</view>
          <text class="padding-top-xs">{{nowtarget.edit_time}}</text>
        </view>
      </view>
      <view class="cu-item cur cuIcon-form">
        <view class="content bg-blue light shadow-blur" style="text-align: left;">
          <view class="padding-top-xs">名片敏感词内容<button class="cu-btn sm margin-left-sm shadow round" catchtap="setdesc" data-target='nowtarget.keyword'>设置</button></view>
          <view style='width: 100%;word-wrap: break-word;'>
          <text style="text-align: left;">{{nowtarget.keyword}}</text>
          </view>
        </view>
      </view>
      <view class="cu-item cur cuIcon-settings">
        <view class="content bg-blue light shadow-blur" style="text-align: left;">
          <view class="padding-top-xs" catchtap='setoptions'>名片敏感词效果<button class="cu-btn sm margin-left-sm shadow round">设置</button></view>

    <view class="cuIcon padding-top-xs" qq:if='{{nowtarget.deal_type=="0"}}'>踢出</view>
    <view class="cuIcon padding-top-xs" qq:if='{{nowtarget.deal_type=="1"}}'>踢出并拉黑</view>
    <view class="cuIcon padding-top-xs" qq:if='{{nowtarget.deal_type=="2"}}'>限制发言</view>

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
      <input type="text" placeholder="搜索 名片敏感词|用户昵称|用户id|时间" confirm-type="search" bindinput="onSearchInput"></input>
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

  <view class="margin" style="text-align: left">
    <view class="margin-top bg-white padding radius-lg">
      <view class="text-sm text-black">说明：</view>
      <view class="text-gray text-sm padding-top-xs">本功能可检测用户昵称内的敏感词</view>
      <view class="text-gray text-sm padding-top-xs">新成员加入、用户发言均会触发检查</view>
    </view>
  </view>

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
        <view class="">{{item.edit_time}}</view>
      </view>
      <view class="text-gray text-sm" style='text-align:right;'>
        <view qq:if='{{item.deal_type=="0"}}'>踢出</view>
        <view qq:if='{{item.deal_type=="1"}}'>踢出并拉黑</view>
        <view qq:if='{{item.deal_type=="2"}}'>限制发言</view>
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
<button class="cu-btn block bg-blue margin-tb-sm lg" bindtap='addword'>增加名片敏感词</button>
</view>
</view>
