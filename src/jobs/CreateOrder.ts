import cron from 'node-cron'
import logger from '../utils/logger'
import OrderService from '../services/Order'

class CreateOrderJob {
    public init(): void {
        cron.schedule('*/5 * * * *', async () => {
            try {
                logger.info("Starting a CreateOrderJob")
                await OrderService.startDealRegisterOperation()
                logger.info("Finished CreateOrderJob")
            } catch (e) {
                logger.error(e)
                logger.info("Finished CreateOrderJob with Errors")
            }
        });
    }
}

export default new CreateOrderJob();