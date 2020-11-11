const CronJob = require('cron').CronJob;

class Scheduler {

	constructor() {
		this.jobs = []
	}

	scheduleEvent(event, callback) {
		if (event.type === "weekly") { this.setupWeeklyEvent(event.getDate, callback) }
		if (event.type === "minutely") { this.setupMinutelyEvent(callback) }
	}
	
	setupMinutelyEvent(callback) {
		let cronExpression = `* * * * *`
		let cronJob = new CronJob(cronExpression, callback)
		cronJob.start()
		this.jobs.push(cronJob)
	}

	setupWeeklyEvent(date, callback) {
		let weekDay = date.getDay() === 7 ? 0 : date.getDay()
		let hour = date.getHours()
		let minute = date.getMinutes() - 1
		let cronExpression = `${minute} ${hour} * * ${weekDay}`
		let cronJob = new CronJob(cronExpression, callback)
		cronJob.start()
		this.jobs.push(cronJob)
	}
}

const scheduler = new Scheduler()

scheduleEvent = (event, callback) => scheduler.scheduleEvent(event, callback)


module.exports = { scheduleEvent }