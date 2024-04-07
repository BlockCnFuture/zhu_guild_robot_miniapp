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
      <text class="text-bold text-black text-lg">选择子频道</text>
      <view class="action text-black"> </view>
      </view>
  </view>
  </view>
  <scroll-view scroll-y catchtap='stopit'>
  <view class="cu-list menu sm-border margin-top">
  <view class="cu-item sm-border" qq:for="{{channellist}}" qq:key='index' catchtap="{{item.type!=4?'pclick':'stopit'}}" data-index='{{index}}' data-item='{{item}}'>
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


<scroll-view scroll-y style="height: 100vh" bindscrolltolower="showmore">
  <view style="height: 10rpx"></view>

  <view class="cu-list menu sm-border card-menu margin-top" bindtap="addgood">
    <view class="cu-item sm-border">
      <view class="flex-sub text-center">
        <view class="text-xl">
          <text class="cuIcon-roundaddfill text-black text-bold"> 创建新兑换码库</text>
        </view>
      </view>
    </view>
  </view>
  <view class="text-gray margin" style="text-align: center">修改子频道后，请创建或修改任意兑换码库，方能保存</view>
 <view class="cu-list menu sm-border card-menu margin-top">
  <view class="cu-item sm-border">
      <view class="content">
        <text class="text-blue text-bold">@机器人 </text>
        <text class="text-black text-bold">/使用兑换码</text>
      </view>
      <button class="cu-btn round" bindtap="copycommand">复制</button>
    </view>
  <view class="cu-item sm-border">
      <text class="text-gray">使用兑换码领取奖励
      
      用法：
      /使用兑换码 xxx
      </text>
  </view>
    <view class="cu-item sm-border arrow" bindtap='chosechannel'>
      <text class="text-bold text-black text-cut">限制指令使用子频道</text>
      <text class="text-gray text-cut" qq:if='{{channelname}}'>{{channelname}}</text>
      <text class="text-gray text-cut" qq:else>必选</text>
    </view>
  </view>
  
  <view class="text-gray margin" style="text-align: center">Tips: 按最后修改时间排序，左滑可删除，单击进入编辑</view>
  <view class="cu-list menu">
    <view
      class="cu-item {{modalName=='move-box-'+ index?'move-cur-half':''}}"
      qq:for="{{list}}"
      qq:key="item"
      bindtouchstart="ListTouchStart"
      bindtouchmove="ListTouchMove"
      bindtouchend="ListTouchEnd"
      data-target="move-box-{{index}}"
      style="border-radius:20rpx;height:160rpx;max-height:100rpx;"
      bindtap="showinfo"
      data-item="{{item}}"
    >
      <view class="content">
        <view class="text-black text-bold text-cut" qq:if='{{item.type=="0"}}'>身份组兑换码库</view>
        <view class="text-black text-bold text-cut" qq:if='{{item.type=="1"}}'>积分兑换码库</view>
        <view class="text-black text-bold text-cut" qq:if='{{item.type=="2"}}'>补签卡兑换码库</view>
      </view>
      <view class="action">
        <view class="text-grey text-xs text-cut" qq:if='{{item.type=="0"}}'>{{item.rolename}} {{item.rolesecs<=0?'永久':item.rolesecs+'秒'}}</view>
        <view class="text-grey text-xs text-cut" qq:if='{{item.type=="1"}}'>{{item.point_name}} {{item.pointcnt}}点</view>
        <view class="text-grey text-xs text-cut" qq:if='{{item.type=="2"}}'>兑换后获得 {{item.gaincnt}} 张</view>
      </view>
      <view class="move" style="max-width: 130rpx" catchtap="delone" data-id="{{item.id}}">
        <view class="bg-red">删除</view>
      </view>
    </view>
  </view>

  <view style="height: 60rpx"></view>
</scroll-view>
