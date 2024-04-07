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
  
<view class="cu-modal bottom-modal {{modalE=='show'?'show':''}}" bindtap="hideModalE">
  <view class="cu-dialog" catchtap="stopit">
    <view class="header-view-top">
      <view class="header-view">
        <view class="header">
          <view></view>
        </view>
        <view class="cu-bar bg-white" catchtap="stopit">
          <view class="action text-black" catchtap="hideModalE">取消</view>
          <text class="text-bold text-black text-lg">设置图片</text>
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



<view class="cu-modal bottom-modal {{modalA=='show' ?'show':''}}" bindtap="hideModalA">
  <view class="cu-dialog" catchtap="stopit">
    <view class="header-view-top">
      <view class="header-view">
        <view class="header">
          <view></view>
        </view>
        <view class="cu-bar bg-white" catchtap="stopit">
          <view class="action text-black"> </view>
          <text class="text-bold text-black text-lg">选择礼品分类</text>
          <view class="action text-black"> </view>
        </view>
      </view>
    </view>
    <scroll-view scroll-y catchtap="stopit">
      <view style="height: 60rpx"></view>
      <view class="cu-list menu sm-border card-menu margin-top" qq:for="{{rolesets.content.groups}}" qq:key="i" data-index="{{index}}" data-item="{{item}}">
        <view class="cu-item sm-border no-border" bindtap='chosegroup' data-item='{{item}}'>
            <view class="text-black text-cut" style="max-width: 60vw"> {{item}} </view>
        </view>
      </view>
      <view style="height: 120rpx"></view>
    </scroll-view>
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


<view class="cu-modal bottom-modal {{modalD=='show'?'show':''}}" bindtap="hideModalD">
  <view class="cu-dialog" catchtap="stopit">
  <view class='header-view-top'>
  <view class="header-view">
      <view class="header">
        <view></view>
      </view>
      <view class="cu-bar bg-white">
      <view class="action text-black" catchtap="hideModalD">取消</view>
      <text class="text-bold text-black text-lg">选择身份组</text>
      <view class="action text-black" catchtap="setrole">确定</view>
      </view>
  </view>
  </view>
  <scroll-view scroll-y catchtap='stopit'>
<view style='height:1vh'></view>
  <view class="cu-bar bg-white flex padding justify-between">
  <button class="cu-btn bg-blue sm" catchtap="selectall">全选</button>
  <button class="cu-btn bg-blue sm" catchtap="cancleall">全不选</button>
  </view>

  <view class="cu-list menu sm-border margin-top">

  <view class="cu-item sm-border" qq:for="{{rolelist}}" qq:key='index' catchtap='fclick' data-index='{{index}}' data-item='{{item}}'>
<view style='display: flex;align-items: center;'>
<text class="cuIcon-title" style='color:{{item.hexcolor}};font-size:50rpx;' qq:if='{{item.hexcolor!="n"}}'></text>
<text class="cuIcon-choicenessfill text-blue margin-right-sm" qq:else></text>
<text class="{{item.disable?'text-gray':'text-black'}} text-cut" style='max-width:70vw;'>{{item.name}}</text>
</view>          
  <text class="cuIcon-roundcheckfill text-blue" qq:if='{{item.select}}'></text>
  <text class="cuIcon-roundcheckfill text-gray" qq:else></text>
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


  <view class="cu-list menu sm-border card-menu margin-top">
      <view class="cu-item sm-border" bindtap='chosetype'>
        <view style='width: 100%;word-wrap: break-word;'>
            <text class="text-gray">↓ 点击图片可修改
            </text>
        </view>
      </view>
  </view>
<view class="margin-sm bg-white" style='border-radius:20rpx;'>
<view style='height:6rpx;'></view>
<view class="" style='margin:16rpx;margin-bottom:0rpx;border-radius:30rpx;' bindtap='changeimage' data-type='image'>
<image src="{{goodsinfo.image}}" mode="widthFix" style="border-radius:30rpx;width:100%"></image>
</view>

<view class="bg-white">
  <view class="cu-bar bg-white flex margin-left margin-right justify-between">
  <button class='cu-btn round line-{{goodsinfo.type=="0"?"blue":"gray"}} sm' bindtap='changetype' data-type='0'>自定义</button>
  <button class='cu-btn round line-{{goodsinfo.type=="1"?"blue":"gray"}} sm' bindtap='changetype' data-type='1'>身份组</button>
  <button class='cu-btn round line-{{goodsinfo.type=="2"?"blue":"gray"}} sm' bindtap='changetype' data-type='2'>兑换码</button>
  <button class='cu-btn round line-{{goodsinfo.type=="3"?"blue":"gray"}} sm' bindtap='changetype' data-type='3'>补签卡</button>
  </view>
</view>

<view class="cu-list menu sm-border margin-top">
    <view class="cu-item sm-border">
      <text class="text-bold text-black">礼品名称</text>
      <input value="{{goodsinfo.name}}" maxlength="30" bindinput='inputcnts' placeholder='请输入礼品名称' data-target='goodsinfo.name' data-cnt='x' bindblur='finishinputcnt' style='text-align:right;'></input>
    </view>
    <view class="cu-item sm-border arrow text-cut" bindtap='changetr' qq:if='{{goodsinfo.type=="1"}}'>
      <text class="text-bold text-black">选择身份组</text>
      <text class="text-gray" style='max-width:60vw;'>{{goodsinfo.rolename}}</text>
    </view>
    <view class="cu-item sm-border" qq:if='{{goodsinfo.type=="1"}}'>
      <text class="text-bold text-black">身份组时长(点击灰字修改)</text>
        <picker mode="multiSelector" range="{{daterange_}}" bindchange="bindMultiPickerChange">
          <text class="text-gray" qq:if='{{goodsinfo.rolesecs>0}}'>{{times}}</text>
          <text class="text-gray" qq:else>永久</text>
        </picker>
    </view>
    <view class="cu-item sm-border" qq:if='{{goodsinfo.type!="2"}}'>
      <text class="text-bold text-black">礼品库存</text>
      <view class='justify-center align-center flex'>
      <input type="number" value="{{goodsinfo.rest}}" maxlength="5" bindinput='inputcnts' placeholder='请输入' data-target='goodsinfo.rest' data-cnt='{{goodsinfo.rest}}' bindblur='finishinputcnt' style="text-align:right;margin-right:10rpx;"></input>
      <view class='text-black text-bold'>个</view>
      </view>
    </view>
    <view class="cu-item sm-border">
      <text class="text-bold text-black">每日最多兑换</text>
      <view class='justify-center align-center flex'>
      <input type="number" value="{{goodsinfo.daymax}}" maxlength="5" bindinput='inputcnts' placeholder='请输入' data-target='goodsinfo.daymax' data-cnt='{{goodsinfo.daymax}}' bindblur='finishinputcnt' style="text-align:right;margin-right:10rpx;"></input>
      <view class='text-black text-bold'>个</view>
      </view>
    </view>
    <view class="cu-item sm-border arrow" qq:if='{{goodsinfo.type=="2"}}' bindtap='upcards'>
      <text class="text-bold text-black">管理兑换码</text>
    </view>
    <view class="cu-item sm-border arrow" bindtap='chosep'>
      <text class="text-bold text-black">兑换消耗积分类型</text>
      <text class="text-gray">{{goodsinfo.point_name}}</text>
    </view>
    <view class="cu-item sm-border">
      <text class="text-bold text-black">兑换消耗积分数量</text>
      <view class='justify-center align-center flex'>
      <input type="number" value="{{goodsinfo.pointcnt}}" maxlength="5" bindinput='inputcnts' placeholder='请输入' data-target='goodsinfo.pointcnt' data-cnt='{{goodsinfo.pointcnt}}' bindblur='finishinputcnt' style="text-align:right;margin-right:10rpx;"></input>
      <view class='text-black text-bold'>点</view>
      </view>
    </view>
    <view class="cu-item sm-border">
      <text class="text-bold text-black">用户兑换上限</text>
      <view class='justify-center align-center flex'>
      <input type="number" value="{{goodsinfo.limitpa}}" maxlength="5" bindinput='inputcnts' placeholder='请输入' data-target='goodsinfo.limitpa' data-cnt='{{goodsinfo.limitpa}}' bindblur='finishinputcnt' style="text-align:right;margin-right:10rpx;"></input>
      <view class='text-black text-bold'>次 /</view>
      <input type="number" value="{{goodsinfo.limitpb}}" maxlength="1" bindinput='inputcnts' placeholder='请输入' data-target='goodsinfo.limitpb' data-cnt='{{goodsinfo.limitpb}}' bindblur='finishinputcnt' style="text-align:right;margin-right:10rpx;max-width:60rpx"></input>
      <view class='text-black text-bold'>天</view>
      </view>
    </view>
    <view class="cu-item sm-border">
      <text class="text-bold text-black">兑换时间段设置 ↓ </text>
    </view>
    <view class="cu-item sm-border no-border">
        <text class="text-bold text-black">开始时间（点击灰字修改）</text>
        <picker mode="multiSelector" range="{{daterange}}" bindchange="bindMultiPickerChangeS">
          <text class="text-gray">{{goodsinfo.start}}</text>
        </picker>
      </view>
      <view class="cu-item sm-border">
        <text class="text-bold text-black">结束时间（点击灰字修改）</text>
        <picker mode="multiSelector" range="{{daterange}}" bindchange="bindMultiPickerChangeE">
          <text class="text-gray">{{goodsinfo.end}}</text>
        </picker>
      </view>
    <view class="cu-item sm-border arrow" bindtap='setgroup'>
      <text class="text-bold text-black">礼品分类</text>
      <text class='gray' qq:if='{{goodsinfo.groupname}}'>{{goodsinfo.groupname}}</text>
      <text class='gray' qq:else>可选</text>
    </view>
    <view class="cu-item sm-border">
      <text class="text-bold text-black">是否上架</text>
      <switch class="sm" bindchange="RolesSwitch" checked="{{goodsinfo.onsold=='1'}}" data-target="goodsinfo.onsold"></switch>
    </view>
    <view class="cu-item sm-border">
      <text class="text-bold text-black">是否要求给予收货地址</text>
      <switch class="sm" bindchange="RolesSwitch" checked="{{goodsinfo.needaddress=='1'}}" data-target="goodsinfo.needaddress"></switch>
    </view>
  <view class="cu-item sm-border no-border" bindtap='changeroles'>
      <text class="text-black text-bold">有兑换权限的身份组，点击区域可修改 ↓ </text>
    </view>
    <view class="cu-item sm-border no-border" bindtap='changeroles'>
      <view class="bg-blue margin-sm radius-df light shadow-blur" style="min-height: 10vh;width:100%">
      <view class='padding-top-xs padding-left-xs padding-bottom-xs'>
      <view class="cu-tag radius sm text-cut" style='justify-content:left;max-width:50vw;' qq:for='{{showroles}}' qq:key='i' qq:for-index='i' qq:for-item="si">
<text class="cuIcon-title" style='color:{{si.hexcolor}};font-size:50rpx;margin-left:-8px;' qq:if='{{si.hexcolor!="n"}}'></text>
<text class="cuIcon-choicenessfill text-blue" style='margin-right:6px;' qq:else></text>
<text style='margin-left:-2px;'>{{si.name}}</text>
      </view>
      </view>
      </view>
    </view>
  </view>

<view class="cu-list menu sm-border margin-top">
<view class="cu-item sm-border bg-white">
<view class='text-black text-bold'>商品介绍</view>
</view>
</view>
<view class="cu-list menu sm-border margin-top card-menu">
<view class="cu-item sm-border" style='border-radius:20rpx;border: 1px solid gray;'>
<custom-textarea maxlength='500' style="text-align:left;width:100%;" bindinput="onInputArea" value="{{goodsinfo.goodsdesc}}"></custom-textarea>
</view>
</view>

<view class="cu-card case margin" qq:if='{{goodsinfo.descimg}}' bindtap='changeimage' data-type='descimg'>
    <view class="image" style='height:200rpx;width:200rpx;object-fit: cover;overflow:hidden;'>
      <image src="{{goodsinfo.descimg}}" mode='aspectFill'></image>
      <view class="cu-tag bg-black" catchtap='delimg'><text class="cuIcon-delete"></text></view>
    </view>
</view>
<view class='text-xsl' qq:if='{{!goodsinfo.descimg}}' style='text-align:left;margin-left:28rpx;' bindtap='changeimage' data-type='descimg'>
<text class="cuIcon-picfill"></text>
</view>
<view style='height:30rpx;'></view>
</view>



<view style='height:600rpx;'></view>
<view class="bg-white" style="position: fixed; z-index: 1024; bottom: 0; top: auto; left: 0; right: 0">
  <view class="padding">
    <button class="cu-btn block bg-blue margin-tb-sm lg" bindtap="saveall">保存</button>
  </view>
</view>