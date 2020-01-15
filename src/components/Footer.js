// @flow
import React from 'react'
import { css } from 'glamor'
import DashboardIcon from 'material-ui/svg-icons/action/dashboard'
import AssignmentIcon from 'material-ui/svg-icons/action/assignment'
import DiningIcon from 'material-ui/svg-icons/maps/local-dining'
import SettingsIcon from '@material-ui/icons/Settings';

import { ROUTES } from '../constants'
import FooterItem from './FooterItem'

export default function Footer() {
  console.log(SettingsIcon)
  return (
    <footer {...css({
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      position: 'fixed',
      bottom: '0',
      width: '100%',
      height: '3.5rem',
      borderTop: '1px solid #eaeaea'
    })}>
      <FooterItem
        path={ROUTES.dashboard}
        Icon={DashboardIcon}
        label="Dashboard"
      />
      <FooterItem 
        path={ROUTES.logging.list}
        Icon={AssignmentIcon}
        label="Logging"
      />
      <FooterItem 
        path={ROUTES.recipes.list}
        Icon={SettingsIcon}
        label="Settings"
      />
    </footer>
  )
}
