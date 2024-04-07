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

<swiper class="tips-swiperitem margin" autoplay="true" vertical="true" circular="true" interval="4000" duration="1000" qq:if='{{rolesets.task_type}}'>

    <block>
      <swiper-item catchtouchmove='false'>
        <view class="radius-lg bg-orange light">
          <view class='padding-xs text-xl'>
            <text class='cuIcon-info text-blue'></text>
            <text class="text-df text-blue" qq:if='{{rolesets.task_type=="0"}}'> 定时任务状态：审核通过</text>
            <text class="text-df text-green" qq:if='{{rolesets.task_type=="1"}}'> 定时任务状态：审核中</text>
            <text class="text-df text-red" qq:if='{{rolesets.task_type=="2"}}'> 定时任务状态：审核不通过</text>
          </view>
        </view>
      </swiper-item>
    </block>

  </swiper>

<view class="cu-modal bottom-modal {{modal=='show'?'show':''}}" bindtap="hideModal">
  <view class="cu-dialog" catchtap="stopit">
    <view class="header-view-top">
      <view class="header-view">
        <view class="header">
          <view></view>
        </view>
        <view class="cu-bar bg-white" catchtap="stopit">
          <view class="action text-black" catchtap="hideModal">取消</view>
          <text class="text-bold text-black text-lg">注意保存设置内容</text>
          <view class="action text-black" catchtap="savesets">确定</view>
        </view>
      </view>
    </view>
    <scroll-view scroll-y>
      <view style="height:1vh;"></view>
      <view class="cu-bar bg-white flex padding justify-between">
        <button class="cu-btn bg-blue sm" catchtap="selectall">全选</button>
        <button class="cu-btn bg-blue sm" catchtap="cancleall">全不选</button>
      </view>
      <view class="cu-list menu sm-border margin-top">
        <view class="cu-item sm-border" qq:for="{{nowcronset}}" qq:key="index" catchtap="_pclick" data-index="{{index}}">
          <view style="display: flex; align-items: center">
            <text class="cuIcon-time" style="color:{{item.hexcolor}};font-size:50rpx;"></text>
            <text class="text-black margin-left-sm">{{item.name}}</text>
          </view>
            <text class="cuIcon-roundcheckfill text-blue text-xxl" qq:if="{{item.select}}"></text>
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
          <text class="text-bold text-black text-lg">选择通知子频道</text>
          <view class="action text-black" catchtap="setchannel">确定</view>
        </view>
      </view>
    </view>
    <scroll-view scroll-y catchtap="stopit">
      <view class="cu-list menu sm-border margin-top">
        <view class="cu-item sm-border" qq:for="{{channellist}}" qq:key="index" catchtap="{{item.type!=4?'pclick':'stopit'}}" data-index="{{index}}" data-item="{{item}}">
          <text qq:if="{{item.type==4}}" class="cuIcon-triangledownfill"><text class="text-black margin-left-xs">{{item.name}}</text></text>
          <view qq:if="{{item.type!=4}}" class='margin-left'>
            <text qq:if="{{item.type==0 && item.sub_type==0}}" class="cuIcon-comment"><text class="text-black margin-left-xs">{{item.name}}</text></text>
            <text qq:if="{{item.type==0 && item.sub_type==1}}" class="cuIcon-notification"><text class="text-black margin-left-xs">{{item.name}}</text></text>
          </view>

            <text class="cuIcon-roundcheckfill text-blue" qq:if="{{item.select}}"></text>
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
        <view qq:if="{{tmpimg}}" class="cu-tag bg-black" catchtap="delimg"><text class="cuIcon-delete"></text></view>
        <swiper-item class="cur">
          <view class="swiper-item">
            <image src="{{tmpimg}}" mode="aspectFill"></image>
          </view>
        </swiper-item>
      </swiper>

      <view class="padding bg-white">
        <text class="text-gray text-lg bg-white" qq:if="{{tmpimg}}">点击图片上传修改</text>
        <text class="text-gray text-lg bg-white" qq:if="{{!tmpimg}}">点击空白区域选择图片</text>
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
      <view style="height:3vh;"></view>

      <view class="cu-list menu sm-border card-menu margin-top">
        <view class="cu-item sm-border bg-white">
          <custom-textarea maxlength="500" style="text-align: left;width:100%;{{modalB=='show'?'':'display:none;'}}" bindinput="onInput" value="{{tmpct}}" cursor-spacing='80' show-confirm-bar='{{false}}'></custom-textarea>
        </view>
      </view>
      <view style="height: 3vh"></view>
      <view class="text-gray" style="text-align: left; margin-left: 30rpx">此处不支持插入子频道</view>
      <view class="text-gray" style="text-align: left; margin-left: 30rpx">请勿插入链接，否则无法过审</view>
      <view class="text-gray" style="text-align: left; margin-left: 30rpx">请勿插入不良信息，一经发现永久禁止使用</view>
      <view class="text-gray" style="text-align: left; margin-left: 30rpx">并将后台证据提交至官方审查</view>
<view style='height:2vh;'></view>
<view class="text-gray" style="text-align: left;margin-left:30rpx;">点击以下变量可插入</view>
<view class="text-blue" style="text-align: left;margin-left:30rpx;font-size:34rpx;" bindtap='addc' data-c='a'>{{'<OR> 分割多条文本内容，随机发送'}}</view>
<view class="text-blue" style="text-align: left;margin-left:30rpx;font-size:34rpx;" bindtap='addc' data-c='b'>@everyone 艾特全体成员</view>
<view class="text-blue" style="text-align: left;margin-left:30rpx;font-size:34rpx;" bindtap='navigate_face' qq:if='{{rolesets.markdown=="0"}}'><text class='cuIcon-emojifill text-yellow'></text> 小黄豆表情</view>
<view style='height:2vh;'></view>
<view class="text-gray" style="text-align: left;margin-left:30rpx;" qq:if='{{rolesets.markdown=="1"}}'>支持以下markdown语法，点击插入，其他语法暂不支持</view>
<view class="text-blue" style="text-align: left;margin-left:30rpx;font-size:34rpx;" bindtap='addc' data-c='ma' qq:if='{{rolesets.markdown=="1"}}'>- - - 分割线</view>
<view class="text-blue" style="text-align: left;margin-left:30rpx;font-size:34rpx;" bindtap='addc' data-c='mb' qq:if='{{rolesets.markdown=="1"}}'>> 块引用</view>
<view class="text-blue" style="text-align: left;margin-left:30rpx;font-size:34rpx;" bindtap='addc' data-c='mc' qq:if='{{rolesets.markdown=="1"}}'># 标题</view>
<view class="text-blue" style="text-align: left;margin-left:30rpx;font-size:34rpx;" bindtap='addc' data-c='md' qq:if='{{rolesets.markdown=="1"}}'>- 无序列表</view>
<view class="text-blue" style="text-align: left;margin-left:30rpx;font-size:34rpx;" bindtap='addc' data-c='me' qq:if='{{rolesets.markdown=="1"}}'>1. 有序列表</view>
<view style='height:3vh;'></view>

      <view style="height: 100vh"></view>
    </scroll-view>
  </view>
</view>

<scroll-view scroll-y>
  <view class="cu-list menu sm-border card-menu margin-top">
    <view class="cu-item sm-border">
      <text class="text-bold text-black">开启定时全员禁言</text>
      <switch class="sm" bindchange="RolesSwitch" data-target='rolesets.useit' checked="{{rolesets.useit=='1'}}"></switch>
    </view>
  </view>

  <view qq:if="{{rolesets.useit=='1'}}">
    <view class="cu-list menu sm-border card-menu margin-top" bindtap="changeimage">
      <view class="cu-item sm-border arrow">
        <text class="text-bold text-black">通知图片设置</text>
        <view style="width: 300rpx; height: 60rpx; overflow: hidden" qq:if="{{rolesets.image}}">
          <image src="{{rolesets.image}}" mode="aspectFill"></image>
        </view>
        <text class="text-gray" qq:else>可选</text>
      </view>
    </view>

    <view class="cu-list menu sm-border card-menu margin-top" bindtap="setdesc" data-target="rolesets.content">
      <view class="cu-item sm-border arrow">
        <text class="text-bold text-black">通知文本设置</text>
        <text class="text-gray">可选</text>
      </view>
      <view class="cu-item sm-border" qq:if="{{rolesets.content}}">
      <view style='width: 100%;word-wrap: break-word;'>
        <text class="text-gray">{{rolesets.content}} </text>
      </view>
      </view>
    </view>

  <view class="cu-list menu sm-border card-menu margin-top">
    <view class="cu-item sm-border">
      <text class="text-bold text-black">使用markdown格式发送</text>
      <switch class="sm" bindchange="RolesSwitch" data-target='rolesets.markdown' checked="{{rolesets.markdown=='1'}}"></switch>
    </view>
    <view class="cu-item sm-border">
      <text class="text-bold text-black">将图文分开发送</text>
      <switch class="sm" bindchange="RolesSwitch" data-target='rolesets.imgtextdp' checked="{{rolesets.imgtextdp=='1'}}"></switch>
    </view>
  </view>

    <view class="cu-list menu sm-border card-menu margin-top" bindtap="chosechannel">
      <view class="cu-item sm-border arrow">
        <text class="text-bold text-black">禁言通知子频道</text>
        <text class="text-gray">{{channelname==''?'可选':channelname}}</text>
      </view>
    </view>

    <view class="cu-list menu sm-border card-menu margin-top">
      <view class="cu-item sm-border">
        <text class="text-bold text-black">禁言时长（点击灰字修改）</text>
        <picker mode="multiSelector" range="{{daterange}}" bindchange="bindMultiPickerChange" data-item="{{item}}">
          <text class="text-gray">{{rolesets.editors}}</text>
        </picker>
      </view>
    </view>

    <view class="cu-list menu sm-border card-menu margin-top">
      <view class="cu-item sm-border arrow" data-index="0" bindtap="setcronru">
        <text class="text-bold text-black">定时器设置_分钟</text>
        <text class="text-gray" qq:if="{{cronanalyze[0]=='*'}}">每一分钟</text>
        <view class="text-cut" style="max-width: 40vw" qq:else>
          <text class="text-gray">{{'每当第'+cronanalyze[0]+'分钟'}}</text>
        </view>
      </view>
      <view class="cu-item sm-border arrow" data-index="1" bindtap="setcronru">
        <text class="text-bold text-black">定时器设置_小时</text>
        <text class="text-gray" qq:if="{{cronanalyze[1]=='*'}}">每个小时</text>
        <view class="text-cut" style="max-width: 40vw" qq:else>
          <text class="text-gray">{{'每当第'+cronanalyze[1]+'小时'}}</text>
        </view>
      </view>
      <view class="cu-item sm-border arrow" data-index="2" bindtap="setcronru">
        <text class="text-bold text-black">定时器设置_日期</text>
        <text class="text-gray" qq:if="{{cronanalyze[2]=='*'}}">每一日</text>
        <view class="text-cut" style="max-width: 40vw" qq:else>
          <text class="text-gray">{{'每当第'+cronanalyze[2]+'日'}}</text>
        </view>
      </view>
      <view class="cu-item sm-border arrow" data-index="3" bindtap="setcronru">
        <text class="text-bold text-black">定时器设置_月份</text>
        <text class="text-gray" qq:if="{{cronanalyze[3]=='*'}}">每个月</text>
        <view class="text-cut" style="max-width: 40vw" qq:else>
          <text class="text-gray">{{'每当第'+cronanalyze[3]+'月'}}</text>
        </view>
      </view>
      <view class="cu-item sm-border arrow" data-index="4" bindtap="setcronru">
        <text class="text-bold text-black">定时器设置_周几</text>
        <text class="text-gray" qq:if="{{cronanalyze[4]=='*'}}">每周一到周日</text>
        <view class="text-cut" style="max-width: 40vw" qq:else>
          <text class="text-gray">{{'每周'+cronanalyze[4]}}</text>
        </view>
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
