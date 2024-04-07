App({
  onLaunch() {
    const online = false;
    this.globalData = {
      ...this.globalData,
      online: online,
      host: (online ? 'https://feng.7yan.top/Api' : 'https://127.0.0.1/Api'),
      open_guild_id: '',
      adminguildid: '647046823986013702',
      userinfo: {
        guild_name: '未选择频道',
        member_role: (online ? 0 : 2),
        member_userid: (online ? '' : '139761108189060386'),
        member_nick: '未知',
        member_head: 'https://q2.qlogo.cn/headimg_dl?dst_uin=10000&spec=100',
        open_guild_id: (online ? '' : '6259864134638097991'),
        guild_head: 'https://groupprohead-76292.picgzc.qpic.cn/624410933985660643/0',
        guild_bg: 'https://groupprocover.gtimg.cn/',
        permissions: '0000',
        points: { points: 0, warning_counts: 0, workdays: 0, cot_workdays: 0 },
        query: { guildID: '', i: '0' },
        exptime: ''
      }
    };
    qq.setEnableDebug({
      enableDebug: false
    })
  },
  onShow: function (options) {
    this.getnowappid();
    if (!this.data.updateManager) {
      this.data.updateManager = qq.getUpdateManager();
    }
    this.data.updateManager.onCheckForUpdate(function (res) { });
    let sthis = this;
    this.data.updateManager.onUpdateReady(function () {
      qq.showModal({
        title: '更新提示',
        content: '发现新版本，是否立即更新？\r\n更新后请重新从机器人资料页进入，方可正常显示内容',
        success(res) {
          if (res.confirm) {
            sthis.data.updateManager.applyUpdate();
          }
        }
      })
    });

    let lastguild = '';
    try {
      lastguild = qq.getStorageSync('last_guildid');
    } catch (e) { }

    let extendData = options.extendData;
    let query = options.query;
    if (extendData && extendData.guildID) {

      if (lastguild && lastguild != '' && this.globalData.token != '' && this.globalData.userinfo.open_guild_id != '' && lastguild == extendData.guildID) {
        this.getLoginInfo();
        return;
      }

      this.globalData.open_guild_id = extendData.guildID;
      try {
        qq.setStorageSync('guildid', extendData.guildID);
      } catch (e) { }
      try {
        qq.setStorageSync('last_guildid', extendData.guildID);
      } catch (e) { }

    } else if (query && query.guildID) {

      if (lastguild && lastguild != '' && this.globalData.token != '' && this.globalData.userinfo.open_guild_id != '' && lastguild == query.guildID) {
        this.globalData.userinfo.query = { ...this.globalData.userinfo.query, ...query };
        this.getLoginInfo();
        return;
      }

      this.globalData.open_guild_id = query.guildID;
      this.globalData.userinfo.query = { ...this.globalData.userinfo.query, ...query };
      try {
        qq.setStorageSync('guildid', query.guildID);
      } catch (e) { }
      try {
        qq.setStorageSync('last_guildid', query.guildID);
      } catch (e) { }

    } else {
      //////////////
      let check = '';
      try {
        let value = qq.getStorageSync('guildid')
        if (value) check = value;
      } catch (e) { }
      if (check && check != '') {
        this.globalData.open_guild_id = check;
      }
      //////////////
    }
    if (this.globalData.open_guild_id != '') {

      if (this.globalData.open_guild_id == this.globalData.userinfo.open_guild_id) {
        if (this.globalData.token != '') {
          this.getLoginInfo();
          return;
        }
      }

      this.globalData.userinfo.open_guild_id = this.globalData.open_guild_id;
      this.globalData.token = '';

      qq.login({
        success: res => {
          if (res.code) {
            this.LoginSuccess(res.code);
            if (!this.data.clkid) this.data.clkid = setInterval(this.ClkTask, 1000 * 60 * 10);
            if (!this.data.rclkid) this.data.rclkid = setInterval(this.RefTask, 100);
          }
        },
        fail: err => {
          this.globalData.userinfo.open_guild_id = '';
          qq.showModal({
            title: '登录失败',
            content: '抱歉，小程序登录失败，请您重新从机器人资料卡进入小程序',
            showCancel: false
          });
        }
      })
    } else { //只登录取token
      if (!this.globalData.token) {
        qq.login({
          success: res => {
            if (res.code) {
              this.LoginSuccess(res.code);
              if (!this.data.clkid) this.data.clkid = setInterval(this.ClkTask, 1000 * 60 * 10);
              if (!this.data.rclkid) this.data.rclkid = setInterval(this.RefTask, 100);
            }
          },
          fail: err => {
            this.globalData.userinfo.open_guild_id = '';
            qq.showModal({
              title: '登录失败',
              content: '抱歉，小程序登录失败，请您重新从机器人资料卡进入小程序',
              showCancel: false
            });
          }
        })
      }
    }

  },
  data: {
    clkid: null,
    rclkid: null,
    updateManager: null
  },
  globalData: {
    online: true,
    host: '',
    open_guild_id: '',
    userinfo: {
      query: { guildID: '', i: '0' }
    },
    token: '',
    permissionlist: {
      'permission': 1,
      'logs': 2,
      'roles': 3,
      'blacklist': 4,
      'notice_newmember': 5,
      'notice_memberexit': 6,
      'notice_member_remove': 7,
      'newmemberset': 8,
      'forbiddenwords': 9,
      'keywords': 10,
      'worningsets': 11,
      'message_rule': 12,
      'message_level_limit': 13,
      'lockcard': 14,
      'newmembervef': 15,
      'memberexitoption': 16,
      'banspeakontime': 17,
      'pushmessageontime': 18,
      'voicenotice': 19,
      'livenotice': 20,
      'newthemenotice': 21,
      'messagerecallnotice': 22,
      'themenotice': 23,
      'pointssets': 24,
      'goodslist': 25,
      'oncommentpoints': 26,
      'pointsgames': 27,
      'onworkpoints': 28,
      'onthemepoints': 29,
      'onspeakpoints': 30,
      'onvoicepoints': 31,
      'onlivepoints': 32,
      'oninvitepoints': 33,
      'forbiddenwords_nick': 34,
      'invitecode_edit_byheart': 35,
      'guildinvitecodes': 36,
      'pointssets': 37,
      'message_limit': 38,
      'facelimit': 39,
      'systemlogsusersop': 40,
      'office': 41,
      'forbiddenwordsbasepunish': 42,

      'goodslistset': 44,
      'guildcards': 45,
      'upointschange': 46,
      'guildgoodssend': 47,
      'safecpermission': 48,
      'itoolsp': 49,
      'payaccount': 50
    },
    permissionlist_names: [
      { o: 'logs', name: '系统日志查看权限' },
      { o: 'roles', name: '自助领取身份组设置权限' },
      { o: 'blacklist', name: '黑名单设置权限' },
      { o: 'notice_newmember', name: '新人加入通知设置权限' },
      { o: 'notice_memberexit', name: '成员退出通知设置权限' },
      { o: 'notice_member_remove', name: '成员移除通知设置权限' },
      { o: 'newmemberset', name: '新人加入设置权限' },
      { o: 'forbiddenwords', name: '敏感词列表设置权限' },
      { o: 'keywords', name: '关键词列表设置权限' },
      { o: 'worningsets', name: '频道警告设置权限' },
      { o: 'message_rule', name: '子频道发言格式设置权限' },
      { o: 'message_level_limit', name: '各等级成员发言限制设置权限' },
      { o: 'lockcard', name: '名片格式锁定设置权限' },
      { o: 'newmembervef', name: '新人验证设置权限' },
      { o: 'memberexitoption', name: '用户退出频道后操作设置权限' },
      { o: 'banspeakontime', name: '定时全员禁言设置权限' },
      { o: 'pushmessageontime', name: '定时消息推送设置权限' },
      { o: 'voicenotice', name: '语音房通知设置权限' },
      { o: 'livenotice', name: '直播间通知设置权限' },
      { o: 'newthemenotice', name: '新主题通知设置权限' },
      { o: 'messagerecallnotice', name: '消息撤回通知设置权限' },
      { o: 'themenotice', name: '主题屏蔽通知设置权限' },
      { o: 'pointssets', name: '积分信息设置权限' },
      { o: 'goodslist', name: '奖品列表设置权限' },
      { o: 'oncommentpoints', name: '成员评论奖励设置权限' },
      { o: 'pointsgames', name: '自定义积分小游戏设置权限' },
      { o: 'onworkpoints', name: '成员打卡奖励设置权限' },
      { o: 'onthemepoints', name: '成员主题奖励设置权限' },
      { o: 'onspeakpoints', name: '成员发言奖励设置权限' },
      { o: 'onvoicepoints', name: '语音房互动奖励设置权限' },
      { o: 'onlivepoints', name: '直播间互动奖励设置权限' },
      { o: 'oninvitepoints', name: '成员邀请奖励设置权限' },
      { o: 'forbiddenwords_nick', name: '名片敏感词列表设置权限' },
      { o: 'invitecode_edit_byheart', name: '邀请码个性化设置权限（禁言、身份、积分）' },
      { o: 'guildinvitecodes', name: '本频道邀请码列表查看、编辑权限' },
      { o: 'pointssets', name: '频道积分设置权限' },
      { o: 'message_limit', name: '子频道发言类型限制设置权限' },
      { o: 'facelimit', name: '表情表态限制设置权限' },
      { o: 'systemlogsusersop', name: '系统日志用户管理权限' },
      { o: 'office', name: '值班室设置权限' },
      { o: 'forbiddenwordsbasepunish', name: '敏感词库处罚策略设置权限' },
      { o: 'goodslistset', name: '礼品商店设置权限' },
      { o: 'guildcards', name: '自定义兑换码设置权限' },
      { o: 'upointschange', name: '小程序成员资产修改权限' },
      { o: 'guildgoodssend', name: '礼品核销权限' },
      { o: 'safecpermission', name: '非危险指令分配权限' },
      { o: 'itoolsp', name: '便民指令设置权限' },
      { o: 'payaccount', name: '用户赞助设置权限' }
    ],
    clist: [
      { c: '踢', d: '踢出指定成员\r\n\r\n示范：\r\n/踢@xxx\r\n/踢 1665151121', p: '|4|' },
      { c: '踢黑', d: '踢出并拉黑指定成员\r\n\r\n示范：\r\n/踢黑@xxx\r\n/踢黑 1665151121\r\n该指令会删除打卡记录和积分', p: '|4|' },
      { c: '踢撤', d: '踢出指定成员并撤回其所有发言\r\n\r\n示范：\r\n/踢撤@xxx\r\n/踢撤 1665151121', p: '|4|' },
      { c: '踢黑撤', d: '踢出并拉黑指定成员，同时撤回其所有发言\r\n\r\n示范：\r\n/踢黑撤@xxx\r\n/踢黑撤 1665151121\r\n该指令会删除打卡记录和积分', p: '|4|' },
      { c: '清理低等级用户', d: '批量移除指定等级、加入时间的成员\r\n每日最多可清理1000人\r\n\r\n示范：\r\n/清理低等级用户 等级1 2022年5月', p: '|4|' },
      { c: '清理无身份组用户', d: '批量移除无任何身份组的用户\r\n每日最多可清理1000人', p: '|4|' },
      { c: '清理指定身份组用户', d: '批量移除拥有指定身份组的用户\r\n每日最多可清理1000人\r\n\r\n示范：\r\n/清理指定身份组用户 身份组名\r\n如果有两个名字相同的身份组，选用第一个', p: '|4|' },
      { c: '迁移无身份组用户', d: '给所有无身份组的用户加上指定身份组', p: '|4|' },
      { c: '迁移低等级用户', d: '将指定等级、加入时间的用户全部迁移到指定身份组\r\n用户的其他身份组将被保留\r\n\r\n示范：/迁移低等级用户 等级1 2022年5月 身份组名\r\n如果有两个名字相同的身份组，选用第一个', p: '|4|' },
      { c: '迁移指定身份组用户', d: '将所有用户的身份组A替换为身份组B\r\n用户的其他身份组将被保留\r\n\r\n示范：/迁移指定身份组用户 身份组名A=身份组名B\r\n如果有两个名字相同的身份组，选用第一个', p: '|4|' },
      { c: '查看任务进度', d: '主动查询迁移、清理任务的进度', p: '|4|' },
      { c: '中断任务', d: '强制停止当前的迁移、清理任务', p: '|4|' },
      { c: '退出任务排队', d: '强制停止当前的任务排队', p: '|4|' }
    ],
    oclist: [
      { c: '频道续期', d: '给指定频道自助续期\r\n\r\n示范：\r\n/频道续期 1196663613263703387 1个月\r\n第一个参数为频道id，第二个参数为续期月数\r\n此处一个月指30天' },
      { c: '查id', d: '查看自己或他人在机器人场景下的用户id\r\n\r\n示范：\r\n/查id\r\n/查id@xxx\r\n不带艾特是查自己，带艾特是查其他人' },
      { c: '查消息id', d: '查询当前消息在子频道内的id\r\n回复欲查询的消息，带上"/查消息id"\r\n即可查询目标消息的id' },
      { c: '举报', d: '举报单条消息或提交证据进行举报\r\n\r\n用法：\r\n回复欲举报的消息，而后带上 /举报 即可举报目标消息\r\n/举报 xxx理由 [截图][截图] 可提交证据进行举报' },
      { c: '取图片hash', d: '取单张或多张图片的hash码，可用于敏感词库\r\n\r\n用法：\r\n回复欲查询的消息，而后带上 /取图片hash 即可\r\n/取图片hash [图1][图2]... 可查询本地图hash' },
      { c: '打卡', d: '每日打卡获取积分奖励' },
      { c: '打卡排行', d: '查看频道内用户连续打卡排行' },
      { c: '资产排行', d: '查看频道成员资产排行快捷入口' },
      { c: '我的钱包 ', d: '查看自己在频道内的资产' },
      { c: '礼品商店', d: '分享礼品商店入口' },
      { c: '跨频转账', d: '分享跨频转账入口' },
      { c: '赞助频道', d: '回复小程序内赞助频道页快捷入口' },
      { c: '积分银行', d: '回复小程序内积分银行页快捷入口' },
      { c: '积分转换', d: '回复小程序内积分转换页快捷入口' },
      { c: '使用兑换码', d: '使用兑换码领取奖励\r\n\r\n用法：\r\n/使用兑换码 xxx' },
      { c: '赞助排行', d: '查看频道内用户累计赞助排行' },
      { c: '我的活跃数据', d: '查看自己在频道内的活跃数据\r\n若未开启活跃自动奖励类功能，将不会统计' }
    ],
    qclist: [
      { c: '加积分', d: '给成员添加指定数量的指定类型积分\r\n\r\n示范：\r\n/加积分 积分名 10@xxx @xxx\r\n/加积分 积分名 10 理由xxx@xxx @xxx\r\n理由可省略\r\n可连续艾特多人来批量操作', p: '|4|' },
      { c: '减积分', d: '扣除成员指定数量的指定类型积分\r\n\r\n示范：\r\n/减积分 积分名 10@xxx @xxx\r\n/减积分 积分名 10 理由xxx@xxx @xxx\r\n理由可省略\r\n可连续艾特多人来批量操作', p: '|4|' },
      { c: '置积分', d: '修改成员指定类型积分至指定数量\r\n\r\n示范：\r\n/置积分 积分名 10@xxx @xxx\r\n/置积分 积分名 10 理由xxx@xxx @xxx\r\n理由可省略\r\n可连续艾特多人来批量操作', p: '|4|' },
      { c: '使用补签卡', d: '使用补签卡来进行补签\r\n\r\n示范：\r\n/使用补签卡\r\n/使用补签卡 2\r\n数量可省略，默认使用一张', p: '|4|' },
      { c: '补签', d: '消耗积分进行补签\r\n\r\n示范：\r\n/补签\r\n/补签 2天\r\n时间可省略，默认补签一天', p: '|4|' },
      { c: '断签恢复', d: '清空指定成员的所有断签记录\r\n\r\n示范：\r\n/断签恢复@xxx @xxx\r\n可连续艾特多人来批量操作', p: '|4|' },
      { c: '转账', d: '将自身资产转移给其他用户\r\n\r\n示范：\r\n/转账 积分名 10@xxx\r\n/转账 积分名 10 理由@xxx\r\理由可省略', p: '|4|' },

      { c: '上身份组', d: '给指定成员添加指定身份组\r\n\r\n示范：\r\n/上身份组 身份组名@xxx @xxx\r\n/上身份组 身份组名 1天@xxx @xxx\r\n时间可省略，默认永久赋予\r\n时间单位有：分钟、小时、天\r\n可连续艾特多人来批量操作\r\n有同名身份组时，系统选择第一个', p: '|4|' },
      { c: '下身份组', d: '移除指定成员的指定身份组\r\n\r\n示范：\r\n/下身份组 身份组名@xxx @xxx\r\n可连续艾特多人来批量操作\r\n有同名身份组时，系统选择第一个', p: '|4|' },
      { c: '全员禁言', d: '开启全员禁言\r\n\r\n示范：\r\n/全员禁言300s\r\n单位可选：d,h,m,s，分别表示天,时,分,秒', p: '|4|' },
      { c: '全员解禁', d: '关闭全员禁言', p: '|4|' },
      { c: '禁言', d: '禁言指定成员\r\n\r\n示范：\r\n/禁言167176112211 300s\r\n/禁言@xxx 300s\r\n单位可选：d,h,m,s，分别表示天,时,分,秒', p: '|4|' },
      { c: '解禁', d: '解除指定成员的禁言\r\n\r\n示范：\r\n/解禁167176112211\r\n/解禁@xxx', p: '|4|' },
      { c: '撤回', d: '撤回单条消息\r\n回复欲撤回的消息，带上"/撤回"\r\n目标消息即可被撤回', p: '|4|' },
      { c: '批量撤回', d: '批量撤回消息，单次最多撤回100条\r\n默认以指令为撤回终点，撤回10条\r\n\r\n示范：\r\n/批量撤回 20\r\n/批量撤回 921 955\r\n两个数字是消息id\r\n分别表示撤回起点和撤回终点\r\n消息id可用 /查消息id 查询', p: '|4|' },
      { c: '撤回并警告', d: '撤回单条消息并发出一次警告\r\n回复欲撤回的消息，带上"/撤回并警告"\r\n\r\n示范：\r\n/撤回并警告 违规内容', p: '|4|' },
      { c: '警告', d: '警告指定用户\r\n\r\n示范：\r\n/警告 2 违规内容 @xxx\r\n/警告 违规内容 @xxx\r\n可忽略警告次数，默认警告一次', p: '|4|' },
      { c: '撤销警告', d: '撤销指定用户的警告\r\n\r\n示范：\r\n/撤销警告 2 @xxx\r\n/撤销警告 @xxx\r\n可忽略次数，默认撤销一次', p: '|4|' },
      { c: '查警告', d: '查询指定用户的警告次数\r\n警告原因、警告记录请前往日志页搜索查看\r\n\r\n示范：\r\n/查警告@xxx\r\n/查警告61526161\r\n61526161是对方的id', p: '|4|' },
      { c: '重置警告', d: '重置指定用户的警告次数为0\r\n\r\n示范：\r\n/重置警告@xxx\r\n/重置警告61526161\r\n61526161是对方的id', p: '|4|' },
      { c: '重置全员警告', d: '重置频道所有用户的警告次数为0', p: '|4|' },
      { c: '频道信息', d: '查看频道的频道id\r\n查看频道成员数量、当前可拥有的最大成员数', p: '|4|' },
      { c: '反查id', d: '反查频道用户id，用id查信息\r\n只能查频道内的用户\r\n\r\n示范：\r\n/反查id 139761108189060386', p: '|4|' },
    ],
    pclist: [
      { c: '天气', d: '查询指定城市的天气\r\n\r\n示范：\r\n/天气 北京\r\n该功能数据来源于中国天气网', p: '|4|' },
      { c: 'QQ音乐', d: '通过QQ音乐点歌\r\n\r\n示范：\r\n/QQ音乐 周杰伦\r\n有多个搜索结果时，将返回随机结果\r\n该功能数据来源于QQ音乐', p: '|4|' },
      { c: '网易云音乐', d: '通过网易云音乐点歌\r\n\r\n示范：\r\n/网易云音乐 周杰伦\r\n有多个搜索结果时，将返回随机结果\r\n该功能数据来源于网易云音乐', p: '|4|' },
      { c: '今日油价', d: '查询今日油价及油价浮动价格\r\n\r\n示范：\r\n/今日油价 北京\r\n查询单位为省/市\r\n该功能数据来源于中国石化集团', p: '|4|' }
    ],
    indexpagelist: [
      {
        group: '常用设置',
        pages: [
          { name: '后台权限分配', desc: '', url: 'permission' },
          { name: '危险指令权限分配', desc: '', url: 'permission_c' },
          { name: '非危险指令权限分配', desc: '', url: 'safecpermission' },
          { name: '便民指令设置', desc: '天气、点歌等', url: 'itoolsp' },
          { name: '系统日志', desc: '', url: 'logs' },
          { name: '自助领取身份组', desc: '', url: 'roles' },
          { name: '黑名单', desc: '', url: 'blacklist' },
          { name: '新人加入通知', desc: '', url: 'notice_newmember' },
          { name: '成员退出通知', desc: '', url: 'notice_memberexit' },
          { name: '成员被移除通知', desc: '', url: 'notice_member_remove' },
          { name: '新人加入设置', desc: '', url: 'newmemberset' },
          { name: '自定义兑换码', desc: '', url: 'guildcards' },
        ]
      },
      {
        group: '发言限制 | 关键词回复',
        pages: [
          { name: '敏感词列表', desc: '支持正则，单词条长度有限', url: 'forbiddenwords' },
          { name: '敏感词库列表', desc: '不支持正则，传统型词库', url: 'forbiddenwordsbase' },
          { name: '敏感词库处罚策略设置', desc: '', url: 'forbiddenwordsbasepunish' },
          { name: '关键词列表', desc: '', url: 'keywords' },
          { name: '警告设置', desc: '', url: 'worningsets' },
          { name: '表情表态限制', desc: '', url: 'facelimit' },
          { name: '子频道发言格式限制', desc: '', url: 'message_rule' },
          { name: '子频道发言类型限制', desc: '', url: 'message_limit' },
          { name: '各等级成员发言限制', desc: '', url: 'message_level_limit' },
        ]
      },
      {
        group: '用户管理',
        pages: [
          { name: '名片敏感词列表', desc: '禁止昵称出现特定词汇', url: 'forbiddenwords_nick' },
          { name: '名片格式锁定', desc: '', url: 'lockcard' },
          { name: '新人验证设置', desc: '', url: 'newmembervef' },
          { name: '用户退出频道后操作', desc: '', url: 'memberexitoption' },
          { name: '值班室设置', desc: '', url: 'office' },
          { name: '定时全员禁言', desc: '', url: 'banspeakontime' },
          { name: '定时消息推送', desc: '', url: 'pushmessageontime' },
        ]
      },
      {
        group: '事件通知',
        pages: [
          { name: '语音房通知', desc: '', url: 'voicenotice' },
          { name: '直播间通知', desc: '', url: 'livenotice' },
          { name: '新主题通知', desc: '', url: 'newthemenotice' },
          { name: '消息撤回通知', desc: '', url: 'messagerecallnotice' },
          { name: '主题屏蔽通知', desc: '', url: 'themenotice' },
        ]
      },
      {
        group: '数据 | 统计',
        pages: [
          { name: '本频道邀请码列表', desc: '', url: 'guildinvitecodes' },
          { name: '成员打卡排行', desc: '', url: 'onworklist' },
          { name: '成员资产排行', desc: '', url: 'upointslist' },
          { name: '成员赞助排行', desc: '', url: 'ubankpaylist' },
        ]
      },
      {
        group: '积分 | 奖励',
        pages: [
          { name: '积分设置', desc: '', url: 'pointssets' },
          { name: '用户赞助设置', desc: '赞助频道奖励积分', url: 'payaccount' },
          { name: '礼品商店设置', desc: '', url: 'goodslistset' },
          { name: '自定义积分小游戏', desc: '', url: 'pointsgames' },
          { name: '成员打卡奖励', desc: '', url: 'onworkpoints' },
          { name: '成员主题奖励', desc: '', url: 'onthemepoints' },
          { name: '成员评论奖励', desc: '', url: 'oncommentpoints' },
          { name: '成员发言奖励', desc: '', url: 'onspeakpoints' },
          { name: '语音房互动奖励', desc: '', url: 'onvoicepoints' },
          { name: '直播间互动奖励', desc: '', url: 'onlivepoints' },
          { name: '成员邀请奖励', desc: '', url: 'oninvitepoints' },
        ]
      }
    ]
  },
  postlog: function (log) {
    if (this.globalData.token == '') return;
    qq.request({
      url: `${this.globalData.host}/logs/${this.globalData.token}/post`,
      data: { log: log },
      method: 'POST'
    })
  },
  refQuery(query) {
    this.globalData.userinfo.query = { ...this.globalData.userinfo.query, ...query };
  },
  addPermission: function (p, k) {
    let binaryP = p.padStart(k + 1, '0');
    binaryP = binaryP.slice(0, binaryP.length - k - 1) + '1' + binaryP.slice(binaryP.length - k);
    return binaryP;
  },
  removePermission: function (p, k) {
    let binaryP = p.padStart(k + 1, '0');
    binaryP = binaryP.slice(0, binaryP.length - k - 1) + '0' + binaryP.slice(binaryP.length - k);
    return binaryP;
  },
  hasPermission: function (p, k) {
    let binaryP = p.padStart(k + 1, '0');
    return binaryP.slice(binaryP.length - k - 1, binaryP.length - k) == '1';
  },
  getnowappid() {
    let accountInfo = qq.getAccountInfoSync();
    return accountInfo.miniProgram.appId;
  },
  longtime2s(_time, ms) {
    let time = Number(_time);
    if (!ms) time *= 1000;
    if (time <= 0) return '0秒';
    let ret = '';
    let d = Math.floor(time / (1000 * 60 * 60 * 24));
    if (d > 0) {
      ret += `${d.toFixed(0)}天`;
    }
    time -= d * (1000 * 60 * 60 * 24);
    let h = Math.floor(time / (1000 * 60 * 60));
    if (h > 0) {
      ret += `${h}小时`;
    }
    time -= h * (1000 * 60 * 60);
    let m = Math.floor(time / (1000 * 60));
    if (m > 0) {
      ret += `${m}分钟`;
    }
    time -= m * (1000 * 60);
    let s = Math.floor(time / 1000);
    if (s > 0) {
      ret += `${s}秒`;
    }
    time -= s * 1000;
    return ret;
  },
  times2time(times) {
    let date = new Date(Number(times));
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month < 10 ? `0${month}` : month;
    let day = date.getDate();
    day = day < 10 ? `0${day}` : day;
    let hour = date.getHours();
    hour = hour < 10 ? `0${hour}` : hour;
    let minute = date.getMinutes();
    minute = minute < 10 ? `0${minute}` : minute;
    //const second = addZero(date.getSeconds());

    let dateString = `${year}-${month}-${day} ${hour}:${minute}`;
    return dateString;
  },
  LoginSuccess: function (code) {
    let utoken = '';
    try {
      let value = qq.getStorageSync('u_token')
      if (value) utoken = value;
    } catch (e) { }
    qq.request({
      url: `${this.globalData.host}/code2session/code/${code}/${utoken}`,
      success: res => {
        if (res.data && res.data.errcode == 0) {
          try {
            this.globalData.token = res.data.token;
            qq.setStorageSync('u_token', res.data.token);
          } catch (e) { }
          this.getGuildInfo();
        } else {
          this.globalData.userinfo.open_guild_id = '';
          qq.showModal({
            title: '登录失败',
            content: '抱歉，小程序登录失败，请您重新从机器人资料卡进入小程序',
            showCancel: false
          });
        }
      },
      fail: res => {
        this.globalData.userinfo.open_guild_id = '';
        qq.showModal({
          title: '登录失败',
          content: '抱歉，小程序登录失败，请您重新从机器人资料卡进入小程序',
          showCancel: false
        });
      }
    })
  },
  ClkTask: function () {
    const sthis = this;
    qq.checkSession({
      fail() {
        sthis.globalData.token = '';
        sthis.globalData.userinfo.open_guild_id = '';
        qq.login({
          success: res => {
            if (res.code) {
              sthis.LoginSuccess(res.code);
            }
          }
        });
      }
    })
  },
  RefTask: function () {
    let pages = getCurrentPages();
    for (let s of pages) {
      if (s.RefreshCallBack) {
        s.RefreshCallBack();
      }
    }
  },
  SSTask: function () {
    let pages = getCurrentPages();
    for (let s of pages) {
      if (s.SSTaskCallback) {
        s.SSTaskCallback();
      }
    }
  },
  LoadTast: function () {
    let pages = getCurrentPages();
    for (let s of pages) {
      if (s.LoadTast) {
        s.LoadTast();
      }
    }
  },
  refLoginData(guildid, data) {
    this.globalData.open_guild_id = guildid;
    try {
      qq.setStorageSync('guildid', guildid);
    } catch (e) { }
    let url = data.guild_head;
    if (url) {
      if (url.includes('/40?t=')) {
        url = url.replace('/40?t=', '/0?t=');
      }
      data.guild_head = url;
      this.globalData.userinfo = { ...this.globalData.userinfo, ...data };
    }
    this.getLoginInfo();
    this.LoadTast();
  },
  getHost() {
    return this.globalData.host;
  },
  getGuildInfo: function () {
    if (!this.globalData.open_guild_id) return;
    qq.getGuildInfo({
      open_guild_id: this.globalData.open_guild_id,
      success: res => {
        try {
          let token = this.globalData.token;
          let pack = {
            encryptedData: res.encryptedData,
            iv: res.iv,
            token: token,
            open_guild_id: this.globalData.open_guild_id
          };
          qq.request({
            url: `${this.globalData.host}/decodedata`,
            data: pack,
            method: 'POST',
            success: res => {
              let ret = res.data;
              if (ret.errcode == 0) {
                ret = ret.data;
                ret = JSON.parse(ret);
                if (ret.retcode == 0) {
                  if (ret.data.member_role == undefined) { //实际上登录失败
                    this.globalData.userinfo.open_guild_id = '';
                  } else {
                    let url = ret.data.guild_head;
                    if (url.includes('/40?t=')) {
                      url = url.replace('/40?t=', '/0?t=');
                    }
                    ret.data.guild_head = url;
                    this.globalData.userinfo = { ...this.globalData.userinfo, ...ret.data };
                  }
                  if (this.globalData.userinfo.open_guild_id) this.getLoginInfo();
                  this.LoadTast();
                } else {
                  this.globalData.userinfo.open_guild_id = '';
                  qq.showModal({
                    title: '登录失败',
                    content: '抱歉，小程序登录失败，请您重新从机器人资料卡进入小程序',
                    showCancel: false
                  });
                }
              } else {
                this.globalData.userinfo.open_guild_id = '';
                qq.showModal({
                  title: '登录失败',
                  content: '抱歉，小程序登录失败，请您重新从机器人资料卡进入小程序',
                  showCancel: false
                });
              }
            },
            fail: res => {
              this.globalData.userinfo.open_guild_id = '';
              qq.showModal({
                title: '登录失败',
                content: '抱歉，小程序登录失败，请您重新从机器人资料卡进入小程序',
                showCancel: false
              });
            }
          })
        } catch (e) {
          this.globalData.userinfo.open_guild_id = '';
          qq.showModal({
            title: '登录失败',
            content: '抱歉，小程序登录失败，请您重新从机器人资料卡进入小程序',
            showCancel: false
          });
        }
      },
      fail: res => {
        if (this.globalData.online) {
          this.globalData.userinfo.open_guild_id = '';
          qq.showModal({
            title: '登录失败',
            content: '抱歉，小程序登录失败，请您重新从机器人资料卡进入小程序',
            showCancel: false
          });
        }
        if (!this.globalData.online) this.LoadTast();
      }
    })
  },
  getLoginInfo: function () {
    qq.request({
      url: `${this.globalData.host}/fetchuserinfo/${this.globalData.token}`,
      method: 'GET',
      success: res => {
        let ret = res.data;
        if (ret.errcode == 0) {
          this.globalData.userinfo.permissions = ret.p;
          this.globalData.userinfo.points = ret.points;
          this.globalData.userinfo.exptime = ret.exptime;
        } else {
          this.globalData.token = '';
          this.globalData.userinfo.open_guild_id = '';
          this.globalData.userinfo.exptime = '';
          qq.showToast({
            title: '登录失效',
            icon: 'none'
          })
        }
        let pages = getCurrentPages();
        for (let s of pages) {
          if (s.ReSetCallBack) {
            s.ReSetCallBack();
          }
        }
      }
    })
  }
})
