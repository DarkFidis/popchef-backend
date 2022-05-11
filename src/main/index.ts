import "reflect-metadata"

import { log } from './log'
import { run as runWorker } from './worker'

runWorker().catch((err) => {
  log.error(err)
  process.exit(1)
})
