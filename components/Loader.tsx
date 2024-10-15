import Lottie from 'react-lottie-player'

import loader from '../assets/Laoder.json'
export function Loader (){
return (
    <div className='w-full flex items-center justify-center h-full'>

    <Lottie
    loop
    animationData={loader}
    play
    style={{ width: 150, height: 150 }}
    />
    </div>
)
}