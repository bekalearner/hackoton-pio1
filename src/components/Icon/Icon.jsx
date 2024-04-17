import {BsEmojiExpressionless, BsEmojiSmileUpsideDown, BsEmojiSunglasses} from "react-icons/bs";
import './Icon.css'

const Icon = ({ isLoading, isActive }) => {
    if (isActive) {
        return <BsEmojiSmileUpsideDown className={'rounding'}/>
    } else if (isLoading) {
        return <BsEmojiExpressionless/>
    }

    return <BsEmojiSunglasses/>
}

export default Icon