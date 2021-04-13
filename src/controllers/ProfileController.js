const Profile = require("../model/Profile")

module.exports = {
    async index(request, response) {
        const profile = await Profile.get()
        return response.render("profile", { profile: profile })
    },

    async update(request, response) {
        // request.body para pegar os dados
        const data = request.body
        // definir quantas semanas tem num ano: 52
        const weeksPerYear = 52
        // remover as semanas de férias do ano, para pegar quantas semanas tem em 1 mês
        const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12
        // total de horas trabalhadas na semana
        const weekTotalHours = data["hours-per-day"] * data["days-per-week"]
        // total de horas trabalhadas no mês
        const monthlyTotalHours = weekTotalHours * weeksPerMonth
        // qual será o valor da minha hora?
        const valueHour = data["monthly-budget"] / monthlyTotalHours
        //atualiza o pofile
        const profile = await Profile.get()

        Profile.update({
            ...profile,
            ...request.body,
            "value-hour": valueHour
        }) 
        
        
        return response.redirect("/profile")
    }
}