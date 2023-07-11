export interface serviceDataI {
    pageNum: number //页码
    pageSize: number //煤业数量
    keywords: string //搜索内容
    serviceTypeId: string //服务类型
    serviceTypeId2: string //二级分类
    technicalld: string //技术领域
    province: string  //地区
    dataOrigin: string //数据来源
    logicStatus: number //默认为1 
}
export interface ladderlist {
    code: number
    data: ladderlistItem[]
    message: "ok" | "error"
}

export interface ladderlistItem {
    id: string
    name: string
    children?: ladderlistItem[] | null
}