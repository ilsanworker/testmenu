async function loadMenu(){

    const res = await fetch("/.netlify/functions/menu")
    const data = await res.json()

    const container = document.getElementById("menu")

    data.forEach(day => {

        const div = document.createElement("div")

        div.innerHTML = `
        <h2>${day.date}</h2>

        <b>맛난한끼</b>
        <ul>
        ${day.menu1.map(m => `<li>${m}</li>`).join("")}
        </ul>

        <b>건강한끼</b>
        <ul>
        ${day.menu2.map(m => `<li>${m}</li>`).join("")}
        </ul>
        `

        container.appendChild(div)
    })
}

loadMenu()
