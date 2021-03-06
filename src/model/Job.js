const configDatabase = require('../db/config')

module.exports = {
    async get() {
        const database = await configDatabase()

        const jobs = await database.all(`SELECT * FROM jobs`)

        await database.close()

        return jobs.map(job => ({
            id: job.id,
            name: job.name,
            "daily-hours": job.daily_hours,
            "total-hours": job.total_hours,
            created_at: job.created_at 
        }))
    },

    async create(newJob) {
        const database = await configDatabase()

        try {
            await database.run(`INSERT INTO jobs (
                name, 
                daily_hours, 
                total_hours, 
                created_at
            ) VALUES (
                "${newJob.name}", 
                ${newJob["daily-hours"]}, 
                ${newJob["total-hours"]}, 
                ${newJob.created_at}
            )`)
        } catch (error) {
            console.log(error);
        } finally {
            await database.close()
        }
    },

    async update(updatedJob, jobId) {
        const database = await configDatabase()

        try {
            await database.run(`
                UPDATE jobs SET
                    name = "${updatedJob.name}",
                    daily_hours = ${updatedJob["daily-hours"]},
                    total_hours = ${updatedJob["total-hours"]}
                WHERE id = ${jobId}`)
        } catch (error) {
            console.log(error);
        } finally {
            await database.close()
        }
    },
    
    async delete(id) {
        const database = await configDatabase()

        try {
            await database.run(`DELETE FROM jobs WHERE id = ${id}`)
        } catch (error) {
            console.log(error);
        } finally {
            await database.close();
        }
    }
}