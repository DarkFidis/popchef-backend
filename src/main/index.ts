import "reflect-metadata"

import { run } from "./worker"

run().catch(err => console.error(err))
