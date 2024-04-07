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
  
<color-picker show="{{showcolor}}" defaultColor="{{tmprgba}}" bind:close="colorClose" bind:confirm="colorConfirm"></color-picker>


<view class="cu-modal bottom-modal {{modalA=='show'?'show':''}}" bindtap="hideModalA">
  <view class="cu-dialog" catchtap="stopit">
  <view class='header-view-top'>
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
  <scroll-view scroll-y catchtap='stopit'>

<view style='height:1vh;'></view>

  <view class="cu-list menu sm-border margin-top">

  <view class="cu-item sm-border" qq:for="{{pointlist}}" qq:key='index' catchtap='kclick' data-index='{{index}}' data-item='{{item}}'>
<view style='display: flex;align-items: center;'>
<text class="cuIcon-recharge text-blue margin-right-sm"></text>
<text class="text-black text-cut" style='max-width:70vw;'>{{item.point_name}}</text>
</view>
<view style='display: flex;' catchtap='showpointinfo' data-info='{{item.point_desc}}'>
<text class="cuIcon-info text-black"></text>
</view>
</view>

  </view>
  </scroll-view>
  </view>
</view>

<view class="cu-modal bottom-modal {{shownewrole=='show' && showcolor=='' && modalB=='' ?'show':''}}" bindtap="hideModalnewrole">
  <view class="cu-dialog" catchtap="stopit">
    <view class="header-view-top">
      <view class="header-view">
        <view class="header">
          <view></view>
        </view>
        <view class="cu-bar bg-white">
          <view class="action text-black" catchtap="hideModalnewrole">取消</view>
          <text class="text-bold text-black text-lg">新建身份组</text>
          <view class="action text-black" catchtap="rolecreat">确定</view>
        </view>
      </view>
    </view>
    <scroll-view scroll-y catchtap="stopit">
      <view style="height: 3vh"></view>

      <view class="cu-list menu sm-border card-menu margin-top" bindtap="setdesc" data-target="tmpnewrolename">
        <view class="cu-item sm-border arrow">
          <text class="text-bold text-black">身份组名称</text>
          <text class="text-gray">必填</text>
        </view>
        <view class="cu-item sm-border" qq:if="{{tmpnewrolename}}">
          <text class="text-gray">{{tmpnewrolename}} </text>
        </view>
      </view>

      <view class="cu-list menu sm-border card-menu margin-top" bindtap="changecolor">
        <view class="cu-item sm-border arrow">
          <view style="display: flex; align-items: center">
            <text class="cuIcon-skin" style="color: blue; font-size: 50rpx"></text>
            <text class="text-bold text-black margin-left-sm">外显颜色</text>
          </view>

          <view style="display: flex; align-items: center">
            <text class="cuIcon-title" style="color:{{tmpcolorhex}};font-size:50rpx;"></text>
            <text class="text-bold text-black">{{tmpcolorhex}}</text>
          </view>
        </view>
      </view>

      <view class="cu-list menu sm-border card-menu margin-top">
        <view class="cu-item sm-border">
          <text class="text-bold text-black">成员列表分组展示</text>
          <switch class="sm" catchchange="RoleLsShSwitch" checked="{{tmprolelistshow}}"></switch>
        </view>
      </view>

      <view style="height: 3vh"></view>
    </scroll-view>
  </view>
</view>

<view class="cu-modal bottom-modal {{modalD=='show' && shownewrole=='' && showcolor=='' && modalB=='' ?'show':''}}" bindtap="hideModalD">
  <view class="cu-dialog" catchtap="stopit">
    <view class="header-view-top">
      <view class="header-view">
        <view class="header">
          <view></view>
        </view>
        <view class="cu-bar bg-white">
          <view class="action text-black" catchtap="hideModalD">取消</view>
          <text class="text-bold text-black text-lg">选择身份组</text>
          <view class="action text-black" catchtap="setonerole">确定</view>
        </view>
      </view>
    </view>
    <scroll-view scroll-y catchtap="stopit">
      <view style="height: 3vh"></view>

      <view class="cu-list menu sm-border card-menu margin-top" catchtap="creatnewrole">
        <view class="cu-item sm-border arrow">
          <view style="display: flex; align-items: center">
            <text class="cuIcon-roundadd" style="font-size: 40rpx"></text>
            <text class="text-bold text-black margin-left-sm">新建身份组</text>
          </view>
        </view>
      </view>

      <view class="cu-list menu sm-border margin-top">
        <view class="cu-item sm-border" qq:for="{{rolelist}}" qq:key="index" catchtap="fclick" data-index="{{index}}" data-item="{{item}}">
          <view style="display: flex; align-items: center">
            <text class="cuIcon-title" style="color:{{item.hexcolor}};font-size:50rpx;"></text>
            <text class="{{item.disable?'text-gray':'text-black'}} text-cut" style="max-width: 70vw">{{item.name}}</text>
          </view>

            <text class="cuIcon-roundcheckfill text-blue" qq:if="{{item.select}}"></text>
            <text class="cuIcon-roundcheckfill text-gray" qq:else></text>
        </view>
      </view>
    </scroll-view>
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
          <view class="action text-black" catchtap="hideModalC">取消</view>
          <text class="text-bold text-black text-lg">选择等级要求</text>
          <view class="action text-black" catchtap="setlevel">确定</view>
        </view>
      </view>
    </view>
    <scroll-view scroll-y catchtap="stopit">
      <view class="cu-list menu sm-border margin-top">
        <view class="cu-item sm-border" qq:for="{{levellist}}" qq:key="index" catchtap="lclick" data-index="{{index}}" data-item="{{item}}">
            <text class="cuIcon-choicenessfill text-blue"><text class="text-black margin-left-xs">{{item.name}}</text></text>
          <text>
            <text class="text-black margin-right-sm">{{item.desc}}</text>
            <text class="cuIcon-roundcheckfill text-blue" qq:if="{{item.select}}"></text>
          </text>
        </view>
      </view>
    </scroll-view>
  </view>
</view>

<view class="cu-modal bottom-modal {{modalE=='show'?'show':''}}" bindtap="hideModalE">
  <view class="cu-dialog" catchtap="stopit">
    <view class="header-view-top">
      <view class="header-view">
        <view class="header">
          <view></view>
        </view>
        <view class="cu-bar bg-white" catchtap="stopit">
          <view class="action text-black" catchtap="hideModalE">取消</view>
          <text class="text-bold text-black text-lg">设置封面图</text>
          <view class="action text-black"> </view>
        </view>
      </view>
    </view>
    <scroll-view scroll-y catchtap="stopit">
      <view style="height: 3vh"></view>

      <swiper
        class="card-swiper square-dot bg-white"
        indicator-dots="true"
        circular="true"
        autoplay="true"
        interval="5000"
        duration="500"
        bindchange="cardSwiper"
        indicator-color="#8799a3"
        indicator-active-color="#0081ff"
        bindtap="choseoneimg"
      >
        <swiper-item class="cur">
          <view class="swiper-item">
            <image src="{{tmpimg}}" mode="aspectFill"></image>
          </view>
        </swiper-item>
      </swiper>

      <view class="padding bg-white">
        <text class="text-gray text-lg bg-white">点击图片进行修改</text>
      </view>

      <view class="padding bg-white">
        <button class="cu-btn block bg-blue margin-tb-sm lg" bindtap="uploadImage">上传</button>
      </view>
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
          <custom-textarea maxlength="500" style="text-align: left; width: 100%;{{modalB=='show'?'':'display:none;'}}" bindinput="onInput" value="{{tmpct}}"></custom-textarea>
        </view>
      </view>
      <view style="height: 3vh"></view>
      <view class="text-gray" style="text-align: left; margin-left: 30rpx">请勿插入不良信息，一经发现永久禁止使用</view>
      <view class="text-gray" style="text-align: left; margin-left: 30rpx">并将后台证据提交至官方审查</view>

      <view style="height:100vh;"></view>
    </scroll-view>
  </view>
</view>

<scroll-view scroll-y>

<navigator open-type='navigate' url='../forbiddenwords_nick/forbiddenwords_nick'>
    <view class="cu-list menu sm-border card-menu margin-top">
    <view class="cu-item sm-border arrow">
      <view class="text-black text-bold">设置名片敏感词</view>
      <view class="text-gray">可选 按昵称过滤违规人员</view>
    </view>
  </view>
</navigator>

  <view class="cu-list menu sm-border card-menu margin-top">
    <view class="cu-item sm-border">
      <text class="text-bold text-black">自动禁言</text>
      <switch class="sm" bindchange="MultiSwitch" checked="{{rolesets.content.banspeak}}"></switch>
    </view>
    <view class="cu-item no-border" qq:if="{{rolesets.content.banspeak}}">
      <text class="text-bold text-black">禁言时长（点击灰字修改）</text>
      <picker mode="multiSelector" range="{{daterange}}" bindchange="bindMultiPickerChange_" bindcancel="canceltime_" bindtap="setresttime_">
        <text class="text-gray">{{rolesets.content.bantimes}}</text>
      </picker>
    </view>
    <view class="cu-item sm-border" qq:if="{{rolesets.content.banspeak}}">
      <view>
        <text class="text-bold text-black">自动解禁</text>
        <text class="cuIcon-question margin-left-sm text-bold" catchtap="ftips"></text>
      </view>
      <switch class="sm" bindchange="AutoDisBanSwitch" checked="{{rolesets.content.autodisban}}"></switch>
    </view>
  </view>

  <view class="cu-list menu sm-border card-menu margin-top">
    <view class="cu-item sm-border">
      <text class="text-bold text-black">自动赋予身份组</text>
      <switch class="sm" bindchange="RolesSwitch" checked="{{rolesets.content.setroles}}" data-target='rolesets.content.setroles'></switch>
    </view>
  </view>

  <view qq:if="{{rolesets.content.setroles}}">
    <view qq:for="{{rolesets.content.roles}}" qq:key="{{index}}">
      <view class="cu-list menu sm-border card-menu margin-top">
        <view class="cu-item sm-border arrow" bindtap="froles" data-item="{{item}}" data-index="{{index}}">
          <view style="display: flex; align-items: center">
            <text class="cuIcon-roundclose text-red text-bold" style="font-size: 38rpx; margin-right: 10rpx" data-index="{{index}}" catchtap="delrole"></text>
            <text class="text-bold text-black">指定身份组</text>
          </view>
          <text class="text-gray text-cut" style="max-width: 50vw">{{item.rolename}}</text>
        </view>

        <view class="cu-item sm-border">
          <text class="text-bold text-black">赋予时长（点击灰字修改）</text>
          <picker mode="multiSelector" range="{{daterange}}" bindchange="bindMultiPickerChange" bindcancel="canceltime" data-item="{{item}}" data-index="{{index}}" bindtap="setresttime">
            <text class="text-gray" qq:if="{{item.time<=0}}">永久</text>
            <text class="text-gray" qq:else>{{item.times}}</text>
          </picker>
        </view>
      </view>
    </view>

    <view class="cu-list menu sm-border card-menu margin-top" bindtap="addrole">
      <view class="cu-item sm-border">
        <view class="flex-sub text-center">
          <view class="solid-bottom text-xl padding">
            <text class="cuIcon-roundaddfill text-black text-bold"> 添加身份组</text>
          </view>
        </view>
      </view>
    </view>
  </view>

  <view class="cu-list menu sm-border card-menu margin-top">
    <view class="cu-item sm-border">
      <text class="text-bold text-black">自动赋予积分</text>
      <switch class="sm" bindchange="RolesSwitch" checked="{{rolesets.content.setpoints}}" data-target='rolesets.content.setpoints'></switch>
    </view>
  </view>

  <view qq:if="{{rolesets.content.setpoints}}">
    <view qq:for="{{rolesets.content.points}}" qq:key="{{index}}">
      <view class="cu-list menu sm-border card-menu margin-top">
        <view class="cu-item sm-border arrow" bindtap="changepoint" data-item="{{item}}" data-index="{{index}}">
          <view style="display: flex; align-items: center">
            <text class="cuIcon-roundclose text-red text-bold" style="font-size: 38rpx; margin-right: 10rpx" data-index="{{index}}" catchtap="delpoint"></text>
            <text class="text-bold text-black">指定积分类型</text>
          </view>
          <text class="text-gray text-cut" style="max-width: 50vw">{{item.point_name}}</text>
        </view>

        <view class="cu-item sm-border">
          <text class="text-bold text-black">积分数量</text>
                <view class="flex justify-center align-center bg-white">
        <view class="cu-tag round bg-green sm cuIcon-move margin-top-xs" catchtap="inputcnt" data-type="de" data-target='rolesets.content.points[{{index}}].pointcnt' data-cnt='{{item.pointcnt}}'></view>
        <view class="margin-lr text-black text-center solids-bottom" style="width:160rpx;">
      <input type="number" value="{{item.pointcnt}}" maxlength="10" placeholder-style="color:#000000" bindinput='inputcnts' data-target='rolesets.content.points[{{index}}].pointcnt' data-cnt='{{item.pointcnt}}' bindblur='finishinputcnt'></input>
    </view>
        <view class="cu-tag round bg-red sm cuIcon-add margin-top-xs" catchtap="inputcnt" data-type="add" data-target='rolesets.content.points[{{index}}].pointcnt' data-cnt='{{item.pointcnt}}'></view>
        <text class="text-bold text-black margin-left">点</text>
      </view>
        </view>
      </view>
    </view>

    <view class="cu-list menu sm-border card-menu margin-top" bindtap="addpoint">
      <view class="cu-item sm-border">
        <view class="flex-sub text-center">
          <view class="solid-bottom text-xl padding">
            <text class="cuIcon-roundaddfill text-black text-bold"> 添加积分赋予规则</text>
          </view>
        </view>
      </view>
    </view>
  </view>

  <view class="margin" style="text-align: left">
    <view class="margin-top bg-white padding radius-lg">
      <view class="text-sm text-black">说明：</view>
      <view class="text-gray text-sm padding-top-xs">新用户加入后，将触发设置的操作</view>
      <view class="text-gray text-sm padding-top-xs">可赋予多个身份组并指定有效期，同时也可设置禁言</view>
      <view class="text-red text-sm padding-top-xs">该功能优先级较高，禁言将影响入频验证的问答验证</view>
      <view class="text-red text-sm padding-top-xs">为避免与入频验证冲突，请合理进行设置</view>
    </view>
  </view>

  <view style="height: 18vh"></view>
</scroll-view>

<view class="bg-white" style="position: fixed; z-index: 1024; bottom: 0; top: auto; left: 0; right: 0">
  <view class="padding">
    <button class="cu-btn block bg-blue margin-tb-sm lg" bindtap="saveall">保存</button>
  </view>
</view>
