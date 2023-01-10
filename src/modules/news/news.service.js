/** Organization packages and dependencies */
const { NewsQueries } = require('feed_media_433/repositories/news/NewsQueries');

const NotificationPrompt = require('feed_media_433/helpers/general/NotificationPrompt');


/** Application configuration and declaration */
const newsInstance = new NewsQueries();

const notificationPrompt = new NotificationPrompt();


/** Application declarations and configurations */
const {
    IS_SHOW_PROMPT,
} = process.env;



/** Wrapper for news listing to mock News lisitng from Feed & Media (Home Media)
 * @note a lot of pre-cursor objects need to be created to be compatible with already working News Services (Referenced as Queries)
 * 
 */
const newsListing = async (request, response, next) => {
    const {
        user: { id: userId },
        query: {
            news_id: newsId,
            limit = 6,
            offset = 0,
            first_page_record_id: firstPageRecordId = '',
            last_page_record_id: lastPageRecordId = '',
            device_id,
        },
    } = request;

    let body = {
        userId,
        newsId,
        limit: +limit,
        offset: +offset,
        firstPageRecordId,
        lastPageRecordId,
        device_id,
        isShowPrompt: false
    };

    if (JSON.parse(IS_SHOW_PROMPT)) {
        body.isShowPrompt = await notificationPrompt.isNotificationPromptShow(body.userId, body.device_id);

    }
    
    const listing = await newsInstance.index(request, response, next, body);

    return listing;
}


module.exports = {
    newsListing,
}