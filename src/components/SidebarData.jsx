import React from 'react';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as BsIcons from "react-icons/bs";
import * as MdIcons from "react-icons/md";

export const SidebarData = [
    {
        title: 'Inicio',
        path: '/lista',
        icon: <AiIcons.AiFillHome/>,
        cName: 'nav-text'
    },
    {
        title: 'Agregar platos',
        path: '/agregar',
        icon: <BsIcons.BsFillCartPlusFill/>,
        cName: 'nav-text'
    },
    {
        title: 'Productos',
        path: '/productos',
        icon: <BiIcons.BiFoodMenu/>,
        cName: 'nav-text'
    },
    {
        title: 'Categorias',
        path: '/categorias',
        icon: <BiIcons.BiCategoryAlt/>,
        cName: 'nav-text'
    },
    {
        title: 'Pagos',
        path: '/pagos',
        icon: <MdIcons.MdPayment/>,
        cName: 'nav-text'
    }
]