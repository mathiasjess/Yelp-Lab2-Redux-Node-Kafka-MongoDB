import React, {Component} from 'react';
import cookie from 'react-cookies';
import landingPageDescription from './landingPageDescription';
import UserHomePage from './UserHomePage';
import { Redirect } from 'react-router-dom';
import landingPageHeader from './landingPageHeader';

class MainContent extends React.Component {
    constructor() {
        super()
    }

    render() {
        //redirect based on successful login
        // let redirectVar = null;
        // if (cookie.load('cookie')) {
        //     redirectVar = <Redirect to="/UserHomePage" />
        // }
        // else {
        //     redirectVar = <Redirect to="/landingPageDescription" />
        // }
        // return(
        //     <div>
        //         {redirectVar}
        //     </div>
        // )
        return(
            <div>
                <landingPageDescription />
            </div>
        )
    }
}


export default MainContent;