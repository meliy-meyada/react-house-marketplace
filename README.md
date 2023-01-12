# Getting Started with Create React App


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

- ``useState``: This hook is used to manage the state of the listing, loading, and shareLinkCopied.
- ``useEffect``: This hook is used to fetch data from Firestore when the component is first rendered and to update the state with the fetched data.
- ``useNavigate`` and ``useParams``: These hooks are used to navigate between pages and access the ``listingId`` parameter in the URL.
- ``MapContainer``, ``Marker``, ``Popup``, and ``TileLayer``: These components are imported from the ``react-leaflet`` library but are not used in this code.
- The component uses the ``useState`` hook to manage the state of the listing, loading, and shareLinkCopied. It also uses the ``useEffect`` hook to fetch data from Firestore and display it in a carousel using the ``Swiper`` component. When a user clicks on the share icon, it uses the ``navigator.clipboard.writeText`` function to copy the current URL to the clipboard and display a message that the link has been copied. It also uses ``useNavigate`` and ``useParams`` hooks to navigate between pages and access the ``listingId`` parameter in the URL.
- ``getDoc``, ``doc`` functions from the ``firebase/firestore`` and ``getAuth`` function from the ``firebase/auth`` : These functions are imported and used to fetch data from Firestore and authenticate the user.
```js,html,
function Listing() {
    const [listing, setListing] = useState(null)
    const [loading, setLoading] = useState(true)
    const [shareLinkCopied, setShareLinkCopied] = useState(false)

    const navigate = useNavigate()
    const params = useParams()
    const auth = getAuth()

    useEffect(() => {
        const fetchListing = async () => {
        const docRef = doc(db, 'listings', params.listingId)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            setListing(docSnap.data())
            setLoading(false)
        }
        }

        fetchListing()
    }, [navigate, params.listingId])

    if (loading) {
        return <Spinner />
    }

    return (
        <main>
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    navigation
                    style={{ height: '300px' }}
                >
                    {listing.imgUrls.map((url, index) => {
                    return (
                            <SwiperSlide key={index}>
                                <div
                                    className='swiperSlideDiv'
                                    style={{
                                        background: `url(${listing.imgUrls[index]}) center no-repeat`,
                                        backgroundSize: 'cover',
                                    }}
                                ></div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>

        <div
            className='shareIconDiv'
            onClick={() => {
            navigator.clipboard.writeText(window.location.href)
            setShareLinkCopied(true)
            setTimeout(() => {
                setShareLinkCopied(false)
            }, 2000)
            }}
        >
            <img src={shareIcon} alt='' />
        </div>

        {shareLinkCopied && <p className='linkCopied'>Link Copied!</p>}

        <div className='listingDetails'>
            <p className='listingName'>
            {listing.name} - ฿
            {listing.offer
                ? listing.discountedPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                : listing.regularPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </p>
            <p className='listingLocation'>{listing.location}</p>
            <p className='listingType'>
            For {listing.type === 'rent' ? 'Rent' : 'Sale'}
            </p>
            {listing.offer && (
            <p className='discountPrice'>
                {listing.regularPrice - listing.discountedPrice}฿ discount
            </p>
            )}

            <ul className='listingDetailsList'>
            <li>
                {listing.bedrooms > 1
                ? `${listing.bedrooms} Bedrooms`
                : '1 Bedroom'}
            </li>
            <li>
                {listing.bathrooms > 1
                ? `${listing.bathrooms} Bathrooms`
                : '1 Bathroom'}
            </li>
            <li>{listing.parking && 'Parking Spot'}</li>
            <li>{listing.furnished && 'Furnished'}</li>
            </ul>

            <p className='listingLocationTitle'>Location</p>

            <div className='leafletContainer'>
            <MapContainer
                style={{ height: '100%', width: '100%' }}
                center={[listing.geolocation.lat, listing.geolocation.lng]}
                zoom={13}
                scrollWheelZoom={false}
            >
                <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png'
                />

                <Marker
                position={[listing.geolocation.lat, listing.geolocation.lng]}
                >
                <Popup>{listing.location}</Popup>
                </Marker>
            </MapContainer>
            </div>

            {auth.currentUser?.uid !== listing.userRef && (
            <Link
                to={`/contact/${listing.userRef}?listingName=${listing.name}`}
                className='primaryButton'
            >
                ติดต่อสอบถาม
            </Link>
            )}
        </div>
        </main>
    )
}

export default Listing
``` 

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


![__________________ (1) (1) (1)](https://user-images.githubusercontent.com/79361511/206162328-ca634cc9-f228-4cb9-baf3-ccaba6deec32.gif)

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.


The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
