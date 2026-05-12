import ApiResponse from "../../common/utils/ApiResponse.js"

import { createPollService } from "./poll.service.js"

import { getMyPollsService } from "./poll.service.js"

import { getSinglePollService } from "./poll.service.js"

import { publishPollService } from "./poll.service.js"

import { getPublishedResultService } from "./poll.service.js"


export const createPollController = async (

    req,

    res,

    next

) => {

    try {

        const poll = await createPollService(

            req.body,

            req.user.id

        )



        return ApiResponse.send(

            res,

            201,

            "Poll created successfully",

            poll

        )

    } catch (error) {

        next(error)

    }

}

export const getMyPollsController = async (

    req,

    res,

    next

) => {

    try {

        const polls = await getMyPollsService(

            req.user.id

        )



        return ApiResponse.send(

            res,

            200,

            "Polls fetched successfully",

            polls

        )

    } catch (error) {

        next(error)

    }

}

export const getSinglePollController = async (

    req,

    res,

    next

) => {

    try {

        const poll = await getSinglePollService(

            req.params.id

        )



        return ApiResponse.send(

            res,

            200,

            "Poll fetched successfully",

            poll

        )

    } catch (error) {

        next(error)

    }

}

export const publishPollController = async (

    req,

    res,

    next

) => {

    try {

        const poll = await publishPollService(

            req.params.id,

            req.user.id

        )



        return ApiResponse.send(

            res,

            200,

            "Poll published successfully",

            poll

        )



    } catch (error) {

        next(error)

    }

}

export const getPublishedResultController = async (

    req,

    res,

    next

) => {

    try {

        const poll =

            await getPublishedResultService(

                req.params.id

            )



        return ApiResponse.send(

            res,

            200,

            "Published results fetched",

            poll

        )



    } catch (error) {

        next(error)

    }

}