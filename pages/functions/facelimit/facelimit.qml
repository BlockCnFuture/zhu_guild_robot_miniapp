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

<view class="cu-load load-modal" qq:if="{{loadModalS}}">
  <image src="/images/logo.jpeg" class="png" mode="aspectFit"></image>
  <view class="gray-text">下载表情...</view>
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
          <view class="action text-black"> </view>
        </view>
      </view>
    </view>
    <scroll-view scroll-y catchtap="stopit">
      <view class="cu-list menu sm-border margin-top">
        <view class="cu-item sm-border" qq:for="{{channellist}}" qq:key="index" catchtap="{{item.type!=4 ?'pclick':'stopit'}}" data-index="{{index}}" data-item="{{item}}">
          <text qq:if="{{item.type==4}}" class="cuIcon-triangledownfill"><text class="text-black margin-left-xs">{{item.name}}</text></text>
          <view qq:if="{{item.type!=4}}" class="margin-left">
            <text qq:if="{{item.type==0 && item.sub_type==0}}" class="cuIcon-comment"><text class="text-black margin-left-xs">{{item.name}}</text></text>
            <text qq:if="{{item.type==0 && item.sub_type==1}}" class="cuIcon-notification"><text class="text-black margin-left-xs">{{item.name}}</text></text>
            <text qq:if="{{item.type==2}}" class="cuIcon-voice"><text class="text-black margin-left-xs">{{item.name}}</text></text>
            <text qq:if="{{item.type==10005}}" class="cuIcon-record"><text class="text-black margin-left-xs">{{item.name}}</text></text>
            <text qq:if="{{item.type==10006}}" class="cuIcon-apps"><text class="text-black margin-left-xs">{{item.name}}</text></text>
            <text qq:if="{{item.type==10007}}" class="cuIcon-edit"><text class="text-black margin-left-xs">{{item.name}}</text></text>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</view>

<scroll-view scroll-y>
  <view class="cu-list menu sm-border card-menu margin-top">
    <view class="cu-item sm-border">
      <text class="text-bold text-black">开启表情表态限制</text>
      <switch class="sm" bindchange="RolesSwitch" checked="{{rolesets.useit}}"></switch>
    </view>
  </view>

  <view qq:if="{{rolesets.useit}}">
    <view class="margin bg-white padding-sm radius shadow-lg" style="max-height: 60vh">
      <button class="bg-red sm" bindtap="cancleallc" style="margin-left: -20rpx; margin-top: -20rpx; border: 0; height: 20rpx; width: 40rpx"></button>
      <scroll-view class="pro_list" scroll-y style="height: 50vh">
        <view class="cu-list grid col-7 no-border">
          <view class="cu-item text-xxxl" qq:for="{{qface_ls}}" qq:key="index" bindtap="selectoneA" data-index="{{index}}" style="text-align: center">
            <image class='margin-left-sm {{item.select?"cu-avatar round":""}}' src="{{item.link}}" style='height:70rpx;width:70rpx;{{item.select?"background-color:rgba(0,0,255,0.8);":""}}'></image>
          </view>

          <view class="cu-item text-xxxl" qq:for="{{emoji_ls}}" qq:key="index" bindtap="selectoneB" data-index="{{index}}" style="text-align: center">
            <image class='margin-left-sm {{item.select?"cu-avatar round":""}}' src="{{item.link}}" style='height:70rpx;width:70rpx;{{item.select?"background-color:rgba(0,0,255,0.8);":""}}'></image>
          </view>
        </view>
      </scroll-view>
    </view>

    <view class="cu-list menu sm-border card-menu margin-top">
      <view class="cu-item sm-border arrow no-border" bindtap="stoc">
        <text class="text-bold text-black"> 通知子频道</text>
        <text class="text-gray text-cut" style="max-width: 50vw">{{tocaname==''?'接收整改通知的子频道':tocaname}}</text>
      </view>
    </view>

    <view class="margin" style="text-align: left">
      <view class="margin-top bg-white padding radius-lg">
        <view class="text-sm text-black">说明：</view>
        <view class="text-gray text-sm padding-top-xs">当用户发布禁止的表态时，将通知整改，并禁言30天</view>
        <view class="text-gray text-sm padding-top-xs">用户撤销所有违规表态后，自动解除禁言</view>
      </view>
    </view>
  </view>
  <view style="height: 18vh"></view>
</scroll-view>

<view class="bg-white" style="position: fixed; z-index: 1024; bottom: 0; top: auto; left: 0; right: 0">
  <view class="padding">
    <button class="cu-btn block bg-blue margin-tb-sm lg" bindtap="saveall">保存</button>
  </view>
</view>
