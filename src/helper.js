const { validationResult } = require("express-validator");
const Friend = require("./models/Friend");
const AWS = require("aws-sdk");
// const mongoose = require("mongoose")
// const ObjectId = mongoose.Types.ObjectId;
class Helper {
  static apiFailedResponse(
    message,
    data,
    error_messages,
    statusCode = 500,
    stack
  ) {
    return {
      response: false,
      status_code: statusCode,
      message: message,
      error_msgs: error_messages,
      data: data,
      status: `${statusCode}`.startsWith("4") ? "fail" : "error",
      isOperational: true,
      stack: stack,
    };
  }

  static apiSuccessResponse(message, data, error_messages = {}) {
    return {
      response: true,
      status_code: 200,
      message: message,
      error_msgs: error_messages,
      data: data,
    };
  }

  static ucwords(str) {
    return (str + "").replace(/^([a-z])|\s+([a-z])/g, function ($1) {
      return $1.toUpperCase();
    });
  }

  static checkValidation(req) {
    const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions
    if (!errors.isEmpty()) {
      let validationErrors = [];
      errors
        .array({
          onlyFirstError: true,
        })
        .forEach((error, i) => {
          validationErrors[i] = error.msg;
        });
      return {
        success: false,
        message: "Validation errors",
        errors: validationErrors,
        error_code: 400,
        data: [],
      };
    } else {
      return { success: true };
    }
  }

  async userFriendshipStatus(current_user_id, user_id) {
    try {
      let conditions = {
        $or: [
          {
            $and: [{ created_by: current_user_id }, { user_id: user_id }],
          },
          {
            $and: [{ created_by: user_id }, { user_id: current_user_id }],
          },
        ],
      };
      const friendship_status = await Friend.findOne(conditions);
      if (friendship_status == null) {
        return { status: 0, request_id: "" };
      } else {
        if (friendship_status.status == "friend") {
          return { status: 1, request_id: friendship_status._id };
        } else {
          if (friendship_status.created_by == current_user_id) {
            return { status: 2, request_id: friendship_status._id };
          } else {
            return { status: 3, request_id: friendship_status._id };
          }
        }
      }
    } catch (err) {
      return {
        success: false,
        message: err.message,
        data: {},
        errors: {},
        error_code: 500,
      };
    }
  }

  randomString(length) {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  sendVisitedContentLogs(data, queueURL) {
    return new Promise((resolve, reject) => {
      try {
        const MessageDeduplicationId = `${new Date().getTime()}_${parseInt(
          Math.random() * 10000000
        )}_${this.randomString(7)}`;

        const sqs = new AWS.SQS({
          accessKeyId: process.env.ACCESS_KEY,
          secretAccessKey: process.env.SECRET_KEY,
          region: process.env.REGION,
        });

        var params = {
          MessageBody: JSON.stringify(data),
          QueueUrl: queueURL,
          MessageGroupId: "1671106338352_5665213",
          MessageDeduplicationId,
        };

        sqs.sendMessage(params, (err, data) => {
          if (err) {
            console.log("error", err);
            reject(err);
          } else {
            resolve(data);
            console.log("success", params);
          }
        });
      } catch (err) {
        reject(err);
      }
    });
  }
}

module.exports = Helper;
