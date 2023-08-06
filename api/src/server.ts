import config from 'config'
import { app } from "./app";

const port = config.get<string>('server.port')
app.listen(port, () =>
    console.log(`Server is running on port ${port}`)
);