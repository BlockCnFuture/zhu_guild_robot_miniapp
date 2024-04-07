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
  
<view class="cu-modal bottom-modal {{modalG=='show'?'show':''}}" bindtap="hideModalG">
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
          </view>
          <view style="display: flex" catchtap="showpointinfo" data-info="{{item.point_desc}}">
            <text class="cuIcon-info text-black"></text>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</view>



<view class="cu-modal bottom-modal {{modalB=='show'?'show':''}}" bindtap="hideModalB">
  <view class="cu-dialog" catchtap="stopit">
  <view class='header-view-top'>
  <view class="header-view">
      <view class="header">
        <view></view>
      </view>
      <view class="cu-bar bg-white">
      <view class="action text-black" catchtap="hideModalB">取消</view>
      <text class="text-bold text-black text-lg">选择身份组</text>
      <view class="action text-black"> </view>
      </view>
  </view>
  </view>
  <scroll-view scroll-y catchtap='stopit'>
<view style='height:1vh'></view>

  <view class="cu-list menu sm-border margin-top">

  <view class="cu-item sm-border" qq:for="{{crolelist}}" qq:key='index' catchtap='ffclick' data-index='{{index}}' data-item='{{item}}'>
<view style='display: flex;align-items: center;'>
<text class="cuIcon-title" style='color:{{item.hexcolor}};font-size:50rpx;' qq:if='{{item.hexcolor!="n"}}'></text>
<text class="cuIcon-choicenessfill text-blue margin-right-sm" qq:else></text>
<text class="{{item.disable?'text-gray':'text-black'}} text-cut" style='max-width:70vw;'>{{item.name}}</text>
</view>
  </view>

  </view>
  </scroll-view>
  </view>
</view>


<view class="margin-sm bg-white" style='border-radius:20rpx;'>
<view style='height:6rpx;'></view>

<view class="bg-white">
  <view class="cu-bar bg-white flex margin-left margin-right justify-between">
  <button class='cu-btn round line-{{goodsinfo.type=="0"?"blue":"gray"}} sm' bindtap='changetype' data-type='0'>身份组</button>
  <button class='cu-btn round line-{{goodsinfo.type=="1"?"blue":"gray"}} sm' bindtap='changetype' data-type='1'>积分</button>
  <button class='cu-btn round line-{{goodsinfo.type=="2"?"blue":"gray"}} sm' bindtap='changetype' data-type='2'>补签卡</button>
  </view>
</view>

<view class="cu-list menu sm-border margin-top">
    <view class="cu-item sm-border arrow text-cut" bindtap='changetr' qq:if='{{goodsinfo.type=="0"}}'>
      <text class="text-bold text-black">选择身份组</text>
      <text class="text-gray" style='max-width:60vw;'>{{goodsinfo.rolename}}</text>
    </view>
    <view class="cu-item sm-border" qq:if='{{goodsinfo.type=="0"}}'>
      <text class="text-bold text-black">身份组时长(点击灰字修改)</text>
        <picker mode="multiSelector" range="{{daterange_}}" bindchange="bindMultiPickerChange">
          <text class="text-gray" qq:if='{{goodsinfo.rolesecs>0}}'>{{times}}</text>
          <text class="text-gray" qq:else>永久</text>
        </picker>
    </view>
    <view class="cu-item sm-border" qq:if='{{goodsinfo.type=="2"}}'>
      <text class="text-bold text-black">兑换后获得</text>
      <view class='justify-center align-center flex'>
      <input type="number" value="{{goodsinfo.gaincnt}}" maxlength="2" bindinput='inputcnts' placeholder='请输入' data-target='goodsinfo.gaincnt' data-cnt='{{goodsinfo.gaincnt}}' bindblur='finishinputcnt' style="text-align:right;margin-right:10rpx;"></input>
      <view class='text-black text-bold'>张补签卡</view>
      </view>
    </view>
    <view class="cu-item sm-border arrow" bindtap='chosep' qq:if='{{goodsinfo.type=="1"}}'>
      <text class="text-bold text-black">兑换积分类型</text>
      <text class="text-gray">{{goodsinfo.point_name}}</text>
    </view>
    <view class="cu-item sm-border" qq:if='{{goodsinfo.type=="1"}}'>
      <text class="text-bold text-black">兑换积分数量</text>
      <view class='justify-center align-center flex'>
      <input type="number" value="{{goodsinfo.pointcnt}}" maxlength="5" bindinput='inputcnts' placeholder='请输入' data-target='goodsinfo.pointcnt' data-cnt='{{goodsinfo.pointcnt}}' bindblur='finishinputcnt' style="text-align:right;margin-right:10rpx;"></input>
      <view class='text-black text-bold'>点</view>
      </view>
    </view>
    <view class="cu-item sm-border arrow" bindtap='upcards'>
      <text class="text-bold text-black">管理兑换码</text>
    </view>
  </view>
</view>

<view style='height:600rpx;'></view>
<view class="bg-white" style="position: fixed; z-index: 1024; bottom: 0; top: auto; left: 0; right: 0">
  <view class="padding">
    <button class="cu-btn block bg-blue margin-tb-sm lg" bindtap="saveall">保存</button>
  </view>
</view>