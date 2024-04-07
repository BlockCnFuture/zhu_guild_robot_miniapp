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

<view class="cu-modal bottom-modal {{modalB=='show'?'show':''}}" bindtap="hideModalB">
  <view class="cu-dialog" catchtap="stopit">
  <view class='header-view-top'>
  <view class="header-view">
      <view class="header">
        <view></view>
      </view>
      <view class="cu-bar bg-white" catchtap='stopit'>
      <view class="action text-black" catchtap="hideModalB">取消</view>
      <text class="text-bold text-black text-lg">选择处罚类型</text>
      <view class="action text-black" catchtap='changent'>确定</view>
      </view>
  </view>
  </view>
  <scroll-view scroll-y catchtap='stopit'>
  <view class="cu-list menu sm-border margin-top">

  <view class="cu-item sm-border" qq:for="{{oplist}}" qq:key='index' catchtap='oclick' data-index='{{index}}' data-item='{{item}}'>
<text class="text-black margin-left-xs">{{item.name}}</text>
<picker mode="multiSelector" range="{{daterange}}" bindchange="bindMultiPickerChange">
  <view class="text-bold padding text-black" qq:if='{{(item.type==2) && item.select}}'>{{nowtarget.ptimes}}</view>
  </picker>
  <text class="cuIcon-roundcheckfill text-blue" qq:if='{{item.select}}'></text>
  </view>

  </view>
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
      <text class="text-bold text-black text-lg">选择检查类型</text>
      <view class="action text-black"> </view>
      </view>
  </view>
  </view>
  <scroll-view scroll-y catchtap='stopit'>
  <view class="cu-list menu sm-border margin-top">

<view class="cu-item sm-border" catchtap='setchecktypeA'>
<text class="text-black margin-left-xs">累计数量检查</text>
</view>

<view class="cu-item sm-border" catchtap='setchecktypeB'>
<text class="text-black margin-left-xs">短期数量检查</text>
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
          <view class="action text-black" catchtap="setchannel">确定</view>
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

<scroll-view scroll-y>
  <view class="cu-list menu sm-border card-menu margin-top" bindtap="chosechannel">
    <view class="cu-item sm-border arrow">
      <text class="text-bold text-black">处罚通知转发子频道</text>
      <text class="text-gray">{{channelname==''?'用来转发通知的子频道':channelname}}</text>
    </view>
  </view>

  <view class="margin" style="text-align: left">
    <view class="margin-top bg-white padding radius-lg">
      <view class="text-sm text-black">通知转发设置说明：</view>
      <view class="text-gray text-sm padding-top-xs">用户被处罚时，会在用户发送消息的子频道发送通知</view>
      <view class="text-gray text-sm padding-top-xs">如果设置了转发，则会尝试再发送一条通知到转发子频道</view>
      <view class="text-red text-sm padding-top-xs">转发设置还会通知其他的处罚结果，如撤回等</view>
      <view class="text-red text-sm padding-top-xs">所以转发设置并不是只针对警告超限的处罚进行通知</view>
    </view>
  </view>



  <view class="cu-list menu sm-border card-menu margin-top" qq:for='{{rolesets.psets}}' qq:key='{{index}}'>
    <view class="cu-item sm-border">
    <view style='display: flex;align-items: center;'>
      <text class='cuIcon-roundclose text-red text-bold' style='font-size:38rpx;margin-right:10rpx;' data-index="{{index}}" catchtap="delrole"></text>
      <text class="text-black text-bold">处罚触发条件</text>
    </view>
      <view class="flex justify-center align-center text-lg">
        <text class="text-black text-bold margin-right-sm">警告 ≥</text>
        <view class="cu-tag round bg-green sm cuIcon-move margin-top-xs" catchtap="inputcnt" data-type="de" data-index='{{index}}'></view>
        <view class="margin-lr text-black text-center solids-bottom" style="max-width: 64rpx;">
      <input type="number" value="{{item.cnt}}" maxlength="2" placeholder-style="color:#000000" bindinput='inputcnts' data-index='{{index}}' bindblur='finishinputcnt'></input>
    </view>
        <view class="cu-tag round bg-red sm cuIcon-add margin-top-xs" catchtap="inputcnt" data-type="add" data-index='{{index}}'></view>
        <text class="text-black text-bold margin-left-sm">次</text>
      </view>
    </view>
    <view class="cu-item sm-border no-border arrow" bindtap='changechecktype' data-index='{{index}}' data-item='{{item}}'>
      <text class="text-bold text-black">检查类型</text>
      <text class="text-gray" qq:if='{{item.type==0}}'>累计数量检查</text>
      <text class="text-gray" qq:if='{{item.type==1}}'>短期数量检查</text>
    </view>
    <view class="cu-item sm-border no-border" qq:if='{{item.type==1}}'>
      <text class="text-bold text-black">检查时间（点灰字修改）</text>
      <picker mode="multiSelector" range="{{daterange_}}" bindchange="bindMultiPickerChange_" bindcancel='canceltime' data-item='{{item}}' data-index='{{index}}' catchtap='setresttime'>
      <text class="text-gray">{{item.checktimes}}内</text>
      </picker>
    </view>
    <view class="cu-item sm-border no-border arrow" bindtap='setoptions' data-index='{{index}}' data-item='{{item}}'>
      <text class="text-bold text-black">处罚类型</text>
      <text class="text-gray" qq:if='{{item.ptype==0}}'>踢出</text>
      <text class="text-gray" qq:if='{{item.ptype==1}}'>踢出并拉黑（撤回所有发言）</text>
      <text class="text-gray" qq:if='{{item.ptype==2}}'>禁言{{item.ptimes}}</text>
    </view>
    <view class="cu-item sm-border">
      <text class="text-bold text-black">处罚后警告次数清零</text>
      <switch class="sm" bindchange="RolesSwitch" data-index='{{index}}' checked="{{item.reset}}"></switch>
    </view>
  </view>




    <view class="cu-list menu sm-border card-menu margin-top" bindtap="addrole">
      <view class="cu-item sm-border">
        <view class="flex-sub text-center">
          <view class="solid-bottom text-xl padding">
            <text class="cuIcon-roundaddfill text-black text-bold"> 添加警告处罚规则</text>
          </view>
        </view>
      </view>
    </view>


  <view class="margin" style="text-align: left">
    <view class="margin-top bg-white padding radius-lg">
      <view class="text-sm text-black">处罚设置说明：</view>
      <view class="text-gray text-sm padding-top-xs">累计数量检查会考虑历史警告次数</view>
      <view class="text-gray text-sm padding-top-xs">短期数量检查只考虑短时间内的警告次数</view>
      <view class="text-red text-sm padding-top-xs">警告次数清零设置会清空用户所有警告次数</view>
      <view class="text-gray text-sm padding-top-xs">当用户命中多个规则，系统将采用最后一个</view>
    </view>
  </view>


  <view style="height: 16vh"></view>
</scroll-view>

<view class="bg-white" style="position: fixed; z-index: 1024; bottom: 0; top: auto; left: 0; right: 0">
  <view class="padding">
    <button class="cu-btn block bg-blue margin-tb-sm lg" bindtap="saveall">保存</button>
  </view>
</view>
