<view class='cu-load load-modal' qq:if="{{loadModal}}">
  <image src='/images/logo.jpeg' class='png' mode='aspectFit'></image>
  <view class='gray-text'>加载中...</view>
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

  <view class="cu-item sm-border" qq:for="{{rolelist_}}" qq:key='index' catchtap='fclick_' data-index='{{index}}' data-item='{{item}}'>
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
      <view class="cu-bar bg-white" catchtap='stopit'>
      <view class="action text-black" catchtap="hideModalB">取消</view>
      <text class="text-bold text-black text-lg">选择子频道</text>
      <view class="action text-black" catchtap="setchannel">确定</view>
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
  <text class="cuIcon-roundcheckfill text-blue" qq:if='{{item.select}}'></text>
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
      <view class="action text-black"> </view>
      </view>
  </view>
  </view>
  <scroll-view scroll-y catchtap='stopit'>

<view style='height:3vh;'></view>

  <view class="cu-list menu sm-border margin-top">

  <view class="cu-item sm-border" qq:for="{{rolelist}}" qq:key='index' catchtap='fclick' data-index='{{index}}' data-item='{{item}}'>
<view style='display: flex;align-items: center;'>
<text class="cuIcon-title" style='color:{{item.hexcolor}};font-size:50rpx;'></text>
<text class="text-black text-cut" style='max-width:70vw;'>{{item.name}}</text>
</view>
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
      <view class="cu-bar bg-white">
      <view class="action text-black" catchtap="hideModalE">取消</view>
      <text class="text-bold text-black text-lg">选择积分</text>
      <view class="action text-black"> </view>
      </view>
  </view>
  </view>
  <scroll-view scroll-y catchtap='stopit'>

<view style='height:1vh;'></view>

  <view class="cu-list menu sm-border margin-top">

  <view class="cu-item sm-border" qq:for="{{plist}}" qq:key='index' catchtap='kclick' data-index='{{index}}' data-item='{{item}}'>
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



<view class="cu-modal bottom-modal {{modalA=='show' && modalD!='show'?'show':''}}" bindtap="hideModalA">
  <view class="cu-dialog" catchtap="stopit">
  <view class='header-view-top'>
  <view class="header-view">
      <view class="header">
        <view></view>
      </view>
      <view class="cu-bar bg-white" catchtap='stopit'>
      <view class="action text-black" catchtap="hideModalA">取消</view>
      <text class="text-bold text-black text-lg">选择值班人员</text>
      <view class="action text-black" catchtap="tusers">确定</view>
      </view>
  </view>
  </view>
<scroll-view scroll-y style="height:140vh;" bindscrolltolower='fetch_list'>

<view style='height:3vh;'></view>
<view style="text-align: left;">

<view class="cu-bar bg-white">
    <view class="search-form round">
      <text class="cuIcon-search"></text>
      <input type="text" placeholder="搜索昵称" confirm-type="search" bindinput="onSearchInput"></input>
    </view>
  </view>

  <view class="cu-list menu sm-border card-menu margin-top" bindtap='choseRole'>
    <view class="cu-item sm-border arrow">
    <text class='text-bold text-black'>目标身份组</text>
    <view class='text-cut' style='max-width:50vw;'>
    <text class='text-gray'>{{nowgrpname}}</text>
    </view>
    </view>
  </view>

  <view class="cu-list menu sm-border card-menu margin-top">
    <view class="cu-item sm-border" catchtap='selectone' data-index='{{index}}' qq:for="{{userlist}}" qq:key='index' data-item='{{item}}' qq:if='{{item.show}}'>
    <text class="cuIcon-roundcheckfill text-{{item.select?'blue':'gray'}} margin-right-xs"></text>
    <view class="cu-avatar round" style="background-image:url({{item.user.avatar}});"></view>
      <view class="content margin-left-sm text-cut">
        <text class="text-black">{{item.user.username}}</text>
      </view>
    </view>
  </view>

    <view class="cu-list menu sm-border card-menu margin-top" qq:if='{{!complete}}'>
    <view class="text-center">
      <button class="cu-btn bg-blue sm" bindtap="fetch_list">加载更多</button>
    </view>
  </view>
  
  <view class="cu-list menu sm-border card-menu margin-top" qq:if='{{complete}}'>
    <view class="text-center">
      <text class="text-gray">没有更多数据</text>
    </view>
  </view>

  <view class="cu-tabbar-height"></view>
  </view>

</scroll-view>
  </view>
</view>



<scroll-view scroll-y>

<swiper class="tips-swiperitem margin" autoplay="true" vertical="true" circular="true" interval="4000" duration="1000">

    <block>
      <swiper-item catchtouchmove='false'>
        <view class="radius-lg bg-orange light">
          <view class='padding-xs text-xl' style='display:flex;align-items:center;text-align:center;'>
            <text class="text-df text-red">该功能需要给予子频道主动推送消息权限</text>
            <text class='cuIcon-question text-black text-df margin-left' bindtap='jumpdec'></text>
          </view>
        </view>
      </swiper-item>
    </block>

  </swiper>

  <view class="cu-list menu sm-border card-menu margin-top">
    <view class="cu-item sm-border">
      <text class="text-bold text-black">开启值班系统</text>
      <switch class="sm" bindchange="RolesSwitch" checked="{{rolesets.useit}}"></switch>
    </view>
  </view>

<view qq:if='{{rolesets.useit}}'>

  <view class="cu-list menu sm-border card-menu margin-top" bindtap='changechannel' data-target='tochannel'>
    <view class="cu-item sm-border arrow">
      <text class="text-bold text-black text-cut">值班子频道</text>
      <text class="text-gray text-cut" qq:if='{{channelname}}'>{{channelname}}</text>
      <text class="text-gray text-cut" qq:else>必须</text>
    </view>
  </view>

<view class="cu-list menu sm-border card-menu margin-top">
    <view class="cu-item sm-border">
      <text class="text-bold text-black">新任务是否艾特值班人员</text>
      <switch class="sm" bindchange="MentionSwitch" checked="{{rolesets.content.mention}}"></switch>
    </view>
  </view>

  <view class="cu-list menu sm-border card-menu margin-top" qq:if='{{rolesets.content.mention}}'>
<view class="cu-item sm-border">
      <view class="content">
        <text class="text-blue text-bold">@机器人 </text>
        <text class="text-black text-bold">/开始值班</text>
      </view>
      <button class="cu-btn round" bindtap="copycommand" data-c='/开始值班'>复制</button>
    </view>
  <view class="cu-item sm-border">
      <text class="text-gray">开始接受值班任务的艾特提醒
      </text>
  </view>
  </view>

    <view class="cu-list menu sm-border card-menu margin-top" qq:if='{{rolesets.content.mention}}'>
<view class="cu-item sm-border">
      <view class="content">
        <text class="text-blue text-bold">@机器人 </text>
        <text class="text-black text-bold">/结束值班</text>
      </view>
      <button class="cu-btn round" bindtap="copycommand" data-c='/结束值班'>复制</button>
    </view>
  <view class="cu-item sm-border">
      <text class="text-gray">不再接受值班任务的艾特提醒
      </text>
  </view>
  </view>
  <view class='margin-left-sm margin-top-sm'>* 所有值班人员都将有值班权限，与周几无关</view>
  <view class='margin-left-sm'>* 日期设置仅是为了明确人员分组，更好的区分成员个体</view>
  <view class="cu-list menu sm-border card-menu margin-top">
    <view class="cu-item sm-border arrow" bindtap='choseUsers' data-target='u1'>
        <view class="content">
          <text class="text-black text-bold">周一值班人员</text>
        </view>
        <view class="action">
          <view class="cu-avatar-group">
            <view class="cu-avatar round sm" style="background-image:url({{item.avatar}});" qq:for='{{rolesets.content.u1}}' qq:key='index'></view>
          </view>
          <text class="text-grey">可选</text>
        </view>
    </view>
     <view class="cu-item sm-border arrow" bindtap='choseUsers' data-target='u2'>
        <view class="content">
          <text class="text-black text-bold">周二值班人员</text>
        </view>
        <view class="action">
          <view class="cu-avatar-group">
            <view class="cu-avatar round sm" style="background-image:url({{item.avatar}});" qq:for='{{rolesets.content.u2}}' qq:key='index'></view>
          </view>
          <text class="text-grey">可选</text>
        </view>
    </view>
    <view class="cu-item sm-border arrow" bindtap='choseUsers' data-target='u3'>
        <view class="content">
          <text class="text-black text-bold">周三值班人员</text>
        </view>
        <view class="action">
          <view class="cu-avatar-group">
            <view class="cu-avatar round sm" style="background-image:url({{item.avatar}});" qq:for='{{rolesets.content.u3}}' qq:key='index'></view>
          </view>
          <text class="text-grey">可选</text>
        </view>
    </view>
    <view class="cu-item sm-border arrow" bindtap='choseUsers' data-target='u4'>
        <view class="content">
          <text class="text-black text-bold">周四值班人员</text>
        </view>
        <view class="action">
          <view class="cu-avatar-group">
            <view class="cu-avatar round sm" style="background-image:url({{item.avatar}});" qq:for='{{rolesets.content.u4}}' qq:key='index'></view>
          </view>
          <text class="text-grey">可选</text>
        </view>
    </view>
    <view class="cu-item sm-border arrow" bindtap='choseUsers' data-target='u5'>
        <view class="content">
          <text class="text-black text-bold">周五值班人员</text>
        </view>
        <view class="action">
          <view class="cu-avatar-group">
            <view class="cu-avatar round sm" style="background-image:url({{item.avatar}});" qq:for='{{rolesets.content.u5}}' qq:key='index'></view>
          </view>
          <text class="text-grey">可选</text>
        </view>
    </view>
    <view class="cu-item sm-border arrow" bindtap='choseUsers' data-target='u6'>
        <view class="content">
          <text class="text-black text-bold">周六值班人员</text>
        </view>
        <view class="action">
          <view class="cu-avatar-group">
            <view class="cu-avatar round sm" style="background-image:url({{item.avatar}});" qq:for='{{rolesets.content.u6}}' qq:key='index'></view>
          </view>
          <text class="text-grey">可选</text>
        </view>
    </view>
    <view class="cu-item sm-border arrow" bindtap='choseUsers' data-target='u7'>
        <view class="content">
          <text class="text-black text-bold">周天值班人员</text>
        </view>
        <view class="action">
          <view class="cu-avatar-group">
            <view class="cu-avatar round sm" style="background-image:url({{item.avatar}});" qq:for='{{rolesets.content.u7}}' qq:key='index'></view>
          </view>
          <text class="text-grey">可选</text>
        </view>
    </view>
  </view>

  <view class="cu-list menu sm-border card-menu margin-top">
    <view class="cu-item sm-border">
      <text class="text-bold text-black">启用自助解禁申诉页</text>
      <switch class="sm" bindchange="DisbanSwitch" checked="{{rolesets.content.disban.able}}"></switch>
    </view>

    <view class="cu-item sm-border no-border" qq:if='{{rolesets.content.disban.able}}'>
      <text class="text-bold text-black">限制可申诉的身份组（可选）</text>
    </view>

<view class="cu-item sm-border no-border" qq:if='{{rolesets.content.disban.able}}' bindtap='ableroles' data-target='rolesets.content.disban.needroles'>
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

    <view class="cu-item sm-border no-border" qq:if='{{rolesets.content.disban.able}}'>
      <text class="text-blue" catchtap='navigate' data-url='disbanapply'>>>前往自助解禁申诉页</text>
      <text class="text-bold text-blue" catchtap='copylink'>复制申诉页链接</text>
    </view>

    <view class="cu-item sm-border no-border" qq:if='{{rolesets.content.disban.able}}'>
      <text class="text-bold text-black">申诉消耗积分</text>
      <switch class="sm" bindchange="DisbanUSwitch" checked="{{rolesets.content.disban.dep.able}}"></switch>
    </view>

    <view class="cu-item sm-border arrow no-border" bindtap='chosepoint' data-target='rolesets.content.disban.dep.id' qq:if='{{rolesets.content.disban.able && rolesets.content.disban.dep.able}}'>
          <text class="text-black text-bold">积分类型</text>
          <text class="text-gray" qq:if='{{pname}}'>{{pname}}</text>
          <text class="text-gray" qq:else>必须</text>
    </view>

<view class="cu-item sm-border" qq:if='{{rolesets.content.disban.able && rolesets.content.disban.dep.able}}'>
          <view class='flex justify-center align-center'>
        <text class="text-black text-bold margin-right-sm">单次消耗数量</text>
      </view>
      <view class="flex justify-center align-center">
<view class="cu-tag round bg-green sm cuIcon-move margin-top-xs" catchtap="inputcnt" data-type="de" data-target='rolesets.content.disban.dep.number' data-cnt='{{rolesets.content.disban.dep.number}}'></view>
        <view class="margin-lr text-black text-center solids-bottom" style="max-width: 120rpx;">
      <input type="number" value="{{rolesets.content.disban.dep.number}}" placeholder-style="color:#000000" bindinput='inputcnts' data-target='rolesets.content.disban.dep.number' bindblur='finishinputcnt' data-cnt='{{rolesets.content.disban.dep.number}}'></input>
    </view>
        <view class="cu-tag round bg-red sm cuIcon-add margin-top-xs" catchtap="inputcnt" data-type="add" data-target='rolesets.content.disban.dep.number' data-cnt='{{rolesets.content.disban.dep.number}}'></view>
        <text class="text-black text-bold margin-left-sm">点</text>
        </view>

  </view>

  </view>






 <view class="cu-list menu sm-border card-menu margin-top">
    <view class="cu-item sm-border">
      <text class="text-bold text-black">启用用户举报指令</text>
      <switch class="sm" bindchange="ReportSwitch" checked="{{rolesets.content.report.able}}"></switch>
    </view>

    <view class="cu-item sm-border arrow no-border" bindtap='changechannel' data-target='content.report.fixchannel' qq:if='{{rolesets.content.report.able}}'>
      <text class="text-bold text-black text-cut">限制指令使用子频道</text>
      <text class="text-gray text-cut" qq:if='{{channelname_}}'>{{channelname_}}</text>
      <text class="text-gray text-cut" qq:else>可选</text>
    </view>

    <view class="cu-item sm-border no-border" qq:if='{{rolesets.content.report.able}}'>
      <text class="text-bold text-black">限制可用举报指令的身份组（可选）</text>
    </view>

<view class="cu-item sm-border no-border" qq:if='{{rolesets.content.report.able}}' bindtap='ableroles' data-target='rolesets.content.report.needroles'>
      <view class="bg-blue margin-sm radius-df light shadow-blur" style="min-height: 10vh;width:100%">
      <view class='padding-top-xs padding-left-xs padding-bottom-xs'>
      <view class="cu-tag radius sm text-cut" style='justify-content:left;max-width:50vw;' qq:for='{{showroles_}}' qq:key='i' qq:for-index='i' qq:for-item="si">
<text class="cuIcon-title" style='color:{{si.hexcolor}};font-size:50rpx;margin-left:-8px;' qq:if='{{si.hexcolor!="n"}}'></text>
<text class="cuIcon-choicenessfill text-blue" style='margin-right:6px;' qq:else></text>
<text style='margin-left:-2px;'>{{si.name}}</text>
      </view>
      </view>
      </view>
    </view>

    <view class="cu-item sm-border no-border" qq:if='{{rolesets.content.report.able}}'>
      <text class="text-bold text-black">有效举报奖励积分</text>
      <switch class="sm" bindchange="ReportUSwitch" checked="{{rolesets.content.report.enp.able}}"></switch>
    </view>

    <view class="cu-item sm-border arrow no-border" bindtap='chosepoint' data-target='rolesets.content.report.enp.id' qq:if='{{rolesets.content.report.able && rolesets.content.report.enp.able}}'>
          <text class="text-black text-bold">积分类型</text>
          <text class="text-gray" qq:if='{{pname_}}'>{{pname_}}</text>
          <text class="text-gray" qq:else>必须</text>
    </view>

<view class="cu-item sm-border no-border" qq:if='{{rolesets.content.report.able && rolesets.content.report.enp.able}}'>
          <view class='flex justify-center align-center'>
        <text class="text-black text-bold margin-right-sm">奖励数量</text>
      </view>
      <view class="flex justify-center align-center">
<view class="cu-tag round bg-green sm cuIcon-move margin-top-xs" catchtap="inputcnt" data-type="de" data-target='rolesets.content.report.enp.number' data-cnt='{{rolesets.content.report.enp.number}}'></view>
        <view class="margin-lr text-black text-center solids-bottom" style="max-width: 120rpx;">
      <input type="number" value="{{rolesets.content.report.enp.number}}" placeholder-style="color:#000000" bindinput='inputcnts' data-target='rolesets.content.report.enp.number' bindblur='finishinputcnt' data-cnt='{{rolesets.content.report.enp.number}}'></input>
    </view>
        <view class="cu-tag round bg-red sm cuIcon-add margin-top-xs" catchtap="inputcnt" data-type="add" data-target='rolesets.content.report.enp.number' data-cnt='{{rolesets.content.report.enp.number}}'></view>
        <text class="text-black text-bold margin-left-sm">点</text>
        </view>
  </view>
  <view class="cu-item sm-border" qq:if='{{rolesets.content.report.able}}'>
      <view class="content">
        <text class="text-blue text-bold">@机器人 </text>
        <text class="text-black text-bold">/举报</text>
      </view>
      <button class="cu-btn round" bindtap="copycommand" data-c='/举报'>复制</button>
    </view>
  <view class="cu-item sm-border" qq:if='{{rolesets.content.report.able}}'>
      <text class="text-gray">举报单条消息或提交证据进行举报
      
      两种用法：
      1. 回复欲举报的消息，而后仅带上 /举报 二字
      2. /举报 xxx理由 [截图][截图] 可提交证据进行举报

      第一种用法可推送【被举报者】，值班员可快捷处理
      第二种用法仅推送举报内容以及【举报者】
      </text>
  </view>
  </view>



<view style='height:18vh;'></view>

</view>

</scroll-view>


<view class="bg-white" style="position:fixed;z-index:1024;bottom: 0;top:auto;left:0;right:0;">
<view class="padding">
<button class="cu-btn block bg-blue margin-tb-sm lg" bindtap='saveall'>保存</button>
</view>
</view>


