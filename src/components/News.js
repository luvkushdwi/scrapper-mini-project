import React from 'react'
import API_BASE_URL from '../config'
import { useEffect } from 'react'
import { useState } from 'react'
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Spinner
} from "@material-tailwind/react";
import { HandThumbUpIcon, ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";

const News = () => {

    const token = localStorage.getItem('token')
    const [news, setNews] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

    const fetchNews = async () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setLoading(true)
        const response = await fetch(`${API_BASE_URL}/news?page=${page}`, {
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

    const markAsRead = async (id) => {
        setLoading(true)
        const res = await fetch(`${API_BASE_URL}/news/read/${id}`, {
            method: 'POST',
            headers: {
                authorization: `${token}`
            }
        })
        setNews(news.filter(item => item._id !== id))
        setLoading(false)
    }

    const deleteNews = async (id) => {
        setLoading(true)
        const res = await fetch(`${API_BASE_URL}/news/delete/${id}`, {
            method: 'POST',
            headers: {
                authorization: `${token}`
            }
        })
        setNews(news.filter(item => item._id !== id))
        setLoading(false)
    }

    useEffect(() => {
        if(token)
        {
            fetchNews()
        }
    }, [token, page])


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


    return (
        <>
            <h1
                className='
                    text-3xl
                    font-bold
                    text-center
                    mt-6
                '
            >News</h1>
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
                                <CardFooter className="pt-0">
                                    <div    
                                        className='
                                            flex
                                            flex-wrap
                                            justify-between
                                            items-center
                                            gap-4
                                        '
                                    >
                                    <Button onClick={() => markAsRead(item._id)} >
                                        {
                                            loading ? <Spinner size="sm" color="blue" /> : "Mark as read"
                                        }
                                    </Button>
                                    <Button onClick={() => deleteNews(item._id)} variant='outlined' >
                                        {
                                            loading ? <Spinner size="sm" color="blue" /> : "Delete"
                                        }
                                    </Button>
                                    </div>
                                </CardFooter>
                            </Card>
                        )
                    })
                }
            </div>
            <div
                className='
                    z-10
                    flex
                    justify-center
                    items-center
                    gap-4
                    mt-4
                '
            >
                <Button variant='outlined' onClick={() => setPage(page - 1)}>Previous</Button>
                <Button variant='outlined' onClick={() => setPage(page + 1)}>Next</Button>
            </div>
        </>
    )
}

export default News