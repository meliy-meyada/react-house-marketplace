import { useState } from 'react'
import { getAuth, updateProfile } from 'firebase/auth'
import { updateDoc, doc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { useNavigate, Link } from 'react-router-dom'
import { toast} from 'react-toastify'



function Profile() {
    const auth = getAuth()
    const [changeDetails, setChangeDetails] = useState(false)
    const [formData, setFromData] = useState({
        name:  auth.currentUser.displayName,
        email:  auth.currentUser.email,
    })
    const { email, name } = formData


    const navigate = useNavigate()

    const onLogout = () => {
        auth.signOut()
        navigate('/')
    }

    const onSubmit = async () => {
        try {
            if (auth.currentUser.displayName !== name) {
                // Update displayName in firebase
                await updateProfile(auth.currentUser, {
                    displayName: name,
                })
                // Update in fireStore
                const userRef = doc(db, 'users', auth.currentUser.uid)
                await updateDoc(userRef, {
                    name
                })
            }
        } catch (error) {
            toast.error('ไม่สามารถอัปเดตรายละเอียดโปรไฟล์ได้')
        }
    }

    const onChange = (e) => {
        setFromData((prevState) => ({
            ...prevState,
            [e.target.id] : e.target.value,
        }))
    }



    return (
        <div className="profile">
            <header className="profileHeader">
                <p className="pageHeader">My Profile</p>
                <button type='button' className='logOut' onClick={onLogout}>
                    ออกจากระบบ
                </button>
            </header>
            <main>
                <div className="profileDetailsHeader">
                    <p className="profileDetailsText">ข้อมูลส่วนตัว</p>
                    <p className="changePersonalDetails" onClick={() => {
                        changeDetails && onSubmit()
                        setChangeDetails((prevState) => !prevState)
                    }}>
                        { changeDetails ? 'เสร็จแล้ว' : 'เปลี่ยน'}
                    </p>
                </div>
                <div className="profileCard">
                    <form>
                        <input
                            type="text"
                            id="name"
                            className={!changeDetails ? 'profileName' : 'profileNameActive'}
                            disabled={!changeDetails}
                            value={name}
                            onChange={onChange}
                        />
                        <input
                            type="text"
                            id="email"
                            className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
                            disabled={!changeDetails}
                            value={email}
                            onChange={onChange}
                        />
                    </form>
                </div>
            </main>
        </div>
    
    )
}

export default Profile
