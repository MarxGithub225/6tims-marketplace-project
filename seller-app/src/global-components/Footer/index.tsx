import React from "react";
import { Link } from "react-router-dom";

const menuItems = [
    {
        header: 'About',
        menus : [
            {
                link:'/',
                title: 'How it works',
            },
            {
                link:'/',
                title: 'Careers',
            },
            {
                link:'/',
                title: 'About us',
            },
            {
                link:'/',
                title: 'Media',
            }
        ]
    },
    {
        header: 'Community',
        menus : [
            {
                link:'/',
                title: 'Against Discrimination',
            },
            {
                link:'/',
                title: 'Invite friends',
            },
            {
                link:'/',
                title: 'About usGift cards',
            }
        ]
    },
    {
        header: 'Become seller',
        menus : [
            {
                link:'/',
                title: 'Add your vehicle',
            },
            {
                link:'/',
                title: 'Business account',
            },
            {
                link:'/',
                title: 'Resource Center',
            },
            {
                link:'/',
                title: 'Community',
            }
        ]
    },
    {
        header: 'Bookings support',
        menus : [
            {
                link:'/',
                title: 'Updates for COVID-19',
            },
            {
                link:'/',
                title: 'Help Center',
            },
            {
                link:'/',
                title: 'Support',
            },
            {
                link:'/',
                title: 'CommTrust & Safetyunity',
            }
        ]
    }
]



function Footer() {
  return <div className="footer flex justify-between">
    {menuItems.map((menuItem: any, key: number) => {
        return <div className="footer-menu-items" key={key} >
            <div className="header"> {menuItem.header} </div>

            {
                menuItem.menus.map((m: any, index: number) => {
                    return <Link to={m.link} className="footer-menu" key={index}> {m.title} </Link>
                })
            }
        </div>
    })}
  </div>;
}

export default Footer;
