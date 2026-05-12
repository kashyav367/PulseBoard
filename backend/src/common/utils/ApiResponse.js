class ApiResponse {

    static send(res, statusCode, message, data = null) {

        return res.status(statusCode).json({

            success: true,

            message,

            data

        })

    }

}

export default ApiResponse