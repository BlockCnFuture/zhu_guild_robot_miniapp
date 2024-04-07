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
  
<view class="cu-modal bottom-modal {{modalA=='show' && modalB!='show'?'show':''}}" bindtap="hideModalA">
  <view class="cu-dialog" catchtap="stopit">
    <view class="header-view-top">
      <view class="header-view">
        <view class="header">
          <view></view>
        </view>
        <view class="cu-bar bg-white" catchtap="stopit">
          <view class="action text-black"> </view>
          <text class="text-bold text-black text-lg">编辑礼品分类</text>
          <view class="action text-black"> </view>
        </view>
      </view>
    </view>
    <scroll-view scroll-y catchtap="stopit">
      <view style="height: 60rpx"></view>

      <text class="text-gray margin-left">可通过修改分类名来实现重排序</text>

      <view class="cu-list menu sm-border card-menu margin-top" qq:for="{{rolesets.content.groups}}" qq:key="i" data-index="{{index}}" data-item="{{item}}">
        <view class="cu-item sm-border no-border">
          <view class="flex justify-center align-center">
            <text class="cuIcon-roundclose text-red text-bold" style="font-size: 38rpx; margin-right: 16rpx" data-index="{{index}}" catchtap="delrole"></text>
            <view class="text-black text-cut" style="max-width: 60vw"> {{item}} </view>
          </view>
          <view class="cuIcon-write padding-sm padding-top-lg" bindtap="showinfo" data-item="{{item}}" data-index="{{index}}"></view>
        </view>
      </view>

      <view class="cu-list menu sm-border card-menu margin-top" bindtap="addrole">
        <view class="cu-item sm-border">
          <view class="flex-sub text-center">
            <view class="solid-bottom text-xl padding">
              <text class="cuIcon-roundaddfill text-black text-bold"> 添加新分类</text>
            </view>
          </view>
        </view>
      </view>
      <view style="height: 120rpx"></view>
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
          <text class="text-bold text-black text-lg">设置分类名</text>
          <view class="action text-black" catchtap="setcontent">确定</view>
        </view>
      </view>
    </view>
    <scroll-view scroll-y catchtap="stopit">
      <view style="height: 3vh"></view>
      <view class="cu-list menu sm-border card-menu margin-top">
        <view class="cu-item sm-border bg-white">
          <custom-textarea maxlength="20" style="text-align: left; width: 100%;{{modalB=='show'?'':'display:none;'}}" bindinput="onInput" value="{{tmpct}}" cursor-spacing="80" show-confirm-bar="{{false}}"></custom-textarea>
        </view>
      </view>
      <view style="height: 600rpx;"></view>
    </scroll-view>
  </view>
</view>

<scroll-view scroll-y>
  <view class="cu-list menu sm-border card-menu margin-top">
    <view class="cu-item sm-border no-border">
      <text class="text-bold text-black">开启礼品商店</text>
      <switch class="sm" bindchange="RolesSwitch" checked="{{rolesets.useit}}" data-target="rolesets.useit"></switch>
    </view>
    <view class="cu-item sm-border no-border" qq:if="{{rolesets.useit}}">
      <text class="text-bold text-black">显示商品库存</text>
      <switch class="sm" bindchange="RolesSwitch" checked="{{rolesets.content.showrest}}" data-target="rolesets.content.showrest"></switch>
    </view>
    <view class="cu-item sm-border no-border" qq:if="{{rolesets.useit}}">
      <text class="text-bold text-black">显示"全部"分类</text>
      <switch class="sm" bindchange="RolesSwitch" checked="{{rolesets.content.showall}}" data-target="rolesets.content.showall"></switch>
    </view>
  </view>

  <view qq:if="{{rolesets.useit}}">
    <view class="cu-list menu sm-border card-menu margin-top">
      <view class="cu-item sm-border arrow" bindtap="setgroup">
        <text class="text-bold text-black">礼品分类设置</text>
        <text class="text-gray"></text>
      </view>
      <view class="cu-item sm-border arrow" bindtap="jmpto" data-target="goodslistsetgoods">
        <text class="text-bold text-black">商店礼品列表</text>
        <text class="text-gray">去设置</text>
      </view>
    </view>

    <view class="cu-list menu sm-border card-menu margin-top">
      <view class="cu-item sm-border arrow" bindtap="goodsneedsend">
        <text class="text-bold text-black">待发货礼品记录</text>
        <text class="text-gray">去查看</text>
      </view>
      <view class="cu-item sm-border arrow" bindtap="goodssend">
        <text class="text-bold text-black">已发货礼品记录</text>
        <text class="text-gray">去查看</text>
      </view>
      <view class="cu-item sm-border arrow" bindtap="jmpto" data-target="goodslist">
        <text class="text-bold text-black">预览商店页</text>
      </view>
      <view class="cu-item sm-border arrow" bindtap="CopyText" data-link="goodslist">
        <text class="text-bold text-black">复制分享链接</text>
      </view>
    </view>

    <view class="cu-list menu sm-border card-menu margin-top">
      <view class="cu-item sm-border">
        <text class="text-black text-bold">礼品商店分享预览</text>
      </view>
      <view class="cu-item sm-border" bindtap='CopyText' data-link='/礼品商店'>
        <view style="width: 100%; word-wrap: break-word">
          <text class="text-gray">此处不可自定义数据 唤出指令：</text>
          <text class="text-blue text-bold">\r\n\r\n@机器人 </text>
          <text class="text-black text-bold">/礼品商店 
          
          </text>
        </view>
      </view>
    </view>

    <view class="margin-sm radius-lg">
      <view class="cu-list menu sm-border card-menu margin-top bg-white">
        <view class="cu-card case margin">
          <text class="text-black text-bold" style="white-space: pre-wrap; overflow-wrap: break-word">【通知】频道主已开启礼品商店，大家快进来看看吧!</text>
          <view class="image margin-top">
            <image src="https://feng.7yan.top/img/packge" mode="aspectFit" bindload="loadeda" style="max-height:{{heighta}}px;"></image>
          </view>
        </view>
      </view>
    </view>
  </view>
  <view style="height: 16vh"></view>
</scroll-view>

<view class="bg-white" style="position: fixed; z-index: 1024; bottom: 0; top: auto; left: 0; right: 0">
  <view class="padding">
    <button class="cu-btn block bg-blue margin-tb-sm lg" bindtap="saveall">保存</button>
  </view>
</view>