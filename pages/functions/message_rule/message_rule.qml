<view class="cu-load load-modal" qq:if="{{loadModal}}">
  <image src="/images/logo.jpeg" class="png" mode="aspectFit"></image>
  <view class="gray-text">加载中...</view>
</view>

  <view class="cu-bar bg-white">
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
  
<view class="cu-modal bottom-modal {{modalA=='show'?'show':''}}" bindtap="hideModalA">
  <view class="cu-dialog" catchtap="stopit">
  <view class='header-view-top'>
  <view class="header-view">
      <view class="header">
        <view></view>
      </view>
      <view class="cu-bar bg-white" catchtap='stopit'>
      <view class="action text-black" catchtap="hideModalA">取消</view>
      <text class="text-bold text-black text-lg">选择子频道</text>
      <view class="action text-black" catchtap="{{nowtype=='fromcs'?'setchannel':'stopit'}}">{{nowtype=='fromcs'?'确定':''}}</view>
      </view>
  </view>
  </view>
  <scroll-view scroll-y catchtap='stopit'>

<view qq:if="{{nowtype=='fromcs'}}"> 
<view style='height:1vh'></view>
  <view class="cu-bar bg-white flex padding justify-between">
  <button class="cu-btn bg-blue sm" catchtap="selectall">全选</button>
  <button class="cu-btn bg-blue sm" catchtap="cancleall">全不选</button>
  </view>
</view>

  <view class="cu-list menu sm-border margin-top">
  <view class="cu-item sm-border" qq:for="{{channellist}}" qq:key='index' catchtap="{{item.type!=4 && item.canselect?'pclick':'stopit'}}" data-index='{{index}}' data-item='{{item}}'>
<text qq:if='{{item.type==4}}' class="cuIcon-triangledownfill"><text class="text-{{item.canselect?'black':'gray'}} margin-left-xs">{{item.name}}</text></text>
<view qq:if='{{item.type!=4}}' class="margin-left">
<text qq:if='{{item.type==0 && item.sub_type==0}}' class="cuIcon-comment"><text class="text-{{item.canselect?'black':'gray'}} margin-left-xs">{{item.name}}</text></text>
<text qq:if='{{item.type==0 && item.sub_type==1}}' class="cuIcon-notification"><text class="text-{{item.canselect?'black':'gray'}} margin-left-xs">{{item.name}}</text></text>
<text qq:if='{{item.type==2}}' class="cuIcon-voice"><text class="text-{{item.canselect?'black':'gray'}} margin-left-xs">{{item.name}}</text></text>
<text qq:if='{{item.type==10005}}' class="cuIcon-record"><text class="text-{{item.canselect?'black':'gray'}} margin-left-xs">{{item.name}}</text></text>
<text qq:if='{{item.type==10006}}' class="cuIcon-apps"><text class="text-{{item.canselect?'black':'gray'}} margin-left-xs">{{item.name}}</text></text>
<text qq:if='{{item.type==10007}}' class="cuIcon-edit"><text class="text-{{item.canselect?'black':'gray'}} margin-left-xs">{{item.name}}</text></text>
</view>
  <text class="cuIcon-roundcheckfill text-blue" qq:if='{{item.select}}'></text>
  </view>
  </view>
  </scroll-view>
  </view>
</view>




<view class="cu-modal bottom-modal {{modalB=='show' && modalA==''?'show':''}}" bindtap="hideModalB">
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

<custom-textarea maxlength='500' style="text-align: left;width:100%;{{modalB=='show'?'':'display:none;'}}" bindinput="onInput" value="{{tmpct}}" cursor-spacing='80' show-confirm-bar='{{false}}'></custom-textarea>
  </view>
  </view>
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
  <view style="height:100vh;"></view>
  </scroll-view>
  </view>
</view>



<scroll-view scroll-y>
  <view class="cu-list menu sm-border card-menu margin-top">
    <view class="cu-item sm-border">
      <text class="text-bold text-black">开启子频道发言格式限制</text>
      <switch class="sm" bindchange="RolesSwitch" checked="{{rolesets.useit}}"></switch>
    </view>
  </view>

  <view qq:if="{{rolesets.useit}}">


<view qq:for="{{rolesets.content.ls}}" qq:key="{{index}}">
    <view class="cu-list menu sm-border card-menu margin-top">
      <view class="cu-item sm-border arrow" bindtap='sfromc' data-index='{{index}}' data-type='fromcs'>
      <view style='display: flex;align-items: center;'>
        <text class='cuIcon-roundclose text-red text-bold' style='font-size:38rpx;margin-right:10rpx;' data-index="{{index}}" catchtap="delrole"></text>
        <text class="text-bold text-black"> 限制发言格式的子频道</text>
      </view>
        <text class="text-gray">可多选</text>
      </view>

<view class="cu-item sm-border no-border" bindtap='sfromc' data-index='{{index}}' data-type='fromcs'>
  <view class="bg-blue margin-sm radius-df light shadow-blur" style="min-height: 10vh;width:100%">
    <view class='padding-top-xs padding-left-xs padding-bottom-xs'>
      <view class="cu-tag radius sm text-cut" style='justify-content:left;max-width:50vw;' qq:for='{{item.fromcs}}' qq:key='{{i}}' qq:for-item="si">
<text qq:if='{{si.sub_type==0}}' class="cuIcon-comment" style='margin-left:-4px;'></text>
<text qq:if='{{si.sub_type==1}}' class="cuIcon-notification" style='margin-left:-4px;'></text>
<text style='margin-left:2px;'>{{si.name}}</text>
      </view>
    </view>
  </view>
</view>

      <view class="cu-item sm-border arrow" bindtap='setdesc' data-target='rolesets.content.ls[{{index}}].ca'>
        <text class="text-bold text-black">限制格式</text>
        <text class="text-gray">必须</text>
      </view>
      <view class="cu-item sm-border" qq:if="{{item.ca}}" bindtap='setdesc' data-target='rolesets.content.ls[{{index}}].ca'>
      <view style='width: 100%;word-wrap: break-word;'>
            <text class="text-gray">{{item.ca}}</text>
      </view>
      </view>
      </view>

</view>

    <view class="cu-list menu sm-border card-menu margin-top" bindtap="addrole">
      <view class="cu-item sm-border">
        <view class="flex-sub text-center">
          <view class="solid-bottom text-xl padding">
            <text class="cuIcon-roundaddfill text-black text-bold"> 添加发言格式限制策略</text>
          </view>
        </view>
      </view>
    </view>

    <view class="margin" style="text-align: left;">
  <view class="margin-top bg-white padding radius-lg">
    <view class="text-sm text-black">说明：</view>
    <view class="text-gray text-sm padding-top-xs">此功能可限制某个子频道的发言格式</view>
    <view class="text-gray text-sm padding-top-xs">不符合格式的消息内容将被撤回</view>
    <view class="text-gray text-sm padding-top-xs">格式限制利用的是正则表达式，可百度学习</view>
  </view>
</view>




  </view>
  <view style="height:18vh;"></view>
</scroll-view>


<view class="bg-white" style="position:fixed;z-index:1024;bottom: 0;top:auto;left:0;right:0;">
<view class="padding">
<button class="cu-btn block bg-blue margin-tb-sm lg" bindtap='saveall'>保存</button>
</view>
</view>