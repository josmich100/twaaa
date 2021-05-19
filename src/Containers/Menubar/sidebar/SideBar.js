import React from 'react'
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import EmojiObjectsOutlinedIcon from '@material-ui/icons/EmojiObjectsOutlined';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import InboxOutlinedIcon from '@material-ui/icons/InboxOutlined';
import StorefrontOutlinedIcon from '@material-ui/icons/StorefrontOutlined';
import ForumIcon from '@material-ui/icons/Forum';
import CenterFocusWeakIcon from '@material-ui/icons/CenterFocusWeak';
import { Avatar } from "@material-ui/core"
import "./SideBar.css"

function SideBar() {
  return (
    <div className='sidebar'>
          <div className='userInfo'>
              <Avatar />
              <p>Michina Josiah</p>
          </div>
          <p><EmailOutlinedIcon color="rgb(0, 82, 156)"/> &nbsp; Timeline</p>
          <p><EmojiObjectsOutlinedIcon /> &nbsp; Mentorship</p>
          <p><PeopleOutlineIcon /> &nbsp; Groups</p>
          <p><InboxOutlinedIcon /> &nbsp; Messages</p>
          <p><StorefrontOutlinedIcon /> &nbsp;Tstore</p>
          <p><ForumIcon /> &nbsp; Forums</p>
          <p><CenterFocusWeakIcon /> &nbsp; TWAAline</p>
    </div>
  )
}

export default SideBar
