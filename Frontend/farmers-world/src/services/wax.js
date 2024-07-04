import {SessionKit} from '@wharfkit/session'
import {WebRenderer} from '@wharfkit/web-renderer'
import {WalletPlugin} from '@wharfkit/wallet-plugin-anchor'

const chain = {
    id:'f16b1833c747c43682f4386fca9cbb327929334a762755ebec17f6f23c9b8a12',
    url:'https://waxtestnet.greymass.com'
}
const sessionKit = new SessionKit({
    appName: 'FarmersWorld',
    chains: [chain],
    ui: new WebRenderer(),
    walletPlugins: [new WalletPlugin()]
})

export const login = async() => {
    try{
        const {session} = await sessionKit.login();
        return session
    } catch (error){
        console.error('Error logging in: ', error)
        throw error
    }
}

export const logout = async() => {
    try{
        await sessionKit.logout();
    } catch(error){
        console.error('Error loging out the user: ', error);
        throw error;
    }
}