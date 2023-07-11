import { ladderlistItem } from "../views/Search/index"

type nameOrid = "name" | "id"

export function clearOtherChildren(data: ladderlistItem[]): void {
    data.forEach(element => {
        if (element.children && element.children.length > 0 && element.children[0].children == null) {
            element.children = []
        } else {
            clearOtherChildren(element.children as any)
        }

    });
}
export function classification(data: ladderlistItem[]) {
    const table1 = [] as string[]
    const table2 = [] as string[][]
    data.forEach(element => {
        table1.push({ name: element.name, id: element.id })
        let arr = [] as string[]
        element.children?.forEach(item => {
            arr.push({ name: item.name, id: item.id })
        })
        table2.push(arr)
    });
    return { table1, table2 }
}