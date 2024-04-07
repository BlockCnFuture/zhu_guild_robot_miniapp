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
            <text class="text-black text-cut" style="max-width: 70vw">{{item.name}}</text>
          </view>

            <text class="cuIcon-roundcheckfill text-blue" qq:if="{{item.select}}"></text>
            <text class="cuIcon-roundcheckfill text-gray" qq:else></text>
        </view>
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

<view class="margin">
  <view class="margin-top bg-white padding radius-lg" style='text-align: center'>
    <text class="text-black text-bold" style="font-size: 26rpx;">* 设置数据冲突时，将优先使用第一条设置数据</text>
  </view>
</view>

  <view class="cu-list menu sm-border card-menu margin-top">
    <view class="cu-item sm-border">
      <text class="text-bold text-black">启用本功能（总开关）</text>
      <switch class="sm" bindchange="RolesSwitch" checked="{{rolesets.useit}}" data-target='rolesets.useit'></switch>
    </view>
  </view>
  
  <view class="cu-list menu sm-border card-menu margin-top">
    <view class="cu-item sm-border">
      <text class="text-bold text-black">过滤规则设置</text>
    </view>
     <view class="cu-item sm-border no-border">
      <text class="text-bold text-black">纯图片消息是否计数</text>
      <switch class="sm" bindchange="RolesSwitch" checked="{{rolesets.content.countimage}}" data-target='rolesets.content.countimage'></switch>
    </view>
     <view class="cu-item sm-border no-border">
      <text class="text-bold text-black">艾特机器人的消息是否计数</text>
      <switch class="sm" bindchange="RolesSwitch" checked="{{rolesets.content.countatrobot}}" data-target='rolesets.content.countatrobot'></switch>
    </view>
            <view class="cu-item sm-border no-border">
          <text class="text-bold text-black">文本长度限制</text>
                <view class="flex justify-center align-center bg-white">
                <text class="text-bold text-black margin-right">要求≥</text>
        <view class="cu-tag round bg-green sm cuIcon-move margin-top-xs" catchtap="inputcnt" data-type="de" data-target='rolesets.content.needlength' data-cnt='{{rolesets.content.needlength}}'></view>
        <view class="margin-lr text-black text-center solids-bottom" style="width:160rpx;">
      <input type="number" value="{{rolesets.content.needlength}}" maxlength="10" placeholder-style="color:#000000" bindinput='inputcnts' data-target='rolesets.content.needlength' data-cnt='{{rolesets.content.needlength}}' bindblur='finishinputcnt'></input>
    </view>
        <view class="cu-tag round bg-red sm cuIcon-add margin-top-xs" catchtap="inputcnt" data-type="add" data-target='rolesets.content.needlength' data-cnt='{{rolesets.content.needlength}}'></view>
        <text class="text-bold text-black margin-left">字</text>
      </view>
        </view>
  </view>

  <view class="cu-list menu sm-border card-menu margin-top">
    <view class="cu-item sm-border">
      <text class="text-bold text-black">每日发言身份组奖励</text>
      <switch class="sm" bindchange="RolesSwitch" checked="{{rolesets.content.setrolesa}}" data-target='rolesets.content.setrolesa'></switch>
    </view>
  </view>

  <view qq:if="{{rolesets.content.setrolesa}}">
    <view qq:for="{{rolesets.content.rolesa}}" qq:key="{{index}}">
      <view class="cu-list menu sm-border card-menu margin-top">
        <view class="cu-item sm-border arrow" bindtap="froles" data-item="{{item}}" data-index="{{index}}" data-target='rolesa'>
          <view style="display: flex; align-items: center">
            <text class="cuIcon-roundclose text-red text-bold" style="font-size: 38rpx; margin-right: 10rpx" data-index="{{index}}" catchtap="delrole" data-target='rolesa'></text>
            <text class="text-bold text-black">指定身份组</text>
          </view>
          <text class="text-gray text-cut" style="max-width: 50vw">{{item.rolename}}</text>
        </view>

        <view class="cu-item sm-border no-border">
          <text class="text-bold text-black">触发条件</text>
                <view class="flex justify-center align-center bg-white">
                <text class="text-bold text-black margin-right">当日发言</text>
        <view class="cu-tag round bg-green sm cuIcon-move margin-top-xs" catchtap="inputcnt" data-type="de" data-target='rolesets.content.rolesa[{{index}}].cnt' data-cnt='{{item.cnt}}'></view>
        <view class="margin-lr text-black text-center solids-bottom" style="width:160rpx;">
      <input type="number" value="{{item.cnt}}" maxlength="10" placeholder-style="color:#000000" bindinput='inputcnts' data-target='rolesets.content.rolesa[{{index}}].cnt' data-cnt='{{item.cnt}}' bindblur='finishinputcnt'></input>
    </view>
        <view class="cu-tag round bg-red sm cuIcon-add margin-top-xs" catchtap="inputcnt" data-type="add" data-target='rolesets.content.rolesa[{{index}}].cnt' data-cnt='{{item.cnt}}'></view>
        <text class="text-bold text-black margin-left">条</text>
      </view>
        </view>

        <view class="cu-item sm-border">
          <text class="text-bold text-black">赋予时长（点击灰字修改）</text>
          <picker mode="multiSelector" range="{{daterange}}" bindchange="bindMultiPickerChange" bindcancel="canceltime" data-item="{{item}}" data-index="{{index}}" data-target='rolesa' bindtap="setresttime">
            <text class="text-gray" qq:if="{{item.time<=0}}">永久</text>
            <text class="text-gray" qq:else>{{item.times}}</text>
          </picker>
        </view>
      </view>
    </view>

    <view class="cu-list menu sm-border card-menu margin-top" bindtap="addrole" data-target='rolesa'>
      <view class="cu-item sm-border">
        <view class="flex-sub text-center">
          <view class="solid-bottom text-xl padding">
            <text class="cuIcon-roundaddfill text-black text-bold"> 添加身份组奖励规则</text>
          </view>
        </view>
      </view>
    </view>
    <view style='height:100rpx;'></view>
  </view>

  <view class="cu-list menu sm-border card-menu margin-top">
    <view class="cu-item sm-border">
      <text class="text-bold text-black">每日发言积分奖励</text>
      <switch class="sm" bindchange="RolesSwitch" checked="{{rolesets.content.setpointsa}}" data-target='rolesets.content.setpointsa'></switch>
    </view>
  </view>

  <view qq:if="{{rolesets.content.setpointsa}}">
    <view qq:for="{{rolesets.content.pointsa}}" qq:key="{{index}}">
      <view class="cu-list menu sm-border card-menu margin-top">
        <view class="cu-item sm-border arrow" bindtap="changepoint" data-item="{{item}}" data-index="{{index}}" data-target='pointsa'>
          <view style="display: flex; align-items: center">
            <text class="cuIcon-roundclose text-red text-bold" style="font-size: 38rpx; margin-right: 10rpx" data-index="{{index}}" catchtap="delrole" data-target='pointsa'></text>
            <text class="text-bold text-black">指定积分类型</text>
          </view>
          <text class="text-gray text-cut" style="max-width: 50vw">{{item.point_name}}</text>
        </view>

        <view class="cu-item sm-border no-border">
          <text class="text-bold text-black">触发条件</text>
                <view class="flex justify-center align-center bg-white">
                <text class="text-bold text-black margin-right">当日发言</text>
        <view class="cu-tag round bg-green sm cuIcon-move margin-top-xs" catchtap="inputcnt" data-type="de" data-target='rolesets.content.pointsa[{{index}}].cnt' data-cnt='{{item.cnt}}'></view>
        <view class="margin-lr text-black text-center solids-bottom" style="width:160rpx;">
      <input type="number" value="{{item.cnt}}" maxlength="10" placeholder-style="color:#000000" bindinput='inputcnts' data-target='rolesets.content.pointsa[{{index}}].cnt' data-cnt='{{item.cnt}}' bindblur='finishinputcnt'></input>
    </view>
        <view class="cu-tag round bg-red sm cuIcon-add margin-top-xs" catchtap="inputcnt" data-type="add" data-target='rolesets.content.pointsa[{{index}}].cnt' data-cnt='{{item.cnt}}'></view>
        <text class="text-bold text-black margin-left">条</text>
      </view>
        </view>

        <view class="cu-item sm-border">
          <text class="text-bold text-black">奖励积分数量</text>
                <view class="flex justify-center align-center bg-white">
        <view class="cu-tag round bg-green sm cuIcon-move margin-top-xs" catchtap="inputcnt" data-type="de" data-target='rolesets.content.pointsa[{{index}}].pointcnt' data-cnt='{{item.pointcnt}}'></view>
        <view class="margin-lr text-black text-center solids-bottom" style="width:160rpx;">
      <input type="number" value="{{item.pointcnt}}" maxlength="10" placeholder-style="color:#000000" bindinput='inputcnts' data-target='rolesets.content.pointsa[{{index}}].pointcnt' data-cnt='{{item.pointcnt}}' bindblur='finishinputcnt'></input>
    </view>
        <view class="cu-tag round bg-red sm cuIcon-add margin-top-xs" catchtap="inputcnt" data-type="add" data-target='rolesets.content.pointsa[{{index}}].pointcnt' data-cnt='{{item.pointcnt}}'></view>
        <text class="text-bold text-black margin-left">点</text>
      </view>
        </view>
      </view>
    </view>

    <view class="cu-list menu sm-border card-menu margin-top" bindtap="addrole" data-target='pointsa'>
      <view class="cu-item sm-border">
        <view class="flex-sub text-center">
          <view class="solid-bottom text-xl padding">
            <text class="cuIcon-roundaddfill text-black text-bold"> 添加积分奖励规则</text>
          </view>
        </view>
      </view>
    </view>
    <view style='height:100rpx;'></view>
  </view>

  <view class="cu-list menu sm-border card-menu margin-top">
    <view class="cu-item sm-border">
      <text class="text-bold text-black">连续发言身份组奖励</text>
      <switch class="sm" bindchange="RolesSwitch" checked="{{rolesets.content.setrolesb}}" data-target='rolesets.content.setrolesb'></switch>
    </view>
  </view>

  <view qq:if="{{rolesets.content.setrolesb}}">
    <view qq:for="{{rolesets.content.rolesb}}" qq:key="{{index}}">
      <view class="cu-list menu sm-border card-menu margin-top">
        <view class="cu-item sm-border arrow" bindtap="froles" data-item="{{item}}" data-index="{{index}}" data-target='rolesb'>
          <view style="display: flex; align-items: center">
            <text class="cuIcon-roundclose text-red text-bold" style="font-size: 38rpx; margin-right: 10rpx" data-index="{{index}}" catchtap="delrole" data-target='rolesb'></text>
            <text class="text-bold text-black">指定身份组</text>
          </view>
          <text class="text-gray text-cut" style="max-width: 50vw">{{item.rolename}}</text>
        </view>

        <view class="cu-item sm-border no-border">
          <text class="text-bold text-black">触发条件</text>
                <view class="flex justify-center align-center bg-white">
                <text class="text-bold text-black margin-right">连续发言</text>
        <view class="cu-tag round bg-green sm cuIcon-move margin-top-xs" catchtap="inputcnt" data-type="de" data-target='rolesets.content.rolesb[{{index}}].cnt' data-cnt='{{item.cnt}}'></view>
        <view class="margin-lr text-black text-center solids-bottom" style="width:160rpx;">
      <input type="number" value="{{item.cnt}}" maxlength="10" placeholder-style="color:#000000" bindinput='inputcnts' data-target='rolesets.content.rolesb[{{index}}].cnt' data-cnt='{{item.cnt}}' bindblur='finishinputcnt'></input>
    </view>
        <view class="cu-tag round bg-red sm cuIcon-add margin-top-xs" catchtap="inputcnt" data-type="add" data-target='rolesets.content.rolesb[{{index}}].cnt' data-cnt='{{item.cnt}}'></view>
        <text class="text-bold text-black margin-left">天</text>
      </view>
        </view>

        <view class="cu-item sm-border">
          <text class="text-bold text-black">赋予时长（点击灰字修改）</text>
          <picker mode="multiSelector" range="{{daterange}}" bindchange="bindMultiPickerChange" bindcancel="canceltime" data-item="{{item}}" data-index="{{index}}" data-target='rolesb' bindtap="setresttime">
            <text class="text-gray" qq:if="{{item.time<=0}}">永久</text>
            <text class="text-gray" qq:else>{{item.times}}</text>
          </picker>
        </view>
      </view>
    </view>

    <view class="cu-list menu sm-border card-menu margin-top" bindtap="addrole" data-target='rolesb'>
      <view class="cu-item sm-border">
        <view class="flex-sub text-center">
          <view class="solid-bottom text-xl padding">
            <text class="cuIcon-roundaddfill text-black text-bold"> 添加身份组奖励规则</text>
          </view>
        </view>
      </view>
    </view>
    <view style='height:100rpx;'></view>
  </view>

  <view class="cu-list menu sm-border card-menu margin-top">
    <view class="cu-item sm-border">
      <text class="text-bold text-black">连续发言积分奖励</text>
      <switch class="sm" bindchange="RolesSwitch" checked="{{rolesets.content.setpointsb}}" data-target='rolesets.content.setpointsb'></switch>
    </view>
  </view>

  <view qq:if="{{rolesets.content.setpointsb}}">
    <view qq:for="{{rolesets.content.pointsb}}" qq:key="{{index}}">
      <view class="cu-list menu sm-border card-menu margin-top">
        <view class="cu-item sm-border arrow" bindtap="changepoint" data-item="{{item}}" data-index="{{index}}" data-target='pointsb'>
          <view style="display: flex; align-items: center">
            <text class="cuIcon-roundclose text-red text-bold" style="font-size: 38rpx; margin-right: 10rpx" data-index="{{index}}" catchtap="delrole" data-target='pointsb'></text>
            <text class="text-bold text-black">指定积分类型</text>
          </view>
          <text class="text-gray text-cut" style="max-width: 50vw">{{item.point_name}}</text>
        </view>

        <view class="cu-item sm-border no-border">
          <text class="text-bold text-black">触发条件</text>
                <view class="flex justify-center align-center bg-white">
                <text class="text-bold text-black margin-right">连续发言</text>
        <view class="cu-tag round bg-green sm cuIcon-move margin-top-xs" catchtap="inputcnt" data-type="de" data-target='rolesets.content.pointsb[{{index}}].cnt' data-cnt='{{item.cnt}}'></view>
        <view class="margin-lr text-black text-center solids-bottom" style="width:160rpx;">
      <input type="number" value="{{item.cnt}}" maxlength="10" placeholder-style="color:#000000" bindinput='inputcnts' data-target='rolesets.content.pointsb[{{index}}].cnt' data-cnt='{{item.cnt}}' bindblur='finishinputcnt'></input>
    </view>
        <view class="cu-tag round bg-red sm cuIcon-add margin-top-xs" catchtap="inputcnt" data-type="add" data-target='rolesets.content.pointsb[{{index}}].cnt' data-cnt='{{item.cnt}}'></view>
        <text class="text-bold text-black margin-left">天</text>
      </view>
        </view>

        <view class="cu-item sm-border">
          <text class="text-bold text-black">奖励积分数量</text>
                <view class="flex justify-center align-center bg-white">
        <view class="cu-tag round bg-green sm cuIcon-move margin-top-xs" catchtap="inputcnt" data-type="de" data-target='rolesets.content.pointsb[{{index}}].pointcnt' data-cnt='{{item.pointcnt}}'></view>
        <view class="margin-lr text-black text-center solids-bottom" style="width:160rpx;">
      <input type="number" value="{{item.pointcnt}}" maxlength="10" placeholder-style="color:#000000" bindinput='inputcnts' data-target='rolesets.content.pointsb[{{index}}].pointcnt' data-cnt='{{item.pointcnt}}' bindblur='finishinputcnt'></input>
    </view>
        <view class="cu-tag round bg-red sm cuIcon-add margin-top-xs" catchtap="inputcnt" data-type="add" data-target='rolesets.content.pointsb[{{index}}].pointcnt' data-cnt='{{item.pointcnt}}'></view>
        <text class="text-bold text-black margin-left">点</text>
      </view>
        </view>
      </view>
    </view>

    <view class="cu-list menu sm-border card-menu margin-top" bindtap="addrole" data-target='pointsb'>
      <view class="cu-item sm-border">
        <view class="flex-sub text-center">
          <view class="solid-bottom text-xl padding">
            <text class="cuIcon-roundaddfill text-black text-bold"> 添加积分奖励规则</text>
          </view>
        </view>
      </view>
    </view>
    <view style='height:100rpx;'></view>
  </view>


  <view style="height: 18vh"></view>
</scroll-view>

<view class="bg-white" style="position: fixed; z-index: 1024; bottom: 0; top: auto; left: 0; right: 0">
  <view class="padding">
    <button class="cu-btn block bg-blue margin-tb-sm lg" bindtap="saveall">保存</button>
  </view>
</view>
