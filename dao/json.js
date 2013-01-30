module.exports.UIDString = 'abcdefghijklmnopqrstuvwxyz'; // 用户Uid字母表
module.exports.IDString = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'; // 文章、标签、评论、信息等id的字母表
module.exports.UserPre = {
    name: new Buffer(15 * 1024) // 注册用户时给用户文档预分配文档空间15k，注册时用户初始数据大小只有1k多
};
module.exports.User = {
    _id: 0,
    // Number，用户的数据库id，整数，对外显示Uid形式为‘Uxxxxx’，其中x为Uid字母表字符，长度>=5
    // 通过users的convertID方法相互转换。初始化时第一用户管理员Uid为‘Uadmin’，对应_id为61061
    name: '',
    // String，用户名，小写英文字母、数字、下划线_、或者汉字，5至15字节长（2至5汉字）
    email: '',
    // String，用户邮箱，name 或 email 均可做为登录名
    passwd: '',
    // String，SHA256(用户密码)
    resetpwdKey: '',
    // String，密码重置密钥
    resetDate: 0,
    // Date，密码重置时间
    loginAttempts: 0,
    // 尝试登录次数（失败登录次数），成功登录后置0，5次失败则锁定，并发送解锁邮件至email
    locked: false,
    // Boolean，是否锁定帐号，锁定后禁止登录
    social: { // 第三方Auth认证信息，预留，待完善
        weibo: {
            id: '',
            name: ''
        },
        qq: {
            id: '',
            name: ''
        },
        google: {
            id: '',
            name: ''
        },
        baidu: {
            id: '',
            name: ''
        }
    },
    sex: '',
    // String，用户性别，male/female
    role: 'guest',
    // String，用户角色，admin/editor/author/user/guest/forbid
    avatar: '',
    // String，用户头像URI，追加'?s=size'即可获得对应size的头像
    desc: '',
    // String，用户简介，小于240字节（80汉字）
    date: 0,
    // Date，用户注册时间
    score: 0,
    // Number，用户积分
    readtimestamp: 0,
    // Date，用户已浏览文章的最新时间戳
    lastLoginDate: 0,
    // Date，用户最后登录时间
    login: [{ // 用户登录历史记录
        date: 0,
        // Date
        ip: '0.0.0.0' // String
    }],
    fans: 0,
    // Number，用户粉丝数量
    fansList: [],
    // Array，用户粉丝_id列表数组
    follow: 0,
    // Number，用户关注数量
    followList: [],
    // Array，用户关注_id列表数组
    tagsList: [],
    // Array，用户标签_id列表数组
    articles: 0,
    // Number，用户发表文章数量
    articlesList: [],
    // Array，用户发表的文章_id列表数组
    collections: 0,
    // Number，用户创建的合集数量
    collectionsList: [],
    // Array，用户创建的合集_id列表数组
    comments: 0,
    // Number，用户发表的评论数量
    commentsList: [],
    // Array，用户发表的评论_id列表数组
    collect: 0,
    // Number，用户收藏的文章数量
    collectList: [],
    // Array，用户收藏的文章_id列表数组
    messages: { // 用户未读消息信息，阅读后清空
        article: [],
        // Array，用户消息相关文章_id列表数组，文章被评论、被收藏触发
        collection: [],
        // Array，用户消息相关合集_id列表数组，合集被评论触发
        comment: [],
        // Array，用户消息相关评论_id列表数组，评论被引用触发
        fan: [],
        // Array，用户消息相关粉丝_id列表数组，增加粉丝触发
        receive: [] // Array，用户接收短信_id列表数组，收到站内短信触发
    },
    receiveList: [],
    // Array，用户接收的站内短信_id列表数组
    sendList: [] // Array，用户发出的站内短信_id列表数组
};

module.exports.Article = {
    _id: 0,
    // Number，文章的数据库id，整数，对外显示ID形式为‘Axxx’，其中x为id字母表字符，长度>=3
    author: 0,
    // Number，文章作者_id
    date: 0,
    // Number，文章创建时间
    display: 0,
    // Number，文章状态，0:公开;1:朋友（相互关注的）可见;2:作者、管理员、编辑可见;3:作者、管理员、编辑可见，禁止编辑
    commend: 0,
    // Number，是否推荐，0:正常;1:推荐;2:置顶
    title: '',
    // String，文章标题，小于90字节（30汉字）
    summary: '',
    // String，文章摘要，小于240字节（80汉字）
    cover: '',
    //cover img
    content: '',
    // String，文章内容，小于1024×20字节（6826汉字）
    draft: '',
    // String，文章内容存稿|草稿，未发表的版本，小于1024×20字节（6826汉字）
    hots: 0,
    // Number，文章热度，访问+1，评论+2,支持+2,收藏+5,推荐+20
    visitors: 0,
    // Number 访问次数
    updateTime: 0,
    // Date 最后更新时间，包括文章更新和新评论
    update: [{ // 文章修改更新记录，
        _id: 0,
        // Number，修改者的_id
        date: 0 // Date，修改时间
    }],
    collection: 0,
    // Number，所属合集的_id
    tagsList: [],
    // Array，文章标签的_id列表数组，最多允许5个标签
    favors: 0,
    // Number，支持的数量
    favorsList: [],
    // Array，支持者的_id列表数组
    collectors: 0,
    // Number，收藏的数量
    collectorsList: [],
    // Array，收藏者的_id列表数组
    comment: true,
    comments: 0,
    // Number，用户发表评论数
    commentsList: [] // Array，评论的_id列表数组
};

module.exports.Comment = {
    _id: 0,
    // Number，评论的数据库id，整数，对外显示ID形式为‘Cxxx’，其中x为id字母表字符，长度>=3
    author: 0,
    // Number，评论作者的_id
    article: 0,
    // Number，评论（引用）文章的_id
    refer: [],
    //引用的评论，
    date: 0,
    // Date，评论发表时间
    content: '',
    // String，评论内容，小于420字节（140汉字），引用评论部分不计入
    favors: 0,
    // Number，支持的数量
    favorsList: [],
    // Array，支持者的_id列表数组
    opposes: 0,
    // Number，反对者的数量
    opposesList: [] // Array，反对者的_id列表数组
};

module.exports.Collection = {
    _id: 0,
    // Number，合集的数据库id，整数，对外显示ID形式为‘Oxxx’，其中x为id字母表字符，长度>=3
    author: 0,
    // Number，合集创建者的_id
    date: 0,
    // Date，创建时间
    title: '',
    // String，合集标题，小于90字节（30汉字）
    summary: '',
    // String，合集摘要，小于240字节（80汉字）
    cover: '',
    //cover img
    subsection: [{ // 合集由分部组成，分部由文章组成
        title: '',
        // String，合集分部标题，小于90字节（30汉字）
        summary: '',
        // String，合集分部摘要，小于240字节（80汉字
        topics: [] // 分部中的文章_id
    }],
    articles: 0,
    // Number，包含的文章数量
    updateTime: 0,
    // Date，最后更新时间
    update: [{ // 合集修改更新记录，
        _id: 0,
        // Number，修改者的_id
        date: 0 // Date，修改时间
    }],
    comment: true,
    comments: 0,
    // Number，用户发表评论数
    commentsList: [] // Array，评论的_id列表数组
};

module.exports.Message = {
    _id: 0,
    // Number，消息数据库id，整数，对外显示ID形式为‘Mxxx’，其中x为id字母表字符，长度>=3
    author: 0,
    // Number，消息发送者的_id
    receiver: [{ // 消息接收者名单列表
        _id: 0,
        // Number，接收者的_id
        read: false // Boolean，接收者是否阅读消息，fasle为未读
    }],
    date: 0,
    // Date，消息发送时间
    title: '',
    // String，消息标题，小于90字节（30汉字）
    content: '' // String，消息内容，小于240字节（80汉字）
};

module.exports.Tag = {
    _id: 0,
    // Number，标签数据库id，整数，对外显示ID形式为‘Txxx’，其中x为id字母表字符，长度>=3
    tag: '',
    // String，标签名称，英文单词或中文词组（大于两个字）
    articles: 0,
    // Number，包含的文章数量
    articlesList: [],
    // Array，包含文章的_id列表数组
    users: 0,
    // Number，包含的用户数量
    usersList: [] // Array，包含用户的_id列表数组
};

module.exports.GlobalConfig = {
    _id: 'GlobalConfig',
    domain: 'jsgen.org',
    //网站访问域名
    title: 'jsGen',
    //网站名称
    url: 'www.jsgen.org',
    logo: '/static/img/logo.png',
    email: '',
    description: 'You can generate a beautiful website or blog with javascript!',
    //网站副标题
    metatitle: '',
    //Meta标题
    metadesc: '',
    //Meta描述
    date: 0,
    //上线时间
    visit: 0,
    //总访问次数
    users: 0,
    //总注册用户数量
    topics: 0,
    //总主题数量
    comments: 0,
    //总评论数量
    maxOnlineNum: 1,
    //最大用户在线记录数量
    maxOnlineTime: 0,
    //最大用户在线记录时间，年月日时分
    visitHistory: [],  //网站访问数据文档，由于文档大小受限，一个文档记录满之后新开一个文档，并追加到此数组
    ArticleTagsMax: 5,
    UserTagsMax: 5,
    TitleMinLen: 9,
    TitleMaxLen: 90,
    SummaryMinLen: 24,
    SummaryMaxLen: 240,
    CommentMinLen: 15,
    CommentMaxLen: 420,
    ContentMinLen: 240,
    ContentMaxLen: 20480,
    UserNameMinLen: 5,
    UserNameMaxLen: 15,
    register: true,
    headerMenu: [{title:'',url:'',target:'_self',sub:null},],
    footerMenu: [{title:'',url:'',target:'_self',sub:null},],
};
