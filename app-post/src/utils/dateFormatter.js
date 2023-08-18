export const dateFormatter=(date)=>{
    const dateFormatted = new Date(date)
    const result=`${dateFormatted.getMonth() + 1}-${dateFormatted.getDate()}-${dateFormatted.getFullYear()} ${dateFormatted.getHours()}:
    ${dateFormatted.getMinutes().toString().padStart(2, '0')}`

    return result
}
