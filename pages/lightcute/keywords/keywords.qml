<view class='cu-load load-modal' qq:if="{{loadModal}}">
  <image src='/images/logo.jpeg' class='png' mode='aspectFit'></image>
  <view class='gray-text'>加载中...</view>
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
      <view class="action text-black" catchtap="setchannel">确定</view>
      </view>
  </view>
  </view>
  <scroll-view scroll-y catchtap='stopit'>
  <view class="cu-list menu sm-border margin-top">
  <view class="cu-item sm-border" qq:for="{{channellist}}" qq:key='index' catchtap="pclick" data-index='{{index}}' data-item='{{item}}'>
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



<view class="cu-bar bg-white fixed">
      <view class="cu-bar bg-white" style='max-width:140rpx;'>
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
    <view class="search-form round">
      <text class="cuIcon-search"></text>
      <input type="text" placeholder="搜索 词汇丨昵称丨更新时间" confirm-type="search" bindinput="onSearchInput"></input>
    </view>
  </view>

<view class="bg-white" style="position:fixed;top:auto;left:0;right:0;z-index:999;">
  <view class="cu-bar bg-white flex padding justify-between">
  <button class="cu-btn bg-blue sm" catchtap="selectall">全部选中</button>
  <button class="cu-btn bg-red sm" catchtap="opsome" data-type='del'>删除选中</button>
  <button class="cu-btn bg-black sm" catchtap="opsome" data-type='ref'>刷新选中时间</button>
  <button class="cu-btn bg-blue sm" catchtap="cancleall">取消选中</button>
  </view>
</view>

<scroll-view scroll-y style="height:100vh;" bindscrolltolower='fetch_list'>
<view style='height:8vh;'></view>



<view qq:if='{{userinfo.open_guild_id}}'>
  <view class="cu-list menu sm-border card-menu margin-top" bindtap='chosechannel' data-type='A'>
    <view class="cu-item sm-border arrow">
      <view class="content">
        <image src="data:image/svg+xml;base64,ICA8c3ZnIHdpZHRoPSI0ODAiIGhlaWdodD0iMzIwIiB2aWV3Qm94PScwIDAgOTYwIDY0MCcgdHJhbnNmb3JtPSJzY2FsZSgxKSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCiAgICAgICAgPCEtLSDml5fluJwgLS0+DQogICAgICAgIDxyZWN0IHg9JzAnIHk9JzAnIHdpZHRoPSc5NjAnIGhlaWdodD0nNjQwJyBmaWxsPSdyZWQnLz4NCiAgICAgICAgPCEtLSDlpKfkupTop5LmmJ8gLS0+DQogICAgICAgIDxwYXRoIGQ9Ik0xNjAsNzkNCiAgICAgICAgTDExMi4zODk0LDIyNS41MzA0DQogICAgICAgIEwyMzcuMDM1NiwxMzQuOTY5Ng0KICAgICAgICBMODIuOTY0NCwxMzQuOTY5Ng0KICAgICAgICBMMjA3LjYxMDYsMjI1LjUzMDQNCiAgICAgICAgWiIgZmlsbD0neWVsbG93Jy8+DQoNCiAgICAgICAgPCEtLSDlsI/kupTop5LmmJ/ku47kuIrliLDkuIsgLS0+DQogICAgICAgIDxwYXRoIGQ9Ik0yOTIuNTYwMiw4MC40NjM5DQogICAgICAgIEwzNTEuODc2NSw2Ni44MDkxDQogICAgICAgIEwyOTUuODYyNiw0Mi45OTA4DQogICAgICAgIEwzMjcuMTc4Nyw5NS4xODQ0DQogICAgICAgIEwzMzIuNTIyLDM0LjU1MTgNCiAgICAgICAgWiIgZmlsbD0neWVsbG93Jy8+DQoNCiAgICAgICAgPHBhdGggZD0iTTM1Mi4zMjE2LDEzMi41MjU1DQogICAgICAgIEw0MDYuOTY4MywxMDUuNzE4Nw0KICAgICAgICBMMzc4LjUxNDgsMTU5LjUyNjQNCiAgICAgICAgTDM2OS45MDY5LDk5LjI3MDUNCiAgICAgICAgTDQxMi4yODg0LDE0Mi45NTg5DQogICAgICAgIFoiIGZpbGw9J3llbGxvdycvPg0KDQogICAgICAgIDxwYXRoIGQ9Ik0zNTMuMjMxMiwyMTUuMjA4OQ0KICAgICAgICBMNDAzLjcyNTIsMjQ5LjE5NzYNCiAgICAgICAgTDM4Mi44NTQ3LDE5Mi4wMjA2DQogICAgICAgIEwzNjYuMTMxMSwyNTAuNTQ2Mg0KICAgICAgICBMNDE0LjA1OTcsMjEzLjAyNjcNCiAgICAgICAgWiIgZmlsbD0neWVsbG93Jy8+DQoNCiAgICAgICAgPHBhdGggZD0iTTI5NS4wMTIyLDI2OC4wMDk4DQogICAgICAgIEwzNTEuOTY1NSwyODkuNDg1DQogICAgICAgIEwyOTMuMjY2NSwzMDUuNTg3NQ0KICAgICAgICBMMzMxLjI5MDIsMjU4LjA1NzkNCiAgICAgICAgTDMyOC40NjU2LDMxOC44NTk5DQogICAgICAgIFoiIGZpbGw9J3llbGxvdycvPg0KICAgICAgIA0KICAgIDwvc3ZnPg==" mode='aspectFit'/>
        <text class="text-black text-bold">国服推送订阅</text>
      </view>
      <text class="text-grey" qq:if='{{!nameA}}'>可选,推送来自光萌攻略组</text>
      <view class='text-cut' style='max-width:42vw;' qq:else>
      <text class="text-grey text-bold">{{nameA}}</text>
      </view>
    </view>
  </view>
    <view class="cu-list menu sm-border card-menu margin-top" bindtap='chosechannel' data-type='B'>
    <view class="cu-item sm-border arrow">
      <view class="content">
        <text class='cuIcon-global margin-right-sm text-blue'></text>
        <text class="text-black text-bold">国际服推送订阅</text>
      </view>
      <text class="text-grey" qq:if='{{!nameB}}'>可选,推送来自光萌攻略组</text>
      <view class='text-cut' style='max-width:42vw;' qq:else>
      <text class="text-grey text-bold">{{nameB}}</text>
      </view>
    </view>
  </view>
</view>



<view class="cu-list menu sm-border card-menu margin-top" bindtap='chosechannel' data-type='C' qq:if='{{userinfo.open_guild_id}}'>
    <view class="cu-item sm-border arrow">
      <view class="content">
        <text class="text-black text-bold">固定使用子频道</text>
      </view>
      <text class="text-grey" qq:if='{{!nameC}}'>可选,固定词汇的使用子频道</text>
      <view class='text-cut' style='max-width:42vw;' qq:else>
      <text class="text-grey text-bold">{{nameC}}</text>
      </view>
    </view>
  </view>
  <view class="cu-list menu sm-border card-menu margin-top" qq:if='{{userinfo.open_guild_id}}'>
    <text>词汇列表</text>
  </view>
<view class="cu-list menu sm-border card-menu margin-top bg-white" qq:for="{{list}}" qq:key='index' bindtap='selectone' data-item='{{item}}' data-index='{{index}}' qq:if='{{item.show}}'>
 <view class="cu-item sm-border arrow">
  <view class='content text-cut' style='max-width:70vw;'>
      <text class="cuIcon-roundcheckfill text-{{item.select?'blue':'gray'}} margin-right-xs"></text>
      <text class="text-blue">{{item.keyword_show}}</text>
  </view>
  <text class="text-gray" catchtap='showinfo' data-item='{{item}}'>点击查看</text>
 </view>
    <view class="flex padding-left-sm margin-bottom-sm margin-top-sm" catchtap='showinfo' data-item='{{item}}'>
      <view class="cu-avatar round" style="background-image:url({{item.editorhead}});"></view>
      <view class="text-gray text-sm padding-left-sm">
        <view class="text-lg text-black text-cut" style='max-width:50vw;'>{{item.editornick}}</view>
        <view class="">更新时间：{{item.edit_time}}</view>
      </view>
    </view>

</view>

  <view class="cu-list menu sm-border card-menu margin-top" qq:if='{{!complete}}'>
    <view class="text-center">
      <button class="cu-btn line-blue sm round" bindtap="fetch_list">加载更多</button>
    </view>
  </view>
  
  <view class="cu-list menu sm-border card-menu margin-top" qq:if='{{complete}}'>
    <view class="text-center">
      <text class="text-gray">没有更多数据</text>
    </view>
  </view>

  <view style="height:18vh;"></view>
</scroll-view>
