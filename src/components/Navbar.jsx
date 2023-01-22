import { useNavigate, useLocation } from 'react-router-dom'
import { ReactComponent as OfferIcon} from '../assets/svg/localOfferIcon.svg'
import { ReactComponent as ExploreIcon} from '../assets/svg/exploreIcon.svg'
import { ReactComponent as PersonOutlineIcon} from '../assets/svg/personOutlineIcon.svg'
import { ReactComponent as MenuIcon } from '../assets/svg/menuIcon.svg'
import { useState } from 'react';

function Navbar() {
    const navigate = useNavigate()
    const location = useLocation()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    
    const pathmatchRoute = (route) => {
        if (route === location.pathname) {
            return true
        }
    }

    const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    const menuOptions = document.querySelector('.menu-options')
    menuOptions.style.display = isMenuOpen ? 'block' : 'none'
}

    return (
        <header className='navbar top-header  center-header'>
            <MenuIcon onClick={toggleMenu} width='36px' height='36px' fill='#2c2c2c'/>
            {isMenuOpen && (
                <ul className="navbarListItems">
                    <li className="navbarListItem" onClick={() => navigate('/')}>
                        <ExploreIcon fill={pathmatchRoute('/') ? '#2c2c2c' : '#8f8f8f'} width='36px' height='36px' />
                        <p className={pathmatchRoute('/') ? 'navbarListItemNameActive' : 'navbarListItemNam'}>Explore</p>
                    </li>
                    <li className="navbarListItem" onClick={() => navigate('/offers')}>
                        <OfferIcon fill={pathmatchRoute('/offers') ? '#2c2c2c' : '#8f8f8f'} width='36px' height='36px' />
                        <p className={pathmatchRoute('/offers') ? 'navbarListItemNameActive' : 'navbarListItemNam'}>Offers</p>
                    </li>
                    <li className="navbarListItem" onClick={() => navigate('/profile')}>
                        <PersonOutlineIcon fill={pathmatchRoute('/profile') ? '#2c2c2c' : '#8f8f8f'} width='36px' height='36px' />
                        <p className={pathmatchRoute('/profile') ? 'navbarListItemNameActive' : 'navbarListItemNam'}>Profile</p>
                    </li>
                </ul>
            )}
        </header>
    )
}

export default Navbar
