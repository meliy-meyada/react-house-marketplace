import { useState } from "react"
import { Link } from "react-router-dom"
import { sendPasswordResetEmail, getAuth } from "firebase/auth"
import { toast } from "react-toastify"
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'

function ForgotPassword() {
    const [email, setEmail] = useState('')

    const onChange = (e) => setEmail(e.target.value)

    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            const auth = getAuth()
            await sendPasswordResetEmail(auth, email)
            toast.success('ส่งอีเมลแล้ว')
        } catch (error) {
            toast.error('ไม่สามารถส่งอีเมลรีเซ็ตได้')
        }
    }

    return (
        <div className="pageContainer">
            <header>
                <p className="pageHeader">Forgot Password</p>
            </header>

            <main>
                <form onSubmit={onSubmit}>
                    <input
                        type="email"
                        className="emailInput"
                        placeholder="Email"
                        id="email"
                        value={email}
                        onChange={ onChange }
                    />
                    <Link className="forgotPasswordLink" to='/sign-in'>
                        เข้าสู่ระบบ
                    </Link>

                    <div className="signInBar">
                        <div className="signInText">ส่งลิงค์รีเซ็ต</div>
                        <button className="signInButton">
                            <ArrowRightIcon fill='#ffffff' width='34px' height='34px'/>
                        </button>
                    </div>
                </form>
            </main>
        </div>
    )
}

export default ForgotPassword