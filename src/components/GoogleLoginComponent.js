import React, { Component } from 'react'
import {Text, StyleSheet, TouchableOpacity, Button} from 'react-native'
import {GoogleSignin, GoogleSigninButton, statusCodes} from '@react-native-community/google-signin';


export default class GoogleLoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pushData: [],
            loggedIn: false,
            userInfo: {email: '', name: '', type:''}
        }
    }
    componentDidMount() {
       
    }
    _signIn = async() => {
        GoogleSignin.configure({
            webClientId: '420490957468-fg53nft8vmu1egq8d37ralre73liiarb.apps.googleusercontent.com',
            offlineAccess: true,
            hostedDomain: '',
            forceConsentPrompt: true,

        });

        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            this.setState({userInfo: {email: userInfo.user.email, name: userInfo.user.name, type:'google'}, loggedIn: true}, function() {
                console.log(this.state.userInfo);
            })
            
        } catch(error) {
            if(error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log("login Cancelled");
            }
            else if(error.code === statusCodes.IN_PROGRESS) {
                console.log("in progress error")
            }
            else if(error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log("play service not available")
            }
            else {
                console.log(error)
            }
        }
    }

    signOut = async() => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            this.setState({user: null, loggedIn: false});
        }catch (error) {
            console.log(error);
        }
    }

    render() {
        return(
            <>
                {!this.state.loggedIn && <TouchableOpacity style={styles.btn}
                    onPress={this._signIn}/>}
            </>
        )
    }
}

const styles = StyleSheet.create({
    btn: {
        width: 50,
        height: 50,
        borderRadius: 100/2,
        backgroundColor: '#fff',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
})