export interface searchTableShowI {
    code?: number
    data?: searchTableShowDataDI
    message?: "ok" | "error"
}

export interface searchTableShowDataDI {
    currentPage: number
    lastPage: number
    list: searchTableShowDataI[],
    perPage: number
    total: number
}
interface searchTableShowDataI {
    avatarUrl: string
    avgScore: number
    descripttion: string
    formId: string
    id: string
    istopAt: null | string
    orgId: string
    orgName: string
    platformScore: number
    serviceTypeId: string
    serviceTypeName: string
    title: string
    totalDeal: number
    userId: string
}