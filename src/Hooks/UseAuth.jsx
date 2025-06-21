import React, { use } from 'react'
import { AuthContext } from '../Contexts/AuthContext/AuthContext'

function UseAuth() {
    const authInfo = use(AuthContext);
    return authInfo;
}

export default UseAuth