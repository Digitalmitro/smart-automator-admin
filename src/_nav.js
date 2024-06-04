import React from 'react'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cibMinutemailer,
  cilSpeedometer,
  cibTelegramPlane,
  cibLaravel,
  cibMessenger,
  cilMedicalCross,
  cilMoney,
  cilBraille,
  cilShieldAlt,
  cilUserPlus,
  cilBarChart,
  cilUserFemale,
  cilContact,
  cilUser,
} from '@coreui/icons'

let _nav = [
  {
    component: CNavTitle,
    name: 'Dashboard',
  },
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'MASTER',
  },

  {
    component: CNavGroup,
    name: 'Manage Tasker',
    icon: <CIcon icon={cilShieldAlt} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Tasker Lists',
        to: '/tasker-list',
      },
      {
        component: CNavItem,
        name: 'Tasker Services List' ,
        to: '/tasker-services-list',
      },
      
     
    ],
  },
  {
    component: CNavGroup,
    name: 'Manage Client',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Client Lists ',
        to: '/client_list',
      },
    ],
  },
]

export default _nav
