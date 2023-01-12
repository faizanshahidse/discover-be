/** Third party dependencies*/
const { Router } = require('express');


/** Local dependencies and functions */
const {
    streamListingController,
} = require('./stream.controller');

const {
    verifyToken,
    schemaValidator,
} = require('../../middlewares');


const router = Router();

/**
 * Get Discover Stream
 *
 * @authenticated
 *
 * @group Discover-Stream
 *
 * @response {
    "response": true,
    "status_code": 200,
    "message": "success",
    "error_msgs": {},
    "data": [
        {
            "type": "news",
            "document": {
                "id": "63be0b11106f779b273537cf",
                "title": "Dummy News",
                "description": "News Description",
                "show_comments": true,
                "show_likes": true,
                "total_likes": 4,
                "total_comments": 2,
                "total_views": 80,
                "is_liked": 0,
                "news_slides": [
                    {
                        "id": "63be0b11106f779b273537d0",
                        "name": "Test News",
                        "title": "Dummy Slide",
                        "description": "Demmu Slide description",
                        "image": "media/photos/5899dfec-bc18-4716-a255-db1a4003d06b.jpeg",
                        "height": 348,
                        "width": 620
                    }
                ],
                "created_at": "2023-01-11T01:04:17.726Z"
            },
            "id": "63be0b11106f779b273537cf"
        },
        {
            "type": "news",
            "document": {
                "id": "63bcb95c984a079f0060a0f8",
                "title": "Dummy News",
                "description": "News Description",
                "show_comments": true,
                "show_likes": true,
                "total_likes": 4,
                "total_comments": 2,
                "total_views": 286,
                "is_liked": 0,
                "news_slides": [
                    {
                        "id": "63bcb95c984a079f0060a0f9",
                        "name": "Test News",
                        "title": "Dummy Slide",
                        "description": "Demmu Slide description",
                        "image": "media/photos/5899dfec-bc18-4716-a255-db1a4003d06b.jpeg",
                        "height": 348,
                        "width": 620
                    }
                ],
                "created_at": "2023-01-10T01:03:24.013Z"
            },
            "id": "63bcb95c984a079f0060a0f8"
        },
        {
            "type": "news",
            "document": {
                "id": "63bc1890e500bef30b36ef93",
                "title": "New News Test",
                "description": "New News",
                "show_comments": true,
                "show_likes": true,
                "total_likes": 2,
                "total_comments": 0,
                "total_views": 157,
                "is_liked": 0,
                "news_slides": [
                    {
                        "id": "63bc4c8d9f731bd949398818",
                        "name": "Demo",
                        "title": "Demo News",
                        "description": "asdasd",
                        "image": "media/photos/915c303c-35e3-4587-a849-0c16cffa6111.png",
                        "height": 1165,
                        "width": 1080
                    }
                ],
                "created_at": "2023-01-09T17:19:09.076Z"
            },
            "id": "63bc1890e500bef30b36ef93"
        },
        {
            "type": "news",
            "document": {
                "id": "63b7738b723aa3fd14963416",
                "title": "✅😁🎥❌👆 'ADummy' News Dummy NewsDummy News",
                "description": "News Description",
                "show_comments": true,
                "show_likes": true,
                "total_likes": 7,
                "total_comments": 7,
                "total_views": 340,
                "is_liked": 0,
                "news_slides": [
                    {
                        "id": "63b7ed5b5c124ce942302f89",
                        "name": "Test News",
                        "title": "✅😁🎥❌👆 'ADummy' NewsDummy News Dummy N",
                        "description": "Great expectations.\n\n“The advantage of Arsenal and Manchester United is they don't have to win the Premier League by 20 points in November like Manchester City have to and this is sometimes a problem,\" Pep Guardiola stated to the media.",
                        "image": "media/photos/5899dfec-bc18-4716-a255-db1a4003d06b.jpeg",
                        "height": 606,
                        "width": 1080
                    }
                ],
                "created_at": "2023-01-06T01:04:11.753Z"
            },
            "id": "63b7738b723aa3fd14963416"
        },
        {
            "type": "news",
            "document": {
                "id": "63b6be8b0c00d2468b55d698",
                "title": "News Test",
                "description": "Testing News 101111",
                "show_comments": true,
                "show_likes": true,
                "total_likes": 7,
                "total_comments": 6,
                "total_views": 434,
                "is_liked": 0,
                "news_slides": [
                    {
                        "id": "63b7ed935c124ce942302f96",
                        "name": "Pep Guardiola",
                        "title": "✅👆🏻❌🎥 Rivals hand Rivals upper  ",
                        "description": "Great expectations.\n\n“The advantage of Arsenal and Manchester United is they don't have to win the Premier League by 20 points in November like Manchester City have to and this is sometimes a problem,\" Pep Guardiola stated to the media.",
                        "image": "media/photos/a87fcbe3-f483-4557-8888-539ff83d5abb.jpeg",
                        "height": 1350,
                        "width": 1080
                    }
                ],
                "created_at": "2023-01-05T12:11:55.332Z"
            },
            "id": "63b6be8b0c00d2468b55d698"
        },
        {
            "type": "news",
            "document": {
                "id": "63b6220cf9f9987e37cae00f",
                "title": "Dummy News",
                "description": "News Description",
                "show_comments": true,
                "show_likes": true,
                "total_likes": 5,
                "total_comments": 4,
                "total_views": 573,
                "is_liked": 0,
                "news_slides": [
                    {
                        "id": "63b6220cf9f9987e37cae010",
                        "name": "Test News",
                        "title": "Dummy Slide",
                        "description": "Demmu Slide description",
                        "image": "media/photos/5899dfec-bc18-4716-a255-db1a4003d06b.jpeg",
                        "height": 348,
                        "width": 620
                    }
                ],
                "created_at": "2023-01-05T01:04:12.096Z"
            },
            "id": "63b6220cf9f9987e37cae00f"
        },
        {
            "type": "match",
            "document": {
                "id": "3860682",
                "tournament_stageFK": "878739",
                "startDate": "2022-05-11T19:30:00.000Z",
                "status_type": "Finished",
                "tournament_templateFK": "40",
                "participants": [
                    {
                        "id": "8342",
                        "name": "Club Bruges",
                        "result": {
                            "id": "56897727",
                            "event_participantsFK": "14126354",
                            "result_typeFK": "6",
                            "result_code": "runningscore",
                            "value": "1",
                            "n": "1",
                            "ut": "2022-05-11 19:52:46"
                        },
                        "results_new": [
                            {
                                "id": "56897724",
                                "event_participantsFK": "14126354",
                                "result_typeFK": "1",
                                "result_code": "ordinarytime",
                                "value": "1",
                                "n": "1",
                                "ut": "2022-05-11 19:52:48"
                            },
                            {
                                "id": "56897727",
                                "event_participantsFK": "14126354",
                                "result_typeFK": "6",
                                "result_code": "runningscore",
                                "value": "1",
                                "n": "1",
                                "ut": "2022-05-11 19:52:46"
                            },
                            {
                                "id": "57463596",
                                "event_participantsFK": "14126354",
                                "result_typeFK": "5",
                                "result_code": "halftime",
                                "value": "0",
                                "n": "0",
                                "ut": "2022-05-11 19:18:02"
                            }
                        ],
                        "team_logo": "https://enetpulse-images.s3.amazonaws.com/team/8342.png",
                        "shirt_color": "#0078bf",
                        "is_favourite": false
                    },
                    {
                        "id": "7978",
                        "name": "Union St.Gilloise",
                        "result": {
                            "id": "56897725",
                            "event_participantsFK": "14126355",
                            "result_typeFK": "1",
                            "result_code": "ordinarytime",
                            "value": "0",
                            "n": "2",
                            "ut": "2022-05-11 20:18:04"
                        },
                        "results_new": [
                            {
                                "id": "56897723",
                                "event_participantsFK": "14126355",
                                "result_typeFK": "6",
                                "result_code": "runningscore",
                                "value": "0",
                                "n": "2",
                                "ut": "2022-05-11 20:18:04"
                            },
                            {
                                "id": "56897725",
                                "event_participantsFK": "14126355",
                                "result_typeFK": "1",
                                "result_code": "ordinarytime",
                                "value": "0",
                                "n": "2",
                                "ut": "2022-05-11 20:18:04"
                            },
                            {
                                "id": "57463597",
                                "event_participantsFK": "14126355",
                                "result_typeFK": "5",
                                "result_code": "halftime",
                                "value": "0",
                                "n": "0",
                                "ut": "2022-05-11 19:18:02"
                            }
                        ],
                        "team_logo": "https://enetpulse-images.s3.amazonaws.com/team/7978.png",
                        "shirt_color": "#FFFF00",
                        "is_favourite": false
                    }
                ],
                "elapsed": {
                    "id": "1711021",
                    "elapsed": "90",
                    "injury_time": "yes",
                    "injury_time_elapsed": "6",
                    "time_type": "minute",
                    "n": "97",
                    "ut": "2022-05-11 20:22:55"
                },
                "is_favourite": false,
                "live": "yes",
                "round": "4",
                "friends_prediction": []
            },
            "id": "3860682"
        }
    ]
}
 *
 * @queryParam {integer} limit required
 */
router
    .get(
        '/',
        verifyToken,
        schemaValidator('streamQuery'),
        streamListingController,
    )


module.exports = router;
