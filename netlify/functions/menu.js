const fetch = require("node-fetch")
const cheerio = require("cheerio")

exports.handler = async function () {

    const res = await fetch("https://www.hknu.ac.kr/diet/kor/2/view.do")
    const html = await res.text()

    const $ = cheerio.load(html)

    const dates = $(".dietDate")
    const menus = $(".dietCont")

    let result = []

    dates.each((i, el) => {

        const date = $(el).text().trim()

        const menu1 = $(menus[i*2])
            .text()
            .split("\n")
            .map(x => x.trim())
            .filter(x => x && !x.includes("맛난한끼"))

        const menu2 = $(menus[i*2+1])
            .text()
            .split("\n")
            .map(x => x.trim())
            .filter(x => x && !x.includes("건강한끼"))

        result.push({
            date,
            menu1,
            menu2
        })
    })

    return {
        statusCode: 200,
        body: JSON.stringify(result)
    }
}
