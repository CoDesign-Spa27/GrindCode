import React from 'react';
import '../style/index.css';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
const Banner1 = () => {
    const cardDetails = [
        {
            title: 'Get Connected And Grow Your Network.',
            description: 'Connect with other students and professionals in the tech industry. Grow your network and make new friends.',
            logo: <div><Image src="/Banner1/connect.svg" alt="connect" width={40} height={40} /></div>
        },
        {
            title: 'Find The Perfect Mentor.',
            description: 'Find the perfect mentor to help you navigate the tech industry. Get the advice you need to succeed.',
            logo: <div><Image src="/Banner1/find.svg" alt="connect" width={40} height={40} /></div>
        },
        {
            title: 'Get Face time with industry professionals.',
            description: 'Get face time with industry professionals. Get your questions answered and learn from the best.',
            logo: <div><Image src="/Banner1/video.svg" alt="connect" width={40} height={40} /></div>
        },
        {
            title: 'Collab with Folks Around the World',
            description: 'Collaborate with folks around the world. Work on projects together and learn from each other.',
            logo: <div><Image src="/Banner1/collab.svg" alt="connect" width={40} height={40} /></div>
        }
    ];

    const itemVariants = {
        hidden: { 
            opacity: 0,
            y: 20
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    }

    return (
        <div className='bg-[#020617] pt-3 pb-5 w-full h-full'>
            <div className='card mx-auto max-w-7xl p-5'>
                <motion.div
                   variants={itemVariants}
                   initial="hidden"
                   whileInView="visible"
                   transition={{ duration: 0.5, ease: "easeOut" }} 
                   viewport={{ once: true, amount: 0.4 }}
                className='py-5'>
                    <div className='text-2xl md:text-4xl py-2 font-bold text-center'>
                        Why Use GrindCode
                    </div>
                    <div className='text-gray-400 text-md text-center'>
                        Many Reasons to use GrindCode. Here are a few.
                    </div>
                </motion.div>
 
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4  '>
                    {cardDetails.map((card, index) => {
                        return (
                            <CardContainer  key={index}  className=''>
<CardBody className=' relative group/card  w-auto h-auto rounded-xl p-6 '>

                            <motion.div
                               
                                className='p-4 m-2 flex flex-col rounded-lg shadow-[0_8px_15px_-3px_#DA297A] hover:shadow-[0_8px_15px_-3px_rgba(218,41,122,0.6),0_8px_15px_-3px_rgba(102,126,234,0.6)]'
                                initial={{ opacity: 0, y: 50 }} // Start with opacity 0 and slightly below
                                whileInView={{ opacity: 1, y: 0 }} // Animate to opacity 1 and position 0
                                transition={{ duration: 0.5, ease: "easeOut" }} // Animation duration and easing
                                viewport={{ once: true, amount: 0.4 }} // Trigger only once when 20% visible
                                >
                                    <CardItem
                                    translateZ={40}
                                    >

                                <div className='py-2 '>
                                    {card.logo}
                                </div>
                                    </CardItem>
                                
                                <CardItem 
                                 translateZ={-40}
                                >

                                <div className='text-lg font-semibold mb-3'>
                                    {card.title}
                                </div>
                                </CardItem>

                                <CardItem
                                translateZ={30}
                                >

                                <div className='text-sm text-gray-400'>
                                    {card.description}
                                </div>
                                </CardItem>
                            </motion.div>
                    </CardBody>
                                </CardContainer>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Banner1;
