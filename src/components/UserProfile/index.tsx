import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getUserByUserName } from '../../api/api'
import { User } from '../../Tipagem/User'
import '../../style/UserProfile.scss'

function createInfoArray(userData: User | null): { label: string, value: string }[] {
  const infoArray: { label: string, value: string }[] = []

  addToInfo(infoArray, 'Gender', userData?.gender)
  addToInfo(infoArray, 'Email', userData?.email)
  addToInfo(infoArray, 'Phone', userData?.phone)
  addToInfo(infoArray, 'Cell', userData?.cell)
  addToInfo(infoArray, 'Nat', userData?.nat)

  return infoArray
}

function addToInfo(array: { label: string, value: string }[], label: string, value: string | undefined) {
  if (value) {
    array.push({ label, value })
  }
}

function createLocationArray(locationData: any): { label: string, value: string | number }[] {
  const locationArray: { label: string, value: string | number }[] = []
  
  if (locationData?.street) {
    addToLocationInfo(locationArray, 'Street Number', locationData.street.number)
    addToLocationInfo(locationArray, 'Street Name', locationData.street.name)
  }

  addToLocationInfo(locationArray, 'City', locationData?.city)
  addToLocationInfo(locationArray, 'State', locationData?.state)
  addToLocationInfo(locationArray, 'Country', locationData?.country)
  addToLocationInfo(locationArray, 'Postal Code', locationData?.postcode)

  if (locationData?.coordinates) {
    addToLocationInfo(locationArray, 'Latitude', locationData.coordinates.latitude)
    addToLocationInfo(locationArray, 'Longitude', locationData.coordinates.longitude)
  }

  if (locationData?.timezone) {
    addToLocationInfo(locationArray, 'Timezone Offset', locationData.timezone.offset)
    addToLocationInfo(locationArray, 'Timezone Description', locationData.timezone.description)
  }

  return locationArray
}

function addToLocationInfo(array: { label: string, value: string | number }[], label: string, value: string | number) {
  if (value) {
    array.push({ label, value })
  }
}

function createLoginArray(loginData: any): { label: string, value: string }[] {
  const loginArray: { label: string, value: string }[] = []

  addToLoginInfo(loginArray, 'UUID', loginData?.uuid)
  addToLoginInfo(loginArray, 'Username', loginData?.username)
  addToLoginInfo(loginArray, 'Password', loginData?.password)
  addToLoginInfo(loginArray, 'Salt', loginData?.salt)
  addToLoginInfo(loginArray, 'MD5', loginData?.md5)
  addToLoginInfo(loginArray, 'SHA-1', loginData?.sha1)
  addToLoginInfo(loginArray, 'SHA-256', loginData?.sha256)

  return loginArray
}


function addToLoginInfo(array: any[], label: string, value: any) {
  if (value) array.push({ label, value })
}

const UserProfile = () => {
  const { username } = useParams()
  const [userData, setUserData] = useState<User | null>(null)
  const [activeButton, setActiveButton] = useState<string>('Info')
  const navigate = useNavigate()



  useEffect(() => {
    const fetchUserData = async () => {
      if (!username) return

      try {
        const user = await getUserByUserName(username)
        setUserData(user)
      } catch (error) {
        navigate('/error')
      }
    }

    fetchUserData()
  }, [username])

  const info = createInfoArray(userData)
  const location = createLocationArray(userData?.location || {})
  const login = createLoginArray(userData?.login || {})

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName)
  }


  return (
    <div className='user-profile'>
      <header>
        <nav>
          <Link to='/' className='btn-back'>
            Back
          </Link>
        </nav>
        <main>
          <section className='section-user'>
            <img src={userData?.picture.large} alt='User Profile' />
            <div>
              <h1>
                {userData?.name.first} {userData?.name.last}
              </h1>
              <h2>{userData?.name.title}</h2>
            </div>
          </section>
          <section className='section-information'>
            <div>
              <button
                className={activeButton === 'Info' ? 'active' : ''}
                onClick={() => handleButtonClick('Info')}
              >
                Info
              </button>
              <button
                className={activeButton === 'Location' ? 'active' : ''}
                onClick={() => handleButtonClick('Location')}
              >
                Location
              </button>
              <button
                className={activeButton === 'Login' ? 'active' : ''}
                onClick={() => handleButtonClick('Login')}
              >
                Login
              </button>
            </div>
            <ul>
              {activeButton === 'Info' &&
                info.map((item, index) => (
                  <li key={index}>
                    <strong>{item.label}</strong> {item.value}
                  </li>
                ))}
              {activeButton === 'Location' &&
                location.map((item, index) => (
                  <li key={index}>
                    <strong>{item.label}</strong> {item.value}
                  </li>
                ))}
              {activeButton === 'Login' &&
                login.map((item, index) => (
                  <li key={index}>
                    <strong>{item.label}</strong> {item.value}
                  </li>
                ))}
            </ul>
          </section>
        </main>
      </header>
    </div>
  )
}

export default UserProfile