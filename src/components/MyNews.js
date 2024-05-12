import React from 'react'
import { useState, useEffect } from 'react'
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Spinner
} from '@material-tailwind/react'
import { HandThumbUpIcon, ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import API_BASE_URL from '../config'
const MyNews = () => {
    const token = localStorage.getItem('token')
    const [news, setNews] = useState([])
    const [loading, setLoading] = useState(false)


    const fetchNews = async () => {
        setLoading(true)
        const response = await fetch(`${API_BASE_URL}/profile/news`, {
            method: 'GET',
            headers: {
                authorization: `${token}`
            }
        })
        const data = await response.json()
        setNews([
            ...data
        ])
        console.log(data)
        setLoading(false)
    }

    useEffect(() => {
        if (token) fetchNews()
    }, [token])

    if (!token) {
        return (
            <div
                className='
                flex
                justify-center
                items-center
                h-[600px]
            '
            >
                <h1
                    className='
                    text-3xl
                    font-bold
                '
                >You are Logged out</h1>
            </div>
        )
    }

    if (news.length === 0) {
        return (
            <div
                className="flex justify-center items-center h-screen"
            >
                <Spinner className='h-12 w-12' color="blue" />
            </div>
        )
    }

    return (
        <>
            <h1
                className='
                    text-3xl
                    font-bold
                    text-center
                    mt-6
                '
            >My News News</h1>
            <div
                className='
                    flex
                    flex-wrap
                    justify-center
                    items-center
                    gap-4
                    mt-4
                '
            >
                {
                    news.map((item, index) => {
                        return (
                            <Card className="mt-6 w-96">
                                <CardBody>
                                    <Typography variant="h5" color="blue-gray" className="mb-2">
                                        <a href={item.url} >
                                            {item.title}
                                        </a>
                                    </Typography>
                                    <Typography>
                                        {item.site}
                                    </Typography>
                                    <div
                                        className='
                                            flex
                                            flex-wrap
                                            justify-between
                                            items-center
                                            gap-4
                                        '
                                    >
                                        <Typography color="blue-gray">
                                            {item.age}
                                        </Typography>
                                        <Typography color="blue-gray">
                                            <div className='flex flex-wrap justify-between items-center gap-2' >
                                                <HandThumbUpIcon
                                                    className='
                                                    h-5
                                                    w-5
                                                    text-blue-gray-500
                                                '
                                                /> {item.score}
                                            </div>
                                        </Typography>
                                        <Typography color="blue-gray">
                                            <div className='flex flex-wrap justify-between items-center gap-2'>
                                                <ChatBubbleBottomCenterTextIcon
                                                    className='
                                                    h-5
                                                    w-5
                                                    text-blue-gray-500
                                                '
                                                />
                                                {item.comments}
                                            </div>
                                        </Typography>
                                    </div>
                                </CardBody>
                                {/* <CardFooter className="pt-0">
                                    <Button onClick={() => markAsRead(item._id)} >
                                        {
                                            loading ? <Spinner size="sm" color="blue" /> : "Mark as read"
                                        }
                                    </Button>
                                </CardFooter> */}
                            </Card>
                        )
                    })
                }
            </div>
        </>
    )
}

export default MyNews