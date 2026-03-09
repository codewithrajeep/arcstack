import { logger } from "./infrastructure/http/middleware/logger";
import app from "./app";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    logger.info(`Server is running on port: http://localhost:${PORT}`)
})