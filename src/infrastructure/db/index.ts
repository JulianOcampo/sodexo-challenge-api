import mongoose from 'mongoose'

interface MongoDBConnectionOptions {
  dbUri: string
}

export function loadDBConnection({dbUri}: MongoDBConnectionOptions) {
  let db: typeof mongoose | undefined = undefined

  return {
    start: async () => {
      db = await mongoose.connect(dbUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      console.log('- Connected to MongoDB')
    },
    close: async () => {
      if (db) await db.disconnect()
      console.log('- Closed MongoDB connection')
    },
  }
}
