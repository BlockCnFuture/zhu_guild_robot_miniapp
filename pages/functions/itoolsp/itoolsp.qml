<view class='cu-load load-modal' qq:if="{{loadModal}}">
  <image src='/images/logo.jpeg' class='png' mode='aspectFit'></image>
  <view class='gray-text'>加载中...</view>
</view>


<view class="cu-modal bottom-modal {{modalD=='show'?'show':''}}" bindtap="hideModalD">
  <view class="cu-dialog" catchtap="stopit">
    <view class="header-view-top">
      <view class="header-view">
        <view class="header">
          <view></view>
        </view>
        <view class="cu-bar bg-white">
          <view class="action text-black"> </view>
          <text class="text-bold text-black text-lg">选择积分类型</text>
          <view class="action text-black"> </view>
        </view>
      </view>
    </view>
    <scroll-view scroll-y catchtap="stopit">
      <view style="height: 1vh"></view>

      <view class="cu-list menu sm-border margin-top">
        <view class="cu-item sm-border" qq:for="{{pointlist}}" qq:key="index" catchtap="kclick" data-index="{{index}}" data-item="{{item}}">
          <view style="display: flex; align-items: center">
            <text class="cuIcon-recharge text-blue margin-right-sm"></text>
            <text class="text-black text-cut" style="max-width: 70vw">{{item.point_name}}</text>
            <view style="display: flex;margin-left:10rpx;" catchtap="showpointinfo" data-info="{{item.point_desc}}">
            <text class="cuIcon-info text-black"></text>
          </view>
          </view>
          <text class="cuIcon-roundcheckfill text-blue" qq:if="{{item.select}}"></text>
        </view>
      </view>
    </scroll-view>
  </view>
</view>


<view class="cu-modal bottom-modal {{modalA=='show'?'show':''}}" bindtap="hideModalA">
  <view class="cu-dialog" catchtap="stopit">
    <view class="header-view-top">
      <view class="header-view">
        <view class="header">
          <view></view>
        </view>
        <view class="cu-bar bg-white" catchtap="stopit">
          <view class="action text-black" catchtap="hideModalA">取消</view>
          <text class="text-bold text-black text-lg">选择子频道</text>
          <view class="action text-black" bindtap='setchannel'>确定</view>
        </view>
      </view>
    </view>
    <scroll-view scroll-y catchtap="stopit">
      <view class="cu-list menu sm-border margin-top">
        <view class="cu-item sm-border" qq:for="{{channellist}}" qq:key="index" catchtap="{{item.type!=4?'pclick':'stopit'}}" data-index="{{index}}" data-item="{{item}}">
          <text qq:if="{{item.type==4}}" class="cuIcon-triangledownfill"><text class="text-black margin-left-xs">{{item.name}}</text></text>
          <view qq:if="{{item.type!=4}}" class="margin-left">
            <text qq:if="{{item.type==0 && item.sub_type==0}}" class="cuIcon-comment"><text class="text-black margin-left-xs">{{item.name}}</text></text>
            <text qq:if="{{item.type==0 && item.sub_type==1}}" class="cuIcon-notification"><text class="text-black margin-left-xs">{{item.name}}</text></text>
            <text qq:if="{{item.type==2}}" class="cuIcon-voice"><text class="text-black margin-left-xs">{{item.name}}</text></text>
            <text qq:if="{{item.type==10005}}" class="cuIcon-record"><text class="text-black margin-left-xs">{{item.name}}</text></text>
            <text qq:if="{{item.type==10006}}" class="cuIcon-apps"><text class="text-black margin-left-xs">{{item.name}}</text></text>
            <text qq:if="{{item.type==10007}}" class="cuIcon-edit"><text class="text-black margin-left-xs">{{item.name}}</text></text>
          </view>
            <text class="cuIcon-roundcheckfill text-blue" qq:if="{{item.select}}"></text>
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

<scroll-view scroll-y>

<view style='height:8vh;'></view>

  <view class="cu-list menu sm-border card-menu margin-top">
    <text>便民指令列表</text>
  </view>

  <view class="cu-list menu sm-border card-menu margin-top" qq:for="{{rolesets.content}}" qq:key="{{index}}" data-item="{{item}}" qq:if='{{item.show}}'>
    <view class="cu-item sm-border">
      <view class="content">
        <switch class="sm" bindchange="RolesSwitch" checked="{{item.on}}" data-target='rolesets.content[{{index}}].on'></switch>
        <text class="text-blue text-bold"> @机器人 </text>
        <text class="text-black text-bold">/{{item.c}}</text>
      </view>
      <button class="cu-btn round" data-c="{{item.c}}" catchtap="copycommand">复制</button>
    </view>
    <view class="cu-item sm-border" qq:if='{{item.on}}'>
      <text class="text-gray">{{item.d}} </text>
    </view>
    <view class="cu-item sm-border no-border arrow" catchtap='fixchannel' data-item='{{item}}' data-index='{{index}}' qq:if='{{item.on}}'>
      <view class="text-black text-bold">固定使用子频道</view>
      <text class="text-gray text-cut">可选</text>
    </view>
        <view class="cu-item sm-border no-border" qq:if='{{item.on}}'>
      <view class="text-black text-bold">需要消耗积分</view>
      <switch class="sm" bindchange="RolesSwitch" checked="{{item.points.on}}" data-target='rolesets.content[{{index}}].points.on'></switch>
    </view>
      <view class="cu-item sm-border no-border arrow" qq:if='{{item.points.on && item.on}}' catchtap='selectpoint' data-index='{{index}}' data-item='{{item}}'>
      <view class="text-black text-bold">积分类型</view>
      <text class="text-gray text-cut">必选</text>
    </view>
    <view class="cu-item sm-border no-border" qq:if='{{item.points.on && item.on}}'>
      <view class="text-black text-bold">积分数量</view>
            <view class="flex justify-center align-center">
        <view class="cu-tag round bg-green sm cuIcon-move margin-top-xs" catchtap="inputcnt" data-type="de" data-target='rolesets.content[{{index}}].points.point_cnt' data-cnt='{{item.points.point_cnt}}'></view>
        <view class="margin-lr text-black text-center solids-bottom" style="max-width: 100rpx;">
      <input type="number" value="{{item.points.point_cnt}}" maxlength="8" placeholder-style="color:#000000" bindinput='inputcnts' data-target='rolesets.content[{{index}}].points.point_cnt' data-cnt='{{item.points.point_cnt}}' bindblur='finishinputcnt'></input>
    </view>
        <view class="cu-tag round bg-red sm cuIcon-add margin-top-xs" catchtap="inputcnt" data-type="add" data-target='rolesets.content[{{index}}].points.point_cnt' data-cnt='{{item.points.point_cnt}}'></view>
        <text class="text-bold text-black margin-left">点</text>
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
