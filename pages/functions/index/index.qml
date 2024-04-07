<view class="cu-load load-modal" qq:if="{{loadModal}}">
  <image src="/images/logo.jpeg" class="png" mode="aspectFit"></image>
  <view class="gray-text">加载中...</view>
</view>

<view class="cu-modal bottom-modal {{modalA=='show'?'show':''}}" bindtap="hideModalA">
  <view class="cu-dialog" catchtap="stopit">
    <view class="header-view-top">
      <view class="header-view">
        <view class="header">
          <view></view>
        </view>
        <view class="cu-bar bg-white" catchtap="stopit">
          <view class="action text-black"> </view>
          <text class="text-bold text-black text-lg">选择切换的频道</text>
          <view class="action text-black"> </view>
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
        bindtap="change"
        data-item="{{item}}"
      >
        <view class="cu-item sm-border">
          <view style="display: flex; align-items: center">
            <view class="cu-avatar round lg margin-top-sm margin-bottom-sm" style="background-image:url({{item.guildhead}});" catchtap="ViewImage" data-url='{{item.guildhead}}'>
              <text class="badge" style="position: absolute; bottom: -5px; right: -5px; background-color: blue; color: white; font-size: 12px; padding: 2px 6px; border-radius: 100%">#</text>
            </view>
            <text class="text-black text-bold margin text-cut text-lg" style="max-width: 60vw;">{{item.guildname}}</text>
            <text class="text-grey text-cut" style="max-width:80vw;position:absolute;bottom:0px; left:140rpx;padding:2px 4px;">{{item.guilddesc}}</text>
            <text
              class="badge"
              style="position: absolute; bottom: -5px; right: -5px; background-color: red; color: white; font-size: 12px; padding: 2px 4px; border-radius: 50%"
              qq:if='{{item.guildrole=="2"}}'
              >频道主</text>
            <text class="badge" style="position: absolute; bottom: -5px; right: -5px; background-color: green; color: white; font-size: 12px; padding: 2px 4px; border-radius: 50%" qq:if='{{item.guildrole!="2" && item.ps>0}}'
              >拥有{{item.ps}}个后台权限</text>
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

<scroll-view scroll-y class="cu-drawer-page {{modalName=='viewModal'?'show':''}}">
    <view>
    <view class="UCenter-bg" style="background-image: url({{userinfo.guild_bg}});">
<view>
  <button class="cu-btn bg-blue sm round" style='position:relative;right:220rpx;text-align:right;' bindtap="navigate" data-url="people"><text class='text-bold' decode='true'>&emsp;&emsp;&emsp;个人中心</text></button>
      <image src="{{userinfo.guild_head}}" class="cu-avatar round lg" bindtap="ViewImage" data-url='{{userinfo.guild_head}}'></image>
  <button class="cu-btn bg-red sm round" style='position:relative;left:220rpx;text-align:left;' bindtap="navigate" data-url="updatelogs"><text class='text-bold' decode='true'>更新日志&emsp;&emsp;&emsp;</text></button>
</view>
      <view style="display: flex; align-items: center">
        <text class="text-xl margin-top-sm text-black text-bold text-shadow">{{userinfo.guild_name}}</text>
        <button class="margin-top-sm margin-left-sm cu-btn round sm bg-green" bindtap="changeguild">
          <text class="text-white text-bold text-lg">⇄</text>
        </button>
      </view>
      <view class="margin-top-sm" style="display: flex; align-items: center" qq:if="{{userinfo.open_guild_id}}">
        <text class="text-black text-bold text-shadow">频道id: {{userinfo.open_guild_id}} </text>
        <button class="cu-btn text-bold text-white round sm bg-green margin-left-sm" bindtap="copyid">复制</button>
      </view>
      <text class="text-green text-bold text-shadow" qq:if='{{userinfo.exptime}}'>过期日: {{userinfo.exptime}} </text>
    </view>
  </view>

<view class="cu-bar bg-white margin" style='border-radius:100rpx;'>
    <view class="search-form round">
      <text class="cuIcon-search"></text>
      <input type="text" placeholder="搜索 页面名 | 页面描述" confirm-type="search" bindinput="onSearchInput"></input>
    </view>
</view>

<view bindtouchstart="ListTouchStart" bindtouchmove="ListTouchMove" bindtouchend="ListTouchEnd">

  <view class="cu-list menu sm-border card-menu margin-top" qq:if='{{historypages.length>0}}'>
    <text>最近使用</text>
  </view>
  <view class="cu-list menu sm-border card-menu margin-top" qq:if='{{historypages.length>0}}'>
    <view class="cu-item sm-border arrow" qq:for='{{historypages}}' qq:key='i' qq:for-item='si' bindtap="navigate" data-url="{{si.url}}" data-item='{{si}}'>
      <view class="content">
        <text class="text-black text-bold">{{si.name}}</text>
      </view>
      <text class="text-grey" qq:if='{{si.desc}}'>{{si.desc}}</text>
    </view>
  </view>


  <view qq:for='{{indexpagelist}}' qq:key='index' qq:if='{{!item.hiden}}'>
  <view class="cu-list menu sm-border card-menu margin-top">
    <text>{{item.group}}</text>
  </view>
  <view class="cu-list menu sm-border card-menu margin-top">
    <view class="cu-item sm-border arrow" qq:for='{{item.pages}}' qq:key='i' qq:for-item='si' bindtap="navigate" data-url="{{si.url}}" data-item='{{si}}' qq:if='{{!si.hiden}}'>
      <view class="content">
        <text class="text-black text-bold">{{si.name}}</text>
      </view>
      <text class="text-grey" qq:if='{{si.desc}}'>{{si.desc}}</text>
    </view>
  </view>
  </view>
</view>


  <view style="height: 3vh"></view>
  
<view class="margin-top-sm" style='{{showad?"":"display:none;"}}'>
  <ad unit-id="d058336e9ac992d615e8362967d7ddf0" binderror="aderr" bindload="adsucc"></ad>
</view>

</scroll-view>

<view class="cu-drawer-close {{modalName=='viewModal'?'show':''}}" bindtap="hideModal">
  <text class="cuIcon-pullright"></text>
</view>

<scroll-view scroll-y class="cu-drawer-window {{modalName=='viewModal'?'show':''}}">
  <scroll-view class="">
  <view bindtouchstart="ListTouchStart" bindtouchmove="ListTouchMove" bindtouchend="ListTouchEnd">
    <view class="bg-white">
      <view class="flex padding">
        <view class="padding-lr-xs">
          <view class="cu-avatar lg round" style="background-image:url({{userinfo.member_head}});" bindtap="ViewImage" data-url='{{userinfo.member_head}}'> </view>
        </view>
        <view class="padding-xs text-xl text-black">
          <view class="text-cut" style="max-width: 50vw">{{userinfo.member_nick}}</view>
          <view class="text-gray" bindtap="copyuid" data-id="{{userinfo.member_userid}}">{{userinfo.member_userid}}</view>
        </view>
      </view>
    </view>

    <view class="cu-list grid col-3 no-border padding-lr-xs radius-lg-bottom">
      <view class="cu-item">
        <view class="text-black text-bold text-xxl"> {{userinfo.points.workdays}} </view>
        <text>累计打卡天数</text>
      </view>
      <view class="cu-item">
        <view class="text-black text-bold text-xxl"> {{userinfo.points.cot_workdays}} </view>
        <text>连续打卡天数</text>
      </view>
      <view class="cu-item">
        <view class="text-black text-bold text-xxl"> {{userinfo.points.warning_counts}} </view>
        <text>被警告次数</text>
      </view>
    </view>
    <view class="margin-top-sm padding-lr-xs" qq:if='{{adminguildid=="647046823986013702" && canviewad}}'>
      <view class="bg-brown light radius-lg shadow-blur">
        <view class="flex padding-tb-sm padding-lr-sm justify-between">
          <view class="padding-xs">
            <view>每日看广告激励视频 免费续期频道</view>
          </view>
          <view class="">
            <view class="cu-btn round bg-black" bindtap="watchvideo">看视频</view>
          </view>
        </view>
      </view>
    </view>
    <view class="cu-bar margin-lr-xs margin-top-sm grid col-4 no-border bg-white radius-lg-top">
      <view class="action">
        <text class="text-xl text-black">我的礼品</text>
      </view>
    </view>
    <view class="cu-list grid col-4 no-border text-black margin-lr-xs padding-bottom radius-lg-bottom">
      <view class="cu-item" qq:for="{{iconList}}" qq:key="index" data-url="{{item.page}}" bindtap="navigate">
        <view class="cuIcon-{{item.icon}} text-{{item.color}} text-shadow" style="font-size: 56rpx">
          <view class="cu-tag badge" wx:if="{{item.badge!=0}}">
            <block wx:if="{{item.badge!=1}}">{{item.badge>99?"99+":item.badge}}</block>
          </view>
        </view>
        <text>{{item.name}}</text>
      </view>
    </view>

    <view class="margin-top-sm padding-lr-xs" qq:if='{{false}}'>
      <view class="bg-white light radius-lg shadow-blur">
        <view class="flex padding-tb-sm padding-lr-sm justify-between">
          <view class="padding-xs">
            <view class="text-xl text-black">惊喜连连·洁净一秋</view>
            <view class="padding-top-xs">家居清洗限时<text class="text-red text-bold"> 6.6折 </text><text class="cuIcon-roundrightfill text-red"></text></view>
          </view>
          <view class="">
            <view class="cu-btn round bg-gradual-pinknew margin-top-sm">6折优惠</view>
          </view>
        </view>
      </view>
    </view>

    <view class="cu-list menu card-menu sm-border margin-top-sm shadow-lg" style="margin-left: 10rpx;width: 654rpx">
      <view class="cu-item arrow" bindtap="navigate" data-url="payforguild">
        <view class="content">
          <text class="text-bold text-black">赞助频道</text>
        </view>
      </view>
      <view class="cu-item arrow" bindtap="navigate" data-url="myownlogs">
        <view class="content">
          <text class="text-bold text-black">我的系统日志</text>
        </view>
      </view>
      <view class="cu-item arrow" bindtap="navigate" data-url="myinvitecodes">
        <view class="content">
          <text class="text-bold text-black">我的频道邀请码</text>
        </view>
      </view>
      <view class="cu-item arrow" bindtap="navigate" data-url="disbanapply">
        <view class="content">
          <text class="text-bold text-black">自助解禁申请</text>
        </view>
      </view>
      <view class="cu-item arrow" bindtap="navigate" data-url="officetasks">
        <view class="content">
          <text class="text-bold text-black">值班室任务列表</text>
        </view>
      </view>
    </view>

    <view class="cu-list menu card-menu sm-border margin-top-sm shadow-lg" style="margin-left: 10rpx;width: 654rpx">
      <view class="cu-item arrow" bindtap="navigate" data-url="guildsmanage">
        <view class="content">
          <text class="text-bold text-black">频道管理</text>
        </view>
      </view>
      <view class="cu-item arrow" bindtap="navigate" data-url="keywords_p">
        <view class="content">
          <text class="text-bold text-black">关键词审批</text>
        </view>
      </view>
      <view class="cu-item arrow" bindtap="navigate" data-url="pushmessageontime_p">
        <view class="content">
          <text class="text-bold text-black">定时任务审批</text>
        </view>
      </view>
      <view class="cu-item arrow" bindtap="navigate" data-url="imagesp">
        <view class="content">
          <text class="text-bold text-black">图片巡查</text>
        </view>
      </view>
      <view class="cu-item arrow" bindtap="navigate" data-url="getrole">
        <view class="content">
          <text class="text-bold text-black">自助领取身份组</text>
        </view>
      </view>
      <view class="cu-item arrow" bindtap="navigate" data-url="commandsls">
        <view class="content">
          <text class="text-bold text-black">指令列表</text>
        </view>
      </view>
      <view class="cu-item arrow" bindtap="navigate" data-url="qface">
        <view class="content">
          <text class="text-bold text-black">小黄豆表情代码</text>
        </view>
      </view>
      <view class="cu-item arrow" bindtap="navigate" data-url="lc_keywords" qq:if='{{adminguildid=="647046823986013702"}}'>
        <view class="content">
          <text class="text-bold text-black">光萌词汇中心</text>
        </view>
      </view>
    </view>

    <view class="cu-list menu card-menu sm-border margin-top-sm shadow-lg" style="margin-left: 10rpx;width: 654rpx">
      <view class="cu-item arrow" bindtap="navigate" data-url="help1">
        <view class="content">
          <text class="cuIcon-question text-green"></text>
          <text class="text-bold text-black">如何添加我到频道</text>
        </view>
      </view>
      <view class="cu-item arrow" bindtap="navigate" data-url="help2">
        <view class="content">
          <text class="cuIcon-question text-green"></text>
          <text class="text-bold text-black">如何赋予我消息推送权限</text>
        </view>
      </view>
    </view>

    <view class="cu-list menu card-menu sm-border margin-top-sm shadow-lg" style="margin-left: 10rpx;width: 654rpx">
      <view class="cu-item arrow" bindtap="navigate" data-url="stroill">
        <view class="content">
          <text class="text-bold text-black">数据存储说明</text>
        </view>
      </view>
      <view class="cu-item arrow" bindtap="navigate" data-url="updatelogs">
        <view class="content">
          <text class="cuIcon-edit text-blue"></text>
          <text class="text-bold text-black">更新日志</text>
        </view>
      </view>
      <view class="cu-item">
        <view class="content">
          <text class="cuIcon-friendadd text-blue"></text>
          <text class="text-bold text-black">联系作者</text>
        </view>
        <button open-type="addFriend" open-id="0DB730321E83AAA7D9B7919E0604CCDB" class="cu-btn round sm bg-blue">添加好友</button>
      </view>
      <view class="cu-item">
        <view class="content">
          <text class="cuIcon-group text-green"></text>
          <text class="text-bold text-black">产品反馈</text>
        </view>
        <button open-type="openGuildProfile" guild-id="647046823986013702" class="cu-btn round sm bg-blue">加入频道</button>
      </view>
      <view class="cu-item">
        <button class="cu-btn content" bindtap="ViewImage" data-url='https://feng.7yan.top/img/support'>
          <text class="cuIcon-coin text-cyan text-xl"></text>
          <text class="text-bold text-black">赞助作者</text>
        </button>
      </view>
      <view class="cu-item">
        <button class="cu-btn content" open-type="share">
          <text class="cuIcon-forward text-cyan text-xl"></text>
          <text class="text-bold text-black">分享小程序</text>
        </button>
      </view>
      <view class="cu-item" qq:if='{{adminguildid=="647046823986013702"}}'>
        <button class="cu-btn content" open-type="contact">
          <text class="cuIcon-service text-cyan text-xl"></text>
          <text class="text-bold text-black">机器人客服（内测）</text>
        </button>
      </view>
      <view class="cu-item">
      <navigator open-type="exit" target="miniProgram">
      <text class="cuIcon-close text-red text-xl"></text>
      <text class="text-bold text-black">退出小程序</text>
      </navigator>
      </view>
    </view>
    </view>

  </scroll-view>

  <view style="height:20rpx;"></view>
</scroll-view>
