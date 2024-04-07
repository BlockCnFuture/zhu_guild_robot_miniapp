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
  <view class='header-view-top'>
  <view class="header-view">
      <view class="header">
        <view></view>
      </view>
      <view class="cu-bar bg-white" catchtap='stopit'>
      <view class="action text-black" catchtap="hideModalA">取消</view>
      <text class="text-bold text-black text-lg">选择子频道</text>
      <view class="action text-black" catchtap="{{nowtarget==''?'setchannel':''}}">{{nowtarget==''?'确定':''}}</view>
      </view>
  </view>
  </view>
  <scroll-view scroll-y catchtap='stopit'>
  <view class="cu-list menu sm-border margin-top">
  <view class="cu-item sm-border" qq:for="{{nowtarget==''?channellist:channellist_}}" qq:key='index' catchtap="{{item.type!=4?'pclick':'stopit'}}" data-index='{{index}}' data-item='{{item}}'>
<text qq:if='{{item.type==4}}' class="cuIcon-triangledownfill"><text class="text-black margin-left-xs">{{item.name}}</text></text>
<view qq:if='{{item.type!=4}}' class="margin-left">
<text qq:if='{{item.type==0 && item.sub_type==0}}' class="cuIcon-comment"><text class="text-black margin-left-xs">{{item.name}}</text></text>
<text qq:if='{{item.type==0 && item.sub_type==1}}' class="cuIcon-notification"><text class="text-black margin-left-xs">{{item.name}}</text></text>
<text qq:if='{{item.type==2}}' class="cuIcon-voice"><text class="text-black margin-left-xs">{{item.name}}</text></text>
<text qq:if='{{item.type==10005}}' class="cuIcon-record"><text class="text-black margin-left-xs">{{item.name}}</text></text>
<text qq:if='{{item.type==10006}}' class="cuIcon-apps"><text class="text-black margin-left-xs">{{item.name}}</text></text>
<text qq:if='{{item.type==10007}}' class="cuIcon-edit"><text class="text-black margin-left-xs">{{item.name}}</text></text>
  </view>
  <text class="cuIcon-roundcheckfill text-blue" qq:if='{{item.select}}'></text>
  </view>
  </view>
  </scroll-view>
  </view>
</view>




<view class="cu-modal bottom-modal {{modalG=='show'?'show':''}}" bindtap="hideModalG">
  <view class="cu-dialog" catchtap="stopit">
  <view class='header-view-top'>
  <view class="header-view">
      <view class="header">
        <view></view>
      </view>
      <view class="cu-bar bg-white" catchtap='stopit'>
      <view class="action text-black" catchtap="hideModalG">取消</view>
      <text class="text-bold text-black text-lg">选择通知模板</text>
      <view class="action text-black"> </view>
      </view>
  </view>
  </view>
  <scroll-view scroll-y catchtap='stopit'>
  <view class="cu-list menu sm-border margin-top">

  <view class="cu-item sm-border" bindtap='CtypeA'>
<text class="text-black margin-left-xs">模板1</text>
<text class="text-black margin-left-xs">简洁模板</text>
  </view>

    <view class="cu-item sm-border" bindtap='CtypeB'>
<text class="text-black margin-left-xs">模板2</text>
<text class="text-black margin-left-xs">内容更丰富</text>
  </view>

  </view>
  </scroll-view>
  </view>
</view>



<view class="cu-modal bottom-modal {{modalE=='show'?'show':''}}" bindtap="hideModalE">
  <view class="cu-dialog" catchtap="stopit">
  <view class='header-view-top'>
  <view class="header-view">
      <view class="header">
        <view></view>
      </view>
      <view class="cu-bar bg-white" catchtap='stopit'>
      <view class="action text-black" catchtap="hideModalE">取消</view>
      <text class="text-bold text-black text-lg">设置封面图</text>
      <view class="action text-black"> </view>
      </view>
  </view>
  </view>
  <scroll-view scroll-y catchtap='stopit'>
<view style="height:3vh;"></view>

<swiper class="card-swiper square-dot bg-white" indicator-dots="true" circular="true" autoplay="true" interval="5000" duration="500" bindchange="cardSwiper" indicator-color="#8799a3" indicator-active-color="#0081ff" bindtap='choseoneimg'>
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
<button class="cu-btn block bg-blue margin-tb-sm lg" bindtap='uploadImage'>上传</button>
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
      <view class="cu-bar bg-white" catchtap='stopit'>
      <view class="action text-black" catchtap="hideModalB">取消</view>
      <text class="text-bold text-black text-lg">设置内容</text>
      <view class="action text-black" catchtap="setcontent">确定</view>
      </view>
  </view>
  </view>
  <scroll-view scroll-y catchtap='stopit'>
<view style="height:3vh;"></view>
<view class="cu-list menu sm-border card-menu margin-top">
<view class="cu-item sm-border bg-white">

<custom-textarea maxlength='800' style="text-align: left;width:100%;{{modalB=='show'?'':'display:none;'}}" bindinput="onInput" value="{{tmpct}}" cursor-spacing='80' show-confirm-bar='{{false}}'></custom-textarea>
  </view>
  </view>
<view style="height:3vh;"></view>
  <view class="text-gray" style="text-align: left;margin-left:30rpx;">支持以下markdown语法，点击插入，其他语法暂不支持</view>
<view class="text-blue" style="text-align: left;margin-left:30rpx;font-size:34rpx;" bindtap='addc' data-c='ma'>- - - 分割线</view>
<view class="text-blue" style="text-align: left;margin-left:30rpx;font-size:34rpx;" bindtap='addc' data-c='mb'>> 块引用</view>
<view class="text-blue" style="text-align: left;margin-left:30rpx;font-size:34rpx;" bindtap='addc' data-c='mc'># 标题</view>
<view class="text-blue" style="text-align: left;margin-left:30rpx;font-size:34rpx;" bindtap='addc' data-c='md'>- 无序列表</view>
<view class="text-blue" style="text-align: left;margin-left:30rpx;font-size:34rpx;" bindtap='addc' data-c='me'>1. 有序列表</view>
<view style='height:3vh;'></view>

  <view class="text-gray" style="text-align: left;margin-left:30rpx;">输入#可插入子频道，点击以下变量可插入</view>
<view class="text-blue" style="text-align: left;margin-left:30rpx;font-size:34rpx;" bindtap='addc' data-c='a'>{时间} 用户加入时间</view>
<view class="text-blue" style="text-align: left;margin-left:30rpx;font-size:34rpx;" bindtap='addc' data-c='b'>{昵称} 新用户昵称</view>
<view class="text-blue" style="text-align: left;margin-left:30rpx;font-size:34rpx;" bindtap='addc' data-c='c'>{id} 新用户的id</view>
<view class="text-blue" style="text-align: left;margin-left:30rpx;font-size:34rpx;" bindtap='addc' data-c='d'>{艾特} 艾特新用户</view>
<view class="text-blue" style="text-align: left;margin-left:30rpx;font-size:34rpx;" bindtap='addc' data-c='e'>{计数} 今天第几个加入的用户</view>
<view class="text-blue" style="text-align: left;margin-left:30rpx;font-size:34rpx;" bindtap='addc' data-c='f' qq:if='{{showhead}}'>{头像} 用户的头像，可选，默认在文本最左边</view>



  <view class="text-gray" style="text-align: left;margin-left:30rpx;">请勿插入链接，否则无法过审</view>
  <view class="text-gray" style="text-align: left;margin-left:30rpx;">请勿插入不良信息，一经发现永久禁止使用</view>
  <view class="text-gray" style="text-align: left;margin-left:30rpx;">并将后台证据提交至官方审查</view>
  <view style='height:100vh;'></view>
  </scroll-view>
  </view>
</view>



<scroll-view scroll-y>
  <view class="cu-list menu sm-border card-menu margin-top">
    <view class="cu-item sm-border">
      <text class="text-bold text-black">开启新人加入通知</text>
      <switch class="sm" bindchange="RolesSwitch" checked="{{rolesets.useit}}"></switch>
    </view>
  </view>

  <view qq:if="{{rolesets.useit}}">

        <view class="cu-list menu sm-border card-menu margin-top" bindtap='chosechannel'>
      <view class="cu-item sm-border arrow">
        <text class="text-bold text-black">通知发送子频道</text>
        <text class="text-gray">{{channelname==''?'用来发送新人通知的子频道':channelname}}</text>
      </view>
    </view>

        <view class="cu-list menu sm-border card-menu margin-top" bindtap="navigate" data-url="roles">
      <view class="cu-item sm-border arrow">
        <text class="text-bold text-black">设置自助领取身份组规则</text>
        <text class="text-bold text-gray">可选</text>
      </view>
    </view>

    <view class="cu-list menu sm-border card-menu margin-top" bindtap="navigate" data-url="newmemberset">
      <view class="cu-item sm-border arrow">
        <text class="text-bold text-black">编辑新人加入后设置</text>
        <text class="text-bold text-gray">可选</text>
      </view>
    </view>

      <view class="cu-list menu sm-border card-menu margin-top">
    
    <view class="cu-item sm-border arrow" bindtap='chosetype'>
        <text class="text-black text-bold">通知内容</text>
        <text class="text-bold text-gray">{{preshowtype==0?'模板1':'模板2'}}</text>
    </view>
            <view class="cu-item sm-border" bindtap='chosetype'>
            <view style='width: 100%;word-wrap: break-word;'>
            <text class="text-gray">↓ 点击下方的预览可修改数据
            </text>
            </view>
      </view>
  </view>


<view class="margin-sm radius-lg" qq:if='{{preshowtype==0}}'>
<view class="cu-list menu sm-border card-menu margin-top bg-white">
<view class="cu-card case margin" bindtap='changeimage'>
    <view class="image">
      <image src="{{rolesets.image}}" mode='aspectFit' bindload='loaded' style="max-height:{{height}}px;"></image>
    </view>
</view>

<view class="bg-white sm-border solid-bottom" style='padding: 0 30rpx 20rpx 30rpx;' bindtap='setdesc' data-target='rolesets.content'>
<text class="text-black" style='white-space:pre-wrap;overflow-wrap:break-word;'>{{rolesets.content}}</text>
</view>

</view>
</view>


  
<view class="margin-sm radius-lg" qq:if='{{preshowtype!=0}}'>
<view class="cu-list menu sm-border card-menu margin-top bg-white">
<view class="cu-card case margin" bindtap='changeimage'>
    <view class="image">
      <image src="{{rolesets.image}}" mode='aspectFit' bindload='loaded' style="max-height:{{height}}px;"></image>
    </view>
</view>

<view class="bg-white sm-border solid-bottom" style='padding: 0 30rpx 20rpx 30rpx;' bindtap='setdesc' data-target='rolesets.content.content'>
<view class="cu-avatar radius" style="background-image:url({{userinfo.member_head}});height:18px;width:18px;margin-right:6px;"></view>
<text class="text-black" style='white-space:pre-wrap;overflow-wrap:break-word;'>{{rolesets.content.content}}</text>
</view>

<view class="bg-white sm-border" style='padding: 20rpx 30rpx;' bindtap='setdesc' data-target='rolesets.content.t1'>
<text class="text-black" style='white-space:pre-wrap;overflow-wrap:break-word;'>{{rolesets.content.t1}}</text>
</view>
<view class="bg-white sm-border solid-bottom" style='padding: 0 30rpx;'>
    <view style='border-left:2px solid #ccc;padding:10rpx;margin:0;border-t: 1rpx solid #ddd;background-color:rgba(247,249,250,1);width:100%;' bindtap='setdesc' data-target='rolesets.content.c1'>
  <view>
  <text class='text-grey' style='white-space:pre-wrap;overflow-wrap:break-word;'>{{rolesets.content.c1}}</text>
</view>
</view>
<view style='height:20rpx;'></view>
</view>

<view class="bg-white sm-border" style='padding: 20rpx 30rpx;' bindtap='setdesc' data-target='rolesets.content.t2'>
<text class="text-black" style='white-space:pre-wrap;overflow-wrap:break-word;'>{{rolesets.content.t2}}</text>
</view>
<view class="bg-white sm-border solid-bottom" style='padding: 0 30rpx;'>
    <view style='border-left:2px solid #ccc;padding:10rpx;margin:0;border-t: 1rpx solid #ddd;background-color:rgba(247,249,250,1);width:100%;' bindtap='setdesc' data-target='rolesets.content.c2'>
  <view>
  <view class='text-grey' style='white-space:pre-wrap;overflow-wrap:break-word;'>{{rolesets.content.c2}}</view>
</view>
</view>
<view style='height:20rpx;'></view>
</view>

<view class="bg-white sm-border solid-bottom" style='padding: 20rpx 30rpx 0rpx 30rpx;'>
    <view style='border-left:2px solid #ccc;padding:10rpx;margin:0;border-t: 1rpx solid #ddd;background-color:rgba(247,249,250,1);width:100%;' bindtap='setdesc' data-target='rolesets.content.c3'>
  <view>
  <view class='text-grey' style='white-space:pre-wrap;overflow-wrap:break-word;'>{{rolesets.content.c3}}</view>
</view>
</view>
<view style='height:20rpx;'></view>
</view>

<view class="bg-white sm-border" style='padding: 20rpx 30rpx;' bindtap='setdesc' data-target='rolesets.content.c4'>
<text class="text-black" style='white-space:pre-wrap;overflow-wrap:break-word;'>{{rolesets.content.c4}}</text>
</view>

</view>
</view>




    <view class="margin" style="text-align: left;">
  <view class="margin-top bg-white padding radius-lg">
    <view class="text-sm text-black">说明：</view>
    <view class="text-gray text-sm padding-top-xs">为防止刷屏，通知具有10s的CD</view>
  </view>
</view>

  </view>
  <view style="height:16vh;"></view>
</scroll-view>


<view class="bg-white" style="position:fixed;z-index:1024;bottom: 0;top:auto;left:0;right:0;">
<view class="padding">
<button class="cu-btn block bg-blue margin-tb-sm lg" bindtap='saveall'>保存</button>
</view>
</view>