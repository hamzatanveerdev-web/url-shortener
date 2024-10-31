import Cookies from 'js-cookie';
import './Main.css'
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useState,useEffect } from 'react';
import Form from 'react-bootstrap/Form';
function Main() {
  const [UrlSHORTcOUNT, setUrlSHORTcOUNT] = useState(0);
  const [url,seturl]=useState("");
  const [check,setcheck]=useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const apiUrl = `${process.env.REACT_APP_API_URL}/api/url`;
const [data ,setdata]=useState([])
const [uniqueId,setuniqueId]=useState("")
const submiturl = async () => {
  const token = Cookies.get('authToken');
  const storedUrlCount = localStorage.getItem('UrlSHORTCOUNT');
  const urlCount = storedUrlCount ? Number(storedUrlCount) : 0; // Convert to number, default to 0
  console.log(urlCount);
  setUrlSHORTcOUNT(urlCount);

  const userId = localStorage.getItem('userid');
  console.log("User ID:", userId);
  let uniqueIds = '';

  if (userId === null) {
    uniqueIds = uuidv4();  // Generate a random unique ID
    console.log("Generated ID:", uniqueIds);
    setuniqueId(uniqueIds);
    setcheck(true);
  } else {
    uniqueIds = userId;
  }

  if (urlCount < 4 || token) {
    try {
      console.log(uniqueIds);
      const res = await axios.post(`${apiUrl}/genrateshorturl`, {
        userid: uniqueIds,
        url,
      });

      if (res.status === 200) {
        if (uniqueIds !== null) {
          localStorage.setItem('userid', uniqueIds);
        }

        const newUrlCount = urlCount + 1; // Increment URL count
        localStorage.setItem('UrlSHORTCOUNT', newUrlCount); 
        setUrlSHORTcOUNT(newUrlCount); // Update state
        seturl(''); // Clear the URL input
    
    
    console.log(res.data)
      }
  }catch(err){
console.log(err)
  }
}
else{
 
  toast.error("You have reached the limit of 5 short URLs");

}}
useEffect(() => {
  const fetchData = async () => {
    try {
      const userid = localStorage.getItem('userid');
      console.log(userid);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/url/getrecords?id=${userid}`);

      if (response.status === 200) {
        setdata(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:");
    }
  };

  fetchData();
}, [url]);

const inputevent=(event)=>{
  seturl(event.target.value)
}
const handleSwitchChange = () => {
  setIsSwitchOn(prevState => !prevState);
};

 useEffect(() => {
  if(isSwitchOn){
    
    if (navigator.clipboard) {
      navigator.clipboard.readText()
      .then(text => {
        seturl(text);
      })
      .catch(err => {
        console.error('Failed to read clipboard contents:', err);
      });
    }
  }


 }, [isSwitchOn]);
  return (
    <div>

    <div className='main-container'>
      <h1><span>Shorten Your Loooong Links :)</span></h1>
      <p className="px-4 px-md-6 py-2">Linkly is an efficient and easy-to-use URL shortening service that streamlines your online experience.</p>
      <div className="search">
      <input
        type="text"
        placeholder="Paste Here..."
        className="input-field"
        value={url}
        onChange={inputevent}
      />
      <button onClick={ ()=>{submiturl() }} className="search-btn">
        Short Now!
      </button> 
    </div>
   

    <div>
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50px', 
      }}
    >
      <Form>
  <Form.Check 
    type="switch"
    checked={isSwitchOn}
    onChange={() => handleSwitchChange()}
    id="custom-switch"
    label={<span style={{ color: '#fff' }}>Auto Paste from Clipboard</span>}
  />
</Form>

    </div >
    <p className="px-4 px-md-6 py-2">
  You can create <span style={{ color: "rgb(221, 5, 156)" }}>05</span> more links. Register now to enjoy Unlimited usage
</p>

    </div>

    <div className="table-responsive">


            <table>
                <thead>
                    <tr>
                        <th>Short Link</th>
                        <th>Original Link</th>
                       
                        <th>Clicks</th>

                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                
{data.sort((a, b) => new Date(b.date) - new Date(a.date)).map((item) => (
    <tr key={item._id}>
        <td className="url-cell">
            <a href={`${apiUrl}/${item.shortUrl}`}>{`${apiUrl}/${item.shortUrl}`}</a>
        </td>
        <td className="url-cell">
            <a href={`${item.originalUrl}`}>
            <img
                    src={`${new URL(item.originalUrl).origin}/favicon.ico`}
                    alt="favicon"
                    style={{ width: '16px', height: '16px', marginRight: '5px' }}
                />
            {`${item.originalUrl}`}</a>
        </td>
        <td >{item.noofclicks}</td>
        <td style={{ display:"flex" ,  width: "200px"}}>{new Date(item.date).toDateString()}</td>
    </tr>
))}



                </tbody>
            </table> 
        </div>
    <div className='register-in-main'><a href="/register" >Register Now</a><span> to Enjoy Unlimited History</span></div>
    </div>
   
    </div>
    
  )
}

export default Main
