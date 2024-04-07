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
    <view class="header-view-top">
      <view class="header-view">
        <view class="header">
          <view></view>
        </view>
        <view class="cu-bar bg-white" catchtap="stopit">
          <view class="action text-black" catchtap="hideModalA">取消</view>
          <text class="text-bold text-black text-lg">选择子频道</text>
          <view class="action text-black" catchtap='setchannel'>确定</view>
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
  
<view class="margin">
  <view class="margin-top bg-white padding radius-lg">
    <view class="margin-bottom" style="text-align: center">
      <text class="text-orange" style="font-size: 26rpx; width: 100%">- 服务说明 -</text>
    </view>
    <text class="text-black text-bold" style="font-size: 26rpx; width: 100%; word-wrap: break-word; text-align: left"
      >1、赞助通道由《爱发电》提供，与《初遇小竹》无关
      2、《爱发电》平台收取 6% 手续费并代缴个税
      3、赞助服务当中，《初遇小竹》不收取任何费用
      4、赞助获得的积分，为附赠礼品，无商品性质
      5、任何赞助都视为用户自愿支持频道主
      6、任何因赞助产生的纠纷，均由频道主担责 </text
    >
  </view>
</view>

  <view class="cu-list menu sm-border card-menu margin-top">
    <view class="cu-item sm-border">
      <text class="text-bold text-black">允许用户向本频道赞助</text>
      <switch class="sm" bindchange="RolesSwitch" checked="{{rolesets.useit}}" data-target="rolesets.useit"></switch>
    </view>
  </view>

  <view qq:if="{{rolesets.useit}}">

  <view class="cu-list menu sm-border card-menu margin-top">
      <view class="cu-item sm-border">
      <text class="text-bold text-black">爱发电主页地址</text>
      <input value="{{rolesets.content.link}}" bindinput='inputcnts' placeholder='请输入主页地址' data-target='rolesets.content.link' style='text-align:right;'></input>
    </view>
  </view>

<view style='text-align:right;' qq:if='{{rolesets.content.link}}'>
  <button class="cu-btn bg-blue sm margin-right" style='margin-top:10rpx;' catchtap="checkurl">检查</button>
</view>

  <view class="cu-list menu sm-border card-menu margin-top bg-white" qq:if='{{accountinfo}}'>
  <view class="cu-item flex padding-left-sm margin-bottom-sm margin-top-sm">
      <view class="cu-avatar round" style="background-image:url({{accountinfo.avatar}});"></view>
      <view class="content text-gray text-sm padding-left-sm text-cut">
        <text class="text-lg text-black">{{accountinfo.name}}</text>
        <view>正在创作 {{accountinfo.creator.doing}}</view>
      </view>
    </view>
  </view>

    <view class="cu-list menu sm-border card-menu margin-top" bindtap="chosechannel">
      <view class="cu-item sm-border arrow">
        <text class="text-bold text-black">赞助成功通知子频道</text>
        <text class="text-gray">{{channelname==''?'可选':channelname}}</text>
      </view>
    </view>

    <view class="cu-list menu sm-border card-menu margin-top">
      <view class="cu-item sm-border">
        <text class="text-bold text-black">由用户承担爱发电手续费</text>
        <switch class="sm" bindchange="RolesSwitch" checked="{{rolesets.content.userpayfee}}" data-target="rolesets.content.userpayfee"></switch>
      </view>
    </view>

    <view class="cu-list menu sm-border card-menu margin-top">
      <view class="cu-item sm-border">
        <text class="text-bold text-black">允许支付宝移动支付赞助</text>
        <switch class="sm" bindchange="RolesSwitch" checked="{{rolesets.content.alipay}}" data-target="rolesets.content.alipay"></switch>
      </view>
    </view>

    <view class="cu-list menu sm-border card-menu margin-top">
      <view class="cu-item sm-border">
        <text class="text-bold text-black">允许支付宝网页支付赞助</text>
        <switch class="sm" bindchange="RolesSwitch" checked="{{rolesets.content.alipay_web}}" data-target="rolesets.content.alipay_web"></switch>
      </view>
    </view>

    <view class="cu-list menu sm-border card-menu margin-top">
      <view class="cu-item sm-border">
        <text class="text-bold text-black">允许微信支付赞助</text>
        <switch class="sm" bindchange="RolesSwitch" checked="{{rolesets.content.wechat}}" data-target="rolesets.content.wechat"></switch>
      </view>
    </view>


    </view>

  <view style="height: 16vh"></view>
</scroll-view>

<view class="bg-white" style="position: fixed; z-index: 1024; bottom: 0; top: auto; left: 0; right: 0">
  <view class="padding">
    <button class="cu-btn block bg-blue margin-tb-sm lg" bindtap="saveall">保存</button>
  </view>
</view>
