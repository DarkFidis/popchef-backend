import { log } from './log'
import { webServer } from './server'
import { Workerable } from './types/worker'
import {pgClient} from "./postgres";
import {seedDatabase} from "./seed/movies";

const worker: Workerable = {
  handleSignal: async (name) => {
    log.info(`received ${name} signal : stopping`)
    await worker.shutdown()
  },
  run: async () => {
    const signals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM']
    signals.forEach((signal) => {
      process.on(signal, () => {
        void worker.handleSignal(signal)
      })
    })
    process.on('message', (msg) => {
      log.info(`received message : ${msg}`)
      if (msg === 'shutdown') {
        log.info(`received shutdown message : stopping`)
        void worker.shutdown(0)
      }
    })
    await pgClient.start()
    await webServer.init()
    await webServer.start()
    await seedDatabase()
    log.info(`/!\\ to stop worker : kill -s SIGTERM ${process.pid}`)
  },
  shutdown: async (exitCode = 1) => {
    try {
      await webServer.stop()
      await pgClient.stop()
      process.exit(exitCode)
    } catch (err) {
      log.error(err)
      process.exit(1)
    }
  },
}

export = worker
