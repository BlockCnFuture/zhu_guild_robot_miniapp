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

<view class="cu-modal bottom-modal {{modalC=='show'?'show':''}}" bindtap="hideModalC">
  <view class="cu-dialog" catchtap="stopit">
    <view class="header-view-top">
      <view class="header-view">
        <view class="header">
          <view></view>
        </view>
        <view class="cu-bar bg-white" catchtap="stopit">
          <view class="action text-black" bindtap="hideModalC">取消</view>
          <text class="text-bold text-black text-lg">选择频道</text>
          <view class="action text-black" bindtap="change">确定</view>
        </view>
      </view>
    </view>
    <scroll-view scroll-y catchtap="stopit">
      <view style="height: 3vh"></view>

      <view
        class="cu-list menu sm-border margin-top card-menu"
        style='{{item.select?"border: 1px solid rgba(0,0,255,0.5);":""}}'
        qq:for="{{guildlist}}"
        qq:key="{{index}}"
        bindtap="gclick"
        data-item="{{item}}"
      >
        <view class="cu-item sm-border">
          <view style="display: flex; align-items: center">
            <view class="cu-avatar round lg margin-top-sm margin-bottom-sm" style="background-image:url({{item.guildhead}});">
              <text class="badge" style="position: absolute; bottom: -5px; right: -5px; background-color: blue; color: white; font-size: 12px; padding: 2px 6px; border-radius: 100%">#</text>
            </view>
            <text class="text-black text-bold margin text-cut text-lg" style="max-width: 60vw;">{{item.guildname}}</text>
            <text class="text-grey text-cut" style="max-width:80vw;position:absolute;bottom:0px; left:140rpx;padding:2px 4px;">{{item.guilddesc}}</text>
          </view>
          <view>
            <text class="cuIcon-focus text-blue" style="font-size: 60rpx" qq:if="{{item.select}}"></text>
          </view>
        </view>
      </view>

      <view class="margin">
        <text class="text-blue" bindtap="stips">找不到频道？</text>
      </view>
      <view style="height: 1vh"></view>
    </scroll-view>
  </view>
</view>







<view class="cu-modal bottom-modal {{modalB=='show'?'show':''}}" bindtap="hideModalB">
  <view class="cu-dialog" catchtap="stopit">
    <view class="header-view-top">
      <view class="header-view">
        <view class="header">
          <view></view>
        </view>
        <view class="cu-bar bg-white" catchtap="stopit">
          <view class="action text-black" catchtap="hideModalB">取消</view>
          <text class="text-bold text-black text-lg">设置内容</text>
          <view class="action text-black" catchtap="setcontent">确定</view>
        </view>
      </view>
    </view>
    <scroll-view scroll-y catchtap="stopit">
      <view style="height: 3vh"></view>
      <view class="cu-list menu sm-border card-menu margin-top">
        <view class="cu-item sm-border bg-white">
          <custom-textarea
            maxlength='{{nowtargetc=="nowtarget.point_name"?"10":nowtargetc=="nowtarget.point_desc"?"500":"4"}}'
            style="text-align: left;width:100%;{{modalB=='show'?'':'display:none;'}}"
            bindinput="onInput"
            value="{{tmpct}}"
            cursor-spacing="80"
            show-confirm-bar="{{false}}"
          ></custom-textarea>
        </view>
      </view>

      <view>
        <view style="height: 3vh"></view>
        <view class="text-gray" style="text-align: left; margin-left: 30rpx">此处不支持插入链接，不支持子频道</view>
        <view class="text-gray" style="text-align: left; margin-left: 30rpx">‱ 是万分符，表示万分之一</view>
      </view>

      <view style="height: 100vh"></view>
    </scroll-view>
  </view>
</view>

<view class="cu-modal bottom-modal {{modalA=='show' && modalB=='' && modalC==''?'show':''}}" bindtap="hideModalA">
  <view class="cu-dialog" catchtap="stopit">
    <view class="header-view-top">
      <view class="header-view">
        <view class="header">
          <view></view>
        </view>
        <view class="cu-bar bg-white" catchtap="stopit">
          <view class="action text-black" catchtap="hideModalA">取消</view>
          <text class="text-bold text-black text-lg margin-right-sm">{{nowtarget.point_id==''?'添加':'编辑'}}积分规则</text>
          <view class="action text-black" catchtap="save">确定</view>
        </view>
      </view>
    </view>
    <scroll-view scroll-y catchtap="stopit">
      <view style="height: 3vh"></view>

      <view class="cu-list menu sm-border card-menu margin-top bg-white" style="text-align: left">
        <view class="cu-item sm-border arrow" bindtap="setdesc" data-target="nowtarget.point_name">
          <text class="text-bold text-black"> 积分名称</text>
          <text class="text-gray">必须</text>
        </view>
        <view class="cu-item sm-border" qq:if="{{nowtarget.point_name}}" bindtap="setdesc" data-target="nowtarget.point_name">
          <view style="width: 100%; word-wrap: break-word">
            <text class="text-gray">{{nowtarget.point_name}}</text>
          </view>
        </view>
      </view>
      <view class="cu-list menu sm-border card-menu margin-top bg-white" style="text-align: left">
        <view class="cu-item sm-border arrow" bindtap="setdesc" data-target="nowtarget.point_desc">
          <text class="text-bold text-black"> 积分介绍</text>
          <text class="text-gray">可选</text>
        </view>
        <view class="cu-item sm-border" qq:if="{{nowtarget.point_desc}}" bindtap="setdesc" data-target="nowtarget.point_desc">
          <view style="width: 100%; word-wrap: break-word">
            <text class="text-gray">{{nowtarget.point_desc}}</text>
          </view>
        </view>
      </view>
      <view class="cu-list menu sm-border card-menu margin-top bg-white" style="text-align: left">
        <view class="cu-item sm-border">
          <text class="text-bold text-black">接受跨频转入</text>
          <switch class="sm" bindchange="RolesSwitch" checked="{{nowtarget.canenter=='1'}}" data-target="canenter"></switch>
        </view>
        <view class="cu-item sm-border arrow no-border" qq:if="{{nowtarget.canenter=='1'}}" bindtap="setdesc" data-target="nowtarget.enter_rate">
          <text class="text-bold text-black">跨频转入手续费</text>
          <text class="text-gray">{{nowtarget.enter_rate}}‱</text>
        </view>
        <view class="cu-item sm-border arrow no-border" qq:if="{{nowtarget.canenter=='1'}}" bindtap="selectguilds" data-item="{{nowtarget}}">
          <text class="text-bold text-black">跨频转入频道白名单</text>
        </view>
      </view>
      <view class="cu-list menu sm-border card-menu margin-top bg-white" style="text-align: left">
        <view class="cu-item sm-border">
          <text class="text-bold text-black">接受跨频转出</text>
          <switch class="sm" bindchange="RolesSwitch" checked="{{nowtarget.canleave=='1'}}" data-target="canleave"></switch>
        </view>
        <view class="cu-item sm-border arrow no-border" qq:if="{{nowtarget.canleave=='1'}}" bindtap="setdesc" data-target="nowtarget.leave_rate">
          <text class="text-bold text-black">跨频转出手续费</text>
          <text class="text-gray">{{nowtarget.leave_rate}}‱</text>
        </view>
      </view>
     <view class="cu-list menu sm-border card-menu margin-top bg-white" style="text-align: left">
        <view class="cu-item sm-border">
          <text class="text-bold text-black">接受积分转换转入</text>
          <switch class="sm" bindchange="RolesSwitch" checked="{{nowtarget.canchangeenter=='1'}}" data-target="canchangeenter"></switch>
        </view>
        <view class="cu-item sm-border arrow no-border" qq:if="{{nowtarget.canchangeenter=='1'}}" bindtap="setdesc" data-target="nowtarget.changeenter_rate">
          <text class="text-bold text-black">转换转入手续费</text>
          <text class="text-gray">{{nowtarget.changeenter_rate}}‱</text>
        </view>
      </view>
      <view class="cu-list menu sm-border card-menu margin-top bg-white" style="text-align: left">
        <view class="cu-item sm-border">
          <text class="text-bold text-black">接受积分转换转出</text>
          <switch class="sm" bindchange="RolesSwitch" checked="{{nowtarget.canchangeleave=='1'}}" data-target="canchangeleave"></switch>
        </view>
        <view class="cu-item sm-border arrow no-border" qq:if="{{nowtarget.canchangeleave=='1'}}" bindtap="setdesc" data-target="nowtarget.changeleave_rate">
          <text class="text-bold text-black">转换转出手续费</text>
          <text class="text-gray">{{nowtarget.changeleave_rate}}‱</text>
        </view>
      </view>
      <view class="cu-list menu sm-border card-menu margin-top bg-white" style="text-align: left">
        <view class="cu-item sm-border">
          <text class="text-bold text-black">允许用户赞助获取</text>
          <switch class="sm" bindchange="RolesSwitch" checked="{{nowtarget.sold=='1'}}" data-target="sold"></switch>
        </view>
        <view class="cu-item sm-border arrow no-border" qq:if="{{nowtarget.sold=='1'}}" bindtap="setdesc" data-target="nowtarget.soldprice">
          <text class="text-bold text-black">积分赞助汇率</text>
          <text class="text-gray">{{nowtarget.soldprice}}积分/元</text>
        </view>
        <view class="cu-item sm-border arrow no-border" qq:if="{{nowtarget.sold=='1'}}" bindtap="setdesc" data-target="nowtarget.limitamount_min">
          <text class="text-bold text-black">最低赞助金额</text>
          <text class="text-gray">{{nowtarget.limitamount_min}}元</text>
        </view>
        <view class="cu-item sm-border arrow no-border" qq:if="{{nowtarget.sold=='1'}}" bindtap="setdesc" data-target="nowtarget.limitamount_max">
          <text class="text-bold text-black">最高赞助金额</text>
          <text class="text-gray">{{nowtarget.limitamount_max}}元</text>
        </view>
      </view>
      <view class="cu-list menu sm-border card-menu margin-top bg-white" style="text-align: left">
        <view class="cu-item sm-border">
          <text class="text-bold text-black">允许用户相互转账</text>
          <switch class="sm" bindchange="RolesSwitch" checked="{{nowtarget.cantrans=='1'}}" data-target="cantrans"></switch>
        </view>
        <view class="cu-item sm-border arrow no-border" qq:if="{{nowtarget.cantrans=='1'}}" bindtap="setdesc" data-target="nowtarget.transrate">
          <text class="text-bold text-black">转账手续费</text>
          <text class="text-gray">{{nowtarget.transrate}}‱</text>
        </view>
      </view>
      <view class="cu-list menu sm-border card-menu margin-top bg-white" style="text-align: left">
        <view class="cu-item sm-border">
          <text class="text-bold text-black">允许存入银行</text>
          <switch class="sm" bindchange="RolesSwitch" checked="{{nowtarget.bank=='1'}}" data-target="bank"></switch>
        </view>
        <view class="cu-item sm-border arrow no-border" qq:if="{{nowtarget.bank=='1'}}" bindtap="setdesc" data-target="nowtarget.bankenterrate">
          <text class="text-bold text-black">存入手续费</text>
          <text class="text-gray">{{nowtarget.bankenterrate}}‱</text>
        </view>
        <view class="cu-item sm-border arrow no-border" qq:if="{{nowtarget.bank=='1'}}" bindtap="setdesc" data-target="nowtarget.bankleaverate">
          <text class="text-bold text-black">取出手续费</text>
          <text class="text-gray">{{nowtarget.bankleaverate}}‱</text>
        </view>
        <view class="cu-item sm-border arrow no-border" qq:if="{{nowtarget.bank=='1'}}" bindtap="setdesc" data-target="nowtarget.bankrate">
          <text class="text-bold text-black">银行利率</text>
          <text class="text-gray">{{nowtarget.bankrate}}‱*总金/天</text>
        </view>
      </view>
      <view class="cu-list menu sm-border card-menu margin-top bg-white" style="text-align: left">
        <view class="cu-item sm-border">
          <text class="text-bold text-black">积分静态活性（点击灰字修改）</text>
          <picker mode="multiSelector" range="{{daterange}}" bindchange="bindMultiPickerChange">
            <text class="text-gray">{{nowtarget.exp_seconds}}秒</text>
          </picker>
        </view>
      </view>

      <view style="height: 3vh"></view>
    </scroll-view>
  </view>
</view>

<scroll-view scroll-y style="height: 100vh">
  <view class="margin" style="text-align: left">
    <view class="margin-top bg-white padding radius-lg">
      <view class="text-sm text-black">说明：</view>
      <view class="text-red text-sm padding-top-xs">删除积分将同步清空所有用户对应积分</view>
      <view class="text-gray text-sm padding-top-xs">修改积分名称、设置等不影响用户积分</view>
      <view class="text-gray text-sm padding-top-xs">跨频转账依赖积分名称作为标识</view>
      <view class="text-gray text-sm padding-top-xs">静态积分活性，指积分无变动时的最大有效期</view>
      <view class="text-gray text-sm padding-top-xs">用户需要频繁对积分进行变动</view>
      <view class="text-red text-sm padding-top-xs">在最大有效期内未对积分变动，积分清零</view>
    </view>
  </view>

  <view class="cu-list menu sm-border card-menu margin-top bg-white" qq:for="{{list}}" qq:key="index" data-item="{{item}}" data-index="{{index}}" bindtap="showinfo">
    <view class="cu-item sm-border arrow">
      <view style="display: flex; align-items: center">
        <text class="cuIcon-roundclose text-red text-bold" style="font-size: 38rpx; margin-right: 10rpx" data-item="{{item}}" catchtap="delrole"></text>
        <text class="text-bold text-black"> 积分名称</text>
      </view>
      <text class="text-gray">必须</text>
    </view>
    <view class="cu-item sm-border no-border">
      <view style="width: 100%; word-wrap: break-word">
        <text class="text-gray">{{item.point_name}}</text>
      </view>
    </view>
  </view>

  <view class="cu-list menu sm-border card-menu margin-top" bindtap="addrole">
    <view class="cu-item sm-border">
      <view class="flex-sub text-center">
        <view class="solid-bottom text-xl padding">
          <text class="cuIcon-roundaddfill text-black text-bold"> 添加积分规则</text>
        </view>
      </view>
    </view>
  </view>

  <view style="height: 3vh"></view>
</scroll-view>
